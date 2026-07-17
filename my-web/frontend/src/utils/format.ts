/**
 * Format Utilities
 * Helper functions for formatting values like currency, dates, etc.
 *
 * Related: src/app/page.tsx
 * Pattern: Pure helper functions
 */

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(amount)
    .replace(/\s₫/, 'đ'); // Format output: 34.990.000đ thay vì 34.990.000 ₫
}
