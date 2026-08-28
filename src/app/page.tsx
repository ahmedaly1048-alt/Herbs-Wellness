'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import ShopNavbar from '../components/ShopNavbar';
import WhatsAppButton from '../components/WhatsAppButton';

const navLeft = [
  { name: 'about', href: '/about' },
  { name: 'blog', href: '#blog' },
];

const navRight = [
  { name: 'contact', href: '/hub/booking' },
  { name: 'appointment', href: '/hub/booking' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ['#left-panel', '#right-panel'],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.2 }
      )
        .fromTo(
          '#whatsapp-btn',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
          '-=0.2'
        );
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black text-white grid grid-cols-1 md:grid-cols-2"
    >
      {/* Left Panel - Shop */}
      <HeroSection
        id="left-panel"
        href="/shop"
        alignTextRight
        bgImage="/bg3.jpg"
        imageAlt="Herbs & Wellness Shop"
        ctaText="CLICK TO SHOP"
        headingText={
          <>
            herbs & wellness <br /> shop
          </>
        }
        headerContent={
          <div className="w-full">
            <ShopNavbar links={navLeft} />
          </div>
        }
      />

      {/* Right Panel - Hub (Redirects to /hub) */}
      <HeroSection
        id="right-panel"
        href="/hub"
        bgImage="/bg1.jpg"
        imageAlt="Herbs & Wellness Hub"
        ctaText="CLICK TO HEAL"
        headingText={
          <>
            herbs & wellness <br /> hub
          </>
        }
        headerContent={
          <div className="w-full">
            <ShopNavbar links={navRight} />
          </div>
        }
      />

      <WhatsAppButton />
    </main>
  );
}