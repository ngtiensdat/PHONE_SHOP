/**
 * Order Tracking & History Page (/orders)
 * Comprehensive, cellphones/TGDĐ-inspired order lookup & management system.
 * Features:
 * - Real-time lookup by Order Code (e.g. SOC-883921) or Phone Number (0987654321)
 * - Interactive visual timeline step-tracker (PENDING -> CONFIRMED -> SHIPPING -> DELIVERED)
 * - Detailed order breakdown (items, variant specs, prices, payment status, recipient address)
 * - Actions: Cancel order (for PENDING), Re-order items into cart, Print invoice
 * - Auto-sync with localStorage placed orders from checkout
 *
 * Related: src/app/checkout/page.tsx, src/hooks/useCart.ts, src/types/order.ts
 * Pattern: Clean Modular Architecture with Strict TypeScript Interfaces
 */

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FileText, 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MapPin, 
  Phone, 
  CreditCard, 
  Printer, 
  RotateCcw, 
  AlertCircle,
  PhoneCall,
  ShoppingBag,
  History,
  Lock,
  ShieldAlert,
  LucideIcon
} from 'lucide-react';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import ProductDetailModal from '@/components/features/product/ProductDetailModal';
import CompareFloatingBar from '@/components/features/product/CompareFloatingBar';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/store/useToastStore';
import { APP_CONFIG } from '@/constants/config';
import { MockProduct } from '@/types/product';
import { Order, OrderStatus } from '@/types/order';

// Demo Mock Orders Dataset
const SAMPLE_ORDERS: Order[] = [
  {
    id: 'SOC-883921',
    createdAt: '2026-07-19T14:30:00Z',
    status: 'SHIPPING',
    customerName: 'Nguyễn Văn An',
    phone: '0987654321',
    address: '123 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    paymentMethod: 'VietQR (Chuyển khoản Ngân hàng)',
    paymentStatus: 'PAID',
    shippingFee: 0,
    discount: 1000000,
    voucherCode: 'GIAM1M',
    note: 'Giao hàng giờ hành chính, gọi trước 15 phút.',
    items: [
      {
        id: 342679,
        name: 'Điện thoại iPhone 17 Pro Max 256GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/342679/iphone-17-pro-max-cam-thumb-600x600.jpg',
        variant: 'Cam Vũ Trụ - 256GB',
        quantity: 1,
        price: 35990000,
      }
    ]
  },
  {
    id: 'SOC-992104',
    createdAt: '2026-07-18T09:15:00Z',
    status: 'DELIVERED',
    customerName: 'Trần Thị Bích',
    phone: '0912345678',
    address: '456 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    paymentMethod: 'COD (Thanh toán khi nhận hàng)',
    paymentStatus: 'PAID',
    shippingFee: 0,
    discount: 0,
    voucherCode: null,
    note: 'Dán sẵn cường lực giúp tôi.',
    items: [
      {
        id: 341804,
        name: 'Điện thoại Samsung Galaxy A07 6GB/128GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/341804/samsung-galaxy-a07-black-thumbnew-600x600.jpg',
        variant: 'Đen - 128GB',
        quantity: 1,
        price: 3990000,
      }
    ]
  },
  {
    id: 'SOC-100155',
    createdAt: '2026-07-20T08:00:00Z',
    status: 'PENDING',
    customerName: 'Nguyễn Văn An',
    phone: '0987654321',
    address: '123 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    paymentMethod: 'COD (Thanh toán khi nhận hàng)',
    paymentStatus: 'PENDING',
    shippingFee: 0,
    discount: 0,
    voucherCode: null,
    note: '',
    items: [
      {
        id: 360303,
        name: 'Điện thoại Xiaomi Redmi Note 15 8GB/128GB',
        image: 'https://cdn.tgdd.vn/2026/07/timerseo/360303.jpg',
        variant: 'Tím - 128GB',
        quantity: 1,
        price: 5790000,
      }
    ]
  }
];

// Timeline steps mapping
interface StatusStep {
  key: OrderStatus;
  label: string;
  sub: string;
  icon: LucideIcon;
}

