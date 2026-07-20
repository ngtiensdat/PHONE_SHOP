/**
 * App Settings Configuration
 * Static settings, LocalStorage keys, and client-side paths configuration.
 *
 * Related: src/lib/api-client.ts, src/store/useCartStore.ts
 */

export const APP_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api',
  HOTLINE: '1800.2097',
  HOTLINE_TEL: '18002097',
  DEFAULT_PRODUCT_IMAGE: 'https://cdn.tgdd.vn/Products/Images/42/303891/iphone-15-plus-128gb-den-thumb-600x600.jpg',
  
  // Social & Customer Support Links
  SOCIAL: {
    FACEBOOK_SUPPORT: 'https://www.facebook.com/thu.hien.hien.893447',
  },

  // Storage keys
  STORAGE: {
    CART_KEY: 'phone-shop-cart',
    AUTH_TOKEN_KEY: 'phone-shop-token',
    THEME_KEY: 'phone-shop-theme',
    ORDERS_KEY: 'phoneshop_user_orders',
  },

  // Bank transfer configuration
  BANK: {
    ACCOUNT_NAME: 'NGUYEN TIEN DAT',
    ACCOUNT_NO: '0337562201',
    BANK_NAME: 'MB Bank (Ngân hàng Quân đội)',
    BANK_ID: 'mbbank',
  },

  // Store Pickup appointment timeslots
  APPOINTMENT_SLOTS: [
    'Hôm nay (15:00 - 18:00)',
    'Hôm nay (18:00 - 21:00)',
    'Ngày mai (09:00 - 12:00)',
    'Ngày mai (14:00 - 17:00)',
  ],

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
    TRADE_IN: '/thu-cu-doi-moi',
    RETURNS: '/doi-tra',
    ABOUT: '/gioi-thieu',
    CONTACT: '/lien-he',
    PARTNER: '/hop-tac',
    COMPARE: '/compare',
  },
};
