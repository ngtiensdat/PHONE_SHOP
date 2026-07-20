/**
 * Pagination Component
 * Reusable, responsive pagination control component.
 * Features:
 * - Smart page number truncation (1 2 3 ... 14 15)
 * - Previous/Next buttons with icons
 * - Smooth scroll-to-top on page change
 * - Item range count summary display (e.g. "Hiển thị 1 - 12 trong 169 sản phẩm")
 *
 * Related: src/app/products/page.tsx, src/app/page.tsx
 */

'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
  scrollToTop?: boolean;
  targetId?: string; // Element ID of product list top
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 12,
  className = '',
  scrollToTop = true,
  targetId = 'product-list-top',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);

    if (scrollToTop) {
      let targetEl: HTMLElement | null = null;
      if (targetId) {
        targetEl = document.getElementById(targetId);
      }
      if (!targetEl) {
        targetEl = document.querySelector('.products-feed-section') || document.querySelector('.pagination-container')?.parentElement as HTMLElement;
      }

      if (targetEl) {
        const headerOffset = 100; // Account for sticky top header
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Generate array of page numbers with smart ellipsis
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  // Item range text
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : currentPage * itemsPerPage;

  return (
    <div 
      className={`pagination-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        marginTop: '32px',
        marginBottom: '16px',
        width: '100%',
      }}
    >
      {/* Item Range Info */}
      {totalItems !== undefined && (
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Trang <strong style={{ color: 'var(--color-primary)' }}>{currentPage}</strong> / {totalPages} (Hiển thị <strong>{startItem} - {endItem}</strong> trong <strong>{totalItems}</strong> sản phẩm)
        </span>
      )}

      {/* Page Buttons Wrapper */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* First Page */}
        <button
          type="button"
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          title="Trang đầu"
          aria-label="Trang đầu"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.4 : 1,
            transition: 'all 0.15s ease',
          }}
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Prev Page */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          title="Trang trước"
          aria-label="Trang trước"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 12px',
            height: '36px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.4 : 1,
            gap: '4px',
            transition: 'all 0.15s ease',
          }}
        >
          <ChevronLeft size={16} /> Trang trước
        </button>

        {/* Page Numbers */}
        {pages.map((p, idx) => {
          if (typeof p === 'string') {
            return (
              <span 
                key={`ellipsis-${idx}`} 
                style={{ padding: '0 6px', color: 'var(--text-muted)', fontSize: '14px', userSelect: 'none' }}
              >
                ...
              </span>
            );
          }

          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => handlePageClick(p)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '36px',
                height: '36px',
                padding: '0 10px',
                borderRadius: '10px',
                border: '1px solid',
                borderColor: isActive ? '#6d28d9' : 'var(--border-color)',
                background: isActive ? '#6d28d9' : 'var(--bg-primary)',
                color: isActive ? '#ffffff' : 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 12px rgba(109, 40, 217, 0.3)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {p}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Trang tiếp"
          aria-label="Trang tiếp"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 12px',
            height: '36px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.4 : 1,
            gap: '4px',
            transition: 'all 0.15s ease',
          }}
        >
          Trang sau <ChevronRight size={16} />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          title="Trang cuối"
          aria-label="Trang cuối"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.4 : 1,
            transition: 'all 0.15s ease',
          }}
        >
          <ChevronsRight size={16} />
        </button>

      </div>
    </div>
  );
}
