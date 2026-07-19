/**
 * LoginPage Component
 * Renders the user login page with clean aesthetics, glassmorphism card, and error handling.
 * Integrates with standard React state and useAuth facade hook.
 *
 * Related: src/app/register/page.tsx, src/hooks/useAuth.ts, src/app/globals.css
 * Pattern: Interactive Authentication Screen
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LABELS } from '@/constants/labels';
import { APP_CONFIG } from '@/constants/config';
import { loginSchema } from '@/schemas/auth.schema';
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import SafeImage from '@/components/base/SafeImage';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    
    setError(null);
    setIsLoading(true);

    try {
      await login(result.data);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <Link href={APP_CONFIG.ROUTES.HOME} style={{ display: 'flex', justifyContent: 'center' }}>
            <SafeImage 
              src="/remove_background_logo_phone_shop.png" 
              alt="Sóc Mobile Logo" 
              width={160}
              height={56}
              style={{ objectFit: 'contain', marginBottom: '8px' }} 
            />
          </Link>
          <h1 className="auth-title">{LABELS.AUTH.LOGIN_TITLE}</h1>
          <p className="auth-subtitle">{LABELS.AUTH.LOGIN_SUBTITLE}</p>
        </div>

        {/* Local Error alert if any */}
        {error && (
          <div style={{ color: 'var(--color-danger)', fontSize: '13px', textAlign: 'center', backgroundColor: 'rgba(255,59,48,0.08)', padding: '10px', borderRadius: 'var(--radius-lg)' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email */}
          <div className="auth-input-group">
            <label className="auth-input-label" htmlFor="email-input">{LABELS.AUTH.EMAIL_LOGIN}</label>
            <div className="auth-input-wrapper">
              <input
                id="email-input"
                type="email"
                placeholder="ten@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="auth-input"
              />
              <Mail className="auth-input-icon" size={18} />
            </div>
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <label className="auth-input-label" htmlFor="password-input">{LABELS.AUTH.PASSWORD_LOGIN}</label>
            <div className="auth-input-wrapper">
              <input
                id="password-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="auth-input"
              />
              <Lock className="auth-input-icon" size={18} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary auth-btn"
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Loader2 className="animate-spin" size={18} /> {LABELS.AUTH.LOGGING_IN}
              </span>
            ) : (
              LABELS.AUTH.LOGIN_BTN
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p style={{ margin: 0 }}>
            {LABELS.AUTH.NO_ACCOUNT}{' '}
            <Link href={APP_CONFIG.ROUTES.REGISTER} className="auth-link">
              {LABELS.AUTH.SIGNUP_NOW}
            </Link>
          </p>
          <Link href={APP_CONFIG.ROUTES.HOME} className="auth-back-link">
            <ArrowLeft size={14} /> {LABELS.AUTH.BACK_TO_HOME}
          </Link>
        </div>
      </div>
    </div>
  );
}
