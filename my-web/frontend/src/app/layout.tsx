/**
 * RootLayout Component
 * Entry layout for all pages. Mounts global Toast notifications container.
 * Sets metadata for search engine optimization.
 *
 * Related: src/app/globals.css, src/components/base/ToastContainer.tsx
 * Pattern: Next.js Root Layout
 */

import type { Metadata } from 'next';
import './globals.css';
import ToastContainer from '@/components/base/ToastContainer';
import MiniSocChatbox from '@/components/features/ai/MiniSocChatbox';

export const metadata: Metadata = {
  title: 'Sóc Mobile — Điện thoại di động cao cấp, giá tốt nhất',
  description:
    'Hệ thống bán lẻ điện thoại di động chính hãng Apple, Samsung, Xiaomi với chính sách bảo hành 12 tháng, giao hàng hỏa tốc và dịch vụ hỗ trợ AI chuyên nghiệp.',
  keywords: ['điện thoại', 'iphone', 'samsung', 'xiaomi', 'smartphone', 'mua điện thoại'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <main>{children}</main>
        <MiniSocChatbox />
        <ToastContainer />
      </body>
    </html>
  );
}
