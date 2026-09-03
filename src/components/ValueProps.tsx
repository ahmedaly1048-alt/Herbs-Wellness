'use client';

import React from 'react';
import { Leaf, HandHeart, ShieldCheck, Truck } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Plant-based',
    description: 'Made from God-given plants',
  },
  {
    icon: HandHeart,
    title: 'Guided support',
    description: 'Therapy-backed healing care',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted formulas',
    description: 'Curated for holistic care',
  },
  {
    icon: Truck,
    title: 'Nationwide delivery',
    description: 'Across Nigeria',
  },
];

export default function ValueProps() {
  return (
    <section className="w-full bg-[#F6F4EE] py-8 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-stone-200/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 md:divide-x divide-stone-200/80 shadow-xs overflow-hidden">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-6 lg:px-8 transition-colors hover:bg-stone-50/50"
              >
                {/* Circular Icon Container */}
                <div className="w-12 h-12 rounded-full bg-[#EBF2EE] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#2D5A43]" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm font-semibold text-stone-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-normal mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}