import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/src/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  toastMessage: string | null;
  openCart: () => void;
  closeCart: () => void;
  clearToast: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toastMessage: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      clearToast: () => set({ toastMessage: null }),

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          let updatedItems = [...state.items];
          if (existingIndex > -1) {
            updatedItems[existingIndex].quantity += quantity;
          } else {
            updatedItems = [...state.items, { product, quantity }];
          }

          return {
            items: updatedItems,
            isOpen: true, // Auto-open cart drawer
            toastMessage: `"${product.title}" added to cart!`,
          };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const itemToRemove = state.items.find((item) => item.product.id === productId);
          const productName = itemToRemove?.product.title || 'Item';

          return {
            items: state.items.filter((item) => item.product.id !== productId),
            toastMessage: `"${productName}" removed from cart.`,
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            const itemToRemove = state.items.find((item) => item.product.id === productId);
            return {
              items: state.items.filter((item) => item.product.id !== productId),
              toastMessage: `"${itemToRemove?.product.title || 'Item'}" removed from cart.`,
            };
          }
          return {
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          };
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price =
            item.product.isVariable && item.product.variants?.length
              ? item.product.variants[0].price
              : item.product.price || 0;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'shopping-cart-storage',
      // Exclude UI-only states from localStorage persistence
      partialize: (state) => ({ items: state.items }),
    }
  )
);