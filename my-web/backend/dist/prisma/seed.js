"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Starting seeding database from V2 dataset...');
    await prisma.inventory.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.category.deleteMany();
    const jsonPath = path.resolve(__dirname, '../../../dataset/the_gioi_di_dong/GetCrmCountByProductListV2_standard.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const rawProductsData = JSON.parse(rawData);
    const productsData = [];
    const seenIds = new Set();
    for (const item of rawProductsData) {
        if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            productsData.push(item);
        }
    }
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    };
    const cleanText = (str) => {
        if (!str)
            return '';
        return str
            .replace(/&#x2B;/gi, '+')
            .replace(/&quot;/gi, '"')
            .replace(/&amp;/gi, '&')
            .replace(/&#x27;/gi, "'")
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>');
    };
    const brandMap = new Map();
    const categoryMap = new Map();
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
    for (const item of productsData) {
        const cleanName = cleanText(item.name);
        const slug = generateSlug(cleanName);
        const brand = brandMap.get(cleanText(item.brand));
        const category = categoryMap.get(cleanText(item.category));
        const screen = item.specs && item.specs[0] ? cleanText(item.specs[0]) : (item.category === 'Laptop' ? 'Full HD 15.6"' : 'OLED Screen');
        const chip = item.specs && item.specs[1] ? cleanText(item.specs[1]) : (item.category === 'Laptop' ? 'Intel/AMD Core' : 'Octa-Core CPU');
        const ram = item.specs && item.specs[2] ? cleanText(item.specs[2]) : (item.category === 'Laptop' ? '16GB RAM' : '8GB RAM');
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
        await prisma.productImage.create({
            data: {
                productId: product.id,
                url: item.imageUrl,
                altText: cleanName,
                sortOrder: 0
            }
        });
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
//# sourceMappingURL=seed.js.map