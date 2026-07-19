/**
 * Trang Chính sách Trả góp tại Sóc Mobile
 * Pattern: Static Informational Page with Calculator / Plan tables
 */
'use client';

import React, { useState } from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';
import { formatVND } from '@/utils/format';

const INSTALLMENT_PACKAGES = [
  { company: 'Home Credit', rate: '0%', prepay: '0% - 30%', period: '6 - 12 tháng', approval: '10-15 phút (Căn cước công dân gắn chip)' },
  { company: 'FE Credit', rate: '0%', prepay: '10% - 50%', period: '6 - 12 tháng', approval: '15 phút (CCCD/Bằng lái xe)' },
  { company: 'HD SAISON', rate: '0.99%', prepay: '0%', period: '6 - 24 tháng', approval: 'Duyệt nhanh online' },
  { company: 'Thẻ tín dụng (25+ Ngân hàng)', rate: '0%', prepay: '0đ', period: '3 - 12 tháng', approval: 'Duyệt tức thì (Chỉ cần cà thẻ/Online)' },
];

export default function TraGopPage() {
  const [productPrice, setProductPrice] = useState<number>(20000000);
  const [prepayPercent, setPrepayPercent] = useState<number>(30);
  const [months, setMonths] = useState<number>(6);

  const prepayAmount = (productPrice * prepayPercent) / 100;
  const loanAmount = productPrice - prepayAmount;
  const monthlyAmount = Math.round(loanAmount / months);

  return (
    <InfoPageLayout
      title="Chính Sách Trả Góp 0% Lãi Suất"
      subtitle="Sở hữu siêu phẩm điện thoại mơ ước dễ dàng chỉ từ 0 đồng trả trước"
      icon="💳"
      breadcrumb="Trả góp"
    >
      {/* Intro section */}
      <section className="info-section">
        <h2 className="info-section-heading">Tại sao nên mua trả góp tại Sóc Mobile?</h2>
        <div className="info-values-grid">
          {[
            { icon: '⚡', title: 'Duyệt hồ sơ nhanh 15 phút', desc: 'Chỉ cần CCCD gắn chip, không cần chứng minh thu nhập hay thẩm định người thân.' },
            { icon: '💰', title: 'Lãi suất 0%', desc: 'Áp dụng cho hầu hết các dòng smartphone hot nhất (iPhone, Samsung Galaxy, Xiaomi...)' },
            { icon: '🏦', title: 'Liên kết 25+ Ngân hàng', desc: 'Trả góp qua thẻ tín dụng Visa/Mastercard duyệt ngay 100% không mất phí hồ sơ.' },
            { icon: '🏠', title: 'Làm hồ sơ Online 100%', desc: 'Đăng ký xét duyệt tận nhà, nhận máy tại cửa hàng hoặc giao hỏa tốc 2 giờ.' },
          ].map((v) => (
            <div key={v.title} className="info-value-card">
              <span className="info-value-icon">{v.icon}</span>
              <h3 className="info-value-title">{v.title}</h3>
              <p className="info-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="info-section" style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <h2 className="info-section-heading" style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🧮 Công Cụ Tính Dòng Trả Góp Dự Kiến
        </h2>
        <div className="info-section-grid-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                Giá trị sản phẩm (VNĐ):
              </label>
              <input
                type="number"
                step={1000000}
                className="checkout-input"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value) || 0)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                Trả trước: {prepayPercent}% ({formatVND(prepayAmount)})
              </label>
              <input
                type="range"
                min={0}
                max={70}
                step={10}
                value={prepayPercent}
                onChange={(e) => setPrepayPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                Kỳ hạn vay:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[3, 6, 9, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`btn ${months === m ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, padding: '8px 0', fontSize: '13px', borderRadius: '8px' }}
                    onClick={() => setMonths(m)}
                  >
                    {m} Tháng
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Số tiền cần vay:</span>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{formatVND(loanAmount)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Số tiền trả trước:</span>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{formatVND(prepayAmount)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Góp mỗi tháng khoảng:</span>
              <strong style={{ fontSize: '20px', fontWeight: 900, color: 'var(--color-danger)' }}>{formatVND(monthlyAmount)}/tháng</strong>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>
              * Con số trên mang tính chất tham khảo, phí thu hộ và bảo hiểm khoản vay có thể phát sinh tùy công ty tài chính.
            </p>
          </div>
        </div>
      </section>

      {/* Financial Partners table */}
      <section className="info-section" style={{ marginTop: '32px' }}>
        <h2 className="info-section-heading">Các Đối Tác Tài Chính Liên Kết</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-primary)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>Đơn vị hỗ trợ</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px' }}>Lãi suất</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px' }}>Trả trước tối thiểu</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px' }}>Kỳ hạn</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>Giấy tờ yêu cầu</th>
              </tr>
            </thead>
            <tbody>
              {INSTALLMENT_PACKAGES.map((pkg, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '13px' }}>{pkg.company}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--color-danger)', fontWeight: 800, fontSize: '13px' }}>{pkg.rate}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px' }}>{pkg.prepay}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px' }}>{pkg.period}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{pkg.approval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </InfoPageLayout>
  );
}
