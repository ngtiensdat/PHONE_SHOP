/**
 * CartService
 * Encapsulates all cart-related API endpoints.
 *
 * Related: src/hooks/useCart.ts, src/lib/api-client.ts
 * Pattern: Service Layer
 */

import { api } from '@/lib/api-client';

export interface CartItemDto {
  variantId: number;
  quantity: number;
}

export const cartService = {
  getCart: async () => {
    return api.get<any>('/cart');
  },

  addItem: async (dto: CartItemDto) => {
    return api.post<any>('/cart/items', dto);
  },

  updateQuantity: async (variantId: number, quantity: number) => {
    return api.put<any>(`/cart/items/${variantId}`, { quantity });
  },

  removeItem: async (variantId: number) => {
    return api.delete<any>(`/cart/items/${variantId}`);
  },

  clearCart: async () => {
    return api.delete<any>('/cart');
  },
};
