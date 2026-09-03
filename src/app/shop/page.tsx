'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

// Data and Utilities
import { fetchProducts } from '@/src/lib/product';
import { Product } from '@/src/types/product';

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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const liveProducts = await fetchProducts();
      setProducts(liveProducts);
    }
    loadProducts();
  }, []);

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

        {/* Dynamic products fetched from MongoDB Atlas API */}
        <ProductGrid products={products} />

        <CartDrawer />

        <HealingJourney />
        <WhyChooseUs />
        <TestimonialsCarousel />
        <FaqSection />
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}