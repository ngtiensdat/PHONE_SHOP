/**
 * useCartStore
 * Zustand global store for shopping cart state.
 * Persisted to localStorage for guest cart persistence.
 *
 * Related: src/hooks/useCart.ts (public API), src/services/cart.service.ts
 * Pattern: Zustand store — access ONLY via useCart() hook, not directly in components
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { APP_CONFIG } from '@/constants/config';

export interface CartItem {
  variantId: number;
  productId: number;
  productName: string;
  color: string;
  storage: string;
  imageUrl: string | null;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions (internal — use useCart() hook externally)
  addItem: (item: CartItem) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const existing = get().items.find(
          (i) => i.variantId === newItem.variantId,
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.variantId === newItem.variantId
                ? { ...i, quantity: i.quantity + newItem.quantity }
                : i,
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, newItem] }));
        }
      },

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: APP_CONFIG.STORAGE.CART_KEY,
      // Only persist items, not isOpen
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
