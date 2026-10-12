import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/src/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

const getItemPrice = (item: CartItem) => {
  const selectedVariant = item.product.variants?.find(
    (variant) => variant.id === item.selectedVariant
  );
  return selectedVariant?.price ?? item.product.price ?? item.product.variants?.[0]?.price ?? 0;
};

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  toastMessage: string | null;
  openCart: () => void;
  closeCart: () => void;
  clearToast: () => void;
  addItem: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeItem: (productId: string, selectedVariant?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariant?: string) => void;
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

      addItem: (product, quantity = 1, selectedVariant) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedVariant === selectedVariant
          );

          let updatedItems = [...state.items];
          if (existingIndex > -1) {
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
          } else {
            updatedItems = [...state.items, { product, quantity, selectedVariant }];
          }

          return {
            items: updatedItems,
            isOpen: true, // Auto-open cart drawer
            toastMessage: `"${product.title}" added to cart!`,
          };
        });
      },

      removeItem: (productId, selectedVariant) => {
        set((state) => {
          const itemToRemove = state.items.find(
            (item) =>
              item.product.id === productId &&
              item.selectedVariant === selectedVariant
          );
          const productName = itemToRemove?.product.title || 'Item';

          return {
            items: state.items.filter(
              (item) =>
                item.product.id !== productId ||
                item.selectedVariant !== selectedVariant
            ),
            toastMessage: `"${productName}" removed from cart.`,
          };
        });
      },

      updateQuantity: (productId, quantity, selectedVariant) => {
        set((state) => {
          if (quantity <= 0) {
            const itemToRemove = state.items.find(
              (item) =>
                item.product.id === productId &&
                item.selectedVariant === selectedVariant
            );
            return {
              items: state.items.filter(
                (item) =>
                  item.product.id !== productId ||
                  item.selectedVariant !== selectedVariant
              ),
              toastMessage: `"${itemToRemove?.product.title || 'Item'}" removed from cart.`,
            };
          }
          return {
            items: state.items.map((item) =>
              item.product.id === productId && item.selectedVariant === selectedVariant
                ? { ...item, quantity }
                : item
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
          return total + getItemPrice(item) * item.quantity;
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