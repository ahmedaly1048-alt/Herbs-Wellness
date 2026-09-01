'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// import { ShoppingCart } from 'lucide-react';
import { useRef, useState } from 'react';

// Data and Utilities
import { PRODUCTS } from '@/src/data/product';

// Global Layout Components
import WhatsAppButton from '@/src/components/WhatsAppButton';
import ShopNavbar from '@/src/components/ShopNavbar';
import ShopHero from '@/src/components/ShopHero';
import TestimonialsCarousel from '@/src/components/TestimonialsCarousel';
import Footer from '@/src/components/Footer';

// Newly Integrated Components
import CartDrawer from '@/src/components/CartDrawer';
import ConcernsGrid from '@/src/components/ConcernsGrid';
import WhyChooseUs from '@/src/components/WhyChooseUs';
import ValueProps from '@/src/components/ValueProps';
import FaqSection from '@/src/components/FaqSection';
import HealingJourney from '@/src/components/HealingJourney';
import HolisticLivingBanner from '@/src/components/HolisticLivingBanner';
import SupportPaths from '@/src/components/SupportPaths';
import ProductGrid from '@/src/components/ProductGrid';

export default function ShopPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-white text-stone-800 font-sans flex flex-col justify-between"
    >
      <div>
        <ShopNavbar />
        <ShopHero />
        <ValueProps />
        <SupportPaths />
        <ConcernsGrid />
        <HolisticLivingBanner />

        {/* Pass PRODUCTS array to fix TypeScript error */}
        <ProductGrid products={PRODUCTS} />


        <CartDrawer />

        <HealingJourney />
        <WhyChooseUs />
        <TestimonialsCarousel />
        <FaqSection />
      </div>

      <Footer />
      <WhatsAppButton />

      {/* <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          aria-label="View Cart"
          onClick={() => setIsCartOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-stone-800 shadow-xl border border-stone-200 transition-transform hover:scale-105 cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6 stroke-[2]" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#125821] text-[10px] font-bold text-white">
            0
          </span>
        </button>
      </div> */}

      {/* <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
    </div>
  );
}