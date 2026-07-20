/**
 * Order Domain Types & Interfaces
 * Defines data structures for Checkout, Order Tracking, Status Timeline, and Payments.
 *
 * Related: src/app/checkout/page.tsx, src/app/orders/page.tsx
 */

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';

export type FulfillmentMode = 'HOME_DELIVERY' | 'STORE_PICKUP';

export type PaymentMethodType = 'COD' | 'VIETQR' | 'DEPOSIT_5' | 'PAY_AT_STORE';

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  variant: string;
  quantity: number;
  price: number;
}

export interface TransactionLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'CREATE' | 'PAYMENT' | 'STATUS_CHANGE' | 'SYSTEM';
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  phone: string;
  address: string;
  fulfillmentMode?: FulfillmentMode;
  storeAddress?: string;
  appointmentTime?: string;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING';
  isDeposit?: boolean;
  depositAmount?: number;
  remainingAmount?: number;
  shippingFee: number;
  discount: number;
  voucherCode?: string | null;
  note?: string;
  items: OrderItem[];
  logs?: TransactionLog[];
}
