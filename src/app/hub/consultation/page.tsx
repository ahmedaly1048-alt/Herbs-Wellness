'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import ShopNavbar from '@/src/components/ShopNavbar';

export default function ConsultationPage() {
  const handleConsultationPayment = () => {
    alert('Redirecting to Paystack for Clinical Consultation (₦30,000.00)...');
  };

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 font-sans flex flex-col justify-between">
      <div>
        <ShopNavbar/>

        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-8 pb-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-stone-900 font-semibold text-sm hover:text-[#125821] transition-colors"
          >
            <span className="p-1.5 rounded-md border border-stone-200 bg-white shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </span>
            <span>Services</span>
          </Link>
        </div>

        <main className="max-w-7xl mx-auto px-6 lg:px-16 py-6 pb-20">
          <div className="bg-white rounded-3xl border border-stone-200/70 p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-100">
              <Image
                src="/consultation-hero.jpg"
                alt="Clinical Wellness Consultation"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-4">
                  Start your Consultation
                </h1>
                <p className="text-stone-700 text-sm leading-relaxed mb-3">
                  Begin your journey to root-cause healing, not temporary relief.
                </p>
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  This is a 1:1 clinical session where we assess your symptoms in depth and create a fully personalized treatment plan — including customized herbal formulations and a structured meal plan tailored to your body.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h2 className="text-base font-bold text-stone-900">How It Works</h2>
                <div className="space-y-4 text-xs md:text-sm text-stone-600 leading-relaxed font-light">
                  <div>
                    <strong className="text-stone-800 font-semibold block mb-0.5">1. Book Your Session</strong>
                    <p>Tap Book Service, select your consultant, and choose your preferred date and time.</p>
                  </div>
                  <div>
                    <strong className="text-stone-800 font-semibold block mb-0.5">2. Secure Your Slot (₦30,000)</strong>
                    <p>Complete your payment via Paystack to confirm your consultation.</p>
                  </div>
                  <div className="space-y-2">
                    <strong className="text-stone-800 font-semibold block">3. 1:1 Deep Diagnostic Call (30–45 mins)</strong>
                    <p>You'll meet with a Naxawellness specialist to:</p>
                    <ul className="list-disc list-inside pl-2 space-y-1 text-stone-600">
                      <li>Understand why your symptoms keep returning</li>
                      <li>Review your gut, hormones, lifestyle, and triggers</li>
                      <li>Identify your root cause (not just symptoms)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <strong className="text-stone-800 font-semibold block">4. Receive Your Personalized Treatment Plan</strong>
                    <p>After your consultation, you'll get a custom roadmap designed specifically for you, including:</p>
                    <ul className="list-disc list-inside pl-2 space-y-1 text-stone-600">
                      <li>A step-by-step healing plan (Gut → Detox → Hormones → Nervous system)</li>
                      <li>Customized herbal formulations tailored to your condition</li>
                      <li>Supplement recommendations with exact dosages</li>
                      <li>A structured meal plan based on your body and symptoms</li>
                      <li>Lifestyle guidance for each healing phase</li>
                      <li>Budget estimate per phase (₦50K–₦70K depending on complexity)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h2 className="text-base font-bold text-stone-900">What Happens Next</h2>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-light">
                  You'll begin your treatment using your custom-made herbal formulations, following a structured plan designed to deliver real, lasting results — not temporary fixes.
                </p>
                <p className="text-xs md:text-sm text-stone-800 italic font-medium pt-2">
                  Every treatment plan is personalized. No two protocols are the same.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">TOTAL</span>
                  <span className="text-xl md:text-2xl font-bold text-stone-900">₦30,000.00</span>
                </div>
                <button
                  onClick={handleConsultationPayment}
                  className="bg-[#526D53] hover:bg-[#3d533e] text-white text-xs md:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Book Service
                </button>
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