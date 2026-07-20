/**
 * VietQrModal Component
 * Renders the bank QR transfer modal window for 100% payments or 5% deposit reservations.
 * Displays bank details, dynamic QR image, transfer content, and countdown timer.
 *
 * Related: src/app/checkout/page.tsx, src/constants/config.ts, src/constants/labels.ts
 * Pattern: Presentation Modal Component
 */

import React from 'react';
import { QrCode, Loader2 } from 'lucide-react';
import { LABELS } from '@/constants/labels';
import { APP_CONFIG } from '@/constants/config';
import { formatVND } from '@/utils/format';

interface VietQrModalProps {
  isDepositMode: boolean;
  depositAmount: number;
  remainingAmount: number;
  finalTotal: number;
  qrTransferAmount: number;
  generatedOrderCode: string;
  vietQrUrl: string;
  qrCountdown: number;
  onConfirm: () => void;
  onClose: () => void;
}

export default function VietQrModal({
  isDepositMode,
  depositAmount,
  remainingAmount,
  finalTotal,
  qrTransferAmount,
  generatedOrderCode,
  vietQrUrl,
  qrCountdown,
  onConfirm,
  onClose,
}: VietQrModalProps) {
  return (
    <div className="qr-modal-overlay">
      <div className="qr-modal-container">
        <h2 className="cart-summary-title" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <QrCode size={20} className="text-primary" /> 
          {isDepositMode ? 'Quét mã Đặt cọc 5% Giữ máy' : LABELS.CHECKOUT.QR_MODAL_TITLE}
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0, textAlign: 'center' }}>
          {isDepositMode 
            ? `Vui lòng quét mã bên dưới để cọc 5% (${formatVND(depositAmount)}). Số tiền còn lại (${formatVND(remainingAmount)}) thanh toán tại Showroom.`
            : LABELS.CHECKOUT.QR_INSTRUCTIONS}
        </p>

        {/* QR Code Image */}
        <div className="qr-code-img-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <span className="qr-info-val">{APP_CONFIG.BANK.BANK_NAME}</span>
          </div>
          <div className="qr-info-row">
            <span className="qr-info-label">{LABELS.CHECKOUT.QR_ACC_NO}</span>
            <span className="qr-info-val">{APP_CONFIG.BANK.ACCOUNT_NO}</span>
          </div>
          <div className="qr-info-row">
            <span className="qr-info-label">{LABELS.CHECKOUT.QR_ACC_NAME}</span>
            <span className="qr-info-val">{APP_CONFIG.BANK.ACCOUNT_NAME}</span>
          </div>
          <div className="qr-info-row">
            <span className="qr-info-label">{isDepositMode ? 'Số tiền Cọc 5%' : LABELS.CHECKOUT.QR_AMOUNT}</span>
            <span className="qr-info-val amount" style={{ color: '#6d28d9', fontSize: '16px' }}>{formatVND(qrTransferAmount)}</span>
          </div>
          <div className="qr-info-row">
            <span className="qr-info-label">{LABELS.CHECKOUT.QR_CONTENT}</span>
            <span className="qr-info-val message">{isDepositMode ? 'COC5' : 'SOC'}{generatedOrderCode}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            type="button" 
            className="btn btn-primary checkout-btn" 
            onClick={onConfirm}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            {isDepositMode ? 'Đã chuyển khoản Cọc 5%' : LABELS.CHECKOUT.QR_CONFIRM_BTN}
          </button>

          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
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
  );
}
