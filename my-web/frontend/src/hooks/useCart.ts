/**
 * useCart Hook
 * Custom React hook that abstracts all shopping cart logic.
 * Encapsulates the Zustand store and coordinates API sync if the user is authenticated.
 *
 * Related: src/store/useCartStore.ts, src/services/cart.service.ts
 * Pattern: Custom Hook for state abstraction (anti-leak store rule)
 */

'use client';

import { useCartStore as useStore, CartItem } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { cartService } from '@/services/cart.service';
import { toast } from '@/store/useToastStore';
import { useCallback } from 'react';

export function useCart() {
  const { user } = useAuthStore();
  const items = useStore((state) => state.items);
  const isOpen = useStore((state) => state.isOpen);
  const addItemStore = useStore((state) => state.addItem);
  const removeItemStore = useStore((state) => state.removeItem);
  const updateQuantityStore = useStore((state) => state.updateQuantity);
  const clearCartStore = useStore((state) => state.clearCart);
  const setOpen = useStore((state) => state.setOpen);

  // Sync with Backend if logged in
  const syncWithBackend = useCallback(async (action: () => Promise<void>) => {
    try {
      await action();
    } catch (error: any) {
      toast.error(error.message || 'Không thể đồng bộ giỏ hàng với hệ thống');
    }
  }, []);

  const addToCart = useCallback(
    async (item: CartItem) => {
      // Local updates first
      addItemStore(item);
      toast.success(`Đã thêm ${item.productName} vào giỏ hàng`);

      // Database sync
      if (user) {
        await syncWithBackend(async () => {
          await cartService.addItem({
            variantId: item.variantId,
            quantity: item.quantity,
          });
        });
      }
    },
    [addItemStore, user, syncWithBackend]
  );

  const removeFromCart = useCallback(
    async (variantId: number) => {
      const item = items.find((i) => i.variantId === variantId);
      removeItemStore(variantId);
      
      if (item) {
        toast.info(`Đã xóa ${item.productName} khỏi giỏ hàng`);
      }

      if (user) {
        await syncWithBackend(async () => {
          await cartService.removeItem(variantId);
        });
      }
    },
    [items, removeItemStore, user, syncWithBackend]
  );

  const updateQuantity = useCallback(
    async (variantId: number, quantity: number) => {
      updateQuantityStore(variantId, quantity);

      if (user) {
        await syncWithBackend(async () => {
          await cartService.updateQuantity(variantId, quantity);
        });
      }
    },
    [updateQuantityStore, user, syncWithBackend]
  );

  const clearCart = useCallback(async () => {
    clearCartStore();
    if (user) {
      await syncWithBackend(async () => {
        await cartService.clearCart();
      });
    }
  }, [clearCartStore, user, syncWithBackend]);

  // Calculations
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setOpen,
  };
}
