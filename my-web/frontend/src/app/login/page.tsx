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
import { Mail, Lock, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import SafeImage from '@/components/base/SafeImage';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path !== undefined) {
          fieldErrors[String(path)] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);

    try {
      await login(result.data);
    } catch (err: any) {
      setIsLoading(false);
      const message = err?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.';
      setErrors({ global: message });
    }
  };

  return (
    <div className="auth-split-container">
      {/* Left Panel - Brand Showcase */}
      <div className="auth-split-left">
        <div className="auth-left-logo-row">
          <SafeImage 
            src="/remove_background_logo_phone_shop.png" 
            alt="Sóc Mobile Logo" 
            width={150}
            height={50}
            style={{ objectFit: 'contain' }} 
          />
        </div>

        <div className="auth-left-features-list">
          <div className="auth-left-feature-item">
            <div className="auth-left-feature-icon">
              <Mail size={22} style={{ color: '#fff' }} />
            </div>
            <div>
              <h3 className="auth-left-feature-title">{LABELS.AUTH.HERO_FEATURE_1_TITLE}</h3>
              <p className="auth-left-feature-desc">{LABELS.AUTH.HERO_FEATURE_1_DESC}</p>
            </div>
          </div>

          <div className="auth-left-feature-item">
            <div className="auth-left-feature-icon">
              <Lock size={22} style={{ color: '#fff' }} />
            </div>
            <div>
              <h3 className="auth-left-feature-title">{LABELS.AUTH.HERO_FEATURE_2_TITLE}</h3>
              <p className="auth-left-feature-desc">{LABELS.AUTH.HERO_FEATURE_2_DESC}</p>
            </div>
          </div>

          <div className="auth-left-feature-item">
            <div className="auth-left-feature-icon">
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>%</span>
            </div>
            <div>
              <h3 className="auth-left-feature-title">{LABELS.AUTH.HERO_FEATURE_3_TITLE}</h3>
              <p className="auth-left-feature-desc">{LABELS.AUTH.HERO_FEATURE_3_DESC}</p>
            </div>
          </div>
        </div>

        <div className="auth-left-footer">
          <p>{LABELS.AUTH.COPYRIGHT_TEXT}{APP_CONFIG.HOTLINE}</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="auth-split-right">
        <div className="auth-card-modern">
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
          {errors.global && (
            <div style={{ color: 'var(--color-danger)', fontSize: '13px', textAlign: 'center', backgroundColor: 'rgba(255,59,48,0.08)', padding: '10px', borderRadius: 'var(--radius-lg)' }}>
              {errors.global}
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
                  placeholder={LABELS.AUTH.EMAIL_PLACEHOLDER}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className={`auth-input ${errors.email ? 'has-error' : ''}`}
                />
                <Mail className="auth-input-icon" size={18} />
              </div>
              {errors.email && <span className="auth-field-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="password-input">{LABELS.AUTH.PASSWORD_LOGIN}</label>
              <div className="auth-input-wrapper">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={LABELS.AUTH.PASSWORD_PLACEHOLDER}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className={`auth-input ${errors.password ? 'has-error' : ''}`}
                  style={{ paddingRight: '44px' }}
                />
                <Lock className="auth-input-icon" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="auth-field-error">{errors.password}</span>}
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
    </div>
  );
}
