/**
 * Trang Hợp tác kinh doanh Sóc Mobile
 * Pattern: Static Informational Page
 */
'use client';

import React from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';

export default function HopTacPage() {
  return (
    <InfoPageLayout
      title="Hợp Tác Kinh Doanh & Bán Hàng"
      subtitle="Đồng hành cùng Sóc Mobile phát triển hệ sinh thái bán lẻ công nghệ hàng đầu"
      icon="🤝"
      breadcrumb="Hợp tác"
    >
      <section className="info-section">
        <h2 className="info-section-heading">Các Hình Thức Hợp Tác</h2>
        <div className="info-values-grid">
          {[
            { icon: '🏭', title: 'Nhà Cung Cấp / Hãng', desc: 'Trở thành nhà phân phối smartphone, máy tính bảng, phụ kiện chính hãng tại chuỗi cửa hàng Sóc Mobile.' },
            { icon: '🏬', title: 'Cho Thuê Mặt Bằng', desc: 'Chúng tôi liên tục tìm kiếm mặt bằng tại các vị trí đắc địa, trung tâm các tỉnh thành trên toàn quốc.' },
            { icon: '💼', title: 'Bán Hàng Doanh Nghiệp (B2B)', desc: 'Cung cấp giải pháp thiết bị công nghệ số lượng lớn cho doanh nghiệp với chiết khấu tốt nhất.' },
            { icon: '📣', title: 'Affiliate / KOC / KOL', desc: 'Hợp tác truyền thông, tiếp thị liên kết dành cho các sáng tạo nội dung trong lĩnh vực công nghệ.' },
          ].map((v) => (
            <div key={v.title} className="info-value-card">
              <span className="info-value-icon">{v.icon}</span>
              <h3 className="info-value-title">{v.title}</h3>
              <p className="info-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section" style={{ marginTop: '32px', background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <h2 className="info-section-heading">Thông Tin Liên Hệ Hợp Tác</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
          📧 Email bộ phận Hợp tác: <strong>hoptac@socmobile.vn</strong><br />
          📞 Hotline B2B & Phát triển mặt bằng: <strong>0988.xxx.xxx</strong> (Mr. Hoàng - Giám đốc Phát triển)<br />
          🏢 Văn phòng chính: 123 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh.
        </p>
      </section>
    </InfoPageLayout>
  );
}
