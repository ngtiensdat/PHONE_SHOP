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
  console.log('Starting seeding database from V2 dataset...');

  // 1. Clean up database safely (truncate/delete)
  await prisma.inventory.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();

  // 2. Load standard json
  const jsonPath = path.resolve(__dirname, '../../../dataset/the_gioi_di_dong/GetCrmCountByProductListV2_standard.json');
  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  const rawProductsData = JSON.parse(rawData);
  // Deduplicate products
  const productsData: any[] = [];
  const seenIds = new Set<number>();
  for (const item of rawProductsData) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      productsData.push(item);
    }
  }

  // Helper to generate slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
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

  // Seed brands and categories first
  const brandMap = new Map<string, any>();
  const categoryMap = new Map<string, any>();

  for (const item of productsData) {
    const brandName = cleanText(item.brand);
    const categoryName = cleanText(item.category);

    if (!brandMap.has(brandName)) {
      const brand = await prisma.brand.create({
        data: {
          name: brandName,
          slug: generateSlug(brandName),
        }
      });
      brandMap.set(brandName, brand);
    }

    if (!categoryMap.has(categoryName)) {
      const category = await prisma.category.create({
        data: {
          name: categoryName,
          slug: generateSlug(categoryName),
        }
      });
      categoryMap.set(categoryName, category);
    }
  }

  // Seed products
  for (const item of productsData) {
    const cleanName = cleanText(item.name);
    const slug = generateSlug(cleanName);
    const brand = brandMap.get(cleanText(item.brand));
    const category = categoryMap.get(cleanText(item.category));

    // Specs setup
    const screen = item.specs && item.specs[0] ? cleanText(item.specs[0]) : (item.category === 'Laptop' ? 'Full HD 15.6"' : 'OLED Screen');
    const chip = item.specs && item.specs[1] ? cleanText(item.specs[1]) : (item.category === 'Laptop' ? 'Intel/AMD Core' : 'Octa-Core CPU');
    const ram = item.specs && item.specs[2] ? cleanText(item.specs[2]) : (item.category === 'Laptop' ? '16GB RAM' : '8GB RAM');

    // Safe parsing of numbers
    const basePrice = Number(item.price);
    const salePrice = item.oldPrice !== item.price ? Number(item.price) : null;
    const discount = item.discountPercent ? parseInt(item.discountPercent.replace(/[^0-9]/g, '')) : null;

    const product = await prisma.product.create({
      data: {
        id: item.id,
        name: cleanName,
        slug,
        brandId: brand.id,
        categoryId: category.id,
        description: `Sản phẩm ${cleanName} chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.`,
        specs: { screen, chip, ram },
        basePrice: basePrice,
        salePrice: salePrice,
        discount: discount,
        rating: item.rating,
        reviewCount: 45,
        isActive: true,
        isFeatured: true,
        tags: ['featured', item.brand.toLowerCase(), item.category.toLowerCase()],
      }
    });

    // Create default image
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: item.imageUrl,
        altText: cleanName,
        sortOrder: 0
      }
    });

    // Create default variant
    const variantColor = cleanText(item.color) || 'Default';
    const variantStorage = item.category === 'Laptop' ? '512GB SSD' : (item.category === 'Đồng hồ thông minh' ? 'Standard' : '128GB');
    const variantSku = `${item.brand.replace(/\s+/g, '').toUpperCase()}-${item.id}-${variantColor.replace(/\s+/g, '').toUpperCase()}`;

    const variant = await prisma.productVariant.create({
      data: {
        productId: product.id,
        color: variantColor,
        storage: variantStorage,
        ram: ram,
        sku: variantSku,
        price: basePrice,
        imageUrl: item.imageUrl
      }
    });

    // Create inventory record
    await prisma.inventory.create({
      data: {
        variantId: variant.id,
        stock: 100,
        reserved: 0,
        status: 'IN_STOCK'
      }
    });
  }

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
