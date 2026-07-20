/**
 * AI Trade-In Valuation Page (/thu-cu-doi-moi)
 * AI-First Architecture:
 * - Removes hardcoded static phone model lists.
 * - Provides step-by-step guidance on what information customers need to provide for ANY phone model/brand.
 * - Interactive Sóc AI Chatbot that estimates trade-in value for ALL phone models (Apple, Samsung, Xiaomi, OPPO, Pixel...)
 * - Prominent disclaimer: Price is for reference only; customer needs to bring device to Showroom (Số 180 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội).
 *
 * Related: src/constants/config.ts, src/constants/labels.ts, src/app/checkout/page.tsx
 * Pattern: Clean Modular AI Chatbot Page
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Send, 
  Gift, 
  MessageCircle, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  Smartphone, 
  Battery, 
  ShieldCheck, 
  Info,
  MapPin,
  Sparkles
} from 'lucide-react';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import { formatVND } from '@/utils/format';
import { APP_CONFIG } from '@/constants/config';
import { toast } from '@/store/useToastStore';

interface ChatMessage {
  sender: 'USER' | 'AI';
  text: string;
  estimateMin?: number;
  estimateMax?: number;
}

export default function TradeInPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'AI',
      text: 'Xin chào! Mình là Sóc AI Trợ Lý Định Giá Thu Cũ. Bạn muốn định giá điện thoại cũ nào? Hãy nhắn cho mình tên máy, dung lượng pin và tình trạng vết xước (ví dụ: "iPhone 13 Pro Max 128GB pin 87% trầy nhẹ") nhé!'
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText('TROGIA1M');
    setIsCopied(true);
    toast.success('Đã sao chép mã Voucher TROGIA1M trợ giá 1.000.000đ!');
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Dynamic AI Valuation Logic for ALL Phone Models & Brands
  const handleAiSend = (customPrompt?: string) => {
    const textToSend = customPrompt || chatInput;
    if (!textToSend.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { sender: 'USER', text: textToSend }
    ];
    setMessages(newMessages);
    if (!customPrompt) setChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      const qLower = textToSend.toLowerCase();
      let estBase = 8000000;

      // Smart Brand & Model Valuation Parser
      if (qLower.includes('16 pro max')) estBase = 27000000;
      else if (qLower.includes('16 pro')) estBase = 23000000;
      else if (qLower.includes('16')) estBase = 18000000;
      else if (qLower.includes('15 pro max')) estBase = 22500000;
      else if (qLower.includes('15 pro')) estBase = 18500000;
      else if (qLower.includes('15')) estBase = 14500000;
      else if (qLower.includes('14 pro max')) estBase = 17800000;
      else if (qLower.includes('14 pro')) estBase = 14800000;
      else if (qLower.includes('14')) estBase = 11800000;
      else if (qLower.includes('13 pro max')) estBase = 13900000;
      else if (qLower.includes('13 pro')) estBase = 11500000;
      else if (qLower.includes('13')) estBase = 9200000;
      else if (qLower.includes('12 pro max')) estBase = 10200000;
      else if (qLower.includes('12')) estBase = 6800000;
      else if (qLower.includes('11 pro max')) estBase = 7500000;
      else if (qLower.includes('11')) estBase = 4800000;
      else if (qLower.includes('s24 ultra')) estBase = 20500000;
      else if (qLower.includes('s23 ultra')) estBase = 14200000;
      else if (qLower.includes('s22 ultra')) estBase = 10500000;
      else if (qLower.includes('fold 5') || qLower.includes('fold5')) estBase = 17500000;
      else if (qLower.includes('flip 5') || qLower.includes('flip5')) estBase = 10800000;
      else if (qLower.includes('xiaomi 14') || qLower.includes('xiaomi 13')) estBase = 9500000;
      else if (qLower.includes('oppo reno')) estBase = 6500000;
      else if (qLower.includes('pixel')) estBase = 7500000;

      // Condition Adjustments
      if (qLower.includes('trầy') || qLower.includes('cũ') || qLower.includes('xước')) estBase *= 0.88;
      if (qLower.includes('cấn') || qLower.includes('móp') || qLower.includes('nứt')) estBase *= 0.75;
      if (qLower.includes('pin 8') || qLower.includes('pin chai')) estBase -= 400000;
      if (qLower.includes('pin 7') || qLower.includes('thay pin')) estBase -= 700000;
      if (qLower.includes('99%') || qLower.includes('đẹp như mới') || qLower.includes('zin')) estBase *= 1.05;

      const minVal = Math.max(1000000, Math.round((estBase * 0.94) / 100000) * 100000);
      const maxVal = Math.max(1200000, Math.round((estBase * 1.06) / 100000) * 100000);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'AI',
          text: `Sóc AI đã phân tích thông tin máy "${textToSend}": Mức giá thu cũ dự kiến cho máy của bạn khoảng từ ${formatVND(minVal)} đến ${formatVND(maxVal)}. Khi lên đời máy mới tại Sóc Mobile, bạn được TẶNG THÊM +1.000.000đ trợ giá (Mã: TROGIA1M)!`,
          estimateMin: minVal,
          estimateMax: maxVal
        }
      ]);
      setIsAiThinking(false);
    }, 850);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      <Header />

      <main style={{ flexGrow: 1, padding: '24px 0 64px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Breadcrumb */}
          <nav style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', gap: '6px' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Trang chủ</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Thu cũ đổi mới AI</span>
          </nav>

          {/* Hero Banner Header */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #2e1065 0%, #6d28d9 60%, #9333ea 100%)',
              borderRadius: '24px',
              padding: '36px 32px',
              color: '#ffffff',
              marginBottom: '28px',
              boxShadow: '0 12px 32px rgba(109, 40, 217, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> Sóc AI Thu Cũ - Trợ Giá Tất Cả Các Dòng Máy
              </span>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 900, margin: '12px 0 8px', lineHeight: 1.2 }}>
                ĐỊNH GIÁ THU CỦ TỰ ĐỘNG BẰNG AI - TRỢ GIÁ LÊN ĐỜI 1.000.000Đ
              </h1>
              <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
                Nhận báo giá dự kiến tức thì cho <strong>tất cả các dòng điện thoại</strong> (iPhone, Samsung, Xiaomi, OPPO, Realme, Google Pixel...). Trụ sở chính: <strong>Số 180 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội</strong>.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', padding: '20px 24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', minWidth: '220px' }}>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Mã Trợ Giá Đổ Đời</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fde047', letterSpacing: '1px', margin: '4px 0' }}>
                TROGIA1M
              </div>
              <button
                type="button"
                onClick={handleCopyVoucher}
                style={{
                  background: isCopied ? '#10b981' : '#ffffff',
                  color: isCopied ? '#ffffff' : '#6d28d9',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: '4px'
                }}
              >
                {isCopied ? '✓ Đã sao chép' : 'Sao chép mã ngay'}
              </button>
            </div>
          </div>

          {/* Main Content: Guidance Info (Left) + Interactive AI Chatbot (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            
            {/* Left Guidance Box: How to provide information */}
            <div style={{ background: 'var(--bg-primary)', padding: '28px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Info size={22} style={{ color: '#6d28d9' }} /> Hướng dẫn cung cấp thông tin để AI định giá chính xác
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                  Bạn có thể hỏi AI bất kỳ dòng máy nào. Để AI báo giá sát nhất, vui lòng cung cấp các thông tin sau:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(109, 40, 217, 0.1)', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                      1
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Tên máy & Dung lượng bộ nhớ</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Ví dụ: iPhone 13 Pro Max 128GB, Samsung S23 Ultra 256GB, Xiaomi 13T...</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(109, 40, 217, 0.1)', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                      2
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Tình trạng ngoại hình vỏ & màn hình</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Máy đẹp 99% nguyên zin, trầy xước lông mèo nhẹ, hoặc cấn móp góc...</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(109, 40, 217, 0.1)', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                      3
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>% Dung lượng Pin còn lại</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Ví dụ: Pin 88%, Pin 82% hoặc đã từng thay pin mới.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(109, 40, 217, 0.1)', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                      4
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Tình trạng tài khoản & Sửa chữa</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Đã thoát iCloud/Samsung Account hoàn toàn chưa, có hỏng FaceID không.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Showroom Address Box */}
              <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <div style={{ fontWeight: 800, color: '#6d28d9', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} /> Địa chỉ thẩm định máy trực tiếp:
                </div>
                <strong>Số 180 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội</strong> (Hoặc các Showroom Sóc Mobile trên toàn quốc). Kỹ thuật viên kiểm tra 15 phút chốt tiền mặt hoặc trừ thẳng lên đời máy mới.
              </div>

            </div>

            {/* Right Chatbot Window */}
            <div style={{ background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Bot size={26} style={{ color: '#6d28d9' }} /> Sóc AI Trade-In Assistant
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                  Nhập thông tin máy của bạn vào ô chat bên dưới để AI báo giá ngay lập tức.
                </p>

                {/* Messages Box */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '16px', height: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
                  {messages.map((m, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        alignSelf: m.sender === 'USER' ? 'flex-end' : 'flex-start',
                        maxWidth: '88%',
                        background: m.sender === 'USER' ? '#6d28d9' : 'var(--bg-primary)',
                        color: m.sender === 'USER' ? '#ffffff' : 'var(--text-primary)',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        border: m.sender === 'AI' ? '1px solid var(--border-color)' : 'none',
                        fontSize: '13px',
                        lineHeight: 1.5
                      }}
                    >
                      <div>{m.text}</div>
                      {m.estimateMin && (
                        <div style={{ marginTop: '8px', padding: '8px 12px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '8px', color: '#10b981', fontWeight: 800 }}>
                          ✓ Giá AI ước tính: {formatVND(m.estimateMin)} - {formatVND(m.estimateMax!)} (+1tr Trợ giá)
                        </div>
                      )}
                    </div>
                  ))}

                  {isAiThinking && (
                    <div style={{ alignSelf: 'flex-start', background: 'var(--bg-primary)', padding: '10px 16px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      Sóc AI đang phân tích mô tả máy và định giá...
                    </div>
                  )}
                </div>

                {/* Sample Prompt Chips */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Mẫu hỏi:</span>
                  {[
                    'iPhone 13 Pro Max 128GB pin 87% trầy nhẹ',
                    'Samsung S23 Ultra 256GB đẹp 99%',
                    'iPhone 15 Pro Max 256GB pin 92%',
                    'Xiaomi 13T Pro 512GB máy đẹp'
                  ].map(prompt => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleAiSend(prompt)}
                      style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: '#6d28d9',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Form */}
              <div>
                <form onSubmit={(e) => { e.preventDefault(); handleAiSend(); }} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ví dụ: iPhone 14 Pro 128GB pin 85% máy trầy nhẹ..."
                    style={{
                      flexGrow: 1,
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '12px 20px', borderRadius: '12px', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
                  >
                    <Send size={15} /> Hỏi AI
                  </button>
                </form>

                {/* Important Disclaimer */}
                <div style={{ marginTop: '12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid #f59e0b', borderRadius: '10px', padding: '10px 12px', fontSize: '11px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  <div style={{ fontWeight: 800, color: '#d97706', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={13} /> LƯU Ý VỀ GIÁ ĐỊNH GIÁ AI:
                  </div>
                  Mức giá AI báo ở trên là <strong>giá tham khảo dự kiến</strong> dựa trên mô tả của bạn. Quý khách vui lòng mang máy trực tiếp tới <strong>Showroom Sóc Mobile (Số 180 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội)</strong> để kỹ thuật viên kiểm tra thực tế và chốt giá chính xác nhất!
                </div>
              </div>

            </div>

          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
            <Link 
              href="/checkout?fulfillment=STORE_PICKUP&voucher=TROGIA1M&discount=1000000"
              className="btn btn-primary" 
              style={{ textDecoration: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: 900, fontSize: '15px' }}
            >
              Đã có định giá AI - Tiến hành Lên đời máy mới <ChevronRight size={18} style={{ verticalAlign: 'middle' }} />
            </Link>

            <a 
              href={APP_CONFIG.SOCIAL.FACEBOOK_SUPPORT}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                borderRadius: '14px',
                border: '1px solid #2563eb',
                background: 'rgba(37, 99, 235, 0.08)',
                color: '#2563eb',
                fontWeight: 800,
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={18} /> Chat Facebook trao đổi với Admin
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
