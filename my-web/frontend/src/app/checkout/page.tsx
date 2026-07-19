/**
 * Checkout Page Component
 * Allows user to input shipping details, choose payment method (COD / VietQR).
 * Generates dynamic VietQR code image for bank transfers, simulates transaction completion,
 * and clears the cart on successful checkout.
 *
 * Related: src/hooks/useCart.ts, src/constants/labels.ts, src/utils/format.ts
 * Pattern: Interactive Checkout workflow
 */

'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, QrCode, Banknote, Loader2 } from 'lucide-react';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import SafeImage from '@/components/base/SafeImage';
import { useCart } from '@/hooks/useCart';
import { formatVND } from '@/utils/format';
import { LABELS } from '@/constants/labels';
import { toast } from '@/store/useToastStore';

const CITIES = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'];

function CheckoutForm() {
  const searchParams = useSearchParams();
  const { items, totalPrice, clearCart } = useCart();

  // Read discount and voucher from URL
  const voucherCode = searchParams.get('voucher') || '';
  const discount = Number(searchParams.get('discount')) || 0;

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'VIETQR'>('COD');
  
  // Workflow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCountdown, setQrCountdown] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedOrderCode] = useState(() => Math.floor(10000 + Math.random() * 90000).toString());

  const shippingFee = totalPrice > 15000000 || totalPrice === 0 ? 0 : 30000;
  const finalTotal = Math.max(0, totalPrice + shippingFee - discount);

  const handleCompleteOrder = useCallback(() => {
    setIsSubmitting(false);
    setShowQrModal(false);
    setIsSuccess(true);
    clearCart();
    toast.success('Đơn hàng đã được đặt thành công!');
  }, [clearCart]);

  // Timer for automatic QR confirmation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showQrModal && qrCountdown > 0) {
      timer = setTimeout(() => {
        setQrCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showQrModal && qrCountdown === 0) {
      timer = setTimeout(() => {
        handleCompleteOrder();
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [showQrModal, qrCountdown, handleCompleteOrder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !city) {
      toast.error(LABELS.AUTH.ERROR_FILL_REQUIRED);
      return;
    }

    if (paymentMethod === 'VIETQR') {
      setShowQrModal(true);
      setQrCountdown(5); // start countdown
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        handleCompleteOrder();
      }, 1500);
    }
  };

  // Construct VietQR URL using real template parameters
  const vietQrUrl = `https://img.vietqr.io/image/mbbank-0963288414-compact2.png?amount=${finalTotal}&addInfo=SOC${generatedOrderCode}&accountName=NGUYEN%20TIEN%20DAT`;

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="empty-cart-view">
        <CheckCircle2 size={64} className="empty-cart-icon" style={{ color: 'var(--color-primary)' }} />
        <h2>Giỏ hàng của bạn đang trống</h2>
        <p>Quay lại trang chủ để tìm kiếm và đặt hàng.</p>
        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none', padding: '12px 24px', borderRadius: '12px' }}>
          Quay lại mua sắm
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="checkout-success-view">
        <div className="success-badge">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="cart-header-title" style={{ margin: 0 }}>{LABELS.CHECKOUT.ORDER_SUCCESS_TITLE}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '380px', margin: '0 auto' }}>
          {LABELS.CHECKOUT.ORDER_SUCCESS_DESC}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '360px', margin: '12px 0' }}>
          <div className="summary-row" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <span>{LABELS.CHECKOUT.ORDER_CODE}</span>
            <span className="success-order-code">SOC{generatedOrderCode}</span>
          </div>
          <div className="summary-row">
            <span>Người nhận</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{fullName}</span>
          </div>
          <div className="summary-row">
            <span>Số điện thoại</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{phone}</span>
          </div>
          <div className="summary-row">
            <span>Địa chỉ giao hàng</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right', maxWidth: '200px' }}>{address}, {city}</span>
          </div>
          <div className="summary-row" style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
            <span>Số tiền đã đặt</span>
            <span style={{ fontWeight: 900, color: 'var(--color-danger)' }}>{formatVND(finalTotal)}</span>
          </div>
        </div>

        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none', padding: '12px 24px', borderRadius: '12px', marginTop: '8px' }}>
          {LABELS.CHECKOUT.BACK_TO_HOME}
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      {/* Left: Input Form */}
      <form onSubmit={handleSubmit} className="checkout-form-panel">
        <h2 className="checkout-section-title">{LABELS.CHECKOUT.SHIPPING_SECTION}</h2>
        
        <div className="checkout-grid-form">
          <div className="checkout-field-group">
            <label className="checkout-field-label" htmlFor="fullName">{LABELS.CHECKOUT.FULL_NAME}</label>
            <input 
              id="fullName"
              type="text" 
              className="checkout-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="checkout-field-group">
            <label className="checkout-field-label" htmlFor="phone">{LABELS.CHECKOUT.PHONE_NUMBER}</label>
            <input 
              id="phone"
              type="tel" 
              className="checkout-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="0987654321"
            />
          </div>

          <div className="checkout-field-group">
            <label className="checkout-field-label" htmlFor="address">{LABELS.CHECKOUT.ADDRESS}</label>
            <input 
              id="address"
              type="text" 
              className="checkout-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="123 Đường số 4, Phường 5"
            />
          </div>

          <div className="checkout-field-group">
            <label className="checkout-field-label" htmlFor="city">{LABELS.CHECKOUT.CITY_SELECT}</label>
            <select 
              id="city"
              className="checkout-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">{LABELS.CHECKOUT.CHOOSE_CITY}</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="checkout-section-title" style={{ marginTop: '28px' }}>{LABELS.CHECKOUT.PAYMENT_SECTION}</h2>
        <div className="payment-methods-list">
          
          <div 
            className={`payment-method-option ${paymentMethod === 'COD' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('COD')}
          >
            <input 
              type="radio" 
              className="payment-method-radio"
              checked={paymentMethod === 'COD'}
              onChange={() => setPaymentMethod('COD')}
            />
            <div className="payment-method-info">
              <span className="payment-method-name">
                <Banknote size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> 
                {LABELS.CHECKOUT.PAYMENT_COD}
              </span>
              <span className="payment-method-desc">Thanh toán bằng tiền mặt khi nhận hàng.</span>
            </div>
          </div>

          <div 
            className={`payment-method-option ${paymentMethod === 'VIETQR' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('VIETQR')}
          >
            <input 
              type="radio" 
              className="payment-method-radio"
              checked={paymentMethod === 'VIETQR'}
              onChange={() => setPaymentMethod('VIETQR')}
            />
            <div className="payment-method-info">
              <span className="payment-method-name">
                <QrCode size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> 
                {LABELS.CHECKOUT.PAYMENT_QR}
              </span>
              <span className="payment-method-desc">Quét mã chuyển khoản nhanh MB Bank siêu tiện lợi.</span>
            </div>
          </div>

        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn btn-primary checkout-btn"
          style={{ marginTop: '28px' }}
        >
          {isSubmitting ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Loader2 className="animate-spin" size={16} /> Đang xử lý đặt hàng...
            </span>
          ) : (
            LABELS.CHECKOUT.PLACE_ORDER_BTN
          )}
        </button>

      </form>

      {/* Right: Cart Summary */}
      <div className="checkout-summary-panel">
        <h2 className="checkout-section-title" style={{ borderLeftColor: 'var(--color-warning)' }}>
          {LABELS.CHECKOUT.ORDER_SUMMARY}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
          {items.map((item) => (
            <div key={item.variantId} className="checkout-summary-item">
              <div className="checkout-summary-img-wrapper">
                <SafeImage
                  src={item.imageUrl || ''}
                  alt={item.productName}
                  fill
                  style={{ objectFit: 'contain', padding: '4px' }}
                />
              </div>
              <div className="checkout-summary-details">
                <span className="checkout-summary-name">{item.productName}</span>
                <span className="checkout-summary-meta">Số lượng: {item.quantity} | {item.storage}</span>
              </div>
              <span className="checkout-summary-price">{formatVND(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
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
              <span>{LABELS.CART.DISCOUNT} ({voucherCode})</span>
              <span style={{ fontWeight: 700 }}>-{formatVND(discount)}</span>
            </div>
          )}

          <div className="summary-row total-row">
            <span>{LABELS.CART.FINAL_TOTAL}</span>
            <span className="total-val" style={{ fontSize: '18px' }}>{formatVND(finalTotal)}</span>
          </div>
        </div>
      </div>

      {/* VietQR Dialog Pop-up */}
      {showQrModal && (
        <div className="qr-modal-overlay">
          <div className="qr-modal-container">
            <h2 className="cart-summary-title" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <QrCode size={20} className="text-primary" /> {LABELS.CHECKOUT.QR_MODAL_TITLE}
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
              {LABELS.CHECKOUT.QR_INSTRUCTIONS}
            </p>

            {/* QR Code Image */}
            <div className="qr-code-img-wrapper">
              <img 
                src={vietQrUrl} 
                alt="VietQR Code" 
                style={{ width: '220px', height: '220px', display: 'block', objectFit: 'contain' }}
              />
            </div>

            {/* Bank details grid */}
            <div className="qr-info-grid">
              <div className="qr-info-row">
                <span className="qr-info-label">{LABELS.CHECKOUT.QR_BANK}</span>
                <span className="qr-info-val">MB Bank (Ngân hàng Quân đội)</span>
              </div>
              <div className="qr-info-row">
                <span className="qr-info-label">{LABELS.CHECKOUT.QR_ACC_NO}</span>
                <span className="qr-info-val">0963288414</span>
              </div>
              <div className="qr-info-row">
                <span className="qr-info-label">{LABELS.CHECKOUT.QR_ACC_NAME}</span>
                <span className="qr-info-val">NGUYEN TIEN DAT</span>
              </div>
              <div className="qr-info-row">
                <span className="qr-info-label">{LABELS.CHECKOUT.QR_AMOUNT}</span>
                <span className="qr-info-val amount">{formatVND(finalTotal)}</span>
              </div>
              <div className="qr-info-row">
                <span className="qr-info-label">{LABELS.CHECKOUT.QR_CONTENT}</span>
                <span className="qr-info-val message">SOC{generatedOrderCode}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                type="button" 
                className="btn btn-primary checkout-btn" 
                onClick={handleCompleteOrder}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                {LABELS.CHECKOUT.QR_CONFIRM_BTN}
              </button>

              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowQrModal(false)}
                style={{ border: 'none', background: 'transparent', fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {LABELS.CHECKOUT.QR_CANCEL_BTN}
              </button>
            </div>

            {/* Simulated automatic detect warning */}
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Loader2 className="animate-spin" size={12} />
              <span>Tự động xác nhận sau {qrCountdown} giây...</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      <Header />
      <main style={{ flexGrow: 1, padding: '24px 0' }}>
        <Suspense fallback={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        }>
          <CheckoutForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
