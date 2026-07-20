/**
 * ProductsPage Component (/products)
 * Comprehensive Phone Listing & Catalog Page for Sóc Mobile.
 * Features:
 * - Real-time filtering by Brand, Price Range, Need Tag, Search Query
 * - Sorting by Price (Low/High), Rating, Best Sellers
 * - Grid display of phone products with full/compact cards & compare integration
 *
 * Related: src/data/mock-products.ts, src/components/features/product/ProductCard.tsx
 * Related: src/components/features/product/ProductDetailModal.tsx, src/store/useCompareStore.ts
 */

'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Smartphone, 
  Filter, 
  ArrowUpDown, 
  RotateCcw, 
  ShieldAlert,
  X
} from 'lucide-react';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import ProductCard from '@/components/features/product/ProductCard';
import ProductDetailModal from '@/components/features/product/ProductDetailModal';
import CompareFloatingBar from '@/components/features/product/CompareFloatingBar';
import Pagination from '@/components/base/Pagination';
import { FEATURED_PRODUCTS } from '@/data/mock-products';
import { MockProduct } from '@/types/product';

// Extract only phone products for this dedicated phone catalog
const ALL_PHONES = FEATURED_PRODUCTS.filter(p => p.category === 'Điện thoại');

const BRANDS = ['Tất cả', ...Array.from(new Set(ALL_PHONES.map(p => p.brand))).filter(Boolean)];
const ITEMS_PER_PAGE = 12;

const PRICE_RANGES = [
  { label: 'Tất cả mức giá', min: 0, max: Infinity },
  { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
  { label: 'Trên 20 triệu', min: 20000000, max: Infinity },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Nổi bật nhất' },
  { id: 'price-asc', label: 'Giá từ thấp đến cao' },
  { id: 'price-desc', label: 'Giá từ cao đến thấp' },
  { id: 'rating', label: 'Đánh giá cao nhất' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';

  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0); // index 0: Tất cả
  const [sortBy, setSortBy] = useState('featured');
  const [userQuery, setUserQuery] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);

  const searchQuery = userQuery !== null ? userQuery : searchFromUrl;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return ALL_PHONES.filter(product => {
      // Brand filter
      if (selectedBrand !== 'Tất cả' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Price filter
      const range = PRICE_RANGES[selectedPriceRange];
      if (product.price < range.min || product.price > range.max) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchSpecs = product.specs.chip.toLowerCase().includes(q) || product.specs.screen.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchSpecs) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [selectedBrand, selectedPriceRange, sortBy, searchQuery]);

  // Reset to page 1 whenever any filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, selectedPriceRange, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setSelectedBrand('Tất cả');
    setSelectedPriceRange(0);
    setSortBy('featured');
    setUserQuery('');
    setCurrentPage(1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      <Header />

      <main style={{ flexGrow: 1, padding: '24px 0 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Breadcrumb & Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <nav style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', gap: '6px' }}>
                <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Trang chủ</Link>
                <span>/</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Điện thoại chính hãng</span>
              </nav>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Smartphone size={26} style={{ color: '#6d28d9' }} /> Danh Sách Điện Thoại Chính Hãng
              </h1>
            </div>

            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Tìm thấy <strong style={{ color: '#6d28d9', fontSize: '15px' }}>{filteredProducts.length}</strong> sản phẩm
            </span>
          </div>

          {/* Filter Bar Panel */}
          <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            
            {/* Brand Chips */}
            <div style={{ marginBottom: '16px', maxWidth: '100%' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Hãng sản xuất:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '100%', overflowX: 'auto', paddingBottom: '4px' }}>
                {BRANDS.map(brand => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: selectedBrand === brand ? 800 : 600,
                      border: '1px solid',
                      borderColor: selectedBrand === brand ? '#6d28d9' : 'var(--border-color)',
                      background: selectedBrand === brand ? '#6d28d9' : 'var(--bg-secondary)',
                      color: selectedBrand === brand ? '#ffffff' : 'var(--text-primary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Ranges & Sorting */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
              
              {/* Price Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Filter size={14} /> Mức giá:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {PRICE_RANGES.map((range, idx) => (
                    <button
                      key={range.label}
                      type="button"
                      onClick={() => setSelectedPriceRange(idx)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: selectedPriceRange === idx ? 700 : 500,
                        border: '1px solid',
                        borderColor: selectedPriceRange === idx ? '#6d28d9' : 'var(--border-color)',
                        background: selectedPriceRange === idx ? 'rgba(109, 40, 217, 0.1)' : 'transparent',
                        color: selectedPriceRange === idx ? '#6d28d9' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowUpDown size={14} /> Sắp xếp:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="checkout-select"
                  style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '8px' }}
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>

                {(selectedBrand !== 'Tất cả' || selectedPriceRange !== 0 || searchQuery !== '') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}
                  >
                    <RotateCcw size={12} /> Bỏ lọc
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Active Search Query Tag */}
          {searchQuery && (
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Kết quả tìm kiếm cho:</span>
              <span style={{ background: '#6d28d9', color: '#fff', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                &quot;{searchQuery}&quot; <X size={12} style={{ cursor: 'pointer' }} onClick={() => setUserQuery('')} />
              </span>
            </div>
          )}

          {/* Product Grid Feed */}
          {filteredProducts.length > 0 ? (
            <>
              <div id="product-list-top" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', width: '100%', maxWidth: '100%' }}>
                {paginatedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetail={() => setSelectedProduct(product)}
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
            <div style={{ background: 'var(--bg-primary)', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', border: '1px solid var(--border-color)', margin: '24px 0' }}>
              <ShieldAlert size={48} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>Không tìm thấy điện thoại phù hợp</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>Vui lòng thử chọn lại hãng sản xuất hoặc mức giá khác.</p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleResetFilters}
                style={{ padding: '8px 20px', borderRadius: '10px' }}
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Floating Compare Bar */}
      <CompareFloatingBar />

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Đang tải danh sách điện thoại...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
