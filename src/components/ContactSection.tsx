'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useRef } from 'react';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ['#contact-header', '#contact-map', '.contact-card'],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full bg-white pt-16 font-sans">
      {/* Section Header */}
      <div id="contact-header" className="flex flex-col items-center text-center mb-10 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-2">
          Contact
        </h2>
        {/* Lime Green Accent Line */}
        <div className="w-10 h-1 bg-[#9ACD32] rounded-full mb-3" />
        <p className="text-stone-500 text-xs md:text-sm font-medium">
          Find us here:
        </p>
      </div>

      {/* Map Embed Container */}
      <div id="contact-map" className="w-full h-[380px] bg-stone-100 relative overflow-hidden mb-12 border-y border-stone-200">
        <iframe
          title="Herbs & Wellness Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.385311228498!2d3.3486111!3d6.6002778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93d0526e83d7%3A0x6a1bc01d143c7df4!2s108B%20Adeniyi%20Jones%2C%20Ikeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[20%] contrast-[95%]"
        />
      </div>

      {/* 3-Column Contact Details Block */}
      <div className="container mx-auto max-w-5xl px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center md:justify-items-start">
          
          {/* Location */}
          <div className="contact-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#9ACD32] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="w-5 h-5 fill-current stroke-none" />
            </div>
            <div className="flex flex-col text-left">
              <h4 className="font-bold text-stone-900 text-sm md:text-base">
                Location
              </h4>
              <p className="text-stone-500 text-xs md:text-sm">
                108B Adeniyi Jones, Ikeja, Lagos
              </p>
            </div>
          </div>

          {/* Call Us */}
          <a
            href="tel:+2347064836444"
            className="contact-card flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-[#9ACD32] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Phone className="w-5 h-5 fill-current stroke-none" />
            </div>
            <div className="flex flex-col text-left">
              <h4 className="font-bold text-stone-900 text-sm md:text-base">
                Call Us
              </h4>
              <p className="text-stone-500 text-xs md:text-sm">
                +2347064836444
              </p>
            </div>
          </a>

          {/* Email Us */}
          <a
            href="mailto:info@herbsandwellnesshub.com"
            className="contact-card flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-[#9ACD32] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <h4 className="font-bold text-stone-900 text-sm md:text-base">
                Email Us
              </h4>
              <p className="text-stone-500 text-xs md:text-sm">
                info@herbsandwellnesshub.com
              </p>
            </div>
          </a>

        </div>
      </div>

      {/* Hub Sub-Footer */}
      <div className="w-full bg-[#F4F5F7] py-8 px-4 text-center border-t border-stone-200">
        <div className="container mx-auto flex flex-col items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
          <p>
            © Copyright <span className="font-bold text-stone-800">Herbs & Wellness</span>. All Rights Reserved
          </p>
          <p>
            Developed by <span className="text-[#9ACD32] font-bold">S-WEB</span>
          </p>
        </div>
      </div>
    </section>
  );
}