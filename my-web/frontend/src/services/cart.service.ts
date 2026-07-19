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
    return api.get<unknown>('/cart');
  },

  addItem: async (dto: CartItemDto) => {
    return api.post<unknown>('/cart/items', dto);
  },

  updateQuantity: async (variantId: number, quantity: number) => {
    return api.put<unknown>(`/cart/items/${variantId}`, { quantity });
  },

  removeItem: async (variantId: number) => {
    return api.delete<unknown>(`/cart/items/${variantId}`);
  },

  clearCart: async () => {
    return api.delete<unknown>('/cart');
  },
};
