'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useRef } from 'react';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import ShopNavbar from '@/src/components/ShopNavbar';
import HerbalFavourites from '@/src/components/HerbalFavourites';
import ShopByCategory from '@/src/components/ShopByCategory';
import PractitionersBanner from '@/src/components/PractitionersBanner';
import TestimonialsCarousel from '@/src/components/TestimonialsCarousel';
import Footer from '@/src/components/Footer';

export default function ShopPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        '#store-navbar',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          '#store-hero-content',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '#announcement-bar',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-stone-800 font-sans flex flex-col justify-between">
      <div>
        {/* Sticky Store Navbar */}
        <ShopNavbar />

        {/* Hero Section */}
        <section className="relative w-full h-[82vh] min-h-[500px] overflow-hidden bg-stone-900 text-white flex flex-col justify-between">
          {/* Hero Background Image Slot */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero1 (2).jpg" // Replace with your actual hero image path
              alt="Herbs & Wellness Store Hero"
              fill
              priority
              className="object-cover object-center opacity-70"
            />
            {/* Darkening Overlay */}
            <div className="absolute inset-0 bg-black/35" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 lg:px-16 h-full flex flex-col justify-center items-start">
            <div id="store-hero-content" className="max-w-xl">
              <span className="text-sm md:text-base font-bold tracking-[0.25em] text-stone-200 uppercase mb-3 block">
                HERBS & WELLNESS
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-white mb-6 tracking-tight">
                Your one-stop shop <br />
                for all herbal needs
              </h1>

              <Link
                href="/shop#products"
                className="inline-flex items-center gap-2.5 bg-[#125821] hover:bg-[#0e461a] text-white font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-wider"
              >
                <span>START HEALING</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.89-2-2-2z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Announcement Banner */}
          <div
            id="announcement-bar"
            className="relative z-10 w-full bg-[#125821] text-white py-3 px-4 text-center text-xs md:text-sm font-semibold tracking-wider uppercase"
          >
            ORDER ONLINE & PICK-UP IN STORES // NATION WIDE / WORLDWIDE SHIPPING // CUSTOM ORDERS AVAILABLE
          </div>
        </section>

        {/* Store Sections Sequence */}
        <div id="products">
          <HerbalFavourites />
        </div>
        <ShopByCategory />
        <PractitionersBanner />
        <TestimonialsCarousel />
      </div>

      {/* Main Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <WhatsAppButton />

      {/* Floating Shopping Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          aria-label="View Cart"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-stone-800 shadow-xl border border-stone-200 transition-transform hover:scale-105"
        >
          <ShoppingCart className="w-6 h-6 stroke-[2]" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#125821] text-[10px] font-bold text-white">
            0
          </span>
        </button>
      </div>
    </div>
  );
}