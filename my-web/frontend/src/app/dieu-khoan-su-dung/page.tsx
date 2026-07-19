/**
 * Trang Điều khoản sử dụng Sóc Mobile
 * Pattern: Static Informational Page
 */
'use client';

import React from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';

export default function DieuKhoanPage() {
  return (
    <InfoPageLayout
      title="Điều Khoản Sử Dụng"
      subtitle="Các quy định và thỏa thuận người dùng khi sử dụng dịch vụ tại Sóc Mobile"
      icon="📜"
      breadcrumb="Điều khoản sử dụng"
    >
      <section className="info-section">
        <h2 className="info-section-heading">1. Chấp Thuận Điều Khoản</h2>
        <p className="info-section-text">
          Khi truy cập và mua sắm tại trang web Sóc Mobile (socmobile.vn), quý khách đồng ý tuân thủ và chịu sự ràng buộc bởi các điều khoản sử dụng này. Nếu quý khách không đồng ý với bất kỳ phần nào, vui lòng ngưng sử dụng trang web.
        </p>

        <h2 className="info-section-heading" style={{ marginTop: '24px' }}>2. Tài Khoản & Giá Cả</h2>
        <p className="info-section-text">
          - Giá sản phẩm niêm yết trên website đã bao gồm thuế VAT.<br />
          - Sóc Mobile có quyền điều chỉnh giá sản phẩm và chính sách khuyến mãi mà không cần báo trước.<br />
          - Quý khách có trách nhiệm bảo mật thông tin tài khoản và mật khẩu đăng nhập của mình.
        </p>

        <h2 className="info-section-heading" style={{ marginTop: '24px' }}>3. Quyền Sở Hữu Trí Tuệ</h2>
        <p className="info-section-text">
          Toàn bộ hình ảnh, nội dung, logo, nhãn hiệu và giao diện trên website thuộc sở hữu bản quyền của Sóc Mobile. Mọi hành vi sao chép, thương mại hóa mà không được sự đồng ý bằng văn bản là vi phạm pháp luật.
        </p>
      </section>
    </InfoPageLayout>
  );
}
