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
import Pagination from '@/components/base/Pagination';
import HomeBanners from '@/components/features/home/HomeBanners';
import { FEATURED_PRODUCTS } from '@/data/mock-products';
import type { MockProduct } from '@/types/product';
import { LABELS } from '@/constants/labels';

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState(LABELS.FILTERS.CATEGORY_MOBILE);
  const [activeBrand, setActiveBrand] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Smart Need Classifier: Analyzes product name, brand & price to match user needs
  // This eliminates the requirement for manually tagging each product
  const matchesNeed = (product: MockProduct, need: string): boolean => {
    if (need === 'All') return true;
    const nameLower = product.name.toLowerCase();
    const brandLower = product.brand.toLowerCase();
    const price = product.price;

    switch (need) {
      case 'gaming':
        // Flagship chips, high RAM, gaming-oriented brands/models
        return (
          nameLower.includes('pro max') ||
          nameLower.includes('ultra') ||
          nameLower.includes('gaming') ||
          nameLower.includes('rog') ||
          nameLower.includes('redmagic') ||
          nameLower.includes('poco') ||
          (nameLower.includes('pro') && price >= 15000000) ||
          (brandLower === 'apple' && price >= 20000000) ||
          (brandLower === 'samsung' && (nameLower.includes('s2') || nameLower.includes('s3'))) ||
          (nameLower.includes('12gb') || nameLower.includes('16gb'))
        );

      case 'camera':
        // Camera-focused models: Pro/Ultra series, high-end phones
        return (
          nameLower.includes('pro max') ||
          nameLower.includes('ultra') ||
          nameLower.includes('camera') ||
          nameLower.includes('200mp') ||
          (brandLower === 'apple' && nameLower.includes('pro')) ||
          (brandLower === 'samsung' && (nameLower.includes('ultra') || nameLower.includes('s2'))) ||
          (brandLower === 'xiaomi' && nameLower.includes('ultra')) ||
          (brandLower === 'oppo' && nameLower.includes('reno')) ||
          (brandLower === 'vivo' && (nameLower.includes('v4') || nameLower.includes('v3')))
        );

      case 'pin':
        // Battery-focused: large battery phones, mid-range, Xiaomi/Samsung A-series
        return (
          nameLower.includes('pin') ||
          nameLower.includes('5000') ||
          nameLower.includes('6000') ||
          (brandLower === 'samsung' && nameLower.includes('galaxy a')) ||
          (brandLower === 'xiaomi' && (nameLower.includes('redmi') || nameLower.includes('poco'))) ||
          (brandLower === 'realme') ||
          (brandLower === 'oppo' && nameLower.includes('a')) ||
          (brandLower === 'nokia') ||
          price < 10000000
        );

      case 'premium':
        // Premium flagship: Highest tier phones
        return (
          price >= 20000000 ||
          nameLower.includes('pro max') ||
          nameLower.includes('ultra') ||
          nameLower.includes('fold') ||
          nameLower.includes('flip') ||
          nameLower.includes('titanium') ||
          (brandLower === 'apple' && nameLower.includes('pro'))
        );

      default:
        return true;
    }
  };

  // Filter Logic with Smart Need Classifier
  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    const matchesCategory = product.category === activeCategory;
    const matchesBrand = activeBrand === 'All' || product.brand.toLowerCase() === activeBrand.toLowerCase();
    const matchesTagOrNeed = matchesNeed(product, activeTag);
    return matchesCategory && matchesBrand && matchesTagOrNeed;
  });

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeBrand, activeTag]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
        <HomeBanners />

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
            <div id="product-list-top" className="products-feed-section">
              <div className="feed-header-row">
                <h2>{LABELS.HOMEPAGE.PRODUCT_LIST} {activeCategory.toUpperCase()}</h2>
                <span className="results-count">{LABELS.HOMEPAGE.FOUND} <strong>{filteredProducts.length}</strong> {LABELS.HOMEPAGE.PRODUCTS_SUFFIX}</span>
              </div>

              {filteredProducts.length > 0 ? (
                <>
                  <div className="products-grid main-feed-grid">
                    {paginatedProducts.map((product) => (
                      <CompactProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={() => setSelectedProduct(product)}
                      />
                    ))}
                  </div>

                  {/* Reusable Pagination Component */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={filteredProducts.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                  />
                </>
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

