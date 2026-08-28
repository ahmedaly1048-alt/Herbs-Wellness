'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HolisticLivingBanner() {
  return (
    <section className="w-full bg-[#F6F4EE] py-12 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Image Card */}
        <div className="relative w-full aspect-4/3 lg:aspect-auto min-h-[380px] rounded-3xl overflow-hidden shadow-2xs">
          <Image
            src="/s4.jpg"
            alt="Natural ingredients and herbs for holistic living"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Right Green Card */}
        <div className="bg-[#2D5A43] text-white p-8 md:p-14 rounded-3xl flex flex-col justify-between space-y-8 shadow-2xs">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D9C4AC] block">
              HOLISTIC LIVING
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
              We don&apos;t do pills. We help you heal with nature.
            </h2>
            <p className="text-xs md:text-sm text-stone-200 font-light leading-relaxed">
              Healing support at Herbs &amp; Wellness is built around plants, food, and lifestyle change. The goal is not just temporary relief, but a more natural path to long-term wellness.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/about"
              className="bg-[#D9C4AC] hover:bg-[#cbb297] text-stone-900 text-xs font-semibold px-6 py-3.5 rounded-full transition-all shadow-2xs"
            >
              Read our story
            </Link>

            <Link
              href="/hub/consultation"
              className="text-white hover:text-[#D9C4AC] text-xs font-semibold px-4 py-3.5 transition-colors"
            >
              View therapy sessions
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}