/**
 * FacebookChatWidget Component
 * A global floating chat bubble widget for Facebook Messenger Customer Care Support.
 * Directs customers to the official Facebook support counselor page.
 *
 * Related: src/constants/config.ts, src/app/layout.tsx
 * Pattern: Global Floating Support Widget
 */

'use client';

import React, { useState } from 'react';
import { APP_CONFIG } from '@/constants/config';

export default function FacebookChatWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '92px',
        right: '24px',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip text box */}
      {showTooltip && (
        <div
          style={{
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            padding: '8px 14px',
            borderRadius: '12px',
            boxShadow: '0 4px 18px rgba(0,0,0,0.15)',
            border: '1px solid var(--border-color)',
            fontSize: '12px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            animation: 'fadeIn 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ color: '#0084FF' }}>●</span> Chat tư vấn Facebook & Khiếu nại CSKH
        </div>
      )}

      {/* Floating Facebook Messenger Bubble Button */}
      <a
        href={APP_CONFIG.SOCIAL.FACEBOOK_SUPPORT}
        target="_blank"
        rel="noopener noreferrer"
        title="Liên hệ Facebook Chăm sóc khách hàng & Tư vấn trực tiếp"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 50%, #0084FF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0, 132, 255, 0.45)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textDecoration: 'none'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1.0)';
        }}
      >
        {/* Official Facebook Messenger SVG Icon */}
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="#ffffff"
        >
          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.45 5.517 3.717 7.234V22l3.39-1.862c.93.257 1.916.398 2.893.398 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.066 12.433l-2.548-2.72-4.97 2.72 5.467-5.8 2.607 2.72 4.91-2.72-5.466 5.8z" />
        </svg>

        {/* Online Pulse Badge */}
        <span
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            border: '2px solid #ffffff',
            boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)'
          }}
        />
      </a>
    </div>
  );
}
