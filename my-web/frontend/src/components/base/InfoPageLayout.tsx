/**
 * InfoPageLayout Component
 * Reusable layout wrapper for all informational/static pages.
 * Provides a consistent hero section, breadcrumb, and content container.
 *
 * Related: src/components/base/Header.tsx, src/components/base/Footer.tsx
 * Pattern: Static Page Layout Shell
 */

import React from 'react';
import Link from 'next/link';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';

interface InfoPageLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  icon?: string;
  children: React.ReactNode;
}

export default function InfoPageLayout({
  title,
  subtitle,
  breadcrumb,
  icon = '📋',
  children,
}: InfoPageLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
      <Header />

      {/* Hero Banner */}
      <div className="info-page-hero">
        <div className="info-page-hero-inner">
          <span className="info-page-hero-icon">{icon}</span>
          <h1 className="info-page-hero-title">{title}</h1>
          {subtitle && <p className="info-page-hero-subtitle">{subtitle}</p>}
          <nav className="info-page-breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span>/</span>
            <span>{breadcrumb ?? title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main style={{ flexGrow: 1, padding: '40px 0 60px' }}>
        <div className="info-page-content-container">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
