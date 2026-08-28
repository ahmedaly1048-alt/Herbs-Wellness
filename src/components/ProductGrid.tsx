'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/src/types/product';
import { useCartStore } from '@/src/store/useCartStore';

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  actionLink?: { text: string; href: string };
}

export default function ProductGrid({
  title = "Best sellers",
  subtitle = "THE FAVOURITES",
  products,
  actionLink = { text: "Shop all best sellers →", href: "/shop" },
}: ProductGridProps) {
  // Extract state management action right here:
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="w-full bg-[#F6F4EE] py-12 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-end justify-between">
          <div>
            {subtitle && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">{title}</h2>
          </div>
          {actionLink && (
            <Link
              href={actionLink.href}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {actionLink.text}
            </Link>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isOutOfStock = product.stock === 0;
            const price = product.isVariable && product.variants?.length
              ? product.variants[0].price
              : product.price || 0;

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                {/* Image & Badge Area */}
                <div className="relative w-full aspect-[5/6] bg-[#ECE8E1] p-3 flex items-center justify-center">
                  {/* Bestseller Badge */}
                  <span className="absolute top-3 left-3 bg-[#2D5A43] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-10">
                    BESTSELLER
                  </span>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-stone-600 shadow-2xs z-10 transition-colors"
                  >
                    <Heart className="w-4 h-4 stroke-[1.5]" />
                  </button>

                  {/* Product Image */}
                  <Link href={`/shop/product/${product.slug}`} className="relative w-full h-full block">
                    <Image
                      src={product.images[0] || "/placeholder-product.jpg"}
                      alt={product.title}
                      fill
                      className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Hover Add to Cart Button */}
                  {!isOutOfStock && (
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <button
                        type="button"
                        onClick={() => addItem(product)}
                        className="w-full bg-[#2D5A43] hover:bg-[#234734] text-white text-xs font-semibold py-2.5 rounded-full transition-colors cursor-pointer"
                      >
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-5 space-y-3 bg-white grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    {/* Stock Status Pill */}
                    {isOutOfStock ? (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded-xs">
                        OUT OF STOCK
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#2D5A43] bg-[#2D5A43]/5 px-2 py-0.5 rounded-xs">
                        IN STOCK
                      </span>
                    )}

                    {/* Title */}
                    <Link href={`/shop/product/${product.slug}`} className="block">
                      <h3 className="text-sm font-serif font-semibold text-stone-900 line-clamp-1 hover:text-[#2D5A43] transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <div className="flex text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                      </div>
                      <span className="font-medium text-stone-700">{product.rating || 5.0}</span>
                      <span>·</span>
                      <span>{product.reviewCount || 1} reviews</span>
                    </div>
                  </div>

                  {/* Price & Savings */}
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-sm font-serif font-bold text-stone-900 block">
                      ₦{price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400 block font-light">
                      Buy 3+ & save 2%
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}