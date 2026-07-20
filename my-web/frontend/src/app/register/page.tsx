/**
 * RegisterPage Component
 * Renders the user registration screen with clean glassmorphism card design and validation.
 * Uses useAuth facade hook for the business logic.
 *
 * Related: src/app/login/page.tsx, src/hooks/useAuth.ts, src/app/globals.css
 * Pattern: Interactive Authentication Screen
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LABELS } from '@/constants/labels';
import { APP_CONFIG } from '@/constants/config';
import { registerSchema } from '@/schemas/auth.schema';
import { Mail, Lock, User, Phone, ArrowLeft, Loader2 } from 'lucide-react';
import SafeImage from '@/components/base/SafeImage';

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = registerSchema.safeParse({
      email,
      fullName,
      phone,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await register({
        email: result.data.email,
        fullName: result.data.fullName,
        phone: result.data.phone || undefined,
        password: result.data.password,
      });
    } catch {
      setIsLoading(false);
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
      <div className="auth-split-right" style={{ padding: '24px var(--space-lg)' }}>
        <div className="auth-card-modern" style={{ maxWidth: '480px', padding: '30px' }}>
          {/* Header */}
          <div className="auth-header" style={{ gap: '6px' }}>
            <Link href={APP_CONFIG.ROUTES.HOME} style={{ display: 'flex', justifyContent: 'center' }}>
              <SafeImage 
                src="/remove_background_logo_phone_shop.png" 
                alt="Sóc Mobile Logo" 
                width={160}
                height={56}
                style={{ objectFit: 'contain', marginBottom: '8px' }} 
              />
            </Link>
            <h1 className="auth-title" style={{ fontSize: '1.45rem' }}>{LABELS.AUTH.REGISTER_TITLE}</h1>
            <p className="auth-subtitle">{LABELS.AUTH.REGISTER_SUBTITLE}</p>
          </div>

          {/* Error info */}
          {error && (
            <div style={{ color: 'var(--color-danger)', fontSize: '13px', textAlign: 'center', backgroundColor: 'rgba(255,59,48,0.08)', padding: '10px', borderRadius: 'var(--radius-lg)' }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form" style={{ gap: '14px' }}>
            {/* Full Name */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="fullName-input">{LABELS.AUTH.FULL_NAME}</label>
              <div className="auth-input-wrapper">
                <input
                  id="fullName-input"
                  type="text"
                  placeholder={LABELS.AUTH.FULL_NAME_PLACEHOLDER}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  required
                  className="auth-input"
                  style={{ height: '44px' }}
                />
                <User className="auth-input-icon" size={18} />
              </div>
            </div>

            {/* Email */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="email-input">{LABELS.AUTH.EMAIL}</label>
              <div className="auth-input-wrapper">
                <input
                  id="email-input"
                  type="email"
                  placeholder={LABELS.AUTH.EMAIL_PLACEHOLDER}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="auth-input"
                  style={{ height: '44px' }}
                />
                <Mail className="auth-input-icon" size={18} />
              </div>
            </div>

            {/* Phone */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="phone-input">{LABELS.AUTH.PHONE}</label>
              <div className="auth-input-wrapper">
                <input
                  id="phone-input"
                  type="tel"
                  placeholder={LABELS.AUTH.PHONE_PLACEHOLDER}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                  className="auth-input"
                  style={{ height: '44px' }}
                />
                <Phone className="auth-input-icon" size={18} />
              </div>
            </div>

            {/* Password */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="password-input">{LABELS.AUTH.PASSWORD}</label>
              <div className="auth-input-wrapper">
                <input
                  id="password-input"
                  type="password"
                  placeholder={LABELS.AUTH.PASSWORD_MIN_PLACEHOLDER}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="auth-input"
                  style={{ height: '44px' }}
                />
                <Lock className="auth-input-icon" size={18} />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="confirmPassword-input">{LABELS.AUTH.CONFIRM_PASSWORD}</label>
              <div className="auth-input-wrapper">
                <input
                  id="confirmPassword-input"
                  type="password"
                  placeholder={LABELS.AUTH.PASSWORD_PLACEHOLDER}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="auth-input"
                  style={{ height: '44px' }}
                />
                <Lock className="auth-input-icon" size={18} />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary auth-btn"
              style={{ height: '44px', marginTop: '4px' }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Loader2 className="animate-spin" size={18} /> {LABELS.AUTH.REGISTERING}
                </span>
              ) : (
                LABELS.AUTH.REGISTER_BTN
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer" style={{ gap: '10px', marginTop: '4px', paddingTop: '12px' }}>
            <p style={{ margin: 0 }}>
              {LABELS.AUTH.ALREADY_ACCOUNT}{' '}
              <Link href={APP_CONFIG.ROUTES.LOGIN} className="auth-link">
                {LABELS.AUTH.SIGNIN_NOW}
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
