'use client';

import React from 'react';

const features = [
  {
    tagline: 'GOD-INSPIRED WELLNESS',
    title: 'Rooted in God’s creation, guided by knowledge',
    description:
      'We believe God has placed valuable resources within nature. We work with carefully selected plants and natural resources as part of a thoughtful, integrative approach to wellness.',
  },
  {
    tagline: 'GOD’S PROVISION, CAREFULLY SELECTED',
    title: 'Medicinal plants chosen with care and purpose.',
    description:
      'We value the medicinal plants found in nature and carefully select them as part of our commitment to thoughtful, responsible herbal wellness.',
  },
  {
    tagline: 'PERSONALIZED INTEGRATIVE SUPPORT',
    title: 'Looking beyond symptoms',
    description:
      'We look beyond symptoms to understand the individual, providing guidance shaped around each person’s needs, goals, and overall wellbeing.',
  },
  {
    tagline: 'QUALITY & RESPONSIBLE FORMULATION',
    title: 'Thoughtful products, carefully developed',
    description:
      'We prioritize carefully selected ingredients, responsible formulation, and quality standards in the products we develop.',
  },
  {
    tagline: 'WELLNESS BEYOND BORDERS',
    title: 'Serving you wherever you are',
    description:
      'We make our wellness products and educational resources accessible to individuals and families in Nigeria and beyond.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#F6F4EE] py-16 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            THE AHERBS APPROACH
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
            Rooted in faith, guided by wisdom, created for wellness.
          </h2>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-stone-200/60 shadow-2xs flex flex-col justify-between space-y-6 hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                  {item.tagline}
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}