'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_IMAGES = [
  {
    src: '/hero (2).jpg',
    alt: 'SBM Holistic Farmacy Hypertension Kit',
  },
  {
    src: '/hero1 (2).jpg',
    alt: 'Herbal Wellness Products Display',
  },
  {
    src: '/hero2 (2).jpg',
    alt: 'Natural Remedies Collection',
  },
];

export default function ShopHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  // Optional: Auto-play slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full bg-[#F6F4EE] py-12 md:py-20 px-6 lg:px-16 overflow-hidden font-sans">
      {/* Background Decorative Organic Shapes */}
      <div className="absolute top-8 left-4 w-20 h-20 bg-[#2D5A43] rounded-tl-3xl rounded-br-3xl opacity-90 -rotate-12 -z-0" />
      <div className="absolute top-1/2 right-12 w-32 h-32 bg-[#E3DFD5] rounded-full blur-2xl -z-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Content Card */}
        <div className="lg:col-span-6 bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200/50 relative">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.15] mb-6 tracking-tight">
            Where God&apos;s <br />
            Healing Meets <br />
            Nature.
          </h1>

          {/* Scripture Pill Quote */}
          <div className="inline-flex flex-wrap items-center gap-2 bg-stone-100 px-3.5 py-1.5 rounded-full text-xs md:text-sm text-stone-700 font-medium mb-6">
            <span>Their fruit will serve for food and their leaves for healing.</span>
            <span className="bg-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-stone-500 shadow-2xs">
              Ezekiel 47:12
            </span>
          </div>

          <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed mb-8">
            Inspired by Ezekiel 47:12, we are a faith based brand and we believe that God placed healing within nature. Our mission is to help individuals and families rediscover wellness through holistic medicine, nutrition, lifestyle transformation and compassionate care.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 bg-[#2D5A43] hover:bg-[#234734] text-white font-medium text-sm px-6 py-3.5 rounded-full transition-all shadow-sm"
            >
              <span>Shop the collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/hub/consultation"
              className="inline-flex items-center bg-white hover:bg-stone-50 text-stone-800 font-medium text-sm px-6 py-3.5 rounded-full border border-stone-300 transition-all shadow-2xs"
            >
              Explore therapy sessions
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-2 text-xs text-stone-600 font-medium pt-2 border-t border-stone-100">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
              ))}
            </div>
            <span>Trusted by holistic customers across the globe</span>
          </div>

          {/* Bottom Blob Decorative Shape */}
          <div className="absolute -bottom-4 left-1/3 w-16 h-12 bg-[#8B9D8B] rounded-full opacity-80 -z-10" />
        </div>

        {/* Right Showcase Box */}
        <div className="lg:col-span-6 relative flex justify-center">
          
          {/* Main Kit Display Image Container */}
          <div className="relative w-full max-w-lg aspect-4/5 rounded-2xl overflow-hidden shadow-xl border border-stone-300/60 bg-stone-200 group">
            
            {/* Carousel Images */}
            {HERO_IMAGES.map((img, idx) => (
              <div
                key={img.src}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center"
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Vertical Slider Dots Indicator (Middle Right End) */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 bg-black/30 backdrop-blur-md px-2 py-3 rounded-full">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full ${
                    idx === currentIndex
                      ? 'w-2.5 h-2.5 bg-white scale-110'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Overlay Floating Badge */}
          <div className="absolute -bottom-6 -left-2 md:left-2 max-w-xs bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-stone-200/80 z-20">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">
              WHY CHOOSE US
            </span>
            <h4 className="text-sm font-serif font-bold text-stone-900 leading-snug mb-1.5">
              Healing with plant, food, and holistic lifestyle.
            </h4>
            <p className="text-[11px] text-stone-500 font-light leading-normal">
              We help people move beyond pills and toward guided natural healing support.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}