const STATUS_TIMELINE: StatusStep[] = [
  { key: 'PENDING', label: 'Đặt đơn thành công', sub: 'Hệ thống đã ghi nhận đơn', icon: Clock },
  { key: 'CONFIRMED', label: 'Shop xác nhận', sub: 'Đã đóng gói sản phẩm', icon: Package },
  { key: 'SHIPPING', label: 'Đang vận chuyển', sub: 'Shipper đang giao hỏa tốc', icon: Truck },
  { key: 'DELIVERED', label: 'Giao hàng thành công', sub: 'Đã hoàn tất đơn hàng', icon: CheckCircle2 },
];

/* ============================================================================
 * Sub-Component: Visual Order Status Timeline Stepper
 * ============================================================================ */
interface OrderTimelineProps {
  status: OrderStatus;
}

function OrderTimeline({ status }: OrderTimelineProps) {
  const getStepIndex = (st: OrderStatus) => {
    if (st === 'CANCELLED') return -1;
    if (st === 'PENDING') return 0;
    if (st === 'CONFIRMED') return 1;
    if (st === 'SHIPPING') return 2;
    if (st === 'DELIVERED') return 3;
    return 0;
  };

  const currentStep = getStepIndex(status);

  if (status === 'CANCELLED') {
    return (
      <div style={{ padding: '20px 24px', background: 'rgba(239, 68, 68, 0.1)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444' }}>
        <XCircle size={24} />
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Đơn hàng này đã bị HỦY</h4>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>Rất tiếc đơn hàng đã ngưng xử lý. Bạn có thể nhấn Mua lại để tạo đơn hàng mới.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', position: 'relative' }}>
        {STATUS_TIMELINE.map((step, idx) => {
          const StepIcon = step.icon;
          const isPassed = currentStep >= idx;
          const isCurrent = currentStep === idx;

          return (
            <div key={step.key} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isPassed ? '#6d28d9' : 'var(--bg-primary)',
                  color: isPassed ? '#ffffff' : 'var(--text-muted)',
                  border: '2px solid',
                  borderColor: isPassed ? '#6d28d9' : 'var(--border-color)',
                  boxShadow: isCurrent ? '0 0 0 6px rgba(109, 40, 217, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <StepIcon size={20} />
              </div>
              
              <div style={{ fontSize: '13px', fontWeight: isPassed ? 800 : 600, color: isPassed ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {step.label}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {step.sub}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================================
 * Main Content Component
 * ============================================================================ */
function OrderTrackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const codeFromUrl = searchParams.get('code') || searchParams.get('id') || '';
  const phoneFromUrl = searchParams.get('phone') || '';

  const [searchQuery, setSearchQuery] = useState(codeFromUrl || phoneFromUrl || '');
  const [verifyPhone, setVerifyPhone] = useState(phoneFromUrl || '');
  const [activeTab, setActiveTab] = useState<'CODE' | 'PHONE'>(phoneFromUrl ? 'PHONE' : 'CODE');
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [myLocalOrders, setMyLocalOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedProductModal, setSelectedProductModal] = useState<MockProduct | null>(null);

  // Load orders from localStorage + sample dataset
  useEffect(() => {
    let combined: Order[] = [...SAMPLE_ORDERS];
    let userPlaced: Order[] = [];
    try {
      const localOrders = localStorage.getItem(APP_CONFIG.STORAGE.ORDERS_KEY);
      if (localOrders) {
        const parsed = JSON.parse(localOrders) as Order[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          userPlaced = parsed;
          combined = [...parsed, ...SAMPLE_ORDERS];
        }
      }
    } catch (e) {
      console.error('Failed to read local orders:', e);
    }
    setOrdersList(combined);
    setMyLocalOrders(userPlaced);

    // Initial search if query in URL
    if (codeFromUrl) {
      const query = codeFromUrl.trim().toLowerCase();
      const matched = combined.filter(o => o.id.toLowerCase() === query);
      setSearched(true);
      if (matched.length > 0) {
        setSelectedOrder(matched[0]);
      }
    } else if (phoneFromUrl) {
      const query = phoneFromUrl.trim().toLowerCase();
      const matched = combined.filter(o => o.phone.toLowerCase() === query);
      setSearched(true);
      if (matched.length > 0) {
        setSelectedOrder(matched[0]);
      }
    }
  }, [codeFromUrl, phoneFromUrl]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      toast.warning('Vui lòng nhập Mã đơn hàng hoặc Số điện thoại để tra cứu.');
      return;
    }

    if (activeTab === 'CODE') {
      const vPhone = verifyPhone.trim().toLowerCase();
      if (!vPhone) {
        toast.warning('Vì lý do bảo mật, vui lòng nhập Số điện thoại đã đặt hàng để xác minh chủ sở hữu.');
        return;
      }

      setSearched(true);
      const matched = ordersList.find(o => o.id.toLowerCase() === q);

      if (!matched) {
        setSelectedOrder(null);
        toast.error(`Không tìm thấy đơn hàng mã "${searchQuery.trim()}".`);
        return;
      }

      // Security check: Phone must match order phone number
      if (matched.phone.trim().toLowerCase() !== vPhone) {
        setSelectedOrder(null);
        setSecurityError('🔒 Số điện thoại không khớp với thông tin đặt mã đơn này. Vì lý do bảo mật quyền riêng tư cá nhân, bạn không thể tra cứu đơn hàng của người khác.');
        toast.error('Số điện thoại xác minh không khớp với đơn hàng!');
        return;
      }

      setSelectedOrder(matched);
      toast.success(`Xác minh chính chủ thành công cho đơn #${matched.id}!`);

    } else {
      // Search by Phone
      setSearched(true);
      const matched = ordersList.filter(o => o.phone.toLowerCase() === q);

      if (matched.length === 0) {
        setSelectedOrder(null);
        toast.error(`Không tìm thấy đơn hàng nào cho số điện thoại "${searchQuery.trim()}".`);
      } else {
        setSelectedOrder(matched[0]);
        toast.success(`Tìm thấy ${matched.length} đơn hàng!`);
      }
    }
  };

  const handleSelectSampleCode = (code: string) => {
    setSearchQuery(code);
    const q = code.toLowerCase();
    const matched = ordersList.filter(o => o.id.toLowerCase() === q || o.phone.toLowerCase() === q);
    setSearched(true);
    if (matched.length > 0) {
      setSelectedOrder(matched[0]);
    }
  };

  const handleCancelOrder = (orderId: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn HỦY đơn hàng ${orderId} này không?`)) return;

    const updated = ordersList.map(o => {
      if (o.id === orderId) {
        return { ...o, status: 'CANCELLED' as OrderStatus };
      }
      return o;
    });

    setOrdersList(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: 'CANCELLED' });
    }

    try {
      const local = updated.filter(o => !SAMPLE_ORDERS.some(s => s.id === o.id));
      localStorage.setItem(APP_CONFIG.STORAGE.ORDERS_KEY, JSON.stringify(local));
    } catch (e) {}

    toast.info(`Đã hủy đơn hàng ${orderId} thành công.`);
  };

  const handleReorder = (order: Order) => {
    let count = 0;
    order.items.forEach((item) => {
      addToCart({
        variantId: (item.id || 1) * 10,
        productId: item.id || 1,
        productName: item.name,
        price: item.price,
        imageUrl: item.image,
        storage: item.variant || 'Standard',
        color: 'Mặc định',
        quantity: item.quantity || 1
      });
      count += item.quantity || 1;
    });

    toast.success(`Đã thêm ${count} sản phẩm vào giỏ hàng!`);
    router.push('/cart');
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  // Status helper badge info
  const getStatusBadge = (st: OrderStatus) => {
    switch (st) {
      case 'PENDING':
        return { label: 'Chờ xác nhận', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'CONFIRMED':
        return { label: 'Đã xác nhận', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' };
      case 'SHIPPING':
        return { label: 'Đang vận chuyển', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
      case 'DELIVERED':
        return { label: 'Giao thành công', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
      case 'CANCELLED':
        return { label: 'Đã hủy', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
      default:
        return { label: st, color: '#6b7280', bg: 'rgba(107, 114, 128, 0.15)' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      <Header />

      <main style={{ flexGrow: 1, padding: '24px 0 64px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Breadcrumb & Header */}
          <nav style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', gap: '6px' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Trang chủ</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Tra cứu đơn hàng</span>
          </nav>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={30} style={{ color: '#6d28d9' }} /> Tra Cứu Đơn Hàng Sóc Mobile
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Kiểm tra tiến độ xử lý và hành trình giao hàng hỏa tốc 24/7
            </p>
          </div>

          {/* Search Box Card */}
          <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
            
            {/* Search Type Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('CODE')}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: activeTab === 'CODE' ? 800 : 600,
                  border: '1px solid',
                  borderColor: activeTab === 'CODE' ? '#6d28d9' : 'var(--border-color)',
                  background: activeTab === 'CODE' ? '#6d28d9' : 'var(--bg-secondary)',
                  color: activeTab === 'CODE' ? '#ffffff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Tra cứu theo Mã đơn hàng
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('PHONE')}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: activeTab === 'PHONE' ? 800 : 600,
                  border: '1px solid',
                  borderColor: activeTab === 'PHONE' ? '#6d28d9' : 'var(--border-color)',
                  background: activeTab === 'PHONE' ? '#6d28d9' : 'var(--bg-secondary)',
                  color: activeTab === 'PHONE' ? '#ffffff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Tra cứu theo Số điện thoại
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={activeTab === 'CODE' ? 'Nhập Mã đơn hàng (Ví dụ: SOC-883921)' : 'Nhập Số điện thoại mua hàng (Ví dụ: 0987654321)'}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  />
                  <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>

                {activeTab === 'CODE' && (
                  <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
                    <input
                      type="tel"
                      value={verifyPhone}
                      onChange={(e) => setVerifyPhone(e.target.value)}
                      placeholder="Số điện thoại xác minh chính chủ *"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px 12px 42px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontWeight: 600,
                        outline: 'none'
                      }}
                    />
                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6d28d9' }} />
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '12px 28px', borderRadius: '12px', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}
                >
                  Tra cứu ngay
                </button>
              </div>

              {activeTab === 'CODE' && (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Lock size={12} style={{ color: '#10b981' }} /> Bảo mật quyền riêng tư: Bắt buộc nhập chính xác Số điện thoại đã đặt hàng để xem chi tiết.
                </div>
              )}
            </form>

            {/* Sample Order Code Chips for Quick Test */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Thử nghiệm mẫu:</span>
              {SAMPLE_ORDERS.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSearchQuery(s.id);
                    setVerifyPhone(s.phone);
                    setActiveTab('CODE');
                    const matched = ordersList.find(o => o.id === s.id);
                    if (matched) {
                      setSelectedOrder(matched);
                      setSearched(true);
                      setSecurityError(null);
                    }
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#6d28d9',
                    cursor: 'pointer'
                  }}
                >
                  {s.id} (SĐT: {s.phone})
                </button>
              ))}
            </div>

          </div>

          {/* Security Privacy Protection Warning Alert */}
          {securityError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px 24px', borderRadius: '16px', border: '1px solid #ef4444', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '14px', color: '#ef4444' }}>
              <ShieldAlert size={28} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 800 }}>Cảnh báo bảo mật quyền riêng tư</h4>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, opacity: 0.95 }}>{securityError}</p>
              </div>
            </div>
          )}

          {/* My Orders Quick View Section (Local Placed Orders) */}
          {myLocalOrders.length > 0 && !selectedOrder && (
            <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={18} style={{ color: '#6d28d9' }} /> Đơn hàng vừa đặt trên thiết bị của bạn ({myLocalOrders.length})
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                {myLocalOrders.map((ord) => (
                  <div 
                    key={ord.id}
                    onClick={() => {
                      setSelectedOrder(ord);
                      setSearched(true);
                      setSecurityError(null);
                    }}
                    style={{
                      background: 'var(--bg-secondary)',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 900, color: '#6d28d9', fontSize: '14px' }}>#{ord.id}</span>
                      <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '12px', fontWeight: 800, backgroundColor: getStatusBadge(ord.status).bg, color: getStatusBadge(ord.status).color }}>
                        ● {getStatusBadge(ord.status).label}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Ngày đặt: {new Date(ord.createdAt).toLocaleString('vi-VN')}
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      {ord.items[0]?.name} {ord.items.length > 1 ? `(+${ord.items.length - 1} sản phẩm)` : ''}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Tổng thanh toán:</span>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#6d28d9' }}>
                        {(ord.items.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0) - ord.discount).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result Order Details */}
          {selectedOrder ? (
            <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              
              {/* Order Card Header */}
              <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #3b0764 0%, #6d28d9 100%)', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', opacity: 0.8, textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                    Mã đơn hàng:
                  </span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.5px' }}>
                    #{selectedOrder.id}
                  </span>
                  <span style={{ fontSize: '12px', opacity: 0.8, display: 'block', marginTop: '2px' }}>
                    Ngày đặt: {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span 
                    style={{ 
                      padding: '6px 16px', 
                      borderRadius: '20px', 
                      fontSize: '13px', 
                      fontWeight: 800, 
                      backgroundColor: getStatusBadge(selectedOrder.status).bg,
                      color: getStatusBadge(selectedOrder.status).color,
                      border: '1px solid currentColor'
                    }}
                  >
                    ● {getStatusBadge(selectedOrder.status).label}
                  </span>

                  <button
                    type="button"
                    onClick={handlePrintInvoice}
                    title="In xác nhận đơn hàng"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Printer size={14} /> In đơn
                  </button>
                </div>
              </div>

              {/* Order Status Timeline Bar Component */}
              <OrderTimeline status={selectedOrder.status} />

              {/* Recipient & Payment Details Grid */}
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', borderBottom: '1px solid var(--border-color)' }}>
                
                {/* Delivery Address */}
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={16} style={{ color: '#6d28d9' }} /> Địa chỉ nhận hàng
                  </h4>
                  <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>
                      {selectedOrder.customerName}
                    </p>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={13} /> {selectedOrder.phone}
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {selectedOrder.address}
                    </p>
                    {selectedOrder.note && (
                      <p style={{ margin: '8px 0 0 0', fontSize: '12px', fontStyle: 'italic', color: '#6d28d9' }}>
                        Ghi chú: &quot;{selectedOrder.note}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment & Shipping Method */}
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={16} style={{ color: '#6d28d9' }} /> Thanh toán & Vận chuyển
                  </h4>
                  <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 700 }}>
                      Phương thức: <span style={{ color: '#6d28d9' }}>{selectedOrder.paymentMethod}</span>
                    </p>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 700 }}>
                      Trạng thái tiền: <span style={{ color: selectedOrder.paymentStatus === 'PAID' ? '#10b981' : '#f59e0b' }}>
                        {selectedOrder.paymentStatus === 'PAID' ? '● Đã thanh toán / Đã cọc' : '○ Chưa thanh toán'}
                      </span>
                    </p>
                    
                    {selectedOrder.isDeposit ? (
                      <div style={{ marginTop: '8px', padding: '8px 12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '12px' }}>
                        <span style={{ color: '#10b981', fontWeight: 800 }}>Đã đặt cọc 5% giữ máy: {selectedOrder.depositAmount?.toLocaleString('vi-VN')}đ</span>
                        <br />
                        <span style={{ color: '#ef4444', fontWeight: 800 }}>Còn lại thanh toán tại Showroom: {selectedOrder.remainingAmount?.toLocaleString('vi-VN')}đ</span>
                      </div>
                    ) : (
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
                        Hình thức: <strong>{selectedOrder.fulfillmentMode === 'STORE_PICKUP' ? 'Đến xem & nhận tại Showroom' : 'Giao hàng hỏa tốc trong 2 giờ'}</strong>
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Items List Table */}
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShoppingBag size={16} style={{ color: '#6d28d9' }} /> Danh sách sản phẩm mua ({selectedOrder.items.length})
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {selectedOrder.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        gap: '16px', 
                        padding: '12px', 
                        borderRadius: '12px', 
                        border: '1px solid var(--border-color)', 
                        background: 'var(--bg-secondary)' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '8px', background: '#fff', padding: '4px' }} 
                        />
                        <div>
                          <h5 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {item.name}
                          </h5>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'var(--bg-primary)', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                            Mẫu: {item.variant}
                          </span>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '14px', fontWeight: 900, color: '#6d28d9' }}>
                          {item.price.toLocaleString('vi-VN')}đ
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          Số lượng: x{item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial Total Summary Box */}
                <div style={{ background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border-color)', maxWidth: '400px', marginLeft: 'auto' }}>
                  {selectedOrder.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      <span>Mã giảm giá ({selectedOrder.voucherCode}):</span>
                      <span style={{ color: '#ef4444', fontWeight: 700 }}>-{selectedOrder.discount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <span>Phí vận chuyển:</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>Miễn phí</span>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Tổng cộng thanh toán:</span>
                    <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#6d28d9' }}>
                      {(selectedOrder.items.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0) - selectedOrder.discount).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

              </div>

              {/* Transaction Audit History Log */}
              <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <History size={16} style={{ color: '#6d28d9' }} /> Lịch sử giao dịch & Nhật ký ngày giờ xử lý đơn
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '8px' }}>
                  {(selectedOrder.logs || [
                    { id: '1', timestamp: selectedOrder.createdAt, title: 'Khởi tạo đơn hàng', description: `Ghi nhận đơn hàng #${selectedOrder.id} thành công trên hệ thống Sóc Mobile.`, type: 'CREATE' as const },
                    { id: '2', timestamp: new Date(new Date(selectedOrder.createdAt).getTime() + 2 * 60 * 1000).toISOString(), title: 'Cập nhật hình thức thanh toán', description: `Phương thức: ${selectedOrder.paymentMethod}`, type: 'PAYMENT' as const },
                    { id: '3', timestamp: new Date(new Date(selectedOrder.createdAt).getTime() + 15 * 60 * 1000).toISOString(), title: 'Showroom xác nhận & Đóng gói', description: 'Kiểm tra máy nguyên seal, dán tem bảo hành và đóng hộp giao hàng.', type: 'STATUS_CHANGE' as const },
                    ...(selectedOrder.status === 'SHIPPING' || selectedOrder.status === 'DELIVERED' ? [{ id: '4', timestamp: new Date(new Date(selectedOrder.createdAt).getTime() + 45 * 60 * 1000).toISOString(), title: 'Bàn giao Shipper vận chuyển hỏa tốc', description: 'Đã bàn giao cho đơn vị vận chuyển giao tận nơi.', type: 'STATUS_CHANGE' as const }] : []),
                    ...(selectedOrder.status === 'DELIVERED' ? [{ id: '5', timestamp: new Date(new Date(selectedOrder.createdAt).getTime() + 120 * 60 * 1000).toISOString(), title: 'Giao hàng hoàn tất', description: 'Khách hàng đã ký nhận sản phẩm và thanh toán hoàn tất.', type: 'STATUS_CHANGE' as const }] : [])
                  ]).map((log, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', fontSize: '13px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', width: '135px', flexShrink: 0, fontWeight: 700 }}>
                        {new Date(log.timestamp).toLocaleString('vi-VN')}
                      </span>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: log.type === 'PAYMENT' ? '#10b981' : '#6d28d9', marginTop: '4px', flexShrink: 0, boxShadow: '0 0 0 3px rgba(109, 40, 217, 0.15)' }} />
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{log.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{log.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions Footer Bar */}
              <div style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <a 
                  href={`tel:${APP_CONFIG.HOTLINE_TEL}`} 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6d28d9', fontWeight: 700, textDecoration: 'none' }}
                >
                  <PhoneCall size={15} /> Cần trợ giúp? Gọi tổng đài {APP_CONFIG.HOTLINE} (Miễn phí)
                </a>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedOrder.status === 'PENDING' && (
                    <button
                      type="button"
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        border: '1px solid #ef4444',
                        background: 'transparent',
                        color: '#ef4444',
                        cursor: 'pointer'
                      }}
                    >
                      Hủy đơn hàng này
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleReorder(selectedOrder)}
                    className="btn btn-primary"
                    style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 800 }}
                  >
                    <RotateCcw size={14} /> Mua lại đơn này
                  </button>
                </div>
              </div>

            </div>
          ) : searched ? (
            <div style={{ background: 'var(--bg-primary)', padding: '48px 24px', borderRadius: '20px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <AlertCircle size={48} style={{ color: '#ef4444', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>Không tìm thấy đơn hàng nào</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>Vui lòng kiểm tra lại Mã đơn hàng hoặc Số điện thoại bạn đã nhập.</p>
            </div>
          ) : null}

        </div>
      </main>

      {/* Global Modals & Float Bars */}
      {selectedProductModal && (
        <ProductDetailModal 
          product={selectedProductModal} 
          onClose={() => setSelectedProductModal(null)} 
        />
      )}

      <CompareFloatingBar />
      <Footer />
    </div>
  );
}

export default function OrderTrackPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Đang tải thông tin đơn hàng...</div>}>
      <OrderTrackContent />
    </Suspense>
  );
}
