'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function PractitionersBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '#practitioners-content',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[380px] overflow-hidden bg-stone-900 text-white flex items-center justify-center my-8"
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="" // Replace with your herbal background image path (e.g., "/bg-practitioners.jpg")
          alt="Fresh green herbal foliage"
          fill
          priority
          className="object-cover object-center brightness-75 contrast-90"
        />
        {/* Darkening tint overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered Content Block */}
      <div
        id="practitioners-content"
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center max-w-3xl"
      >
        <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-stone-200 mb-3 block">
          UNSURE WHAT'S RIGHT FOR YOU?
        </span>

        <h2 className="text-2xl md:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-tight mb-3">
          work with our in-house practitioners!
        </h2>

        <p className="text-stone-200 text-xs md:text-sm font-medium tracking-wide mb-7">
          make use of nature’s medicine safely and effectively.
        </p>

        <Link
          href="#hub"
          className="bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs md:text-sm px-7 py-3 rounded-full tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
        >
          VISIT OUR HUB
        </Link>
      </div>
    </section>
  );
}