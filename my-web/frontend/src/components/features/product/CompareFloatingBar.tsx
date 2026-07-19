/**
 * CompareFloatingBar Component
 * Renders a sticky floating bar at the bottom of the viewport when products are selected for comparison.
 * Shows thumbnails, allows clearing selections, and navigates to the detailed comparison page.
 *
 * Related: src/store/useCompareStore.ts, src/app/compare/page.tsx, src/components/base/SafeImage.tsx
 * Pattern: Sticky Bottom Control Bar
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { X, GitCompare } from 'lucide-react';
import { useCompareStore } from '@/store/useCompareStore';
import SafeImage from '@/components/base/SafeImage';
import { LABELS } from '@/constants/labels';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function CompareFloatingBar() {
  const isMounted = useIsMounted();
  const { comparedProducts, removeProduct, clearCompare } = useCompareStore();

  // Don't render anything until client has hydrated
  if (!isMounted || comparedProducts.length === 0) return null;

  return (
    <div className="compare-floating-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <GitCompare size={18} className="text-primary" />
        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
          {LABELS.COMPARE.COMPARE_BAR_TITLE} ({comparedProducts.length}/2)
        </span>
      </div>

      {/* Selected Items Previews */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {comparedProducts.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              position: 'relative', 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              background: 'var(--bg-primary)',
              padding: '2px',
              boxSizing: 'border-box'
            }}
          >
            <SafeImage 
              src={product.image} 
              alt={product.name} 
              fill
              style={{ objectFit: 'contain' }}
            />
            <button 
              type="button"
              onClick={() => removeProduct(product.id)}
              style={{ 
                position: 'absolute', 
                top: '-6px', 
                right: '-6px', 
                width: '16px', 
                height: '16px', 
                borderRadius: '50%', 
                background: 'var(--text-muted)', 
                color: '#ffffff', 
                border: 'none', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: 0
              }}
              title="Xóa"
            >
              <X size={10} />
            </button>
          </div>
        ))}

        {comparedProducts.length === 1 && (
          <div 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              border: '1px dashed var(--border-color)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '18px', 
              color: 'var(--text-muted)',
              fontWeight: 300
            }}
          >
            +
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          type="button" 
          onClick={clearCompare}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-secondary)', 
            cursor: 'pointer', 
            fontSize: '12px', 
            fontWeight: 600 
          }}
        >
          {LABELS.COMPARE.COMPARE_BAR_CLEAR}
        </button>

        <Link 
          href="/compare" 
          className="btn btn-primary"
          style={{ 
            textDecoration: 'none', 
            padding: '6px 14px', 
            fontSize: '12px', 
            fontWeight: 700, 
            borderRadius: '10px'
          }}
        >
          {LABELS.COMPARE.COMPARE_BAR_BTN}
        </Link>
      </div>
    </div>
  );
}
