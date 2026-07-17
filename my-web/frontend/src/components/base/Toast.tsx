/**
 * Toast Component
 * Represents a single toast alert box with micro-animations.
 * Automatically styles based on type: success, error, warning, info.
 *
 * Related: src/store/useToastStore.ts, src/components/base/ToastContainer.tsx
 * Pattern: Presentation component with animation support
 */

'use client';

import React from 'react';
import { Toast as ToastType, useToastStore } from '@/store/useToastStore';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

interface ToastProps {
  toast: ToastType;
}

export default function Toast({ toast }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'error':
        return <AlertCircle size={18} />;
      case 'warning':
        return <AlertTriangle size={18} />;
      case 'info':
      default:
        return <Info size={18} />;
    }
  };

  return (
    <div className={`toast-item toast-${toast.type}`} role="alert">
      <span className="toast-icon">{getIcon()}</span>
      <p className="toast-message">{toast.message}</p>
      <button
        type="button"
        className="toast-close"
        onClick={() => removeToast(toast.id)}
        aria-label="Đóng thông báo"
      >
        <X size={14} />
      </button>
    </div>
  );
}
