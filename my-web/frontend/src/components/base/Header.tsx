'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Phone, 
  FileText, 
  User, 
  ChevronDown, 
  X,
  Smartphone,
  CreditCard,
  Bot,
  ShieldCheck,
  Store,
  Grid,
  Navigation,
  Loader2
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { LABELS } from '@/constants/labels';
import { APP_CONFIG } from '@/constants/config';
import { CITY_COORDINATES, getNearestCity } from '@/utils/locationUtils';
import { toast } from '@/store/useToastStore';

const POPULAR_SEARCHES = [
  'iPhone 17 Pro Max',
  'Galaxy S26 Ultra',
  'Xiaomi 17T Pro',
  'OPPO Find X9',
  'Điện thoại dưới 10 triệu'
];

export default function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Hồ Chí Minh');
  const [nearestStore, setNearestStore] = useState('123 Nguyễn Trãi, Q.1');
  const [isLocating, setIsLocating] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const detectGPSLocation = useCallback((showToast = true) => {
    if (!navigator.geolocation) {
      if (showToast) toast.error('Trình duyệt của bạn không hỗ trợ định vị GPS.');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = getNearestCity(latitude, longitude);

        setSelectedLocation(nearest.name);
        setNearestStore(nearest.nearestStoreAddress);
        localStorage.setItem('user-location', nearest.name);
        localStorage.setItem('user-nearest-store', nearest.nearestStoreAddress);

        setIsLocating(false);
        if (showToast) {
          toast.success(`Đã định vị vị trí gần nhất: ${nearest.name} (${nearest.nearestStoreAddress})`);
        }
      },
      (error) => {
        setIsLocating(false);
        if (showToast) {
          if (error.code === error.PERMISSION_DENIED) {
            toast.warning('Bạn đã từ chối quyền truy cập GPS. Vui lòng chọn vị trí thủ công.');
          } else {
            toast.error('Không thể lấy vị trí GPS hiện tại.');
          }
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  // Load saved location from localStorage or detect GPS after client mount (prevents SSR Hydration mismatch)
  useEffect(() => {
    const savedLoc = localStorage.getItem('user-location');
    const savedStore = localStorage.getItem('user-nearest-store');
    
    if (savedLoc && savedStore) {
      setSelectedLocation(savedLoc);
      setNearestStore(savedStore);
    } else {
      detectGPSLocation(false);
    }
  }, [detectGPSLocation]);

  const handleSelectLocationManually = (cityName: string) => {
    const cityObj = CITY_COORDINATES.find(c => c.name === cityName);
    const storeAddr = cityObj ? cityObj.nearestStoreAddress : 'Showroom Sóc Mobile';

    setSelectedLocation(cityName);
    setNearestStore(storeAddr);
    localStorage.setItem('user-location', cityName);
    localStorage.setItem('user-nearest-store', storeAddr);
    setShowLocationDropdown(false);
    toast.info(`Đã đổi khu vực xem giá: ${cityName}`);
  };

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
      {/* Top Main Bar */}
      <div className="header-main-bar">
        <div className="header-container">
          
          {/* Logo */}
          <Link href={APP_CONFIG.ROUTES.HOME} className="header-logo">
            <img 
              src="/remove_background_logo_phone_shop.png" 
              alt="Sóc Mobile Logo" 
              className="logo-img"
            />
            <span className="logo-text">
              Sóc <span className="logo-highlight">Mobile</span>
            </span>
          </Link>

          {/* Location Selector with GPS & Nearest Store */}
          <div className="location-selector-wrapper" ref={locationRef}>
            <button 
              type="button" 
              className="header-location-btn" 
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              title={`Cửa hàng gần nhất: ${nearestStore}`}
            >
              <MapPin size={14} className="loc-icon" />
              <div className="loc-text">
                <span className="loc-title">Giá tại <strong>{selectedLocation}</strong></span>
                <span className="loc-value">{nearestStore}</span>
              </div>
              <ChevronDown size={12} className="chevron-icon" />
            </button>
            
            {showLocationDropdown && (
              <div className="location-dropdown-menu">
                {/* Auto GPS Trigger Button */}
                <button
                  type="button"
                  className="gps-detect-btn"
                  onClick={() => detectGPSLocation(true)}
                  disabled={isLocating}
                >
                  {isLocating ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Đang quét vị trí GPS...</span>
                    </>
                  ) : (
                    <>
                      <Navigation size={13} style={{ color: '#00f2fe' }} />
                      <span>Tự động định vị GPS gần bạn</span>
                    </>
                  )}
                </button>

                <div className="dropdown-divider" style={{ margin: '4px 0' }}></div>

                <div style={{ padding: '4px 12px 2px', fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Chọn Tỉnh/Thành phố
                </div>

                {CITY_COORDINATES.map(city => (
                  <button 
                    key={city.name}
                    type="button" 
                    className={selectedLocation === city.name ? 'active' : ''}
                    onClick={() => handleSelectLocationManually(city.name)}
                  >
                    <span>{city.name}</span>
                    <span className="store-sub">{city.nearestStoreAddress}</span>
                  </button>
                ))}
              </div>
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
                  <X size={14} />
                </button>
              )}
              <button type="submit" className="header-search-btn">
                <Search size={15} />
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
                    <span className="suggestion-title">Gợi ý tìm kiếm cho &quot;{searchQuery}&quot;</span>
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
          <a href="tel:18002097" className="header-hotline">
            <Phone size={15} className="hotline-icon" />
            <div className="hotline-info">
              <span className="hotline-label">Gọi mua hàng</span>
              <span className="hotline-number">1800.2097</span>
            </div>
          </a>

          {/* Track Orders */}
          <Link href="/orders/track" className="header-track-btn">
            <FileText size={16} />
            <span>Tra cứu đơn hàng</span>
          </Link>

          {/* Cart Button */}
          <Link href={APP_CONFIG.ROUTES.CART} className="header-cart-btn">
            <div className="cart-icon-wrapper">
              <ShoppingBag size={18} />
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
                  <ChevronDown size={12} />
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
                <User size={18} />
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Clean Secondary Navigation Bar */}
      <nav className="header-subnav">
        <div className="header-subnav-container">
          <Link href="/products" className="subnav-link">
            <Smartphone size={15} /> <span>Điện thoại</span>
          </Link>
          <Link href="/tra-gop" className="subnav-link highlight">
            <CreditCard size={15} /> <span>Trả góp 0%</span>
          </Link>
          <Link href="/compare" className="subnav-link ai-nav">
            <Bot size={15} /> <span>So sánh AI</span> <span className="nav-tag">AI</span>
          </Link>
          <Link href="/bao-hanh" className="subnav-link">
            <ShieldCheck size={15} /> <span>Bảo hành VIP</span>
          </Link>
          <Link href="/dia-chi" className="subnav-link">
            <Store size={15} /> <span>Cửa hàng (50+)</span>
          </Link>
          <Link href="/gioi-thieu" className="subnav-link">
            <Grid size={15} /> <span>Giới thiệu</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
