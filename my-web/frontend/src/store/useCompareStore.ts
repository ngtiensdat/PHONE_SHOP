/**
 * useCompareStore
 * Zustand global store for managing products selected for comparison.
 * Limits the list to a maximum of 2 products.
 *
 * Related: src/app/compare/page.tsx, src/components/features/product/ProductCard.tsx
 * Pattern: Zustand State Store
 */

import { create } from 'zustand';
import { MockProduct } from '@/types/product';
import { toast } from '@/store/useToastStore';

interface CompareState {
  comparedProducts: MockProduct[];
  addProduct: (product: MockProduct) => void;
  removeProduct: (productId: number) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  comparedProducts: [],

  addProduct: (product) => {
    const list = get().comparedProducts;
    
    // Check if already in list
    if (list.some((p) => p.id === product.id)) {
      set({ comparedProducts: list.filter((p) => p.id !== product.id) });
      toast.info(`Đã hủy so sánh ${product.name}`);
      return;
    }

    if (list.length >= 2) {
      toast.warning('Chỉ có thể so sánh tối đa 2 sản phẩm cùng lúc. Vui lòng bỏ bớt sản phẩm.');
      return;
    }

    set({ comparedProducts: [...list, product] });
    toast.success(`Đã thêm ${product.name} vào danh sách so sánh`);
  },

  removeProduct: (productId) => {
    set((state) => ({
      comparedProducts: state.comparedProducts.filter((p) => p.id !== productId),
    }));
  },

  clearCompare: () => set({ comparedProducts: [] }),
}));
