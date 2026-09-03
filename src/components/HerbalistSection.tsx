'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function HerbalistSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ['#herbalist-image', '#herbalist-bio'],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full bg-white py-16 px-6 lg:px-16">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-2">
            Herbalist
          </h2>
          {/* Lime Green Accent Line */}
          <div className="w-10 h-1 bg-[#9ACD32] rounded-full mb-3" />
          <p className="text-stone-500 text-xs md:text-sm font-medium">
            Meet our founder
          </p>
        </div>

        {/* Founder Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Founder Image */}
          <div
            id="herbalist-image"
            className="relative w-full aspect-[4/3] md:aspect-[1/1] max-h-[480px] bg-stone-100 rounded-xl overflow-hidden shadow-sm"
          >
            <Image
              src="/herbalist.jpg" // Replace with your image path
              alt="Ayopeju Komolafe - Founder & Herbalist"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Founder Bio Text */}
          <div id="herbalist-bio" className="flex flex-col items-start justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4 tracking-tight">
              Ayopeju Komolafe
            </h3>

            <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-normal mb-6">
              Ayopeju leads this healing journey with a passion for natural wellness and whole-body care. Under her guidance, the practice offers a range of integrative services designed to support true, lasting health. From personalized Holistic Health Assessments to deeply rooted Naturopathic Medicine and Holistic Nutrition, each offering reflects a thoughtful blend of traditional wisdom and modern science. Her approach empowers clients to take charge of their wellbeing, gently, intentionally, and with care tailored to their individual needs.
            </p>

            {/* Social Link */}
            <a
              href="https://instagram.com/alluringwoman_ng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#0D4018] hover:text-[#9ACD32] font-medium text-xs md:text-sm transition-colors duration-200"
            >
              <FaInstagram className="w-4 h-4" />
              <span>@alluringwoman_ng</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}