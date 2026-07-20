/**
 * Trang Liên hệ Sóc Mobile
 * Pattern: Static Informational Page with Contact Form
 */
'use client';
import React, { useState } from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';

const BRANCHES = [
  { city: 'TP. Hồ Chí Minh', address: '123 Nguyễn Trãi, Phường Bến Thành, Quận 1', phone: '028 3823 xxxx', hours: '8:00 – 21:30' },
  { city: 'Hà Nội', address: '456 Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy', phone: '024 3795 xxxx', hours: '8:00 – 21:30' },
  { city: 'Đà Nẵng', address: '789 Lê Duẩn, Phường Hải Châu 1, Quận Hải Châu', phone: '0236 352 xxxx', hours: '8:00 – 21:00' },
  { city: 'Cần Thơ', address: '321 Trần Hưng Đạo, Phường An Nghiệp, Quận Ninh Kiều', phone: '0292 381 xxxx', hours: '8:00 – 21:00' },
];

export default function LienHePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <InfoPageLayout title="Liên hệ với chúng tôi" subtitle="Luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7" icon="📞" breadcrumb="Liên hệ">

      {/* Contact Info Cards */}
      <section className="info-section">
        <div className="info-contact-cards">
          {[
            { icon: '📞', title: 'Hotline mua hàng', value: '1800 2097', sub: 'Miễn phí · 8:00 – 22:00 hàng ngày', href: 'tel:18002097' },
            { icon: '📧', title: 'Email hỗ trợ', value: 'cskh@socmobile.vn', sub: 'Phản hồi trong vòng 2 giờ làm việc', href: 'mailto:cskh@socmobile.vn' },
            { icon: '💬', title: 'Chat trực tiếp', value: 'Sóc AI Assistant', sub: 'Nhấn icon 🐿️ góc phải màn hình', href: '#' },
            { icon: '📘', title: 'Facebook Fanpage', value: 'fb.com/SocMobileVN', sub: 'Phản hồi nhanh trong 30 phút', href: 'https://facebook.com' },
          ].map((c) => (
            <a key={c.title} href={c.href} className="info-contact-card">
              <span className="info-contact-icon">{c.icon}</span>
              <div>
                <div className="info-contact-title">{c.title}</div>
                <div className="info-contact-value">{c.value}</div>
                <div className="info-contact-sub">{c.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Map grid */}
      <section className="info-section">
        <div className="info-section-grid-2">
          {/* Contact Form */}
          <div>
            <h2 className="info-section-heading">Gửi yêu cầu hỗ trợ</h2>
            {sent ? (
              <div className="info-success-box">
                <span style={{ fontSize: '48px' }}>✅</span>
                <h3>Đã nhận yêu cầu của bạn!</h3>
                <p>Chúng tôi sẽ liên hệ lại trong vòng <strong>30 phút</strong> trong giờ làm việc. Cảm ơn bạn đã tin tưởng Sóc Mobile!</p>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSent(false)}>Gửi yêu cầu khác</button>
              </div>
            ) : (
              <form className="info-contact-form" onSubmit={handleSubmit}>
                <div className="info-form-row">
                  <div className="info-form-group">
                    <label>Họ và tên *</label>
                    <input required type="text" className="checkout-input" placeholder="Nguyễn Văn A" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="info-form-group">
                    <label>Số điện thoại *</label>
                    <input required type="tel" className="checkout-input" placeholder="0909 xxx xxx" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="info-form-group">
                  <label>Địa chỉ email</label>
                  <input type="email" className="checkout-input" placeholder="email@gmail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="info-form-group">
                  <label>Chủ đề *</label>
                  <select required className="checkout-select" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option value="">-- Chọn chủ đề --</option>
                    <option>Tư vấn mua hàng</option>
                    <option>Khiếu nại sản phẩm / dịch vụ</option>
                    <option>Hỏi về bảo hành</option>
                    <option>Đổi trả hàng</option>
                    <option>Hợp tác kinh doanh</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div className="info-form-group">
                  <label>Nội dung *</label>
                  <textarea required className="checkout-input" rows={5} placeholder="Mô tả chi tiết vấn đề bạn cần hỗ trợ..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 700 }}>
                  📨 Gửi yêu cầu hỗ trợ
                </button>
              </form>
            )}
          </div>

          {/* Branch List */}
          <div>
            <h2 className="info-section-heading">Hệ thống cửa hàng</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {BRANCHES.map((b) => (
                <div key={b.city} className="info-branch-card">
                  <div className="info-branch-city">📍 {b.city}</div>
                  <div className="info-branch-address">{b.address}</div>
                  <div className="info-branch-meta">
                    <span>📞 {b.phone}</span>
                    <span>🕗 {b.hours}</span>
                  </div>
                </div>
              ))}
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Và <strong>46+ chi nhánh</strong> khác trên toàn quốc. Xem toàn bộ tại trang <a href="/dia-chi" style={{ color: 'var(--color-primary)' }}>Địa chỉ cửa hàng</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

    </InfoPageLayout>
  );
}
