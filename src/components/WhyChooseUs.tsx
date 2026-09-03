'use client';

import React from 'react';

const features = [
  {
    tagline: 'GOD-GIVEN PLANTS',
    title: "Medicinal plants inspired by God's creation",
    description: "Crafted with carefully selected medicinal plants inspired by God's creation.",
  },
  {
    tagline: 'HOLISTIC CONSULTATIONS',
    title: 'Guidance tailored to your health goals',
    description: 'One-on-one wellness guidance tailored to your health goals.',
  },
  {
    tagline: 'TRUSTED FORMULATIONS',
    title: 'Quality ingredients and careful standards',
    description: 'Thoughtfully formulated with quality ingredients and high manufacturing standards.',
  },
  {
    tagline: 'NATIONWIDE & WORLDWIDE DELIVERY',
    title: 'Wellness delivered wherever you are',
    description: 'Delivering wellness across Nigeria and to customers around the world.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#F6F4EE] py-16 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            WHY CHOOSE HERBS & WELLNESS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
            Healing Inspired by God&apos;s Creation
          </h2>
          <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed">
            We believe God placed healing within creation. Through holistic consultations, evidence-informed natural care, nutrition, lifestyle guidance, and carefully formulated plant-based remedies, we help individuals pursue lasting wellness while treating every person with compassion and dignity.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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