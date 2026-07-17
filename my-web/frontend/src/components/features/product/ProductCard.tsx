/**
 * ProductCard Component
 * Renders a highly-detailed, professional smartphone product card.
 * Supports interactive variant switching (RAM/ROM), rating, promos, and specs.
 *
 * Related: src/components/base/SafeImage.tsx, src/utils/format.ts, src/data/mock-products.ts
 * Pattern: Interactive Product Presentation
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Zap, GitCompare, Heart, Gift } from 'lucide-react';
import SafeImage from '@/components/base/SafeImage';
import { formatVND } from '@/utils/format';
import { MockProduct } from '@/data/mock-products';

interface ProductCardProps {
  product: MockProduct;
  onViewDetail?: () => void;
}

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  // Default to first variant
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || {
    storage: 'Mặc định',
    price: product.price,
    oldPrice: product.price * 1.1 // fallback
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  const discountPercent = Math.round(
    ((selectedVariant.oldPrice - selectedVariant.price) / selectedVariant.oldPrice) * 100
  );

  return (
    <article className="product-card card-container spec-product-card">
      <div className="accent-bar" />

      {/* Top action badges */}
      <div className="product-card-top-meta">
        {product.installment && (
          <span className="badge-installment">Trả góp 0%</span>
        )}
        {product.fastDelivery && (
          <span className="badge-fast-delivery">
            <Zap size={10} fill="currentColor" /> Giao 2h
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="product-card-image-wrapper">
        {onViewDetail ? (
          <div onClick={onViewDetail} style={{ display: 'block', width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}>
            <SafeImage
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain', padding: '10px' }}
            />
          </div>
        ) : (
          <Link href={`/products/${product.slug}`} style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
            <SafeImage
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain', padding: '10px' }}
            />
          </Link>
        )}
        {product.badge && product.badge !== 'Trả góp 0%' && (
          <span className={`badge badge-${product.badgeType} product-card-badge`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Interactive Storage Variants Selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="product-variants-selector">
          {product.variants.map((v) => (
            <button
              key={v.storage}
              type="button"
              className={`variant-pill-btn ${selectedVariant.storage === v.storage ? 'active' : ''}`}
              onClick={() => setSelectedVariant(v)}
            >
              {v.storage}
            </button>
          ))}
        </div>
      )}

      {/* Info Area */}
      <div className="product-card-info" style={{ paddingTop: '8px' }}>
        {/* Title */}
        <h3 className="product-card-title">
          {onViewDetail ? (
            <span onClick={onViewDetail} className="product-title-link" style={{ cursor: 'pointer' }}>
              {product.name}
            </span>
          ) : (
            <Link href={`/products/${product.slug}`} className="product-title-link">
              {product.name}
            </Link>
          )}
        </h3>

        {/* Tech Specs Summary */}
        <div className="product-mini-specs">
          <span>{product.specs.screen}</span>
          <span>{product.specs.chip}</span>
          <span>{product.specs.ram} RAM</span>
        </div>

        {/* Price Row */}
        <div className="product-price-section">
          <span className="product-card-price">{formatVND(selectedVariant.price)}</span>
          {selectedVariant.oldPrice > selectedVariant.price && (
            <>
              <span className="product-card-old-price">{formatVND(selectedVariant.oldPrice)}</span>
              <span className="product-card-discount-tag">-{discountPercent}%</span>
            </>
          )}
        </div>

        {/* Promotion Box */}
        {product.promotionText && (
          <div className="product-promo-box">
            <Gift size={12} className="promo-icon" />
            <span className="promo-text">{product.promotionText}</span>
          </div>
        )}

        {/* Rating & Sold count */}
        <div className="product-feedback-row">
          <div className="product-rating">
            <Star size={12} fill="#ff9f0a" color="#ff9f0a" />
            <span className="rating-num">{product.rating.toFixed(1)}</span>
            <span className="review-count">({product.reviewCount > 1000 ? `${(product.reviewCount / 1000).toFixed(0)}k` : product.reviewCount} đánh giá)</span>
          </div>
          <span className="sold-count-badge">Đã bán {product.soldCount}</span>
        </div>

        {/* Quick Action Footer */}
        <div className="product-card-action-bar">
          <button
            type="button"
            className={`action-btn compare-btn ${isCompared ? 'active' : ''}`}
            onClick={() => setIsCompared(!isCompared)}
            title="So sánh cấu hình"
          >
            <GitCompare size={16} />
            <span>{isCompared ? 'Đang so sánh' : 'So sánh'}</span>
          </button>

          <button
            type="button"
            className={`action-icon-btn fav-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
            title="Thêm vào yêu thích"
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </button>

          {onViewDetail ? (
            <button type="button" onClick={onViewDetail} className="btn btn-primary btn-sm btn-buy-now">
              Mua Ngay
            </button>
          ) : (
            <Link href={`/products/${product.slug}`} className="btn btn-primary btn-sm btn-buy-now">
              Mua Ngay
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
