'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Mail, Phone, Leaf } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import WhatsAppButton from '@/src/components/WhatsAppButton';

export default function BookingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [subtotal, setSubtotal] = useState<number>(0);

  useGSAP(
    () => {
      gsap.fromTo(
        '#booking-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      );
    },
    { scope: containerRef }
  );

  const handleBookNow = () => {
    setSubtotal(20000);
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-stone-800 font-sans flex flex-col justify-between">
      <div>
        {/* Lime Green Top Bar */}
        <div className="w-full bg-[#9ACD32] text-white py-2 px-6 text-xs font-medium">
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a href="mailto:info@herbsandwellnesshub.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="w-3.5 h-3.5" />
                <span>info@herbsandwellnesshub.com</span>
              </a>
              <a href="tel:+2347064836444" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="w-3.5 h-3.5 fill-current stroke-none" />
                <span>+2347064836444</span>
              </a>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Header Navigation */}
        <header id="hub-nav" className="w-full bg-white border-b border-stone-100 sticky top-0 z-40">
          <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
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

            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-stone-700">
              <Link href="/hub" className="hover:text-[#88B04B] transition-colors">Home</Link>
              <Link href="/hub/consultation" className="hover:text-[#88B04B] transition-colors">Consultation</Link>
              <Link href="/hub/booking" className="hover:text-[#88B04B] transition-colors">Book Appointment</Link>
              <Link href="/shop" className="hover:text-[#88B04B] transition-colors">Shop</Link>
            </nav>

            <Link
              href="/hub/booking"
              className="bg-[#9ACD32] hover:bg-[#88B04B] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors duration-200"
            >
              Make an Appointment
            </Link>
          </div>
        </header>

        {/* Page Title */}
        <section className="w-full py-10 bg-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-2">
            Book Appointment
          </h1>
          <p className="text-stone-500 text-xs md:text-sm">Connect with the herbalist</p>
        </section>

        {/* Breadcrumb Bar */}
        <div className="w-full bg-[#F7F9F5] py-3 px-6 border-y border-stone-100">
          <div className="container mx-auto max-w-5xl flex items-center gap-2 text-xs font-medium">
            <Link href="/hub" className="text-[#9ACD32] hover:underline">Home</Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-semibold">Book Appointment</span>
          </div>
        </div>

        {/* Main Booking Content */}
        <main id="booking-content" className="container mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-3">
              Connect with the Herbalist
            </h2>
            <div className="w-12 h-1 bg-[#9ACD32] rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 border border-stone-200 rounded-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white shadow-sm">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-stone-800 text-sm md:text-base uppercase tracking-wide">
                  CONNECT WITH THE HERBALIST (VIRTUAL)
                </h3>
                <span className="text-stone-600 text-sm font-semibold">₦20,000.00</span>
              </div>

              <button
                type="button"
                onClick={handleBookNow}
                className="border border-[#9ACD32] text-[#9ACD32] hover:bg-[#9ACD32] hover:text-white text-xs font-bold px-5 py-2.5 rounded transition-colors duration-200 shrink-0"
              >
                Book Now
              </button>
            </div>

            <div className="border border-[#9ACD32] rounded-md p-6 bg-white shadow-sm flex flex-col gap-6">
              <h3 className="font-bold text-stone-800 text-xs md:text-sm uppercase tracking-wider">
                ORDER SUMMARY
              </h3>

              <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-xs md:text-sm text-stone-700 font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">
                  ₦{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <button
                type="button"
                disabled={subtotal === 0}
                className="w-full bg-[#9ACD32] hover:bg-[#88B04B] disabled:opacity-50 text-white text-xs font-bold py-3 rounded transition-colors duration-200"
              >
                Checkout
              </button>
            </div>
          </div>
        </main>
      </div>

      <footer className="w-full bg-[#F4F5F7] py-6 px-4 text-center border-t border-stone-200">
        <div className="container mx-auto flex flex-col items-center justify-center gap-1 text-xs text-stone-500 font-medium">
          <p>© Copyright <span className="font-bold text-stone-800">Herbs & Wellness</span>. All Rights Reserved</p>
          <p>Developed by <span className="text-[#9ACD32] font-bold">S-WEB</span></p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}