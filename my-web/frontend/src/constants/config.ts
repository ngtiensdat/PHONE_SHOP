/**
 * App Settings Configuration
 * Static settings, LocalStorage keys, and client-side paths configuration.
 *
 * Related: src/lib/api-client.ts, src/store/useCartStore.ts
 */

export const APP_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api',
  
  // Storage keys
  STORAGE: {
    CART_KEY: 'phone-shop-cart',
    AUTH_TOKEN_KEY: 'phone-shop-token',
    THEME_KEY: 'phone-shop-theme',
  },

  // Route Paths
  ROUTES: {
    HOME: '/',
    PRODUCTS: '/products',
    VOUCHERS: '/vouchers',
    CART: '/cart',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    ADMIN: '/admin',
    POLICY: '/chinh-sach-bao-mat',
    TERMS: '/dieu-khoan-su-dung',
    INSTALLMENT: '/tra-gop',
    WARRANTY: '/bao-hanh',
    RETURNS: '/doi-tra',
    ABOUT: '/gioi-thieu',
    CONTACT: '/lien-he',
    PARTNER: '/hop-tac',
    COMPARE: '/compare',
  },
};
