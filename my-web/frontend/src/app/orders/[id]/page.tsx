/**
 * Dynamic Order Detail Route (/orders/[id])
 * Redirects or renders order track page with pre-filled order code id.
 */
'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  useEffect(() => {
    if (orderId) {
      router.replace(`/orders?code=${encodeURIComponent(orderId)}`);
    }
  }, [orderId, router]);

  return (
    <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      Đang tải thông tin đơn hàng <strong>#{orderId}</strong>...
    </div>
  );
}
