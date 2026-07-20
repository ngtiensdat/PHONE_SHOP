import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seeding/upserting database from tu_dong.json dataset...');

  // 1. Load tu_dong.json
  const jsonPath = path.resolve(__dirname, '../../../dataset/the_gioi_di_dong/tu_dong.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`File not found: ${jsonPath}`);
  }

  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  const rawProductsData = JSON.parse(rawData);

  // Deduplicate products in JSON array by ID
  const productsData: any[] = [];
  const seenIds = new Set<number>();
  for (const item of rawProductsData) {
    if (item && item.id && !seenIds.has(item.id)) {
      seenIds.add(item.id);
      productsData.push(item);
    }
  }

  console.log(`Found ${productsData.length} unique products to process.`);

  // Helper to generate slug safely
  const generateSlug = (title: string, idSuffix?: number) => {
    let slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    if (idSuffix) {
      slug = `${slug}-${idSuffix}`;
    }
    return slug;
  };

  const cleanText = (str: string) => {
    if (!str) return '';
    return str
      .replace(/&#x2B;/gi, '+')
      .replace(/&quot;/gi, '"')
      .replace(/&amp;/gi, '&')
      .replace(/&#x27;/gi, "'")
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>');
  };

  // Maps for brands and categories
  const brandMap = new Map<string, any>();
  const categoryMap = new Map<string, any>();

  // Upsert brands and categories
  for (const item of productsData) {
    const rawBrand = item.brand || 'Khác';
    const rawCategory = item.category || 'Điện thoại';
    const brandName = cleanText(rawBrand).trim();
    const categoryName = cleanText(rawCategory).trim();

    if (!brandMap.has(brandName)) {
      const slug = generateSlug(brandName);
      const brand = await prisma.brand.upsert({
        where: { name: brandName },
        update: { name: brandName },
        create: {
          name: brandName,
          slug: slug,
        }
      });
      brandMap.set(brandName, brand);
    }

    if (!categoryMap.has(categoryName)) {
      const slug = generateSlug(categoryName);
      const category = await prisma.category.upsert({
        where: { name: categoryName },
        update: { name: categoryName },
        create: {
          name: categoryName,
          slug: slug,
        }
      });
      categoryMap.set(categoryName, category);
    }
  }

  console.log(`Upserted ${brandMap.size} brands and ${categoryMap.size} categories.`);

  let createdCount = 0;
  let updatedCount = 0;

  // Upsert products
  for (const item of productsData) {
    const cleanName = cleanText(item.name);
    const slug = generateSlug(cleanName, item.id);
    const rawBrand = item.brand || 'Khác';
    const rawCategory = item.category || 'Điện thoại';
    const brand = brandMap.get(cleanText(rawBrand).trim());
    const category = categoryMap.get(cleanText(rawCategory).trim());

    // Specs setup
    const screen = item.specs && item.specs[0] ? cleanText(item.specs[0]) : (item.category === 'Laptop' ? 'Full HD 15.6"' : 'Màn hình cảm ứng');
    const chip = item.specs && item.specs[1] ? cleanText(item.specs[1]) : (item.category === 'Laptop' ? 'Intel/AMD Core' : 'Chip xử lý cao cấp');
    const ram = item.specs && item.specs[2] ? cleanText(item.specs[2]) : (item.category === 'Laptop' ? '16GB RAM' : '8GB RAM');

    // Safe parsing of numbers
    const basePrice = Number(item.oldPrice || item.price || 0);
    const salePrice = Number(item.price || 0);
    const discount = item.discountPercent ? parseInt(item.discountPercent.replace(/[^0-9]/g, '')) : (basePrice > salePrice ? Math.round(((basePrice - salePrice) / basePrice) * 100) : null);

    const existingProduct = await prisma.product.findUnique({ where: { id: item.id } });

    const productData = {
      name: cleanName,
      slug: slug,
      brandId: brand.id,
      categoryId: category.id,
      description: `Sản phẩm ${cleanName} chính hãng phân phối tại hệ thống PHONE_SHOP.`,
      specs: { screen, chip, ram },
      basePrice: basePrice > 0 ? basePrice : salePrice,
      salePrice: salePrice > 0 ? salePrice : null,
      discount: discount,
      rating: item.rating ? Number(item.rating) : 5.0,
      reviewCount: item.soldCount ? parseInt(String(item.soldCount).replace(/\D/g, '')) || 50 : 25,
      isActive: true,
      isFeatured: true,
      tags: ['featured', brand.name.toLowerCase(), category.name.toLowerCase()],
    };

    const product = await prisma.product.upsert({
      where: { id: item.id },
      update: productData,
      create: {
        id: item.id,
        ...productData
      }
    });

    if (existingProduct) {
      updatedCount++;
    } else {
      createdCount++;
    }

    // Upsert Image
    if (item.imageUrl) {
      const existingImage = await prisma.productImage.findFirst({
        where: { productId: product.id }
      });

      if (existingImage) {
        await prisma.productImage.update({
          where: { id: existingImage.id },
          data: { url: item.imageUrl, altText: cleanName }
        });
      } else {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: item.imageUrl,
            altText: cleanName,
            sortOrder: 0
          }
        });
      }
    }

    // Upsert Variant
    const variantColor = cleanText(item.color) || 'Default';
    const variantStorage = item.category === 'Laptop' ? '512GB SSD' : (item.category === 'Đồng hồ thông minh' ? 'Standard' : '128GB');
    const variantSku = `${brand.name.replace(/\s+/g, '').toUpperCase()}-${item.id}-${variantColor.replace(/\s+/g, '').toUpperCase()}`;

    const variant = await prisma.productVariant.upsert({
      where: {
        productId_color_storage: {
          productId: product.id,
          color: variantColor,
          storage: variantStorage
        }
      },
      update: {
        price: salePrice > 0 ? salePrice : basePrice,
        imageUrl: item.imageUrl
      },
      create: {
        productId: product.id,
        color: variantColor,
        storage: variantStorage,
        ram: ram,
        sku: variantSku,
        price: salePrice > 0 ? salePrice : basePrice,
        imageUrl: item.imageUrl
      }
    });

    // Upsert Inventory
    await prisma.inventory.upsert({
      where: { variantId: variant.id },
      update: { stock: 100, status: 'IN_STOCK' },
      create: {
        variantId: variant.id,
        stock: 100,
        reserved: 0,
        status: 'IN_STOCK'
      }
    });
  }

  console.log(`Seeding finished successfully! Created: ${createdCount}, Updated: ${updatedCount}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
