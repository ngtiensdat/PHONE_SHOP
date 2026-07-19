/**
 * Trang Chính sách Đổi trả Sóc Mobile
 * Pattern: Static Informational Page
 */
'use client';

import React from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';

export default function DoiTraPage() {
  return (
    <InfoPageLayout
      title="Chính Sách Đổi Trả & Hoàn Tiền"
      subtitle="Quy định đổi trả minh bạch, đảm bảo quyền lợi tối đa cho khách hàng mua sắm tại Sóc Mobile"
      icon="🔄"
      breadcrumb="Đổi trả"
    >
      <section className="info-section">
        <h2 className="info-section-heading">Bảng Quy Định Đổi Trả Sản Phẩm</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-primary)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>Thời gian</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>Sản phẩm lỗi do Nhà Sản Xuất</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>Sản phẩm KHÔNG lỗi (Đổi theo nhu cầu)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '13px' }}>1 - 30 Ngày đầu</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--color-success)', fontWeight: 700 }}>Đổi MỚI 100% miễn phí hoặc Hoàn tiền 100%</td>
                <td style={{ padding: '12px 16px', fontSize: '13px' }}>Thu lại trừ 10% giá trị trên hóa đơn</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '13px' }}>Tháng thứ 2 - 12</td>
                <td style={{ padding: '12px 16px', fontSize: '13px' }}>Gửi bảo hành miễn phí theo tiêu chuẩn hãng</td>
                <td style={{ padding: '12px 16px', fontSize: '13px' }}>Thu lại theo giá thị trường thời điểm hiện tại</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section" style={{ marginTop: '24px' }}>
        <h2 className="info-section-heading">Yêu Cầu Về Sản Phẩm Khi Đổi Trả</h2>
        <div className="info-values-grid">
          {[
            { icon: '📦', title: 'Hộp & Phụ kiện đầy đủ', desc: 'Sản phẩm còn nguyên vẹn vỏ hộp, phụ kiện đi kèm (sạc, cáp, tai nghe...) không trầy xước.' },
            { icon: '🧾', title: 'Hóa đơn mua hàng', desc: 'Có hóa đơn VAT hoặc số điện thoại mua hàng đăng ký trên hệ thống Sóc Mobile.' },
            { icon: '🔓', title: 'Đã thoát tài khoản', desc: 'Vui lòng thoát toàn bộ tài khoản bảo mật (iCloud, Google Account, Samsung Account) và mật khẩu khóa máy.' },
          ].map((v) => (
            <div key={v.title} className="info-value-card">
              <span className="info-value-icon">{v.icon}</span>
              <h3 className="info-value-title">{v.title}</h3>
              <p className="info-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </InfoPageLayout>
  );
}
