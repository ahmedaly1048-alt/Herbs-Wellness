"use client";

import React from "react";
import Link from "next/link";
import { ClipboardList, Leaf, CalendarHeart, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Receive Your Personalized Wellness Plan",
    description:
      "Based on your consultation, we create a tailored holistic wellness plan that may include nutrition guidance, lifestyle recommendations, and carefully selected plant-based products to support your health.",
  },
  {
    step: "02",
    icon: Leaf,
    title: "Begin Your Wellness Journey",
    description:
      "Follow your personalized plan with confidence. Our goal is to support your body's natural ability to function well through holistic care and healthy daily habits.",
  },
  {
    step: "03",
    icon: CalendarHeart,
    title: "Ongoing Care & Support",
    description:
      "Healing is a journey, not a one-time event. We stay connected through follow-up consultations, progress reviews, and adjustments to your wellness plan as your needs evolve.",
  },
];

export default function HealingJourney() {
  return (
    <section className="w-full bg-[#F6F4EE] py-16 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
            CONSULTATIONS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
            Begin Your Healing Journey
          </h2>
          <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed">
            Every person&apos;s story is different. Our one-on-one holistic
            consultations help you understand your health concerns and create a
            personalized wellness plan rooted in nutrition, lifestyle, and
            God&apos;s healing gifts.
          </p>
        </div>

        {/* 3-Card Symmetrical Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-3xl p-7 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-[#2D5A43]/30 -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Icon Circle & Prominent Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#EBF2EE] group-hover:bg-[#2D5A43] flex items-center justify-center text-[#2D5A43] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-amber-500/80 tracking-tight">
                    {item.step}
                  </span>
                </div>

                {/* Card Content with Symmetrical Spacing */}
                <div className="space-y-2.5 flex-1 flex flex-col justify-start">
                  <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-[#2D5A43] hover:bg-[#234734] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-all shadow-xs hover:shadow-md"
          >
            <span>Start Your Healing Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/therapy-sessions"
            className="bg-white border border-stone-300 hover:bg-stone-50 hover:border-stone-400 text-stone-800 text-xs font-semibold px-6 py-3.5 rounded-full transition-all shadow-xs"
          >
            Explore Our Therapy Sessions
          </Link>
        </div>
      </div>
    </section>
  );
}