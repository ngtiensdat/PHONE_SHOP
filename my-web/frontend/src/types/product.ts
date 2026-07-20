/**
 * Product-related Types and Interfaces
 * Defins structures for smartphone products, variants, and specifications.
 *
 * Related: src/data/mock-products.ts, src/components/features/product/ProductCard.tsx
 * Pattern: Shared Domain Types
 */

export interface ProductVariant {
  storage: string;
  price: number;
  oldPrice?: number;
}

export interface ProductSpecs {
  screen: string;
  chip: string;
  ram: string;
}

export interface MockProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  badge: string;
  badgeType: 'success' | 'warning' | 'danger' | 'info';
  image: string;
  brand: string;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  soldCount: string;
  promotionText: string;
  installment: boolean;
  fastDelivery: boolean;
  specs: ProductSpecs;
  variants: ProductVariant[];
}
