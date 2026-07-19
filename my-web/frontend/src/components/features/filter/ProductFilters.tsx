/**
 * ProductFilters Component
 * Interactive category, brand, and tag filters for the phone store.
 *
 * Related: src/app/page.tsx, src/constants/labels.ts
 * Pattern: Filter Panel Presentation
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Gamepad2, Camera, BatteryCharging } from 'lucide-react';
import { LABELS } from '@/constants/labels';

interface ProductFiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeBrand: string;
  setActiveBrand: (brand: string) => void;
  activeTag: string;
  setActiveTag: (tag: string) => void;
  brands: string[];
}

export default function ProductFilters({
  activeCategory,
  setActiveCategory,
  activeBrand,
  setActiveBrand,
  activeTag,
  setActiveTag,
  brands
}: ProductFiltersProps) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const needsTags = [
    { value: 'All', label: LABELS.FILTERS.ALL_NEEDS, icon: null },
    { value: 'premium', label: LABELS.FILTERS.NEED_PREMIUM, icon: <Sparkles size={14} /> },
    { value: 'gaming', label: LABELS.FILTERS.NEED_GAMING, icon: <Gamepad2 size={14} /> },
    { value: 'camera', label: LABELS.FILTERS.NEED_CAMERA, icon: <Camera size={14} /> },
    { value: 'pin', label: LABELS.FILTERS.NEED_BATTERY, icon: <BatteryCharging size={14} /> }
  ];

  return (
    <div className="filter-panel-box">
      {/* Category Selector Row */}
      <div className="filter-row" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
        <span className="filter-label">{LABELS.FILTERS.CATEGORY_LABEL}</span>
        <div className="filter-options-scroll custom-scrollbar" style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'visible' }}>
          <button
            type="button"
            className={`filter-chip-btn ${activeCategory === LABELS.FILTERS.CATEGORY_MOBILE ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(LABELS.FILTERS.CATEGORY_MOBILE);
              setActiveBrand('All');
            }}
          >
            {LABELS.FILTERS.CATEGORY_MOBILE}
          </button>
          
          {/* Dropdown Khác */}
          <div style={{ position: 'relative' }} ref={categoryDropdownRef}>
            <button
              type="button"
              className={`filter-chip-btn ${activeCategory !== LABELS.FILTERS.CATEGORY_MOBILE ? 'active' : ''}`}
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              {activeCategory === LABELS.FILTERS.CATEGORY_MOBILE ? LABELS.FILTERS.CATEGORY_OTHER : activeCategory} ▾
            </button>
            
            {showCategoryDropdown && (
              <div className="category-dropdown-menu" style={{
                position: 'absolute',
                top: '115%',
                left: 0,
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                borderRadius: 'var(--radius-lg)',
                padding: '6px 0',
                minWidth: '160px',
                zIndex: 1010,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}>
                {[LABELS.FILTERS.CATEGORY_LAPTOP, LABELS.FILTERS.CATEGORY_TABLET, LABELS.FILTERS.CATEGORY_WATCH, LABELS.FILTERS.CATEGORY_ACCESSORY].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveBrand('All');
                      setShowCategoryDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      textAlign: 'left',
                      border: 'none',
                      background: activeCategory === cat ? 'var(--color-primary-tint)' : 'transparent',
                      color: activeCategory === cat ? 'var(--color-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-small)',
                      fontWeight: activeCategory === cat ? '600' : 'normal',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brands Filter Row */}
      <div className="filter-row">
        <span className="filter-label">{LABELS.FILTERS.BRAND_LABEL}</span>
        <div className="filter-options-scroll custom-scrollbar">
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              className={`filter-chip-btn ${activeBrand === brand ? 'active' : ''}`}
              onClick={() => setActiveBrand(brand)}
            >
              {brand === 'All' ? LABELS.FILTERS.ALL_BRANDS : brand}
            </button>
          ))}
        </div>
      </div>

      {/* Needs Filter Row */}
      <div className="filter-row" style={{ marginTop: '16px', borderTop: '1px dashed var(--border-color)', paddingTop: '16px' }}>
        <span className="filter-label">{LABELS.FILTERS.NEED_LABEL}</span>
        <div className="filter-options-scroll custom-scrollbar">
          {needsTags.map((tag) => (
            <button
              key={tag.value}
              type="button"
              className={`filter-chip-btn with-icon ${activeTag === tag.value ? 'active' : ''}`}
              onClick={() => setActiveTag(tag.value)}
            >
              {tag.icon && <span className="chip-icon">{tag.icon}</span>}
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

