/**
 * IMEI & Serial Number Warranty Lookup Page (/bao-hanh)
 * Allows customers to input 15-digit IMEI or Serial Number to check warranty status,
 * coverage period, 1-to-1 replacement policy, and repair history.
 *
 * Related: src/constants/config.ts, src/constants/labels.ts
 * Pattern: Clean Modular Search & Display Card Architecture
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  MessageCircle, 
  PhoneCall, 
  AlertCircle,
  FileCheck,
  Calendar
} from 'lucide-react';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import { APP_CONFIG } from '@/constants/config';
import { toast } from '@/store/useToastStore';

interface WarrantyRecord {
  imei: string;
  productName: string;
  variant: string;
  purchaseDate: string;
  warrantyExpireDate: string;
  packageType: string;
  status: 'ACTIVE' | 'EXPIRED';
  repairs: {
    date: string;
    description: string;
    technician: string;
    cost: number;
  }[];
}

const SAMPLE_WARRANTY_DATA: WarrantyRecord[] = [
  {
    imei: '358921048291048',
    productName: 'iPhone 16 Pro Max 256GB Titan Tự Nhiên',
    variant: '256GB - VN/A chính hãng',
    purchaseDate: '2026-01-15',
    warrantyExpireDate: '2027-01-15',
    packageType: 'Sóc Care 1 Đổi 1 Kim Cương (12 Tháng)',
    status: 'ACTIVE',
    repairs: [
      {
        date: '2026-03-20',
        description: 'Vệ sinh loa thoại và kiểm tra độ chai pin định kỳ',
        technician: 'KTV. Nguyễn Thành Nam',
        cost: 0
      }
    ]
  },
  {
    imei: '354109284019284',
    productName: 'Samsung Galaxy S24 Ultra 12GB/256GB',
    variant: '256GB - Đen Xám',
    purchaseDate: '2025-06-10',
    warrantyExpireDate: '2026-06-10',
    packageType: 'Bảo hành Tiêu chuẩn Samsung Việt Nam',
    status: 'EXPIRED',
    repairs: []
  }
];

export default function WarrantyPage() {
  const [imeiQuery, setImeiQuery] = useState('');
  const [result, setResult] = useState<WarrantyRecord | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = imeiQuery.trim();
    if (!q) {
      toast.warning('Vui lòng nhập 15 số IMEI hoặc Mã Serial.');
      return;
    }

    setSearched(true);
    const matched = SAMPLE_WARRANTY_DATA.find(w => w.imei === q);
    if (matched) {
      setResult(matched);
      toast.success('Tra cứu bảo hành thành công!');
    } else {
      setResult(null);
      toast.error('Không tìm thấy thông tin bảo hành cho IMEI này.');
    }
  };

  const calculateDaysLeft = (expireDateStr: string) => {
    const expire = new Date(expireDateStr).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((expire - now) / (1000 * 3600 * 24));
    return Math.max(0, diff);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      <Header />

      <main style={{ flexGrow: 1, padding: '24px 0 64px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Breadcrumb */}
          <nav style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', gap: '6px' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Trang chủ</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Tra cứu bảo hành IMEI</span>
          </nav>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={32} style={{ color: '#10b981' }} /> Tra Cứu Bảo Hành Điện Tử Sóc Care
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Kiểm tra hạn bảo hành chính hãng, gói VIP 1 đổi 1 và lịch sử bảo dưỡng theo số IMEI / Serial
            </p>
          </div>

          {/* Search Box Card */}
          <div style={{ background: 'var(--bg-primary)', padding: '28px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
            
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flexGrow: 1, minWidth: '260px' }}>
                <input
                  type="text"
                  value={imeiQuery}
                  onChange={(e) => setImeiQuery(e.target.value)}
                  placeholder="Nhập 15 số IMEI (Ví dụ: 358921048291048)"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
                <Search size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '14px 28px', borderRadius: '14px', fontWeight: 800, fontSize: '14px' }}
              >
                Kiểm tra bảo hành
              </button>
            </form>

            {/* Quick Demo Chips */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Mẫu IMEI thử nghiệm:</span>
              {SAMPLE_WARRANTY_DATA.map(s => (
                <button
                  key={s.imei}
                  type="button"
                  onClick={() => {
                    setImeiQuery(s.imei);
                    setResult(s);
                    setSearched(true);
                  }}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#6d28d9',
                    cursor: 'pointer'
                  }}
                >
                  {s.imei} ({s.status === 'ACTIVE' ? 'Còn hạn' : 'Hết hạn'})
                </button>
              ))}
            </div>

          </div>

          {/* Warranty Result Electronic Card */}
          {result ? (
            <div style={{ background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              
              {/* Header Badge */}
              <div 
                style={{ 
                  padding: '24px 28px', 
                  background: result.status === 'ACTIVE' ? 'linear-gradient(135deg, #065f46 0%, #10b981 100%)' : 'linear-gradient(135deg, #4b5563 0%, #9ca3af 100%)', 
                  color: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', opacity: 0.85, textTransform: 'uppercase', fontWeight: 800 }}>THẺ BẢO HÀNH ĐIỆN TỬ SÓC CARE</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '4px 0 0 0' }}>{result.productName}</h2>
                  <span style={{ fontSize: '13px', opacity: 0.9 }}>Mã IMEI / Serial: {result.imei}</span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', padding: '8px 18px', borderRadius: '20px', fontWeight: 900, fontSize: '13px', border: '1px solid rgba(255,255,255,0.3)' }}>
                  {result.status === 'ACTIVE' ? `● ĐANG TRONG THỜI HẠN BẢO HÀNH (${calculateDaysLeft(result.warrantyExpireDate)} ngày nữa)` : '○ ĐÃ HẾT HẠN BẢO HÀNH'}
                </div>
              </div>

              {/* Warranty Details Grid */}
              <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', borderBottom: '1px solid var(--border-color)' }}>
                
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Gói bảo hành đăng ký</div>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#6d28d9', marginTop: '4px' }}>{result.packageType}</div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Ngày mua hàng</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={16} /> {new Date(result.purchaseDate).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Ngày hết hạn bảo hành</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: result.status === 'ACTIVE' ? '#10b981' : '#ef4444', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} /> {new Date(result.warrantyExpireDate).toLocaleDateString('vi-VN')}
                  </div>
                </div>

              </div>

              {/* Repair History Audit Log */}
              <div style={{ padding: '28px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wrench size={18} style={{ color: '#6d28d9' }} /> Lịch sử bảo dưỡng & Sửa chữa tại Trung tâm Sóc Care ({result.repairs.length})
                </h4>

                {result.repairs.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {result.repairs.map((r, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <div>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>Ngày tiếp nhận: {r.date}</span>
                          <h5 style={{ margin: '4px 0 2px 0', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{r.description}</h5>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Kỹ thuật viên thực hiện: {r.technician}</span>
                        </div>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 800, fontSize: '12px' }}>
                          Miễn phí bảo hành (0đ)
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '12px', color: 'var(--text-muted)', fontSize: '13px' }}>
                    Thiết bị chưa từng qua sửa chữa hoặc thay thế linh kiện.
                  </div>
                )}
              </div>

              {/* Support Contact Footer */}
              <div style={{ padding: '20px 28px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <a 
                  href={`tel:${APP_CONFIG.HOTLINE_TEL}`} 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6d28d9', fontWeight: 700, textDecoration: 'none' }}
                >
                  <PhoneCall size={15} /> Trung tâm bảo hành: Gọi {APP_CONFIG.HOTLINE} (Miễn phí)
                </a>

                <a 
                  href={APP_CONFIG.SOCIAL.FACEBOOK_SUPPORT}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#2563eb',
                    fontWeight: 800,
                    textDecoration: 'none',
                    background: 'rgba(37, 99, 235, 0.1)',
                    padding: '8px 16px',
                    borderRadius: '10px'
                  }}
                >
                  <MessageCircle size={16} /> Liên hệ khiếu nại & CSKH Facebook
                </a>
              </div>

            </div>
          ) : searched ? (
            <div style={{ background: 'var(--bg-primary)', padding: '48px 24px', borderRadius: '20px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <AlertCircle size={48} style={{ color: '#ef4444', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>Không tìm thấy thông tin IMEI này</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>Vui lòng kiểm tra lại 15 số IMEI trên vỏ hộp hoặc cú pháp *#06# trên điện thoại.</p>
            </div>
          ) : null}

        </div>
      </main>

      <Footer />
    </div>
  );
}
