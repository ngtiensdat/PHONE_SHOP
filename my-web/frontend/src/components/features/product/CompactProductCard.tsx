/**
 * CompactProductCard Component
 * Displays only Image, Name, and Price in a compact format for the main listing feed.
 * Clicking on the card triggers the onClick callback (opening the detail modal).
 *
 * Related: src/components/base/SafeImage.tsx, src/utils/format.ts, src/data/mock-products.ts
 * Pattern: Presentation Card Component
 */

'use client';

import React from 'react';
import SafeImage from '@/components/base/SafeImage';
import { formatVND } from '@/utils/format';
import { MockProduct } from '@/data/mock-products';

interface CompactProductCardProps {
  product: MockProduct;
  onClick: () => void;
}

export default function CompactProductCard({ product, onClick }: CompactProductCardProps) {
  // Use first variant price if available, fallback to base price
  const displayPrice = product.variants && product.variants.length > 0 
    ? product.variants[0].price 
    : product.price;

  return (
    <article 
      className="compact-product-card" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Product Image */}
      <div className="compact-card-image-wrapper">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'contain', padding: '6px' }}
        />
      </div>

      {/* Product Info */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 className="compact-card-title">
          {product.name}
        </h3>
        
        <span className="compact-card-price">
          {formatVND(displayPrice)}
        </span>
      </div>
    </article>
  );
}
