/**
 * ComparePage Component
 * Renders a side-by-side product comparison tool.
 * Loads pre-selected products from useCompareStore, offers dropdown selectors for other products,
 * displays a detailed comparison specifications table, and mounts an AI consultation chatbot.
 *
 * Related: src/store/useCompareStore.ts, src/app/api/compare-ai/route.ts, src/components/base/Header.tsx
 * Pattern: Product Comparator Page with Interactive AI Consultant
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, GitCompare, Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import AiResponseRenderer from '@/components/features/ai/AiResponseRenderer';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import SafeImage from '@/components/base/SafeImage';
import { useCompareStore } from '@/store/useCompareStore';
import { FEATURED_PRODUCTS } from '@/data/mock-products';
import { MockProduct } from '@/types/product';
import { formatVND } from '@/utils/format';
import { LABELS } from '@/constants/labels';
import { toast } from '@/store/useToastStore';

// Only phone products are eligible for comparison
const phoneProducts = FEATURED_PRODUCTS.filter(p => p.category === 'Điện thoại');

export default function ComparePage() {
  const { comparedProducts } = useCompareStore();

  // Initialize from store on mount — use store selections first, fallback to first two phones
  const [product1, setProduct1] = useState<MockProduct | null>(() => {
    const storeP1 = comparedProducts.find(p => p.category === 'Điện thoại');
    return storeP1 ?? (phoneProducts[0] ?? null);
  });
  const [product2, setProduct2] = useState<MockProduct | null>(() => {
    const storeP2 = comparedProducts.filter(p => p.category === 'Điện thoại')[1];
    return storeP2 ?? (phoneProducts[1] ?? null);
  });

  // AI Advice states
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product1 || !product2) {
      toast.error('Vui lòng chọn đủ 2 sản phẩm để nhận tư vấn AI.');
      return;
    }
    if (!query.trim()) return;

    setIsThinking(true);
    setAiResponse('');

    try {
      const response = await fetch('/api/compare-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product1,
          product2,
          query: query.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('AI API Error');
      }

      const data = await response.json();
      setAiResponse(data.reply);
    } catch {
      toast.error('Không thể kết nối với dịch vụ AI. Vui lòng thử lại sau.');
    } finally {
      setIsThinking(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      <Header />

      <main style={{ flexGrow: 1, padding: '32px 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Page Title & Back Link */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Link href="/" className="auth-back-link" style={{ fontSize: '13px' }}>
              <ArrowLeft size={14} /> Quay về trang chủ
            </Link>
            <h1 className="cart-header-title" style={{ margin: 0, fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GitCompare size={24} className="text-primary" /> {LABELS.COMPARE.TITLE}
            </h1>
            <div style={{ width: '100px' }}></div>
          </div>

          {/* Selectors & Product Info Card */}
          <div className="compare-layout-grid">
            
            {/* Column 1 */}
            <div className="compare-product-column">
              <label htmlFor="product1-select" className="checkout-field-label" style={{ width: '100%', textAlign: 'left' }}>
                {LABELS.COMPARE.SELECT_PRODUCT} 1
              </label>
              <select 
                id="product1-select"
                className="checkout-select"
                style={{ width: '100%' }}
                value={product1?.id ?? ''}
                onChange={(e) => {
                  const selected = phoneProducts.find(p => p.id === Number(e.target.value));
                  if (selected) setProduct1(selected);
                }}
              >
                {phoneProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              {product1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                  <div style={{ position: 'relative', width: '140px', height: '140px', background: 'var(--bg-primary)', borderRadius: '12px', overflow: 'hidden' }}>
                    <SafeImage src={product1.image} alt={product1.name} fill style={{ objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '8px 0 0 0', color: 'var(--text-primary)', textAlign: 'center' }}>{product1.name}</h3>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: 'var(--color-danger)' }}>{formatVND(product1.price)}</span>
                </div>
              )}
            </div>

            {/* Column 2 */}
            <div className="compare-product-column">
              <label htmlFor="product2-select" className="checkout-field-label" style={{ width: '100%', textAlign: 'left' }}>
                {LABELS.COMPARE.SELECT_PRODUCT} 2
              </label>
              <select 
                id="product2-select"
                className="checkout-select"
                style={{ width: '100%' }}
                value={product2?.id ?? ''}
                onChange={(e) => {
                  const selected = phoneProducts.find(p => p.id === Number(e.target.value));
                  if (selected) setProduct2(selected);
                }}
              >
                {phoneProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              {product2 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                  <div style={{ position: 'relative', width: '140px', height: '140px', background: 'var(--bg-primary)', borderRadius: '12px', overflow: 'hidden' }}>
                    <SafeImage src={product2.image} alt={product2.name} fill style={{ objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '8px 0 0 0', color: 'var(--text-primary)', textAlign: 'center' }}>{product2.name}</h3>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: 'var(--color-danger)' }}>{formatVND(product2.price)}</span>
                </div>
              )}
            </div>

          </div>

          {/* Detailed Specs Table — always show when both products selected */}
          {product1 && product2 && (
            <div className="compare-specs-table">
              <div className="compare-specs-row header-row">
                <span>Thông số kỹ thuật</span>
                <span style={{ textAlign: 'center' }}>{product1.name}</span>
                <span style={{ textAlign: 'center' }}>{product2.name}</span>
              </div>
              
              <div className="compare-specs-row data-row">
                <span className="compare-specs-label">Thương hiệu</span>
                <span className="compare-specs-val">{product1.brand}</span>
                <span className="compare-specs-val">{product2.brand}</span>
              </div>

              <div className="compare-specs-row data-row">
                <span className="compare-specs-label">Màn hình</span>
                <span className="compare-specs-val">{product1.specs.screen}</span>
                <span className="compare-specs-val">{product2.specs.screen}</span>
              </div>

              <div className="compare-specs-row data-row">
                <span className="compare-specs-label">Vi xử lý (Chip)</span>
                <span className="compare-specs-val">{product1.specs.chip}</span>
                <span className="compare-specs-val">{product2.specs.chip}</span>
              </div>

              <div className="compare-specs-row data-row">
                <span className="compare-specs-label">RAM hỗ trợ</span>
                <span className="compare-specs-val">{product1.specs.ram}</span>
                <span className="compare-specs-val">{product2.specs.ram}</span>
              </div>

              <div className="compare-specs-row data-row">
                <span className="compare-specs-label">Đánh giá khách hàng</span>
                <span className="compare-specs-val">⭐️ {product1.rating} ({product1.reviewCount} lượt)</span>
                <span className="compare-specs-val">⭐️ {product2.rating} ({product2.reviewCount} lượt)</span>
              </div>

              <div className="compare-specs-row data-row">
                <span className="compare-specs-label">Giao hàng nhanh</span>
                <span className="compare-specs-val">{product1.fastDelivery ? 'Có hỗ trợ 2H' : 'Giao hàng tiêu chuẩn'}</span>
                <span className="compare-specs-val">{product2.fastDelivery ? 'Có hỗ trợ 2H' : 'Giao hàng tiêu chuẩn'}</span>
              </div>
            </div>
          )}

          {/* AI Consultation Panel */}
          {product1 && product2 && (
            <div className="cart-items-panel" style={{ marginTop: '32px' }}>
              <h2 className="checkout-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} className="text-primary" /> {LABELS.COMPARE.AI_ADVICE_TITLE}
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                {LABELS.COMPARE.AI_ADVICE_DESC}
              </p>

              {/* Suggestions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                <button 
                  type="button" 
                  className="chat-suggestion-chip"
                  onClick={() => handleSelectSuggestion('Tư vấn chọn máy để quay chụp vlog và đăng mạng xã hội tốt hơn')}
                >
                  📸 Quay chụp Vlog
                </button>
                <button 
                  type="button" 
                  className="chat-suggestion-chip"
                  onClick={() => handleSelectSuggestion('Mẫu máy nào chiến game mượt mà, ít nóng và pin trâu hơn?')}
                >
                  🎮 Chơi game & Pin trâu
                </button>
                <button 
                  type="button" 
                  className="chat-suggestion-chip"
                  onClick={() => handleSelectSuggestion('Tôi muốn tiết kiệm ngân sách nhưng vẫn cần máy dùng ổn định 3-4 năm tới')}
                >
                  💸 Tiết kiệm & Bền bỉ
                </button>
              </div>

              <form onSubmit={handleAskAI} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea
                  className="checkout-input"
                  style={{ height: '80px', padding: '12px', resize: 'none', borderRadius: '12px' }}
                  placeholder={LABELS.COMPARE.AI_INPUT_PLACEHOLDER}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  required
                />
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isThinking || !query.trim()}
                  style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', alignSelf: 'flex-end', borderRadius: '12px' }}
                >
                  {isThinking ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> {LABELS.COMPARE.AI_THINKING}
                    </>
                  ) : (
                    <>
                      <MessageSquare size={16} /> {LABELS.COMPARE.AI_BUTTON}
                    </>
                  )}
                </button>
              </form>

              {/* AI Advice Output box */}
              {(aiResponse || isThinking) && (
                <div style={{ marginTop: '24px', borderTop: '1px dashed var(--border-color)', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} className="text-primary" /> {LABELS.COMPARE.AI_RESPONSE_HEADER}
                  </h4>
                  {isThinking ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div className="chat-typing-indicator" style={{ padding: '12px 18px' }}>
                        <div className="chat-typing-dot"></div>
                        <div className="chat-typing-dot"></div>
                        <div className="chat-typing-dot"></div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'left' }}>
                      <AiResponseRenderer text={aiResponse} />
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
