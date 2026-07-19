/**
 * Trang Chính sách Bảo mật Sóc Mobile
 * Pattern: Static Informational Page
 */
'use client';

import React from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';

export default function BaoMatPage() {
  return (
    <InfoPageLayout
      title="Chính Sách Bảo Mật Thông Tin"
      subtitle="Sóc Mobile cam kết bảo vệ tuyệt đối thông tin cá nhân và quyền riêng tư của khách hàng"
      icon="🔒"
      breadcrumb="Chính sách bảo mật"
    >
      <section className="info-section">
        <h2 className="info-section-heading">1. Mục Đích Thu Thập Thông Tin</h2>
        <p className="info-section-text">
          Chúng tôi thu thập thông tin của quý khách (Họ tên, SĐT, Email, Địa chỉ giao hàng) nhằm mục đích:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: 1.8, fontSize: '13.5px', color: 'var(--text-primary)' }}>
          <li>Xử lý và giao đơn hàng mua sắm điện thoại / phụ kiện.</li>
          <li>Gửi thông báo về trạng thái đơn hàng và hỗ trợ bảo hành.</li>
          <li>Gửi các chương trình ưu đãi, mã giảm giá đặc quyền (nếu quý khách đăng ký nhận tin).</li>
        </ul>

        <h2 className="info-section-heading" style={{ marginTop: '24px' }}>2. Cam Kết Bảo Mật</h2>
        <p className="info-section-text">
          - Thông tin cá nhân của quý khách được mã hóa SSL 256-bit an toàn tuyệt đối trên hệ thống máy chủ.<br />
          - <strong>Tuyết đối không chia sẻ, bán hoặc cho thuê</strong> thông tin khách hàng cho bất kỳ bên thứ ba nào ngoại trừ các đơn vị vận chuyển đối tác để phục vụ việc giao hàng.
        </p>
      </section>
    </InfoPageLayout>
  );
}
