/**
 * Trang Chính sách Bảo hành Sóc Mobile
 * Pattern: Static Informational Page
 */
'use client';

import React from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';

export default function BaoHanhPage() {
  return (
    <InfoPageLayout
      title="Chính Sách Bảo Hành & Hậu Mãi"
      subtitle="An tâm tuyệt đối với chế độ bảo hành vip 1 đổi 1 trong 30 ngày độc quyền tại Sóc Mobile"
      icon="🛡️"
      breadcrumb="Bảo hành"
    >
      <section className="info-section">
        <h2 className="info-section-heading">1. Gói Bảo Hành Tiêu Chuẩn (Miễn Phí Đi Kèm)</h2>
        <div className="info-values-grid">
          {[
            { icon: '🔄', title: '1 Đổi 1 trong 30 ngày', desc: 'Lỗi phần cứng do nhà sản xuất (Màn hình, mainboard, camera...): Đổi máy mới ngay lập tức.' },
            { icon: '📅', title: '12 Tháng Phần Cứng', desc: 'Bảo hành sửa chữa miễn phí 100% linh kiện chính hãng tại trung tâm ủy quyền.' },
            { icon: '💻', title: 'Bảo hành phần mềm trọn đời', desc: 'Miễn phí nâng cấp iOS/Android, chạy lại phần mềm, sao lưu dữ liệu trọn đời máy.' },
            { icon: '🔋', title: 'Thay Pin Miễn Phí 1 Năm', desc: 'Thay pin chính hãng hoàn toàn miễn phí nếu dung lượng chai dưới 80% trong năm đầu.' },
          ].map((v) => (
            <div key={v.title} className="info-value-card">
              <span className="info-value-icon">{v.icon}</span>
              <h3 className="info-value-title">{v.title}</h3>
              <p className="info-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section" style={{ marginTop: '24px' }}>
        <h2 className="info-section-heading">2. Quy Trình Tiếp Nhận Bảo Hành</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { step: 'Bước 1', title: 'Tiếp nhận máy', desc: 'Khách hàng mang máy tới chi nhánh Sóc Mobile gần nhất hoặc gửi qua bưu điện.' },
            { step: 'Bước 2', title: 'Kiểm tra kỹ thuật', desc: 'Kỹ thuật viên kiểm tra lỗi trong 15-30 phút trước mặt khách hàng.' },
            { step: 'Bước 3', title: 'Xử lý bảo hành', desc: 'Tiến hành đổi mới (lỗi trong 30 ngày) hoặc thay thế linh kiện chính hãng.' },
            { step: 'Bước 4', title: 'Bàn giao & Test', desc: 'Khách hàng kiểm tra máy hoàn chỉnh và nhận phiếu bảo hành gia hạn.' },
          ].map((item) => (
            <div key={item.step} style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>{item.step}</span>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '6px 0', color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section" style={{ marginTop: '24px' }}>
        <h2 className="info-section-heading">3. Điều Kiện Từ Chối Bảo Hành</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: 1.8, fontSize: '13.5px', color: 'var(--text-primary)' }}>
          <li>Sản phẩm bị rơi vỡ, cấn móp, biến dạng khung vỏ do tác động ngoại lực.</li>
          <li>Sản phẩm bị ngấm nước, ẩm mốc, hóa chất vào bên trong (dù có tiêu chuẩn kháng nước).</li>
          <li>Sản phẩm đã bị can thiệp phần cứng, sửa chữa tại các cơ sở không thuộc hệ thống Sóc Mobile.</li>
          <li>Máy bị dính tài khoản iCloud / Google Account mà khách hàng không thể cung cấp mật khẩu khôi phục.</li>
        </ul>
      </section>
    </InfoPageLayout>
  );
}
