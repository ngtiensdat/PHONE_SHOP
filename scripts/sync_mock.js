const fs = require('fs');
const path = require('path');

const tuDongPath = path.resolve(__dirname, '../dataset/the_gioi_di_dong/tu_dong.json');
const targetPath = path.resolve(__dirname, '../my-web/frontend/src/data/mock-products.ts');

const items = JSON.parse(fs.readFileSync(tuDongPath, 'utf8'));

const cleanText = (str) => {
  if (!str) return '';
  return str
    .replace(/&#x2B;/gi, '+')
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&#x27;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
};

const generateSlug = (title, id) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-') + '-' + id;
};

// Remove duplicates by ID
const seenIds = new Set();
const products = [];

for (const item of items) {
  if (!item || !item.id || seenIds.has(item.id)) continue;
  seenIds.add(item.id);

  const cleanName = cleanText(item.name);
  const basePrice = Number(item.oldPrice || item.price || 0);
  const salePrice = Number(item.price || 0);
  const discount = item.discountPercent ? item.discountPercent.trim() : null;
  const brand = cleanText(item.brand || 'Khác').trim();
  const category = cleanText(item.category || 'Điện thoại').trim();

  // Real specs only - no fake hardcoded fallback strings
  const screen = item.specs && item.specs[0] ? cleanText(item.specs[0]) : '';
  const chip = item.specs && item.specs[1] ? cleanText(item.specs[1]) : '';
  const ram = item.specs && item.specs[2] ? cleanText(item.specs[2]) : '';

  products.push({
    id: item.id,
    name: cleanName,
    slug: generateSlug(cleanName, item.id),
    description: `Sản phẩm ${cleanName} chính hãng chất lượng cao phân phối độc quyền tại Sóc Mobile.`,
    price: salePrice > 0 ? salePrice : basePrice,
    badge: discount ? `Giảm ${discount}` : 'Trả góp 0%',
    badgeType: discount ? 'danger' : 'success',
    image: item.imageUrl || 'https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-128gb-den-thumb-600x600.jpg',
    brand: brand,
    category: category,
    tags: ['featured', brand.toLowerCase(), category.toLowerCase()],
    rating: item.rating ? Number(item.rating) : 5,
    reviewCount: Math.floor(Math.random() * 500) + 50,
    soldCount: item.soldCount ? String(item.soldCount) : '1, 5k',
    promotionText: 'Ưu đãi thanh toán quét mã QR & Miễn phí giao hàng hỏa tốc trong 2 giờ',
    installment: item.installment ?? true,
    fastDelivery: true,
    specs: { screen, chip, ram },
    variants: [
      {
        storage: category === 'Laptop' ? '512GB SSD' : '128GB',
        price: salePrice > 0 ? salePrice : basePrice,
        oldPrice: basePrice > salePrice ? basePrice : undefined
      }
    ]
  });
}

const content = `/**
 * Mock Featured Products
 * Automatically generated from Thế Giới Di Động Crawled tu_dong.json Dataset.
 * Total products: ${products.length}
 */

import { MockProduct } from '@/types/product';

export const FEATURED_PRODUCTS: MockProduct[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Successfully updated ${targetPath} with ${products.length} products (no hardcoded fake specs)!`);
