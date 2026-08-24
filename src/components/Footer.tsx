import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaTiktok, FaSnapchat } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full font-sans">
      {/* Top Main Footer Block */}
      <div className="w-full bg-[#EAEAEA] text-stone-800 py-12 px-6 lg:px-16 border-t border-stone-300">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Column 1: Brand & Opening Hours */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <Leaf className="w-7 h-7 text-[#125821]" />
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-[0.18em] uppercase text-stone-900 leading-tight">
                  HERBS & WELLNESS
                </span>
                <span className="text-[8px] tracking-[0.12em] uppercase text-stone-500 leading-tight">
                  Holistic Integrative Clinic
                </span>
              </div>
            </Link>

            <h4 className="font-bold text-stone-900 text-sm md:text-base mb-2">
              Opening Hours
            </h4>
            <p className="text-stone-600 text-xs md:text-sm">
              Mon - Sat: 09:00am - 06:00pm
            </p>
          </div>

          {/* Column 2: Contact Details */}
          <div className="flex flex-col gap-3.5 text-xs md:text-sm text-stone-700 font-medium pt-2 md:pt-0">
            <a
              href="tel:+2347064836444"
              className="flex items-center gap-3 hover:text-[#125821] transition-colors"
            >
              <div className="bg-[#125821] text-white p-1.5 rounded">
                <Phone className="w-4 h-4 fill-current stroke-none" />
              </div>
              <span>+234 7064836444</span>
            </a>

            <a
              href="mailto:info@herbsandwellnesshub.com"
              className="flex items-center gap-3 hover:text-[#125821] transition-colors"
            >
              <div className="bg-[#125821] text-white p-1.5 rounded">
                <Mail className="w-4 h-4" />
              </div>
              <span>info@herbsandwellnesshub.com</span>
            </a>

            <div className="flex items-start gap-3">
              <div className="bg-[#125821] text-white p-1.5 rounded mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-snug">
                <span>108B Adeniyi Jones, Ikeja 100271</span>
                <span>Lagos</span>
              </div>
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col items-start pt-2 md:pt-0">
            <h4 className="font-bold text-stone-900 text-base md:text-lg mb-4">
              Let’s connect!
            </h4>

            <div className="flex items-center gap-2.5">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-[#125821] hover:bg-[#0e461a] text-white p-2.5 rounded transition-colors flex items-center justify-center"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="bg-[#125821] hover:bg-[#0e461a] text-white p-2.5 rounded transition-colors flex items-center justify-center"
              >
                <FaTiktok className="w-4 h-4" />
              </a>

              {/* Snapchat */}
              <a
                href="https://snapchat.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat"
                className="bg-[#125821] hover:bg-[#0e461a] text-white p-2.5 rounded transition-colors flex items-center justify-center"
              >
                <FaSnapchat className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Block */}
      <div className="w-full bg-white text-stone-500 py-8 px-4 text-center border-t border-stone-100">
        <div className="container mx-auto max-w-4xl flex flex-col items-center gap-3">
          <p className="text-[10px] md:text-xs font-semibold tracking-wider text-stone-400 uppercase">
            PROUDLY SERVING OUR COMMUNITY WITH HIGH-QUALITY HERBAL PRODUCTS & HOLISTIC WELLNESS GUIDANCE SINCE 2017.
          </p>

          <p className="text-[10px] md:text-xs text-stone-400 max-w-3xl leading-relaxed">
            Disclaimer: None of our claims have been evaluated by NAFDAC or the food and drug administration. They are not intended to diagnose, treat, cure, or prevent any health conditions. Always seek professional advice before starting any regimen.
          </p>

          <Link
            href="/privacy-policy"
            className="text-stone-800 hover:text-[#125821] text-xs font-semibold underline mt-1 transition-colors"
          >
            Privacy Policy
          </Link>

          <p className="text-stone-800 text-xs font-semibold mt-1">
            Copyright © Herbs & Wellness | Developed by{' '}
            <span className="text-[#125821] font-bold">S-WEB</span>
          </p>
        </div>
      </div>
    </footer>
  );
}