'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import ShopNavbar from '@/src/components/ShopNavbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-animate',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-stone-800 font-sans flex flex-col justify-between">
      <div>
        <ShopNavbar />

        <main className="w-full">
          {/* Top Hero / Intro & Story Section */}
          <section className="bg-[#093212] text-white py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="about-animate text-xs font-bold tracking-[0.25em] uppercase text-stone-300 mb-6">
                ABOUT US
              </h1>
              
              <p className="about-animate text-lg md:text-xl font-normal leading-relaxed text-stone-100 max-w-3xl mb-8">
                At Herbs & Wellness, we believe wellness should be intentional, natural, and rooted in understanding the body. We are a modern apothecary dedicated to creating herbal solutions that support real, lasting wellbeing, not quick fixes, but results you can feel over time.
              </p>

              <div className="about-animate mb-16">
                <ChevronDown className="w-6 h-6 text-stone-300 animate-bounce" />
              </div>

              <div className="about-animate border-t border-emerald-800/60 pt-12">
                <h2 className="text-2xl md:text-3xl font-serif italic text-white mb-6">
                  Our story
                </h2>
                
                <div className="space-y-4 text-xs md:text-sm text-stone-200 leading-relaxed max-w-3xl font-light">
                  <p>
                    Herbs & Wellness began as a personal journey, one rooted in the desire to feel better, live more intentionally, and understand the body beyond surface-level solutions.
                  </p>
                  <p>
                    What started as a search for balance gradually evolved into something deeper: a commitment to herbal wellness and the power of natural healing. Over time, that journey grew into a brand built on real experiences, knowledge, and results.
                  </p>
                  <p>
                    Today, Herbs & Wellness stands as a reflection of that journey, thoughtful, intentional, and grounded in purpose.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Founder Section */}
          <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-stone-50">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
              {/* Image & Title Column */}
              <div className="about-animate md:col-span-5">
                <h2 className="text-2xl md:text-3xl font-serif italic text-stone-900 mb-1">
                  Our founder
                </h2>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-600 mb-6">
                  AYOPEJU KOMOLAFE
                </h3>

                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-md bg-stone-200">
                  <Image
                    src="/founder.jpg"
                    alt="Ayopeju Komolafe - Founder of Herbs & Wellness"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>

              {/* Founder Details Text Column */}
              <div className="about-animate md:col-span-7 space-y-4 text-xs md:text-sm text-stone-700 leading-relaxed font-light md:pt-14">
                <p>
                  My journey into herbalism began during a period of my life when everything felt unsettled.
                </p>
                <p>
                  I was going through a difficult transition and found myself feeling drained, withdrawn, and disconnected. I knew I needed to take better care of myself in a way that felt natural and sustainable.
                </p>
                <p>
                  That decision led me to explore herbal remedies.
                </p>
                <p>
                  What started as a simple step gradually became something much deeper. As I began incorporating herbs into my routine, I noticed real changes: my energy improved, my body felt more balanced, and over time, long-standing concerns began to ease.
                </p>
                <p>
                  My skin improved noticeably.
                </p>
                <p>
                  My menstrual cycle became less painful, with reduced PMS and a healthier flow.
                </p>
                <p>
                  That was when it truly clicked for me that this wasn’t about fixing one issue, but supporting the body as a whole.
                </p>
                <p>
                  What began as a personal journey soon became a calling. I went on to study herbalism more intentionally and eventually became a clinical herbalist.
                </p>
                <p className="font-normal text-stone-900 pt-2">
                  Herbs & Wellness was created to turn real experiences into real results through intentional, natural wellness.
                </p>
              </div>
            </div>
          </section>

          {/* Mission, Vision, & Apothecary Green Section */}
          <section className="bg-[#093212] text-white py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Mission + Interior Image */}
              <div className="about-animate md:col-span-5 space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif italic text-white mb-4">
                    Our mission
                  </h2>
                  <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-light">
                    Our mission is to support wellbeing through natural herbal solutions that restore balance, improve health, and make herbal wellness accessible for everyday life.
                  </p>
                </div>

                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-stone-800">
                  <Image
                    src="/apothecary.jpg"
                    alt="Herbs & Wellness Apothecary Storefront"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Right Column: Vision + Apothecary Info */}
              <div className="about-animate md:col-span-7 space-y-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif italic text-white mb-4">
                    Our vision
                  </h2>
                  <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-light">
                    Our vision is a world where wellness is intentional, informed, and rooted in nature, and where herbal medicine is an essential part of healthy living.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-emerald-800/60">
                  <h2 className="text-2xl md:text-3xl font-serif italic text-white mb-4">
                    Our apothecary
                  </h2>
                  
                  <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-light">
                    Our apothecary is more than a collection of herbal products — it is a space for intentional wellness.
                  </p>
                  <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-light">
                    Each formulation is thoughtfully created using high-quality, responsibly sourced herbs, carefully prepared to preserve their natural potency and effectiveness.
                  </p>
                  <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-light">
                    From teas and tinctures to capsules and wellness blends, every product is designed to gently nourish, restore, and support the body over time.
                  </p>
                  <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-light">
                    Everything we create is rooted in purpose, guided by knowledge, and crafted to deliver real, lasting results — for those ready to move beyond temporary solutions and embrace a more natural, intentional approach to their wellbeing.
                  </p>

                  <div className="pt-6">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 bg-[#17461c] hover:bg-[#1f5924] border border-emerald-600/50 text-white text-xs font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md group"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
                      <span>Explore Our Herbal Blends</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </main>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}