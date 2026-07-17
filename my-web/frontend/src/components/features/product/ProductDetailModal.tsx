/**
 * ProductDetailModal Component
 * Premium modal detailing smartphone specifications, variants, and allowing adding to cart.
 *
 * Related: src/components/base/SafeImage.tsx, src/hooks/useCart.ts, src/data/mock-products.ts
 * Pattern: Interactive Modal facade
 */

'use client';

import React, { useState, useEffect } from 'react';
import { X, Star, Zap, GitCompare, Heart, Gift, ShoppingCart } from 'lucide-react';
import SafeImage from '@/components/base/SafeImage';
import { formatVND } from '@/utils/format';
import { MockProduct } from '@/data/mock-products';
import { useCart } from '@/hooks/useCart';

interface ProductDetailModalProps {
  product: MockProduct;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart } = useCart();
  
  // Default to first variant
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || {
    storage: 'Mặc định',
    price: product.price,
    oldPrice: product.price * 1.1
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const discountPercent = Math.round(
    ((selectedVariant.oldPrice - selectedVariant.price) / selectedVariant.oldPrice) * 100
  );

  const handleAddToCart = (buyNow = false) => {
    addToCart({
      variantId: product.id * 10 + (product.variants.indexOf(selectedVariant as any) !== -1 ? product.variants.indexOf(selectedVariant as any) : 0),
      productId: product.id,
      productName: product.name,
      color: 'Mặc định',
      storage: selectedVariant.storage,
      imageUrl: product.image,
      price: selectedVariant.price,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div className="product-detail-modal-overlay" onClick={onClose}>
      <div 
        className="product-detail-modal-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Đóng bảng thông tin"
        >
          <X size={20} />
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Image & Badges */}
          <div className="modal-image-col">
            <div className="modal-image-container">
              <SafeImage
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'contain', padding: '16px' }}
              />
              <div className="modal-badges-overlay">
                {product.installment && (
                  <span className="badge-installment">Trả góp 0%</span>
                )}
                {product.fastDelivery && (
                  <span className="badge-fast-delivery">
                    <Zap size={10} fill="currentColor" /> Giao 2h
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specs, Variants, Cart */}
          <div className="modal-info-col">
            <h2 className="modal-product-title">{product.name}</h2>

            {/* Ratings & Sold */}
            <div className="modal-meta-row">
              <div className="modal-rating">
                <Star size={14} fill="#ff9f0a" color="#ff9f0a" />
                <span className="modal-rating-num">{product.rating.toFixed(1)}</span>
                <span className="modal-review-count">
                  ({product.reviewCount} đánh giá)
                </span>
              </div>
              <span className="modal-sold-count">Đã bán {product.soldCount}</span>
            </div>

            <hr className="modal-divider" />

            {/* Price Selection */}
            <div className="modal-price-row">
              <span className="modal-current-price">
                {formatVND(selectedVariant.price)}
              </span>
              {selectedVariant.oldPrice > selectedVariant.price && (
                <>
                  <span className="modal-old-price">
                    {formatVND(selectedVariant.oldPrice)}
                  </span>
                  <span className="modal-discount">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Variants selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="modal-variants-section">
                <h4 className="section-subtitle">Chọn phiên bản dung lượng:</h4>
                <div className="modal-variants-list">
                  {product.variants.map((v) => (
                    <button
                      key={v.storage}
                      type="button"
                      className={`modal-variant-btn ${selectedVariant.storage === v.storage ? 'active' : ''}`}
                      onClick={() => setSelectedVariant(v)}
                    >
                      <span className="v-storage">{v.storage}</span>
                      <span className="v-price">{formatVND(v.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Table */}
            <div className="modal-specs-section">
              <h4 className="section-subtitle">Thông số kỹ thuật:</h4>
              <div className="modal-specs-table">
                <div className="specs-row">
                  <span className="specs-label">Màn hình</span>
                  <span className="specs-val">{product.specs.screen}</span>
                </div>
                <div className="specs-row">
                  <span className="specs-label">Vi xử lý (Chip)</span>
                  <span className="specs-val">{product.specs.chip}</span>
                </div>
                <div className="specs-row">
                  <span className="specs-label">Bộ nhớ RAM</span>
                  <span className="specs-val">{product.specs.ram} RAM</span>
                </div>
              </div>
            </div>

            {/* Promotion Box */}
            {product.promotionText && (
              <div className="modal-promo-box">
                <Gift size={14} className="modal-promo-icon" />
                <div className="modal-promo-info">
                  <span className="modal-promo-header">Khuyến mãi kèm theo:</span>
                  <p className="modal-promo-text">{product.promotionText}</p>
                </div>
              </div>
            )}

            {/* Interactive Actions Footer */}
            <div className="modal-actions-footer">
              <button
                type="button"
                className="btn btn-secondary flex-1 flex-center gap-6"
                onClick={() => handleAddToCart(false)}
              >
                <ShoppingCart size={16} />
                <span>Thêm vào giỏ</span>
              </button>

              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={() => handleAddToCart(true)}
              >
                Mua Ngay
              </button>

              <button
                type="button"
                className={`modal-action-icon-btn ${isCompared ? 'active' : ''}`}
                onClick={() => setIsCompared(!isCompared)}
                title="So sánh cấu hình"
              >
                <GitCompare size={18} />
              </button>

              <button
                type="button"
                className={`modal-action-icon-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
                title="Thêm vào yêu thích"
              >
                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
