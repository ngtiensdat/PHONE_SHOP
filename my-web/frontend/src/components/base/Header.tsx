/**
 * Header Component
 * Global navigation header for PHONE_SHOP application.
 * Features: Location selector, autocomplete search bar, hotlines, and auth status.
 *
 * Related: src/app/layout.tsx, src/app/globals.css, src/hooks/useAuth.ts
 * Pattern: Interactive Header with Navigation
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Smartphone, 
  Search, 
  MapPin, 
  Phone, 
  FileText, 
  User, 
  ChevronDown, 
  X,
  History
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { LABELS } from '@/constants/labels';
import { APP_CONFIG } from '@/constants/config';

const POPULAR_SEARCHES = [
  'iPhone 17 Pro Max',
  'Galaxy S26 Ultra',
  'Xiaomi 17T Pro',
  'OPPO Find X9',
  'Điện thoại dưới 10 triệu'
];

const LOCATIONS = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'];

export default function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Hồ Chí Minh');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${APP_CONFIG.ROUTES.PRODUCTS}?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (keyword: string) => {
    setSearchQuery(keyword);
    router.push(`${APP_CONFIG.ROUTES.PRODUCTS}?search=${encodeURIComponent(keyword)}`);
    setShowSuggestions(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        
        {/* Logo */}
        <Link href={APP_CONFIG.ROUTES.HOME} className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/remove_background_logo_phone_shop.png" 
            alt="Sóc Mobile Logo" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
          />
          <span className="logo-text">
            Sóc <span className="logo-highlight">Mobile</span>
          </span>
        </Link>

        {/* Location Selector */}
        <div className="location-selector-wrapper" ref={locationRef}>
          <button 
            type="button" 
            className="header-location-btn" 
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <MapPin size={16} className="loc-icon" />
            <div className="loc-text">
              <span className="loc-title">Xem giá tại</span>
              <span className="loc-value">{selectedLocation}</span>
            </div>
            <ChevronDown size={14} className="chevron-icon" />
          </button>
          
          {showLocationDropdown && (
            <ul className="location-dropdown-menu">
              {LOCATIONS.map(loc => (
                <li key={loc}>
                  <button 
                    type="button" 
                    className={selectedLocation === loc ? 'active' : ''}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                  >
                    {loc}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Bar */}
        <div className="header-search-container" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="header-search-form">
            <input
              type="text"
              placeholder="Bạn cần tìm điện thoại gì?..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="header-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
              >
                <X size={16} />
              </button>
            )}
            <button type="submit" className="header-search-btn">
              <Search size={18} />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="search-suggestions-panel">
              <div className="suggestion-section">
                <span className="suggestion-title">Tìm kiếm phổ biến</span>
                <div className="suggestion-keywords">
                  {POPULAR_SEARCHES.map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      className="keyword-chip"
                      onClick={() => handleSuggestionClick(keyword)}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
              
              {searchQuery && (
                <div className="suggestion-section suggestion-predictive">
                  <span className="suggestion-title">Gợi ý tìm kiếm cho "{searchQuery}"</span>
                  <button 
                    type="button" 
                    className="predictive-item"
                    onClick={() => handleSuggestionClick(searchQuery)}
                  >
                    <Search size={14} style={{ marginRight: '8px' }} />
                    Tìm kiếm sản phẩm chứa: <strong>{searchQuery}</strong>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contact Hotline */}
        <div className="header-hotline">
          <Phone size={16} className="hotline-icon" />
          <div className="hotline-info">
            <span className="hotline-label">Gọi mua hàng</span>
            <a href="tel:18002097" className="hotline-number">1800.2097</a>
          </div>
        </div>

        {/* Track Orders */}
        <Link href="/orders/track" className="header-track-btn">
          <FileText size={18} />
          <span>Tra cứu<br/>đơn hàng</span>
        </Link>

        {/* Cart Button */}
        <Link href={APP_CONFIG.ROUTES.CART} className="header-cart-btn btn-primary">
          <div className="cart-icon-wrapper">
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
          <span className="cart-btn-text">{LABELS.COMMON.CART}</span>
        </Link>

        {/* User Account / Login */}
        <div className="header-user-account" ref={userRef}>
          {isAuthenticated && user ? (
            <>
              <button 
                type="button" 
                className="user-profile-trigger" 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className="avatar-placeholder">
                  {user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
                <span className="username-text">{user.fullName || 'Tài khoản'}</span>
                <ChevronDown size={14} />
              </button>
              
              {showUserDropdown && (
                <ul className="user-dropdown-menu">
                  <li>
                    <Link href="/dashboard" onClick={() => setShowUserDropdown(false)}>
                      Trang cá nhân
                    </Link>
                  </li>
                  {user.role === 'ADMIN' && (
                    <li>
                      <Link href="/admin" onClick={() => setShowUserDropdown(false)}>
                        Quản trị hệ thống
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href="/orders" onClick={() => setShowUserDropdown(false)}>
                      Lịch sử mua hàng
                    </Link>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <button 
                      type="button" 
                      onClick={() => {
                        void logout();
                        setShowUserDropdown(false);
                      }}
                      className="logout-action-btn"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <Link href={APP_CONFIG.ROUTES.LOGIN} className="header-login-btn">
              <User size={20} />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
