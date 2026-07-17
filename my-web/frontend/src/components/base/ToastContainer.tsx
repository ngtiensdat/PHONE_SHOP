/**
 * ToastContainer Component
 * Portal-like wrapper fixed to the top-right of screen containing all active Toast notifications.
 *
 * Related: src/components/base/Toast.tsx, src/store/useToastStore.ts
 * Pattern: Container component for layout wrapping
 */

'use client';

import React from 'react';
import { useToastStore } from '@/store/useToastStore';
import Toast from './Toast';

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
