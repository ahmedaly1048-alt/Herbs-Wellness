'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const supportPaths = [
  {
    tagline: 'PERSONAL GUIDANCE',
    title: 'Consultation',
    description:
      'Book a one-on-one wellness consultation and begin with your story, goals, and current health concerns.',
    image: '/services/consultation.jpeg',
    href: '/hub/consultation',
  },
  {
    tagline: 'GUIDED HEALING TRACKS',
    title: 'Holistic Therapy',
    description:
      'Explore therapy sessions for focused concerns like gut repair, fertility, hypertension, PCOS, and more.',
    image: '/services/holistic_therapy.jpeg',
    href: '/therapy-sessions',
  },
];

export default function SupportPaths() {
  return (
    <section className="w-full bg-[#F6F4EE] py-14 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-stone-400 block">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-900 leading-[1.15] font-normal tracking-tight">
              Choose the support path that fits your healing journey.
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl pt-1">
              Start with consultation, explore therapy sessions, learn through upcoming courses, or join the community referral path.
            </p>
          </div>

          <Link
            href="/hub/consultation"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors shrink-0"
          >
            <span>Start with consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 pt-2">
          {supportPaths.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="group relative h-[240px] sm:h-[300px] md:h-[340px] lg:h-[420px] xl:h-[440px] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-500 flex flex-col justify-end p-4 sm:p-6 md:p-7 lg:p-8"
            >
              {/* Card Background Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/5 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50" />

              {/* Card Content at Bottom */}
              <div className="relative z-10 space-y-1.5 sm:space-y-2 text-white">
                <span className="text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-[0.16em] text-stone-300/90 block">
                  {card.tagline}
                </span>

                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif text-white font-normal leading-tight">
                  {card.title}
                </h3>

                <p className="text-[10px] sm:text-xs md:text-sm text-stone-200/90 font-light leading-relaxed max-w-md pt-0.5 sm:pt-1">
                  {card.description}
                </p>

                <div className="pt-1.5 sm:pt-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-white group-hover:text-stone-200 transition-colors">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
