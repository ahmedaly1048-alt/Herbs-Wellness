'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRef, useState } from 'react';

interface Testimonial {
  id: number;
  title: string;
  quote: string;
  author: string;
  location: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    title: 'My Blood Pressure Normalized Within Days',
    quote:
      '“My blood pressure has normalized after starting my protocol. I’m just 8 days in and I already feel so good. No headaches anymore. I combined it with the adaptogen.”',
    author: 'Adiyat',
    location: 'United Kingdom',
    verified: true,
  },
  {
    id: 2,
    title: 'Noticeable Energy Boost',
    quote:
      '“I have been using these herbal teas daily and my overall digestion and energy levels have improved significantly. Truly a life changer!”',
    author: 'Amara',
    location: 'Nigeria',
    verified: true,
  },
  {
    id: 3,
    title: 'Great Quality Products',
    quote:
      '“Fast delivery and excellent customer support. The gut heal tea helped soothe my stomach within a week of regular use.”',
    author: 'David',
    location: 'United States',
    verified: true,
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    animateSlide(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    });
  };

  const handlePrev = () => {
    animateSlide(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    });
  };

  const animateSlide = (updateState: () => void) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: 'power1.out',
      onComplete: () => {
        updateState();
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      },
    });
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section ref={containerRef} className="w-full bg-[#EAEAEA] py-16 text-stone-900">
      <div className="container mx-auto px-4 max-w-4xl relative">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous Testimonial"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded border border-stone-800 text-stone-800 hover:bg-stone-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          aria-label="Next Testimonial"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 text-[#0D4018] hover:text-[#06200c] transition-colors"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Centered Content Card */}
        <div className="flex flex-col items-center text-center px-8 sm:px-16">
          {/* 5 Star Rating */}
          <div className="flex items-center gap-1 mb-6 text-[#EBB627]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current stroke-none" />
            ))}
          </div>

          {/* Testimonial Content Block */}
          <div ref={contentRef} className="max-w-2xl">
            <h3 className="font-bold text-stone-900 text-base sm:text-lg mb-3 tracking-tight">
              {activeTestimonial.title}
            </h3>

            <p className="text-stone-700 text-sm sm:text-base font-normal leading-relaxed mb-6 font-sans">
              {activeTestimonial.quote}
            </p>

            <div className="flex flex-col items-center gap-0.5">
              <span className="font-bold text-stone-900 text-xs sm:text-sm">
                {activeTestimonial.author}, {activeTestimonial.location}
              </span>
              {activeTestimonial.verified && (
                <span className="text-[#0D4018] text-xs font-medium">
                  Verified Customer
                </span>
              )}
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentIndex) {
                    animateSlide(() => setCurrentIndex(index));
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-2 bg-[#0D4018]'
                    : 'w-2 bg-stone-400 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}