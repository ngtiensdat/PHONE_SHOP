/**
 * Trang Giới thiệu Sóc Mobile
 * Pattern: Static Informational Page
 */
'use client';
import React from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';
import Link from 'next/link';

const MILESTONES = [
  { year: '2018', label: 'Thành lập', desc: 'Sóc Mobile ra đời tại TP.HCM với 1 cửa hàng đầu tiên' },
  { year: '2020', label: 'Mở rộng', desc: 'Phát triển lên 15 chi nhánh toàn quốc, vượt mốc 100.000 khách hàng' },
  { year: '2022', label: 'Số hóa', desc: 'Ra mắt nền tảng thương mại điện tử, hơn 500.000 đơn hàng online' },
  { year: '2024', label: 'AI Integration', desc: 'Tích hợp trợ lý AI tư vấn sản phẩm, cá nhân hóa trải nghiệm' },
  { year: '2025', label: 'Dẫn đầu', desc: 'Top 3 hệ thống bán lẻ điện thoại uy tín nhất Việt Nam' },
];

const CORE_VALUES = [
  { icon: '🤝', title: 'Chính hãng 100%', desc: 'Cam kết toàn bộ sản phẩm đều có nguồn gốc từ nhà sản xuất chính thức. Đền bù gấp 10 lần nếu phát hiện hàng giả.' },
  { icon: '⚡', title: 'Dịch vụ siêu tốc', desc: 'Giao hàng trong 2 giờ tại nội thành. Đổi máy trong ngày nếu lỗi kỹ thuật được xác nhận.' },
  { icon: '💎', title: 'Giá tốt nhất thị trường', desc: 'Cam kết giá thấp hơn hoặc bằng bất kỳ đối thủ nào. Hoàn tiền 100% chênh lệch nếu bạn tìm được giá rẻ hơn.' },
  { icon: '🧠', title: 'Tư vấn thông minh', desc: 'Đội ngũ chuyên gia công nghệ được đào tạo bài bản, hỗ trợ tư vấn chọn máy phù hợp nhất với nhu cầu của bạn.' },
];

export default function GioiThieuPage() {
  return (
    <InfoPageLayout title="Giới thiệu Sóc Mobile" subtitle="Hệ thống bán lẻ điện thoại chính hãng hàng đầu Việt Nam" icon="🐿️" breadcrumb="Giới thiệu">
      
      {/* Story Section */}
      <section className="info-section">
        <div className="info-section-grid-2">
          <div>
            <h2 className="info-section-heading">Câu chuyện của chúng tôi</h2>
            <p className="info-section-text">
              <strong>Sóc Mobile</strong> được thành lập năm 2018 bởi một nhóm kỹ sư công nghệ và những người đam mê smartphone với một tầm nhìn đơn giản: <em>Mang đến trải nghiệm mua sắm điện thoại tốt nhất Việt Nam.</em>
            </p>
            <p className="info-section-text">
              Khởi đầu từ một cửa hàng nhỏ tại quận 1, TP.HCM, chúng tôi đã không ngừng phát triển nhờ vào sự tin tưởng của hàng triệu khách hàng và cam kết không thay đổi: <strong>chính hãng, giá tốt, dịch vụ tận tâm</strong>.
            </p>
            <p className="info-section-text">
              Ngày nay, Sóc Mobile tự hào là hệ thống với <strong>hơn 50 chi nhánh</strong> khắp cả nước, đội ngũ hơn <strong>1.200 nhân viên</strong> chuyên nghiệp và nền tảng thương mại điện tử phục vụ hơn <strong>2 triệu khách hàng</strong> mỗi năm.
            </p>
            <Link href="/lien-he" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', textDecoration: 'none', borderRadius: '12px', padding: '12px 24px' }}>
              📞 Liên hệ với chúng tôi
            </Link>
          </div>
          <div className="info-stats-grid">
            {[
              { num: '50+', label: 'Chi nhánh toàn quốc' },
              { num: '2M+', label: 'Khách hàng tin dùng' },
              { num: '1.200+', label: 'Nhân viên chuyên nghiệp' },
              { num: '7 năm', label: 'Kinh nghiệm hoạt động' },
            ].map((stat) => (
              <div key={stat.num} className="info-stat-card">
                <span className="info-stat-num">{stat.num}</span>
                <span className="info-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="info-section">
        <h2 className="info-section-heading" style={{ textAlign: 'center' }}>Hành trình phát triển</h2>
        <div className="info-timeline">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className={`info-timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="info-timeline-dot">{m.year}</div>
              <div className="info-timeline-content">
                <h3>{m.label}</h3>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="info-section">
        <h2 className="info-section-heading" style={{ textAlign: 'center' }}>Giá trị cốt lõi</h2>
        <div className="info-values-grid">
          {CORE_VALUES.map((v) => (
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
