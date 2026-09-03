'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Mail, Phone, Leaf } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import ServicesSection from '@/src/components/ServicesSection';
import HerbalistSection from '@/src/components/HerbalistSection';
import ContactSection from '@/src/components/ContactSection';

export default function HubPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        '#top-bar',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
        .fromTo(
          '#hub-nav',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '#hub-hero-content',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-stone-800 font-sans flex flex-col justify-between">
      <div>
        {/* Lime Green Top Contact Bar */}
        <div id="top-bar" className="w-full bg-[#9ACD32] text-white py-2 px-6 text-xs font-medium">
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a
                href="mailto:info@herbsandwellnesshub.com"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>info@herbsandwellnesshub.com</span>
              </a>
              <a
                href="tel:+2347064836444"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Phone className="w-3.5 h-3.5 fill-current stroke-none" />
                <span>+2347064836444</span>
              </a>
            </div>

            <div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <header id="hub-nav" className="w-full bg-white border-b border-stone-100 sticky top-0 z-40">
          <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-7 h-7 text-[#88B04B]" />
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-widest text-stone-900 uppercase leading-none">
                  HERBS & WELLNESS
                </span>
                <span className="text-[8px] tracking-widest text-stone-500 uppercase leading-tight">
                  Holistic Integrative Clinic
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-stone-700">
              <Link href="/hub" className="hover:text-[#88B04B] transition-colors">
                Home
              </Link>
              <Link href="/hub/consultation" className="hover:text-[#88B04B] transition-colors">
                Consultation
              </Link>
              <Link href="/hub#herbalist" className="hover:text-[#88B04B] transition-colors">
                Herbalist
              </Link>
              <Link href="/hub#services" className="hover:text-[#88B04B] transition-colors">
                Services
              </Link>
              <Link href="/hub/booking" className="hover:text-[#88B04B] transition-colors">
                Contact
              </Link>
              <Link href="/shop" className="hover:text-[#88B04B] transition-colors">
                Shop
              </Link>
            </nav>

            {/* Wired Appointment CTA */}
            <Link
              href="/hub/booking"
              className="bg-[#9ACD32] hover:bg-[#88B04B] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors duration-200"
            >
              Make an Appointment
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative w-full h-[80vh] min-h-[500px]  flex items-center overflow-hidden">
          {/* Background Image Slot */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero2 (2).jpg"
              alt="Herbs & Wellness Clinic Background"
              fill
              priority
              className="object-cover object-center opacity-60"
            />
          </div>

          {/* Content Block */}
          <div
            id="hub-hero-content"
            className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl"
          >
            <div className="max-w-xl">
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-stone-800 uppercase mb-2 block">
                WELCOME TO
              </span>

              <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                Herbs & Wellness
              </h1>

              <p className="text-stone-800 text-sm md:text-base font-normal leading-relaxed mb-8">
                A holistic wellness team blending herbal medicine, nutrition, and modern science for personalized healing.
              </p>

              <Link
                href="/hub#herbalist"
                className="inline-block bg-[#9ACD32] hover:bg-[#88B04B] text-white text-xs md:text-sm font-bold px-6 py-3 rounded-md transition-colors duration-200"
              >
                Meet the Herbalist
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <div id="services">
          <ServicesSection />
        </div>

        {/* Herbalist Section */}
        <div id="herbalist">
          <HerbalistSection />
        </div>

        {/* Contact & Footer Section */}
        <div id="contact">
          <ContactSection />
        </div>
      </div>

      {/* WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}