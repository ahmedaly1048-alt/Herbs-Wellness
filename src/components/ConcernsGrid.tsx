'use client';

import React from 'react';
import Link from 'next/link';
import { Flower2, Sprout, Brain, Activity, ArrowUpRight } from 'lucide-react';

const concerns = [
  {
    icon: Flower2,
    title: 'Reproductive & fertility',
    description: 'Support hormonal balance, reproductive wellness, and fertility-focused care.',
    href: '/shop?category=reproductive-fertility',
  },
  {
    icon: Flower2,
    title: 'Fibroids',
    description: 'Plant-based support for womb wellness and fibroid care conversations.',
    href: '/shop?category=fibroids',
  },
  {
    icon: Activity,
    title: "Men's health",
    description: 'Support stamina, vitality, prostate wellness, and male reproductive health.',
    href: '/shop?category=mens-health',
  },
  {
    icon: Sprout,
    title: 'Gut & Digestive health',
    description: 'Support digestion, gut repair, bloating relief, and microbiome balance.',
    href: '/shop?category=gut-digestive-health',
  },
  {
    icon: Brain,
    title: 'Brain & Nervous health',
    description: 'Support calm, sleep, clarity, nerve health, and nervous system balance.',
    href: '/shop?category=brain-nervous-health',
  },
  {
    icon: Activity,
    title: 'Bone & joint health',
    description: 'Support mobility, joint comfort, bone strength, and inflammation balance.',
    href: '/shop?category=bone-joint-health',
  },
];

export default function ConcernsGrid() {
  return (
    <section className="w-full bg-[#F6F4EE] py-16 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
              START WITH HOW YOU FEEL
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
              Healing support, grouped by concern.
            </h2>
            <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed">
              Find plant-based support for fertility, gut health, nervous system balance, feminine care, circulation, metabolic wellness, and more.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors shrink-0"
          >
            <span>View all concerns</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6-Card Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerns.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="group relative bg-white rounded-3xl p-8 border border-stone-200/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Top Row: Icon & Arrow Indicator */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#EBF2EE] flex items-center justify-center text-[#2D5A43]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-stone-800 transition-colors" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}