'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { use, useRef, useState } from 'react';

import { ShoppingBag } from 'lucide-react';
import ShopNavbar from '@/src/components/ShopNavbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  type: 'cart' | 'options';
  href: string;
}

// Map slug names to their respective product catalogs
const CATEGORY_DATA: Record<string, Product[]> = {
  'herbal-teas': [
    { id: '1', name: 'Aparun Tea', price: '₦19,000.00 – ₦35,000.00', image: '', type: 'options', href: '/shop/aparun' },
    { id: '2', name: 'Vitality Tea Blend', price: '₦15,000.00', image: '', type: 'cart', href: '/shop/vitality-tea' },
  ],
  'herbal-tinctures': [
    { id: '1', name: 'Aparun', price: '₦19,000.00 – ₦35,000.00', image: '', type: 'options', href: '/shop/aparun' },
    { id: '2', name: 'Deep Clean Tincture', price: '₦20,000.00', image: '', type: 'cart', href: '/shop/deep-clean-tincture' },
    { id: '3', name: 'Jagun Jagun', price: '₦25,000.00', image: '', type: 'cart', href: '/shop/jagun-jagun' },
    { id: '4', name: 'Manpower', price: '₦5,000.00', image: '', type: 'cart', href: '/shop/manpower' },
    { id: '5', name: 'Sleep Aid', price: '₦28,000.00', image: '', type: 'cart', href: '/shop/sleep-aid' },
    { id: '6', name: 'Tincture of Life', price: '₦35,500.00', image: '', type: 'cart', href: '/shop/tincture-of-life' },
    { id: '7', name: 'Vital Defense', price: '₦28,800.00', image: '', type: 'cart', href: '/shop/vital-defense' },
  ],
  'capsules': [
    { id: '1', name: 'Herbal Immune Capsules', price: '₦22,000.00', image: '', type: 'cart', href: '/shop/immune-capsules' },
  ],
  'herbal-sets': [
    { id: '1', name: 'Complete Detox Set', price: '₦45,000.00', image: '', type: 'cart', href: '/shop/detox-set' },
  ],
  'formulations': [
    { id: '1', name: 'Special Synergy Formulation', price: '₦30,000.00', image: '', type: 'cart', href: '/shop/special-synergy' },
  ],
  'catch-all': [],
  'sale': [
    { id: '4', name: 'Manpower', price: '₦5,000.00', image: '', type: 'cart', href: '/shop/manpower' },
  ],
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortOption, setSortOption] = useState('default');
  const [perPage, setPerPage] = useState('12');

  const currentSlug = resolvedParams.slug || 'herbal-tinctures';

  // Format category title
  const categoryTitle = currentSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Dynamic lookup for products based on category slug
  const categoryProducts = CATEGORY_DATA[currentSlug] || [];

  useGSAP(
    () => {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
        }
      );
    },
    { scope: containerRef, dependencies: [currentSlug] }
  );

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-stone-800 font-sans flex flex-col justify-between">
      <div>
        <ShopNavbar />

        <main className="container mx-auto px-4 lg:px-12 py-8 max-w-7xl">
          {/* Breadcrumbs */}
          <nav className="text-xs text-stone-500 font-medium mb-8">
            <Link href="/" className="hover:text-[#125821] transition-colors">
              Home
            </Link>
            <span className="mx-1.5 text-stone-400">/</span>
            <span className="text-stone-400">{categoryTitle}</span>
          </nav>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#125821] mb-8 tracking-tight">
            {categoryTitle}
          </h1>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 text-xs text-stone-600 font-medium">
            <p>Showing all {categoryProducts.length} results</p>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border-none text-stone-700 py-1.5 pr-6 focus:ring-0 cursor-pointer font-medium text-xs outline-none"
              >
                <option value="default">Default sorting</option>
                <option value="popularity">Sort by popularity</option>
                <option value="rating">Sort by average rating</option>
                <option value="latest">Sort by latest</option>
                <option value="price-low">Sort by price: low to high</option>
                <option value="price-high">Sort by price: high to low</option>
              </select>

              <div className="border border-stone-200 rounded px-2 py-1">
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(e.target.value)}
                  className="bg-transparent border-none text-stone-700 focus:ring-0 cursor-pointer font-medium text-xs outline-none"
                >
                  <option value="12">12 products per page</option>
                  <option value="24">24 products per page</option>
                  <option value="36">36 products per page</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid / Empty State */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card flex flex-col items-center text-center group"
                >
                  <div className="relative w-full aspect-square bg-stone-100 overflow-hidden shadow-sm mb-4">
                    <Image
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  <h3 className="font-bold text-[#125821] text-sm md:text-base mb-1 group-hover:text-[#0a3614] transition-colors">
                    {product.name}
                  </h3>

                  <p className="font-bold text-stone-900 text-xs md:text-sm mb-4">
                    {product.price}
                  </p>

                  {product.type === 'cart' ? (
                    <button
                      type="button"
                      className="bg-[#0D4018] hover:bg-[#082b10] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
                    >
                      Add to cart
                    </button>
                  ) : (
                    <Link
                      href={product.href}
                      className="bg-[#0D4018] hover:bg-[#082b10] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 inline-block"
                    >
                      Select options
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-stone-500 text-sm">
              No products found in this category.
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-end border-t border-stone-100 pt-6">
            <div className="border border-stone-200 rounded px-2 py-1 text-xs text-stone-600 font-medium">
              <select
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
                className="bg-transparent border-none text-stone-700 focus:ring-0 cursor-pointer outline-none"
              >
                <option value="12">12 products per page</option>
                <option value="24">24 products per page</option>
                <option value="36">36 products per page</option>
              </select>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <WhatsAppButton />

      <div className="fixed bottom-6 right-6 z-50">
        <button
          aria-label="View Cart"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-stone-800 shadow-xl border border-stone-200 transition-transform hover:scale-105"
        >
          <ShoppingBag className="w-6 h-6 stroke-[2]" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#125821] text-[10px] font-bold text-white">
            0
          </span>
        </button>
      </div>
    </div>
  );
}