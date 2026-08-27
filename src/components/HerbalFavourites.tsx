'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Lock } from 'lucide-react';

import { PRODUCTS } from '@/src/data/product';
import { getProductPriceDisplay } from '@/src/lib/product';
import type { Product } from '@/src/types/product';

export default function HerbalFavourites() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter for featured items, or fallback to the first 4 items in your catalog
  const featuredProducts = PRODUCTS.filter((p: Product) => p.featured);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : PRODUCTS.slice(0, 4);

  useGSAP(
    () => {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-[#EAEAEA] py-16 text-stone-900">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Section Title */}
        <h2 className="text-center font-serif text-3xl md:text-4xl text-stone-800 mb-12 tracking-normal font-normal">
          herbal favourites
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {displayProducts.map((product: Product) => {
            const productHref = `/shop/product/${product.slug}`;
            const priceDisplay = getProductPriceDisplay(product);

            return (
              <div
                key={product.id}
                className="product-card flex flex-col items-center text-center group justify-between"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Image Container with Fixed Aspect Ratio */}
                  <Link href={productHref} className="relative w-full aspect-square bg-white overflow-hidden shadow-sm mb-5 block">
                    <Image
                      src={product.images[0] || '/placeholder-product.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {product.requiresConsultation && (
                      <span className="absolute top-2.5 left-2.5 bg-[#0D4018] text-amber-300 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Lock className="w-2.5 h-2.5" /> Consultation
                      </span>
                    )}
                  </Link>

                  {/* Product Info */}
                  <h3 className="font-semibold text-stone-900 text-sm md:text-base mb-1.5 group-hover:text-[#0D4018] transition-colors">
                    <Link href={productHref}>{product.title}</Link>
                  </h3>

                  <p className="font-bold text-stone-900 text-xs md:text-sm mb-4">
                    {priceDisplay}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex justify-center pt-2">
                  {product.requiresConsultation ? (
                    <Link
                      href="/hub/consultation"
                      className="bg-[#093212] hover:bg-[#0D4018] text-amber-300 text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 inline-flex items-center gap-1.5"
                    >
                      <Lock className="w-3 h-3" /> Book Consultation
                    </Link>
                  ) : product.isVariable ? (
                    <Link
                      href={productHref}
                      className="bg-[#0D4018] hover:bg-[#082b10] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 inline-block"
                    >
                      Select options
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="bg-[#0D4018] hover:bg-[#082b10] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Badges Footer Bar */}
      <div className="w-full bg-[#0D4018] text-white mt-16 py-4 border-t border-emerald-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center text-xs md:text-sm font-medium tracking-wide">
          <span>made with care in Nigeria</span>
          <span className="hidden md:inline text-white/40">|</span>
          <span>NAFDAC approved</span>
          <span className="hidden md:inline text-white/40">|</span>
          <span>food grade only</span>
        </div>
      </div>
    </section>
  );
}