'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LABELS } from '@/constants/labels';
import { APP_CONFIG } from '@/constants/config';
import { registerSchema } from '@/schemas/auth.schema';
import { Smartphone, Mail, Lock, User, Phone, ArrowLeft, Loader2 } from 'lucide-react';

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
    } catch (err: any) {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        {/* Header */}
        <div className="auth-header">
          <img 
            src="/remove_background_logo_phone_shop.png" 
            alt="Sóc Mobile Logo" 
            style={{ height: '60px', width: 'auto', objectFit: 'contain', marginBottom: '8px' }} 
          />
          <h1 className="auth-title">{LABELS.AUTH.REGISTER_TITLE}</h1>
          <p className="auth-subtitle">{LABELS.AUTH.REGISTER_SUBTITLE}</p>
        </div>

        {/* Error info */}
        {error && (
          <div style={{ color: 'var(--color-danger)', fontSize: '13px', textAlign: 'center', backgroundColor: 'rgba(255,59,48,0.08)', padding: '10px', borderRadius: 'var(--radius-lg)' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Full Name */}
          <div className="auth-input-group">
            <label className="auth-input-label" htmlFor="fullName-input">{LABELS.AUTH.FULL_NAME}</label>
            <div className="auth-input-wrapper">
              <User className="auth-input-icon" size={18} />
              <input
                id="fullName-input"
                type="text"
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
                required
                className="auth-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-input-group">
            <label className="auth-input-label" htmlFor="email-input">{LABELS.AUTH.EMAIL}</label>
            <div className="auth-input-wrapper">
              <Mail className="auth-input-icon" size={18} />
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
            </div>
          </div>

          {/* Phone */}
          <div className="auth-input-group">
            <label className="auth-input-label" htmlFor="phone-input">{LABELS.AUTH.PHONE}</label>
            <div className="auth-input-wrapper">
              <Phone className="auth-input-icon" size={18} />
              <input
                id="phone-input"
                type="tel"
                placeholder="0987654321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                className="auth-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <label className="auth-input-label" htmlFor="password-input">{LABELS.AUTH.PASSWORD}</label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" size={18} />
              <input
                id="password-input"
                type="password"
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="auth-input"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="auth-input-group">
            <label className="auth-input-label" htmlFor="confirmPassword-input">{LABELS.AUTH.CONFIRM_PASSWORD}</label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" size={18} />
              <input
                id="confirmPassword-input"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
                className="auth-input"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary auth-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> {LABELS.AUTH.REGISTERING}
              </>
            ) : (
              LABELS.AUTH.REGISTER_BTN
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
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
  );
}
