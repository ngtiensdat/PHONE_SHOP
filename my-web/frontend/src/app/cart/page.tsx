/**
 * Cart Page Component
 * Shows details of all items in the shopping cart, adjusts quantities, removes items.
 * Computes subtotals, shipping fees, applies promo vouchers, and navigates to Checkout.
 *
 * Related: src/hooks/useCart.ts, src/constants/labels.ts, src/app/checkout/page.tsx
 * Pattern: Cart Coordinator Page
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Tag } from 'lucide-react';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import SafeImage from '@/components/base/SafeImage';
import { useCart } from '@/hooks/useCart';
import { formatVND } from '@/utils/format';
import { LABELS } from '@/constants/labels';
import { toast } from '@/store/useToastStore';

export default function CartPage() {
  const router = useRouter();
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const shippingFee = totalPrice > 15000000 || totalPrice === 0 ? 0 : 30000;
  const finalTotal = Math.max(0, totalPrice + shippingFee - discount);

  const handleApplyVoucher = () => {
    const code = voucherCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'GIAM50') {
      if (totalPrice < 100000) {
        toast.error('Đơn hàng tối thiểu từ 100k để sử dụng mã này');
        return;
      }
      setDiscount(50000);
      setAppliedVoucher('GIAM50');
      toast.success(LABELS.CART.VOUCHER_SUCCESS);
    } else if (code === 'SOC2K') {
      setDiscount(Math.min(totalPrice, 2000));
      setAppliedVoucher('SOC2K');
      toast.success(LABELS.CART.VOUCHER_SUCCESS);
    } else {
      toast.error(LABELS.CART.VOUCHER_INVALID);
    }
  };

  const handleRemoveVoucher = () => {
    setDiscount(0);
    setAppliedVoucher(null);
    setVoucherCode('');
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    
    // Pass discount and voucher code via URL parameters to keep it clean
    let url = '/checkout';
    if (appliedVoucher) {
      url += `?voucher=${appliedVoucher}&discount=${discount}`;
    }
    router.push(url);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      <Header />

      <main style={{ flexGrow: 1, padding: '24px 0' }}>
        {items.length === 0 ? (
          <div className="empty-cart-view">
            <ShoppingBag size={64} className="empty-cart-icon" />
            <h2>{LABELS.CART.EMPTY_TITLE}</h2>
            <p>{LABELS.CART.EMPTY_DESC}</p>
            <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none', padding: '12px 24px', borderRadius: '12px' }}>
              {LABELS.CART.CONTINUE_SHOPPING}
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            
            {/* Left: Cart Items List */}
            <div className="cart-items-panel">
              <h1 className="cart-header-title">{LABELS.CART.TITLE}</h1>
              
              <div className="cart-table-header">
                <span>{LABELS.CART.PRODUCT_NAME}</span>
                <span>{LABELS.CART.PRICE}</span>
                <span>{LABELS.CART.QUANTITY}</span>
                <span style={{ textAlign: 'right' }}>{LABELS.CART.TOTAL_ITEM_PRICE}</span>
              </div>

              <div className="cart-items-list" style={{ display: 'flex', flexDirection: 'column' }}>
                {items.map((item) => (
                  <div key={item.variantId} className="cart-item-row">
                    
                    {/* Item Details */}
                    <div className="cart-item-info">
                      <div className="cart-item-image-wrapper">
                        <SafeImage
                          src={item.imageUrl || ''}
                          alt={item.productName}
                          fill
                          style={{ objectFit: 'contain', padding: '6px' }}
                        />
                      </div>
                      <div className="cart-item-details">
                        <span className="cart-item-name">{item.productName}</span>
                        <span className="cart-item-variant">Dung lượng: {item.storage}</span>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <span className="cart-item-price">{formatVND(item.price)}</span>

                    {/* Quantity Selector */}
                    <div className="quantity-control">
                      <button 
                        type="button" 
                        className="quantity-control-btn"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <input 
                        type="text" 
                        className="quantity-input" 
                        value={item.quantity}
                        readOnly 
                      />
                      <button 
                        type="button" 
                        className="quantity-control-btn"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal & Actions */}
                    <div className="cart-item-actions">
                      <span className="cart-item-subtotal" style={{ marginLeft: 'auto', marginRight: '16px' }}>
                        {formatVND(item.price * item.quantity)}
                      </span>
                      <button 
                        type="button" 
                        className="cart-item-remove-btn"
                        onClick={() => removeFromCart(item.variantId)}
                        title="Xóa sản phẩm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Back Link */}
              <div style={{ marginTop: '24px' }}>
                <Link href="/" className="auth-back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowLeft size={14} /> {LABELS.CART.CONTINUE_SHOPPING}
                </Link>
              </div>

            </div>

            {/* Right: Cart Summary Panel */}
            <div className="cart-summary-panel">
              <h2 className="cart-summary-title">{LABELS.CART.ORDER_SUMMARY}</h2>
              
              {/* Cost Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="summary-row">
                  <span>{LABELS.CART.TEMP_PRICE}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatVND(totalPrice)}</span>
                </div>
                
                <div className="summary-row">
                  <span>{LABELS.CART.SHIPPING_FEE}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {shippingFee === 0 ? LABELS.CART.SHIPPING_FREE : formatVND(shippingFee)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="summary-row" style={{ color: 'var(--color-success)' }}>
                    <span>{LABELS.CART.DISCOUNT}</span>
                    <span style={{ fontWeight: 700 }}>-{formatVND(discount)}</span>
                  </div>
                )}

                <div className="summary-row total-row">
                  <span>{LABELS.CART.FINAL_TOTAL}</span>
                  <span className="total-val">{formatVND(finalTotal)}</span>
                </div>
              </div>

              {/* Voucher section */}
              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span className="checkout-field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Tag size={14} /> Khuyến mãi / Voucher
                </span>
                {appliedVoucher ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-primary-tint)', padding: '8px 12px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-primary)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)' }}>MÃ ĐÃ ÁP DỤNG: {appliedVoucher}</span>
                    <button type="button" onClick={handleRemoveVoucher} style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>Xóa</button>
                  </div>
                ) : (
                  <div className="voucher-input-wrapper">
                    <input 
                      type="text" 
                      className="voucher-input"
                      placeholder={LABELS.CART.APPLY_VOUCHER_PLACEHOLDER}
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary voucher-btn"
                      onClick={handleApplyVoucher}
                    >
                      {LABELS.CART.APPLY_VOUCHER_BTN}
                    </button>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button 
                type="button" 
                className="btn btn-primary checkout-btn"
                onClick={handleProceedToCheckout}
              >
                {LABELS.CART.CHECKOUT_BTN}
              </button>

            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
