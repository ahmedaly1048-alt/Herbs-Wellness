'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Search, ChevronDown, Star } from 'lucide-react';

import { Product } from '@/src/types/product';
import { getAllProducts, getProductPriceDisplay } from '@/src/lib/product';
import { useCartStore } from '@/src/store/useCartStore';
import ShopNavbar from '@/src/components/ShopNavbar';
import CartDrawer from '@/src/components/CartDrawer';
import Footer from '@/src/components/Footer';

const CATEGORIES = [
  { name: 'All categories', slug: 'all' },
  { name: 'Formulations', slug: 'formulations' },
  { name: 'Herbal Teas', slug: 'herbal-teas' },
  { name: 'Aroma Healing', slug: 'aroma-healing' },
  { name: 'Balms & Oils', slug: 'balms-oils' },
  { name: 'Body Detox', slug: 'body-detox' },
  { name: 'Capsules', slug: 'capsules' },
  { name: 'Feminine Care', slug: 'feminine-care' },
  { name: 'Health Kits', slug: 'health-kits' },
  { name: 'Men\'s Wellness', slug: 'mens-wellness' },
];

const CONCERNS = [
  'Reproductive & fertility',
  'Fibroids',
  "Men's health",
  'Gut & Digestive health',
  'Brain & Nervous health',
  'Bone & joint health',
  'Heart & circulatory',
  'Weight management',
  'Infection & Microbiome',
  'Cancer wellness support',
  'Metabolic health',
  'Feminine care',
];

const ITEMS_PER_PAGE = 12;

export default function ShopCatalog() {
  const allProducts: Product[] = getAllProducts();
  const addItem = useCartStore((state) => state.addItem);

  // Filter & Control States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Helper function to extract base numeric price for calculations
  const getBasePrice = (product: Product): number => {
    if (!product.isVariable && product.price !== undefined) {
      return product.price;
    }
    if (product.isVariable && product.variants?.length) {
      return Math.min(...product.variants.map((v) => v.price));
    }
    return 0;
  };

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
    setCurrentPage(1);
  };

  // Dynamic Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Search Filter
        if (
          searchQuery &&
          !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Category Filter
        if (
          selectedCategory !== 'all' &&
          product.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        // Price Range Filter
        const productPrice = getBasePrice(product);
        if (productPrice < minPrice || productPrice > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = getBasePrice(a);
        const priceB = getBasePrice(b);

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // Default/Newest
      });
  }, [allProducts, searchQuery, selectedCategory, minPrice, maxPrice, sortBy]);

  // Pagination Math
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <>
    <ShopNavbar />
    <section className="w-full bg-[#F6F4EE] px-6 lg:px-16 py-10 text-stone-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="max-w-3xl space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
            SHOP
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-stone-900 leading-tight">
            Holistic wellness, one shelf at a time.
          </h1>
          <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed">
            Browse our curated catalog of gut support, wellness powders, women&apos;s health blends, clean relief formulas, and therapy-led staples.
          </p>
        </div>

        {/* Sidebar + Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-8 text-xs font-light text-stone-600 pr-2">
            
            {/* Category Filter */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-3">
                CATEGORY
              </span>
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer hover:text-stone-900 transition-colors">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => {
                        setSelectedCategory(cat.slug);
                        setCurrentPage(1);
                      }}
                      className="w-3.5 h-3.5 accent-[#2D5A43]"
                    />
                    <span className={selectedCategory === cat.slug ? 'font-semibold text-stone-900' : ''}>
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2 border-t border-stone-200/60 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-3">
                BRAND
              </span>
              <label className="flex items-center gap-2.5 cursor-pointer hover:text-stone-900 transition-colors">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === 'all'}
                  onChange={() => setSelectedBrand('all')}
                  className="w-3.5 h-3.5 accent-[#2D5A43]"
                />
                <span>All brands</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer hover:text-stone-900 transition-colors mt-2">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-stone-300 text-[#2D5A43] focus:ring-0"
                />
                <span>Herbs &amp; Wellness Farmacy</span>
              </label>
            </div>

            {/* Concerns Filter */}
            <div className="space-y-2 border-t border-stone-200/60 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-3">
                CONCERN
              </span>
              <div className="space-y-2">
                {CONCERNS.map((concern) => (
                  <label key={concern} className="flex items-center gap-2.5 cursor-pointer hover:text-stone-900 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedConcerns.includes(concern)}
                      onChange={() => toggleConcern(concern)}
                      className="w-3.5 h-3.5 rounded border-stone-300 accent-[#2D5A43]"
                    />
                    <span>{concern}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 border-t border-stone-200/60 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                PRICE
              </span>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <span className="text-[9px] text-stone-400 uppercase block mb-1">MIN ₦</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-800 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[9px] text-stone-400 uppercase block mb-1">MAX ₦</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-800 focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="250000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#2D5A43]"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedConcerns([]);
                setMinPrice(0);
                setMaxPrice(250000);
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-[10px] text-stone-400 underline hover:text-stone-700 transition-colors"
            >
              Clear all filters
            </button>

          </aside>

          {/* Product Cards Container */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Search & Sort Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search within shop..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border border-stone-200/80 rounded-full pl-10 pr-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 shadow-2xs"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-[11px] text-stone-400 shrink-0">
                  Showing {paginatedProducts.length} of {filteredProducts.length} products
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-stone-200 rounded-lg px-4 py-2 pr-8 text-xs text-stone-700 focus:outline-none shadow-2xs cursor-pointer"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {paginatedProducts.map((product) => {
                  const imageSrc = product.images?.[0] || '/placeholder.jpg';
                  const priceDisplay = getProductPriceDisplay(product);

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl px-3 pt-3 pb-4 border border-stone-200/70 shadow-2xs flex flex-col justify-between space-y-3 relative hover:shadow-md transition-all duration-300"
                    >
                      {/* Wishlist Icon */}
                      <button
                        type="button"
                        aria-label="Add to wishlist"
                        className="absolute top-6 right-6 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-400 hover:text-rose-500 shadow-2xs transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>

                      {/* Image Frame */}
                      <Link href={`/shop/product/${product.slug}`}>
                        <div className="relative w-full aspect-[5/6] bg-stone-50 rounded-xl overflow-hidden flex items-center justify-center">
                          <Image
                            src={imageSrc}
                            alt={product.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                addItem(product);
                              }}
                              className="w-full bg-[#2D5A43] hover:bg-[#234734] text-white text-[11px] font-semibold py-2 rounded-lg transition-colors shadow-sm"
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </Link>

                      {/* Product Text Meta */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider block text-stone-400">
                          {product.requiresConsultation ? 'CONSULTATION REQ.' : 'IN STOCK'}
                        </span>
                        <Link href={`/shop/product/${product.slug}`}>
                          <h3 className="text-xs font-serif font-bold text-stone-900 line-clamp-1 leading-snug hover:text-[#2D5A43] transition-colors">
                            {product.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-1 text-[10px] text-stone-400">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>
                            {product.rating ? product.rating.toFixed(1) : '0.0'} · ({product.reviewCount || 0})
                          </span>
                        </div>

                        <p className="text-xs font-bold text-stone-900 pt-1">
                          {priceDisplay}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/60">
                <p className="text-sm font-medium text-stone-600">No products match your active filters.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-900 font-medium disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-[#2D5A43] text-white'
                        : 'text-stone-600 hover:bg-stone-200/50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-900 font-medium disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
    <Footer />
    <CartDrawer />
    </>
  );
}