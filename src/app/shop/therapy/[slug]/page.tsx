'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Mail, Phone, Leaf, ArrowRight } from 'lucide-react';
import ShopNavbar from '@/src/components/ShopNavbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import { therapySessionsData, allTherapySessions } from '@/src/data/therapySessions';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function TherapyDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const session =
    therapySessionsData[slug] ||
    allTherapySessions.find((s) => s.slug === slug) ||
    therapySessionsData['gerd-gastritis'];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans flex flex-col justify-between">
      <div>
        <ShopNavbar />

        <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-15 space-y-5">
          {/* Back Navigation */}
          <div>
            <Link
              href="/therapy-sessions"
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 text-xs sm:text-sm font-medium transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back</span>
            </Link>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-8 xl:gap-10 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              {/* Header Titles */}
              <div className="space-y-4">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-stone-400 block">
                  {session.tagline}
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-900 font-normal leading-[1.18] tracking-tight">
                  {session.title}
                </h1>

                <p className="text-stone-600 text-md sm:text-[15px] font-light leading-relaxed max-w-2xl pt-1">
                  {session.summary}
                </p>
              </div>

              {/* 2 Information Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Therapy Fee Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-stone-200/80 shadow-2xs space-y-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">
                    THERAPY FEE
                  </span>
                  <p className="text-2xl sm:text-2xl font-serif text-stone-900 font-medium">
                    {session.fee}
                  </p>
                </div>

                {/* Format Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-stone-200/80 shadow-2xs space-y-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">
                    FORMAT
                  </span>
                  <div className="space-y-1">
                    {session.format.map((item, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-[15px] text-stone-700 font-light leading-snug"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Paragraphs */}
              <div className="space-y-4 pt-1 text-md sm:text-sm md:text-[15px] text-stone-600 font-light leading-relaxed">
                {session.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* What it covers & What's included (Aligned in line with Therapy fee and format) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
                {/* What it covers Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-[#2D5A43]">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                      What it covers
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {session.whatItCovers.map((item, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-[13.5px] text-stone-600 font-light leading-relaxed"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* What's included Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-[#2D5A43]">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                      What&apos;s included
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {session.whatsIncluded.map((item, idx) => (
                      <p
                        key={idx}
                        className="text-sm sm:text-[13.5px] text-stone-600 font-light leading-relaxed"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Make Payment To Card (dynamically populated per session) */}
              {session.paymentDetails && (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-2xs space-y-4">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-stone-400 block">
                    {session.paymentDetails.title || 'MAKE PAYMENT TO'}
                  </span>

                  <div className="space-y-3.5 text-xs sm:text-[13.5px]">
                    {session.paymentDetails.bank && (
                      <div>
                        <p className="font-semibold text-stone-800">Bank</p>
                        <p className="text-stone-600 font-light">
                          {session.paymentDetails.bank}
                        </p>
                      </div>
                    )}

                    {session.paymentDetails.accountNumber && (
                      <div>
                        <p className="font-semibold text-stone-800">Account number</p>
                        <p className="text-stone-600 font-light">
                          {session.paymentDetails.accountNumber}
                        </p>
                      </div>
                    )}

                    {session.paymentDetails.accountName && (
                      <div>
                        <p className="font-semibold text-stone-800">Account name</p>
                        <p className="text-stone-600 font-light">
                          {session.paymentDetails.accountName}
                        </p>
                      </div>
                    )}

                    {session.paymentDetails.usdAccount && (
                      <div>
                        <p className="font-semibold text-stone-800">USD account</p>
                        <p className="text-stone-600 font-light">
                          {session.paymentDetails.usdAccount}
                        </p>
                      </div>
                    )}

                    {session.paymentDetails.ghanaAccount && (
                      <div>
                        <p className="font-semibold text-stone-800">Ghana account</p>
                        <p className="text-stone-600 font-light">
                          {session.paymentDetails.ghanaAccount}
                        </p>
                      </div>
                    )}

                    {session.paymentDetails.customFields?.map((field, idx) => (
                      <div key={idx}>
                        <p className="font-semibold text-stone-800">{field.label}</p>
                        <p className="text-stone-600 font-light">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Need Help First Card */}
              <div className="bg-[hsl(161_33%_27%)] rounded-3xl p-6 sm:p-5 text-white space-y-4 shadow-md border border-[hsl(161_33%_27%)]/40">
                <div className="space-y-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[hsl(33_38%_76%)] block">
                    NEED HELP FIRST?
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-normal text-[hsl(33_38%_76%)] leading-snug">
                    Ask SBM Holistic Farmacy directly.
                  </h2>
                  <p className="text-sm font-semibold text-stone-200/90 font-light leading-relaxed pt-0.5">
                    Use the contact page for therapy-session questions, payment
                    confirmation, and product support before or after booking.
                  </p>
                </div>

                {/* Direct Contact Methods */}
                <div className="space-y-1 pt-1 text-xs sm:text-[13px] border-t border-white/10">
                  {session.contactEmail && (
                    <a
                      href={`mailto:${session.contactEmail}`}
                      className="flex items-center gap-2.5 text-stone-200 hover:text-white transition-colors group py-0.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-[hsl(33_38%_76%)]" />
                      </div>
                      <span className="truncate">{session.contactEmail}</span>
                    </a>
                  )}

                  {session.contactPhone && (
                    <a
                      href={`tel:${session.contactPhone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2.5 text-stone-200 hover:text-white transition-colors group py-0.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-[hsl(33_38%_76%)]" />
                      </div>
                      <span>{session.contactPhone}</span>
                    </a>
                  )}
                </div>

                {/* Contact CTA Button */}
                <div className="pt-1">
                  <Link
                    href="/hub#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[hsl(33_38%_76%)] hover:opacity-90 active:opacity-80 text-stone-900 font-semibold text-xs sm:text-sm transition-all shadow-xs"
                  >
                    <span>Contact SBM Holistic Farmacy</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
