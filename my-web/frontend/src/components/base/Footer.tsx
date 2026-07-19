/**
 * Footer Component
 * Enhanced professional footer with company details, quick policy links, payment partners, and copyright.
 *
 * Related: src/app/layout.tsx, src/app/globals.css
 */

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main-content">
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '24px' }}>🐿️</span>
            <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)' }}>Sóc Mobile</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Hệ thống bán lẻ điện thoại chính hãng, laptop, máy tính bảng và phụ kiện công nghệ hàng đầu Việt Nam.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
            📍 Trụ sở chính: 123 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM<br />
            📞 Hotline: 1800 2097 (8:00 - 22:00)<br />
            📧 Email: cskh@socmobile.vn
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Thông Tin Hỗ Trợ</h4>
          <ul className="footer-col-links">
            <li><Link href="/tra-gop">Chính sách trả góp 0%</Link></li>
            <li><Link href="/bao-hanh">Chính sách bảo hành</Link></li>
            <li><Link href="/doi-tra">Chính sách đổi trả & hoàn tiền</Link></li>
            <li><Link href="/orders/track">Tra cứu đơn hàng</Link></li>
            <li><Link href="/compare">Trợ lý so sánh AI</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Về Sóc Mobile</h4>
          <ul className="footer-col-links">
            <li><Link href="/gioi-thieu">Giới thiệu công ty</Link></li>
            <li><Link href="/dia-chi">Hệ thống 50+ cửa hàng</Link></li>
            <li><Link href="/lien-he">Liên hệ & Góp ý</Link></li>
            <li><Link href="/hop-tac">Hợp tác kinh doanh</Link></li>
            <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
            <li><Link href="/dieu-khoan-su-dung">Điều khoản sử dụng</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Thanh Toán & Chấp Nhận</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {['VietQR', 'Visa/Master', 'Momo', 'ZaloPay', 'Home Credit', 'FE Credit'].map((pay) => (
              <span
                key={pay}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-secondary)'
                }}
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} Sóc Mobile. Tất cả quyền được bảo lưu.</span>
      </div>
    </footer>
  );
}
