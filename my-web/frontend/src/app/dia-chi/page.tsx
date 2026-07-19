/**
 * Trang Địa chỉ hệ thống cửa hàng Sóc Mobile
 * Pattern: Static Informational Page
 */
'use client';

import React from 'react';
import InfoPageLayout from '@/components/base/InfoPageLayout';

const STORES = [
  { region: 'TP. Hồ Chí Minh (18 Cửa hàng)', list: ['123 Nguyễn Trãi, Q.1', '456 Lê Văn Sỹ, Q.3', '789 Quang Trung, Q.Gò Vấp', '101 Võ Văn Ngân, TP.Thủ Đức', '202 Nguyễn Thị Thập, Q.7'] },
  { region: 'Hà Nội (12 Cửa hàng)', list: ['456 Cầu Giấy, Q.Cầu Giấy', '12 Thái Hà, Q.Đống Đa', '88 Xã Đàn, Q.Đống Đa', '303 Phố Huế, Q.Hai Bà Trưng'] },
  { region: 'Đà Nẵng & Miền Trung (8 Cửa hàng)', list: ['789 Lê Duẩn, Q.Hải Châu, Đà Nẵng', '45 Nguyễn Văn Linh, Đà Nẵng', '120 Hùng Vương, TP.Huế'] },
  { region: 'Miền Tây & Đông Nam Bộ (12 Cửa hàng)', list: ['321 Trần Hưng Đạo, Cần Thơ', '99 Đường 30/4, Tây Ninh', '150 Ba Tháng Hai, Vũng Tàu'] },
];

export default function DiaChiPage() {
  return (
    <InfoPageLayout
      title="Hệ Thống 50+ Cửa Hàng Sóc Mobile"
      subtitle="Tìm kiếm showroom trải nghiệm sản phẩm gần bạn nhất"
      icon="📍"
      breadcrumb="Cửa hàng"
    >
      <div className="info-values-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {STORES.map((s) => (
          <div key={s.region} className="info-value-card" style={{ textAlign: 'left' }}>
            <h3 className="info-value-title" style={{ color: 'var(--color-primary)', fontSize: '15px' }}>📍 {s.region}</h3>
            <ul style={{ paddingLeft: '18px', margin: '8px 0 0 0', fontSize: '13px', lineHeight: 1.8, color: 'var(--text-primary)' }}>
              {s.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
}
