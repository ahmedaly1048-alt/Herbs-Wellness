'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Heart, Share2, Minus, Plus } from 'lucide-react';

import ShopNavbar from '@/src/components/ShopNavbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import { Product } from '@/src/types/product';
import ProductGrid from '@/src/components/ProductGrid';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useCartStore } from '@/src/store/useCartStore';

export default function ProductClientView({
  product,
  initialRelatedProducts = [],
}: {
  product: Product;
  initialRelatedProducts?: Product[];
}) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(
    product.isVariable && product.variants ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse' | 'additional'>('benefits');
  const [wishlisted, setWishlisted] = useState(false);

  const { isAuthenticated } = useAuthStore();
  const { addItem } = useCartStore();

  const unitPrice = selectedVariant ? selectedVariant.price : (product.price || 0);
  const subtotal = unitPrice * quantity;

  const currentPath = `/shop/product/${product.slug}`;

  // ─── Auth-gated actions with direct redirect to signup ─────────────────────
  const handleWishlist = () => {
    if (!isAuthenticated()) {
      router.push(`/register?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    setWishlisted((prev) => !prev);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      router.push(`/register?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated()) {
      router.push(`/register?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    addItem(product, quantity);
  };

  const relatedProducts = initialRelatedProducts;

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-stone-800 font-sans flex flex-col justify-between">
      <div>
        <ShopNavbar />

        <main className="max-w-7xl mx-auto px-6 lg:px-16 py-8 space-y-16">
          {/* Breadcrumb Navigation */}
          <nav className="text-xs text-stone-400 flex items-center gap-1.5">
            <Link href="/shop" className="hover:text-stone-700">Shop</Link>
            <span>/</span>
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
          </nav>

          {/* Top Main Section: Image + Purchase Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Big Product Image Showcase */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-square rounded-3xl bg-[#ECE8E1] p-12 flex items-center justify-center border border-stone-200/50">
                <Image
                  src={product.images[0] || "/placeholder-product.jpg"}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain p-8"
                />
              </div>
            </div>

            {/* Right: Buy Sidebar Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  <span>HERBS & WELLNESS</span>
                  <span className="text-[#2D5A43]">IN STOCK</span>
                </div>
                <h1 className="text-3xl font-serif text-stone-900">{product.title}</h1>
              </div>

              {/* Price */}
              <div>
                <span className="text-xs uppercase font-semibold text-stone-400 block mb-1">PRICE</span>
                <span className="text-2xl font-serif font-bold text-stone-900">
                  ₦{unitPrice.toLocaleString()}
                </span>
              </div>

              {/* Rating & Action Links */}
              <div className="flex items-center gap-4 text-xs text-stone-600 border-y border-stone-200/80 py-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                  <span className="font-semibold text-stone-800">{product.rating || 5.0}</span>
                  <span className="text-stone-400">· {product.reviewCount || 1} reviews</span>
                </div>

                {/* ── Auth-gated: Wishlist ── */}
                <button
                  type="button"
                  id="product-wishlist-btn"
                  onClick={handleWishlist}
                  className={`flex items-center gap-1 transition-colors ${
                    wishlisted ? 'text-rose-500' : 'hover:text-stone-900'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                  {wishlisted ? 'Saved' : 'Wishlist'}
                </button>

                <button type="button" className="flex items-center gap-1 hover:text-stone-900">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>

              {/* Savings Banner Pill */}
              <div className="bg-[#EBF2EE] text-[#2D5A43] text-xs font-medium px-4 py-2 rounded-full inline-block">
                Buy 3+ &amp; save 2% (₦{(unitPrice * 0.98).toLocaleString()} each)
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Quantity Selector & Subtotal Action */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-stone-500 hover:text-stone-900 pr-2"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-semibold text-stone-800">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-stone-500 hover:text-stone-900 pl-2"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-xs text-stone-500">
                    Subtotal <strong className="text-stone-900">₦{subtotal.toLocaleString()}</strong>
                  </span>
                </div>

                {/* ── Primary Buttons (Redirects to signup if not logged in) ── */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="product-add-to-cart-btn"
                    type="button"
                    onClick={handleAddToCart}
                    className="bg-[#2D5A43] hover:bg-[#234734] text-white text-xs font-semibold py-3.5 rounded-full transition-all"
                  >
                    Add to cart
                  </button>
                  <button
                    id="product-buy-now-btn"
                    type="button"
                    onClick={handleBuyNow}
                    className="bg-[#D9C4AC] hover:bg-[#cbb297] text-stone-900 text-xs font-semibold py-3.5 rounded-full transition-all"
                  >
                    Buy now
                  </button>
                </div>

                {/* Subtle login nudge when not authenticated */}
                {!isAuthenticated() && (
                  <p className="text-[11px] text-stone-400 text-center">
                    <Link
                      href={`/login?redirect=${encodeURIComponent(currentPath)}`}
                      className="text-[#2D5A43] hover:underline font-medium"
                    >
                      Sign in
                    </Link>{' '}
                    or{' '}
                    <Link
                      href={`/register?redirect=${encodeURIComponent(currentPath)}`}
                      className="text-[#2D5A43] hover:underline font-medium"
                    >
                      create an account
                    </Link>{' '}
                    to shop
                  </p>
                )}
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-stone-500 pt-4 border-t border-stone-200/80">
                <div className="space-y-0.5">
                  <span className="font-semibold text-stone-700 block">Home delivery or pickup</span>
                  <span>at checkout</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-semibold text-stone-700 block">Verified order</span>
                  <span>before dispatch</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-semibold text-stone-700 block">Earn reward points</span>
                  <span>per purchase</span>
                </div>
              </div>
            </div>

          </div>

          {/* Details Pill Tabs */}
          <div className="space-y-6 pt-8">
            <div className="flex gap-2 border-b border-stone-200 pb-3">
              {[
                { id: 'benefits', label: 'Benefits' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'howToUse', label: 'How to use' },
                { id: 'additional', label: 'Additional info' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-stone-900 shadow-2xs border border-stone-200/80'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/60 shadow-2xs text-xs text-stone-600 leading-relaxed max-w-4xl space-y-2">
              {activeTab === 'benefits' && (
                <ol className="list-decimal pl-4 space-y-1.5 font-light">
                  <li>Contains carvacrol and thymol compounds for natural botanical support.</li>
                  <li>Supports internal body system balance and defenses.</li>
                  <li>Rich in natural antioxidants to help combat oxidation.</li>
                  <li>Supports digestive and gut system health.</li>
                  <li>Helps ease seasonal respiratory discomfort.</li>
                </ol>
              )}
              {activeTab === 'ingredients' && (
                <p>100% Pure cold-pressed organic botanical formulation. Free from fillers or artificial additives.</p>
              )}
              {activeTab === 'howToUse' && (
                <p>Take 2-3 drops daily mixed with water or as recommended by your herbal practitioner.</p>
              )}
              {activeTab === 'additional' && (
                <p>Store in a cool, dry place away from direct heat and sunlight.</p>
              )}
            </div>
          </div>

          {/* Review Rating Section */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
                  REVIEWS
                </span>
                <h2 className="text-3xl font-serif text-stone-900">5.0 - 1 reviews</h2>
              </div>
              <button
                type="button"
                className="bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold px-5 py-2.5 rounded-full shadow-2xs"
              >
                Write a review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Snapshot Card */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-2xs space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                  RATING SNAPSHOT
                </span>
                <div className="text-4xl font-serif font-bold text-stone-900">5.0</div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                  ))}
                </div>
                <p className="text-[11px] text-stone-400">Based on 1 product review.</p>
                <button
                  type="button"
                  className="w-full bg-[#D9C4AC] hover:bg-[#cbb297] text-stone-900 text-xs font-medium py-2.5 rounded-full transition-colors mt-2"
                >
                  Rate this product
                </button>
              </div>

              {/* Review Comment Card */}
              <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-stone-200/60 shadow-2xs space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                  ))}
                </div>
                <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wide">
                  HEALED FROM MUSCLE PULL PAIN
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  It was recommended for body discomfort. Stopped using it when it healed. I later had muscle pull issues and applied a few drops directly. It relieved the pain within minutes. Highly recommend!
                </p>
                <span className="text-[10px] text-stone-400 block pt-2">
                  Peace — 3 Aug 2026
                </span>
              </div>
            </div>
          </div>

          {/* Related / Pairs Well With Section */}
          <div className="pt-8">
            <ProductGrid
              title="Pairs well with this"
              subtitle="YOU MAY ALSO LOVE"
              products={relatedProducts}
              actionLink={{ text: "Shop more →", href: "/shop" }}
            />
          </div>

        </main>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}