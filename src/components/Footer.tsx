'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission logic here
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#2D5A43] text-stone-200 font-sans pt-16 pb-12 px-6 lg:px-16 border-t border-stone-700/30">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Newsletter Column (Centered Text/Items) */}
          <div className="lg:col-span-5 space-y-6 pr-0 lg:pr-8 flex flex-col items-center text-center lg:items-center lg:text-center">
            {/* Logo Text (Centered, No Image) */}
            <Link href="/" className="flex flex-col items-center">
              <span className="font-serif text-lg font-bold tracking-wider text-white uppercase leading-none">
                HERBS &amp; WELLNESS
              </span>
              <span className="text-[9px] font-sans tracking-[0.25em] text-stone-300 uppercase mt-1">
                F A R M A C Y
              </span>
            </Link>

            {/* Description */}
            <p className="text-xs text-stone-300 font-light leading-relaxed max-w-sm">
              Home of healing with plant and holistic lifestyle. Products, therapy sessions, and wellness support designed to help people heal with nature.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="space-y-3 max-w-sm w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#244A37] border border-stone-600/50 rounded-2xl px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors text-center"
              />
              <button
                type="submit"
                className="w-full bg-[#D9C4AC] hover:bg-[#cbb297] text-stone-900 text-xs font-semibold py-3.5 rounded-full transition-all shadow-2xs"
              >
                Join the letter
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-stone-600/60 flex items-center justify-center text-stone-300 hover:text-white hover:border-stone-400 transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full border border-stone-600/60 flex items-center justify-center text-stone-300 hover:text-white hover:border-stone-400 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-stone-600/60 flex items-center justify-center text-stone-300 hover:text-white hover:border-stone-400 transition-colors"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Grid Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4 lg:pt-0">
            
            {/* Column 1: Shop */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 block">
                SHOP
              </span>
              <ul className="space-y-3 text-xs text-stone-200 font-light">
                <li><Link href="/shop" className="hover:text-white transition-colors">All products</Link></li>
                <li><Link href="/shop?filter=concern" className="hover:text-white transition-colors">Shop by concern</Link></li>
                <li><Link href="/shop/gut-digestion" className="hover:text-white transition-colors">Gut &amp; digestion</Link></li>
                <li><Link href="/shop/womens-health" className="hover:text-white transition-colors">Women&apos;s health</Link></li>
                <li><Link href="/shop/mens-wellness" className="hover:text-white transition-colors">Men&apos;s wellness</Link></li>
                <li><Link href="/shop/detox-cleanses" className="hover:text-white transition-colors">Detox &amp; cleanses</Link></li>
                <li><Link href="/shop/immunity-relief" className="hover:text-white transition-colors">Immunity &amp; relief</Link></li>
                <li><Link href="/shop/superfoods" className="hover:text-white transition-colors">Superfoods &amp; daily wellness</Link></li>
              </ul>
            </div>

            {/* Column 2: Therapy Session */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 block">
                THERAPY SESSION
              </span>
              <ul className="space-y-3 text-xs text-stone-200 font-light">
                <li><Link href="/therapy-sessions?session=gut-healing" className="hover:text-white transition-colors">Gut healing</Link></li>
                <li><Link href="/therapy-sessions?session=hypertension" className="hover:text-white transition-colors">Hypertension</Link></li>
                <li><Link href="/therapy-sessions?session=mens-fertility" className="hover:text-white transition-colors">Men&apos;s fertility</Link></li>
                <li><Link href="/therapy-sessions?session=conception-prep" className="hover:text-white transition-colors">Conception prep</Link></li>
                <li><Link href="/therapy-sessions?session=diabetes-support" className="hover:text-white transition-colors">Diabetes support</Link></li>
                <li><Link href="/therapy-sessions?session=pcos-support" className="hover:text-white transition-colors">PCOS support</Link></li>
                <li><Link href="/therapy-sessions?session=cancer-therapy" className="hover:text-white transition-colors">Cancer therapy</Link></li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 block">
                SUPPORT
              </span>
              <ul className="space-y-3 text-xs text-stone-200 font-light">
                <li><Link href="/consultation" className="hover:text-white transition-colors">Consultation</Link></li>
                <li><Link href="/track-order" className="hover:text-white transition-colors">Track an order</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Herbs &amp; Wellness Farmacy</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-stone-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400 font-light">
          <div>
            © 2026 Herbs &amp; Wellness Farmacy. Made in Nigeria.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-stone-200 transition-colors">Terms</Link>
            <Link href="/shipping" className="hover:text-stone-200 transition-colors">Shipping</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}