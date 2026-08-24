'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import Navigation from '../components/Navigation';
import WhatsAppButton from '../components/WhatsAppButton';

const navLeft = [
  { name: 'about', href: '#about' },
  { name: 'blog', href: '#blog' },
];

const navRight = [
  { name: 'contact', href: '#contact' },
  { name: 'appointment', href: '#appointment' },
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
          '#brand-logo',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
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
          <div className="flex flex-col gap-6 items-start">
            <Navigation links={navLeft} />
            <div id="brand-logo" className="flex flex-col items-start gap-0.5 mt-2 max-w-[220px]">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white leading-tight">
                HERBS & WELLNESS
              </span>
              <span className="text-[8px] tracking-[0.15em] uppercase text-stone-300 leading-tight">
                Holistic Integrative Clinic
              </span>
            </div>
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
          <div className="flex justify-end items-center">
            <Navigation links={navRight} />
          </div>
        }
      />

      <WhatsAppButton />
    </main>
  );
}