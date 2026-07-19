/**
 * CompactProductCard Component
 * Displays Image, Name, Price, and a Compare button in a compact format for the main listing feed.
 * Clicking on the card triggers the onClick callback (opening the detail modal).
 * The Compare button is linked to the global useCompareStore — stopPropagation prevents modal from opening.
 *
 * Related: src/components/base/SafeImage.tsx, src/utils/format.ts, src/data/mock-products.ts
 * Related: src/store/useCompareStore.ts, src/constants/labels.ts
 * Pattern: Presentation Card Component
 */

'use client';

import React from 'react';
import { GitCompare } from 'lucide-react';
import SafeImage from '@/components/base/SafeImage';
import { formatVND } from '@/utils/format';
import { MockProduct } from '@/types/product';
import { useCompareStore } from '@/store/useCompareStore';
import { LABELS } from '@/constants/labels';
import { useIsMounted } from '@/hooks/useIsMounted';

interface CompactProductCardProps {
  product: MockProduct;
  onClick: () => void;
}

export default function CompactProductCard({ product, onClick }: CompactProductCardProps) {
  const isMounted = useIsMounted();

  // Use first variant price if available, fallback to base price
  const displayPrice = product.variants && product.variants.length > 0
    ? product.variants[0].price
    : product.price;

  const comparedProducts = useCompareStore((state) => state.comparedProducts);
  const addCompare = useCompareStore((state) => state.addProduct);
  const isCompared = isMounted && comparedProducts.some((p) => p.id === product.id);

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

        {/* Compare Button */}
        <button
          type="button"
          className={`compact-compare-btn ${isCompared ? 'active' : ''}`}
          title={LABELS.PRODUCT.COMPARE_TOOLTIP}
          onClick={(e) => {
            e.stopPropagation(); // prevent opening the detail modal
            addCompare(product);
          }}
        >
          <GitCompare size={12} />
          <span>{isCompared ? LABELS.PRODUCT.COMPARE_STATUS_ACTIVE : LABELS.PRODUCT.COMPARE_STATUS_INACTIVE}</span>
        </button>
      </div>
    </article>
  );
}
