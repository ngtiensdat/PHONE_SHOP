/**
 * HomePage Component
 * Enhanced landing page for the Phone Shop.
 * Implements a modern layout resembling CellphoneS/TGDĐ:
 * - Dynamic Carousel Banner & Promo Grid
 * - Real-time Flash Sale Countdown Box (using CountdownTimer component)
 * - Interactive Brand & Tag Filtering (using ProductFilters component)
 * - Rich Product Grid
 *
 * Related: src/components/base/Header.tsx, src/components/features/product/ProductCard.tsx, src/types/product.ts, src/constants/labels.ts
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Flame, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import ProductCard from '@/components/features/product/ProductCard';
import CompactProductCard from '@/components/features/product/CompactProductCard';
import ProductDetailModal from '@/components/features/product/ProductDetailModal';
import CountdownTimer from '@/components/features/flashsale/CountdownTimer';
import ProductFilters from '@/components/features/filter/ProductFilters';
import CompareFloatingBar from '@/components/features/product/CompareFloatingBar';
import { FEATURED_PRODUCTS } from '@/data/mock-products';
import type { MockProduct } from '@/types/product';
import { LABELS } from '@/constants/labels';

// Mock banners
const HERO_BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop',
    title: 'Galaxy S26 Ultra - Siêu Phẩm AI',
    sub: 'Đăng ký sớm nhận voucher 500k',
    link: '/products/samsung-galaxy-s26-ultra'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
    title: 'iPhone 17 Pro Max - Titanium',
    sub: 'Sở hữu ngay với trả góp 0%',
    link: '/products/iphone-17-pro-max'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
    title: 'Xiaomi 17T Pro - Vua Hiệu Năng',
    sub: 'Sạc nhanh 120W, đầy pin trong 19 phút',
    link: '/products/xiaomi-17t-pro-5g'
  }
];

const PROMO_SIDE_BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=400&auto=format&fit=crop',
    title: 'MacBook Pro M5',
    sub: 'Nay chỉ từ 35.990.000đ',
    link: '#'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop',
    title: 'Phụ kiện Apple',
    sub: 'Giảm đến 30% khi mua kèm',
    link: '#'
  }
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState(LABELS.FILTERS.CATEGORY_MOBILE);
  const [activeBrand, setActiveBrand] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide Auto Play Effect
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  // Filter Logic
  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    const matchesCategory = product.category === activeCategory;
    const matchesBrand = activeBrand === 'All' || product.brand.toLowerCase() === activeBrand.toLowerCase();
    const matchesTag = activeTag === 'All' || product.tags.includes(activeTag.toLowerCase());
    return matchesCategory && matchesBrand && matchesTag;
  });

  // Dynamic Brands list based on active category
  const activeCategoryProducts = FEATURED_PRODUCTS.filter(p => p.category === activeCategory);
  const brands = ['All', ...Array.from(new Set(activeCategoryProducts.map(p => p.brand)))];

  // Flash Sale products (Phone category only)
  const flashSaleProducts = FEATURED_PRODUCTS.filter(p => p.category === LABELS.FILTERS.CATEGORY_MOBILE).slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Global Shared Header */}
      <Header />

      <main className="main-content-layout">
        
        {/* Banner Section - CellphoneS Style */}
        <section className="banner-grid-section">
          <div className="banner-grid-container">
            
            {/* Main Carousel Slider */}
            <div className="main-carousel">
              {HERO_BANNERS.map((banner, index) => (
                <div 
                  key={banner.id} 
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 30%, transparent), url(${banner.image})` }}
                >
                  <div className="slide-content">
                    <span className="slide-tag">{LABELS.HOMEPAGE.EXCLUSIVE_TAG}</span>
                    <h2>{banner.title}</h2>
                    <p>{banner.sub}</p>
                    <Link href={banner.link} className="btn btn-primary btn-sm">
                      {LABELS.HOMEPAGE.SEE_DETAILS} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
              
              {/* Slider Controls */}
              <button type="button" className="carousel-control prev" onClick={handlePrevSlide}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" className="carousel-control next" onClick={handleNextSlide}>
                <ChevronRight size={20} />
              </button>
              
              {/* Slider Indicators */}
              <div className="carousel-indicators">
                {HERO_BANNERS.map((_, index) => (
                  <button 
                    key={index} 
                    type="button" 
                    className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>

            {/* Side Static Banners */}
            <div className="side-banners">
              {PROMO_SIDE_BANNERS.map((banner) => (
                <div 
                  key={banner.id} 
                  className="side-banner-card"
                  style={{ backgroundImage: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85)), url(${banner.image})` }}
                >
                  <div className="side-banner-content">
                    <h3>{banner.title}</h3>
                    <p>{banner.sub}</p>
                    <Link href={banner.link} className="side-banner-link">{LABELS.HOMEPAGE.BUY_NOW_PROMO} &rarr;</Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="flashsale-section">
          <div className="flashsale-container">
            <div className="flashsale-header">
              <div className="flashsale-title">
                <Flame size={24} className="flame-icon" fill="currentColor" />
                <h2>{LABELS.HOMEPAGE.FLASH_SALE_TITLE}</h2>
              </div>
              <div className="flashsale-countdown">
                <span className="countdown-label">{LABELS.HOMEPAGE.FLASH_SALE_END}</span>
                <CountdownTimer initialHours={4} initialMinutes={15} initialSeconds={30} />
              </div>
            </div>

            <div className="flashsale-products-grid">
              {flashSaleProducts.map((product) => {
                const flashProduct = {
                  ...product,
                  variants: product.variants.map((v, i) => i === 0 ? {
                    ...v,
                    price: Math.round(v.price * 0.9) // 10% cheaper for flash sale
                  } : v)
                };
                return (
                  <ProductCard 
                    key={`flash-${product.id}`} 
                    product={flashProduct} 
                    onViewDetail={() => setSelectedProduct(flashProduct)}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Storefront Area: Sidebar (Left Banner) + Main Product Feed (Right) */}
        <div className="storefront-layout">
          
          {/* Left Vertical Banner (TGDĐ style) */}
          <aside className="storefront-sidebar-banner">
            <div className="sidebar-sticky-banner">
              <div className="inner-banner-bg" style={{ backgroundImage: `url('/iphone_17_banner.png')` }}>
                <div className="banner-text-overlay">
                  <h4>{LABELS.HOMEPAGE.UPGRADE_TITLE}</h4>
                  <h3>iPhone 17</h3>
                  <p>{LABELS.HOMEPAGE.INSTALLMENT_PROMO}</p>
                  <p className="price-tag">{LABELS.HOMEPAGE.PRICE_FROM}</p>
                  <Link href="/products/iphone-17-pro-max" className="btn btn-primary btn-sm btn-full">
                    {LABELS.HOMEPAGE.SHOP_NOW}
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <div className="storefront-main-feed">
            
            {/* Filter Controls Panel */}
            <ProductFilters 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeBrand={activeBrand}
              setActiveBrand={setActiveBrand}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              brands={brands}
            />

            {/* Product Feed Grid */}
            <div className="products-feed-section">
              <div className="feed-header-row">
                <h2>{LABELS.HOMEPAGE.PRODUCT_LIST} {activeCategory.toUpperCase()}</h2>
                <span className="results-count">{LABELS.HOMEPAGE.FOUND} <strong>{filteredProducts.length}</strong> {LABELS.HOMEPAGE.PRODUCTS_SUFFIX}</span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="products-grid main-feed-grid">
                  {filteredProducts.map((product) => (
                    <CompactProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-results-box">
                  <ShieldAlert size={48} className="empty-icon" />
                  <h3>{LABELS.HOMEPAGE.EMPTY_TITLE}</h3>
                  <p>{LABELS.HOMEPAGE.EMPTY_DESC}</p>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setActiveBrand('All');
                      setActiveTag('All');
                    }}
                  >
                    {LABELS.HOMEPAGE.RESET_FILTERS}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </main>

      {/* Global Shared Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Floating Compare Bar */}
      <CompareFloatingBar />
    </div>
  );
}

