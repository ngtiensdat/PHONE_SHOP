/**
 * Footer Component
 * Global footer with terms, policy, and copyright links.
 *
 * Related: src/app/layout.tsx, src/app/globals.css
 */

import React from 'react';
import Link from 'next/link';

import { LABELS } from '@/constants/labels';
import { APP_CONFIG } from '@/constants/config';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <span className="footer-copyright">
          © {new Date().getFullYear()} Sóc Mobile. {LABELS.COMMON.COPYRIGHT}
        </span>
        <div className="footer-links">
          <Link href={APP_CONFIG.ROUTES.TERMS}>{LABELS.COMMON.TERMS_OF_USE}</Link>
          <Link href={APP_CONFIG.ROUTES.POLICY}>{LABELS.COMMON.PRIVACY_POLICY}</Link>
        </div>
      </div>
    </footer>
  );
}
