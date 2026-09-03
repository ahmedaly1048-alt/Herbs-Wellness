'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    rating: 5,
    quote:
      '"I couldn\'t understand how I was feeling last night... I was just scared, I just took my blackseed oil.. I\'m much better, people should just try and have it at home"',
    author: 'Tee',
    initial: 'T',
    product: 'Black seed oil',
  },
  {
    rating: 5,
    quote:
      '"It was recommended for nail pain and discoloration. Stopped using it when it healed, I later had muscle pull some time and applied a little of oil of oregano to the affected area and it stopped within a minute. I recommend"',
    author: 'peace',
    initial: 'P',
    product: 'Oil of oregano',
  },
  {
    rating: 4,
    quote: '"It helps in its little way."',
    author: 'Customer',
    initial: 'C',
    product: 'Stomach healing tea',
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#F6F4EE] py-16 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
              LOVED BY HERBS &amp; WELLNESS CUSTOMERS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900">
              Quiet results that speak.
            </h2>
          </div>

          {/* Controls & Slide Counter */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-stone-500">
              01 / 12
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-2xs hover:bg-stone-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-2xs hover:bg-stone-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-stone-200/60 shadow-2xs flex flex-col justify-between space-y-6 min-h-[260px]"
            >
              {/* Stars & Quote */}
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? 'fill-amber-500 stroke-amber-500'
                          : 'stroke-stone-300 fill-transparent'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-stone-700 font-light leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-[#EBF2EE] flex items-center justify-center text-xs font-semibold text-stone-700 shrink-0">
                  {item.initial}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-stone-800">
                    {item.author}
                  </span>
                  <span className="text-[11px] text-stone-400 font-light">
                    on {item.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Horizontal Scrollbar Track */}
        <div className="relative w-full h-1.5 bg-stone-200/60 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-stone-500 rounded-full" />
        </div>

      </div>
    </section>
  );
}