'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ShopNavbar from '@/src/components/ShopNavbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';

const therapySessions = [
  {
    title: 'Healing from GERD / Gastritis / Acid Reflux / Ulcer',
    description:
      'A guided therapy path built around gut repair, food changes, lifestyle adjustments, and herbal support for long-term digestive healing.',
    priceText: 'AVAILABLE ON ENQUIRY',
    href: '/consultation?session=gerd-gastritis',
  },
  {
    title: 'Hypertension Therapy',
    description:
      'A one-on-one holistic support plan focused on blood-pressure balance through food, herbal support, follow-up, and sustainable lifestyle change.',
    priceText: '100,000 NAIRA  3 MONTHS',
    href: '/consultation?session=hypertension',
  },
  {
    title: "Men's Reproductive Health",
    description:
      'A fertility-focused support session for men, covering testing, food, lifestyle, cleanse support, and natural reproductive wellness guidance.',
    priceText: '70,000 NAIRA',
    href: '/consultation?session=mens-reproductive',
  },
  {
    title: 'Preparing for Conception',
    description:
      'A four-month natural fertility support track designed to guide clients through food, assessment, follow-up, and holistic preparation for conception.',
    priceText: '100,000 NAIRA  4 MONTHS',
    href: '/consultation?session=preparing-conception',
  },
  {
    title: 'Reversing Diabetes',
    description:
      'A four-month holistic diabetes support program centered on diet, lifestyle, and plant-based supplement guidance.',
    priceText: '70,000 NAIRA  4 MONTHS',
    href: '/consultation?session=reversing-diabetes',
  },
  {
    title: 'Reversing PCOS',
    description:
      'A reproductive wellness therapy path focused on hormone balance, cycle support, womb health, and holistic lifestyle change.',
    priceText: 'AVAILABLE ON ENQUIRY',
    href: '/consultation?session=reversing-pcos',
  },
  {
    title: 'Cancer Therapy Program',
    description:
      'A guided holistic support program that works alongside medical care, using food, lifestyle, and plant support to strengthen the healing journey.',
    priceText: '120,000 NAIRA',
    href: '/consultation?session=cancer-therapy',
  },
];

export default function TherapySessionsPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EE] text-stone-800 font-sans flex flex-col justify-between">
      <div>
        <ShopNavbar />

        <main className="max-w-7xl mx-auto px-6 lg:px-16 py-12 md:py-16 space-y-16">
          
          {/* Top Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
                HOLISTIC THERAPY
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.15]">
                Focused healing support through <em className="italic text-[#2D5A43] font-normal">guided therapy sessions.</em>
              </h1>

              <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed max-w-xl">
                Explore therapy tracks shaped around food, herbs, lifestyle guidance, follow-up care, and compassionate support for specific health concerns.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-[#2D5A43] hover:bg-[#234734] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-all shadow-2xs"
                >
                  <span>Start Your Healing Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#sessions-grid"
                  className="bg-white border border-stone-200/80 hover:bg-stone-50 text-stone-800 text-xs font-semibold px-6 py-3.5 rounded-full transition-all shadow-2xs"
                >
                  View therapy sessions
                </Link>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-md border border-stone-200/50">
                <Image
                  src="/s1 (2).jpg"
                  alt="Holistic therapy consultation with mind, body, and spirit wellness plan"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>

          {/* Therapy Sessions Grid */}
          <div id="sessions-grid" className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapySessions.map((session, index) => (
                <Link
                  key={index}
                  href={session.href}
                  className="group bg-white rounded-3xl p-8 border border-stone-200/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                        THERAPY SESSION
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-800 transition-colors shrink-0" />
                    </div>

                    <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                      {session.title}
                    </h3>

                    <p className="text-xs text-stone-500 font-light leading-relaxed">
                      {session.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      {session.priceText}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Action Button */}
            <div>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-[#2D5A43] hover:bg-[#234734] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-all shadow-2xs"
              >
                <span>Start Your Healing Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </main>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}