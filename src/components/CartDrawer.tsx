'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle, Info } from 'lucide-react';
import { useCartStore } from '@/src/store/useCartStore';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    toastMessage,
    clearToast,
    removeItem,
    updateQuantity,
    getSubtotal,
  } = useCartStore();

  // Auto-hide popup toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col relative">
          
          {/* Toast Notification Popup */}
          {toastMessage && (
            <div className="absolute top-16 left-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs font-medium border border-stone-700">
                <div className="flex items-center gap-2">
                  {toastMessage.includes('added') ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span className="line-clamp-1">{toastMessage}</span>
                </div>
                <button
                  onClick={clearToast}
                  className="text-stone-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2D5A43]" />
              <h2 className="text-lg font-serif font-bold text-stone-900">Your Cart</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500 text-sm">Your shopping cart is empty.</p>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const price =
                  product.isVariable && product.variants?.length
                    ? product.variants[0].price
                    : product.price || 0;

                return (
                  <div key={product.id} className="flex gap-4 pb-4 border-b border-stone-100">
                    <div className="relative w-20 h-20 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={product.images[0] || '/placeholder-product.jpg'}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-semibold text-stone-900 line-clamp-1">
                            {product.title}
                          </h3>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                            aria-label="Remove product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-bold text-[#2D5A43] mt-1">
                          ₦{price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-stone-200 rounded-full px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 hover:text-stone-900 text-stone-500"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-2">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 hover:text-stone-900 text-stone-500"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="flex justify-between text-sm font-semibold text-stone-900">
                <span>Subtotal</span>
                <span>₦{getSubtotal().toLocaleString()}</span>
              </div>
              <p className="text-xs text-stone-500">Shipping and taxes calculated at checkout.</p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full bg-[#2D5A43] hover:bg-[#234734] text-white text-center font-semibold text-sm py-3.5 rounded-full block transition-colors shadow-md"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}