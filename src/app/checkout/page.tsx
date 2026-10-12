'use client';

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore } from '@/src/store/useCartStore';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoadingState />}>
      <CheckoutPageContent />
    </Suspense>
  );
}

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const isBookingCheckout = searchParams.get('source') === 'booking';
  const bookingService = searchParams.get('service') || 'Herbal Consultation';
  const bookingAmount = Number(searchParams.get('amount') || '20000');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        clearCart();
        alert(`Order Placed Successfully! Order ID: ${data.orderId}`);
        router.push('/shop');
      } else {
        alert(data.error || 'Failed to place order.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !isBookingCheckout) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-stone-50">
        <h1 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push('/shop')}
          className="bg-[#2D5A43] text-white px-6 py-3 rounded-full text-sm font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  if (isBookingCheckout && items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F4EE] py-12 px-6 lg:px-16 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-stone-200 shadow-sm p-8 md:p-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-3">
            CONSULTATION CHECKOUT
          </span>
          <h1 className="text-3xl font-serif text-stone-900 mb-4">Complete your booking</h1>
          <div className="space-y-4 text-sm text-stone-600">
            <div className="flex justify-between gap-4 border-b border-stone-200 pb-3">
              <span>Service</span>
              <span className="font-semibold text-stone-900">{bookingService}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-stone-200 pb-3">
              <span>Amount</span>
              <span className="font-semibold text-stone-900">₦{bookingAmount.toLocaleString()}</span>
            </div>
            <p className="leading-relaxed">
              This booking is reserved for a one-on-one consultation with our wellness specialist.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                alert('Consultation booked successfully! We will contact you shortly to confirm your session.');
                router.push('/hub/consultation');
              }}
              className="flex-1 bg-[#2D5A43] hover:bg-[#234734] text-white font-bold py-3.5 rounded-full transition-colors"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={() => router.push('/hub/consultation')}
              className="flex-1 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold py-3.5 rounded-full transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4EE] py-12 px-6 lg:px-16 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Shipping Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Shipping Details</h2>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                onChange={handleChange}
                className="w-full p-3 border border-stone-300 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-stone-300 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-stone-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Address</label>
              <input
                type="text"
                name="address"
                required
                onChange={handleChange}
                className="w-full p-3 border border-stone-300 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-stone-300 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-stone-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#2D5A43] hover:bg-[#234734] text-white font-bold py-4 rounded-full transition-colors cursor-pointer"
            >
              {loading ? 'Processing...' : `Pay ₦${getSubtotal().toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 bg-stone-100 p-8 rounded-3xl border border-stone-200/80 h-fit">
          <h2 className="text-xl font-serif font-bold text-stone-900 mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
            {items.map(({ product, quantity, selectedVariant }) => {
              const variant = product.variants?.find((item) => item.id === selectedVariant);
              const price = variant?.price ?? product.price ?? product.variants?.[0]?.price ?? 0;

              return (
              <div key={`${product.id}:${selectedVariant || ''}`} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0">
                    <Image src={product.images[0] || '/placeholder-product.jpg'} alt={product.title} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 line-clamp-1">{product.title}</p>
                    <p className="text-xs text-stone-500">
                      {variant ? `${variant.name} · ` : ''}Qty: {quantity}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-stone-800">
                  ₦{(price * quantity).toLocaleString()}
                </span>
              </div>
              );
            })}
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">₦{getSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Shipping</span>
              <span>Calculated next step</span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 border-t border-stone-200 pt-3">
              <span>Total</span>
              <span className="text-[#2D5A43]">₦{getSubtotal().toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function CheckoutLoadingState() {
  return (
    <div className="min-h-screen bg-[#F6F4EE] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#2D5A43]" />
        <p className="mt-4 text-sm font-medium text-stone-600">Preparing checkout...</p>
      </div>
    </div>
  );
}