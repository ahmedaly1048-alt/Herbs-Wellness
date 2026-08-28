'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronUp, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Do I have to stop my current medication?',
    answer:
      'No. Our holistic support is designed to work alongside your medical care, not replace it. For conditions like cancer we explicitly encourage a combined approach — always keep your doctor informed before making changes.',
  },
  {
    question: 'Are the products safe?',
    answer:
      'Yes. All products are formulated with high-quality, pure botanical ingredients and prepared following strict manufacturing standards to ensure safety and potency.',
  },
  {
    question: "What's the difference between a product and a therapy session?",
    answer:
      'Individual products target specific health needs, while a therapy session provides a comprehensive, multi-month guided protocol including diet plans, follow-ups, and tailored product combinations.',
  },
  {
    question: 'How soon will I see results?',
    answer:
      'Results vary depending on the individual and condition. Most clients report feeling positive changes within 2 to 4 weeks of consistent use and lifestyle implementation.',
  },
  {
    question: 'Do you deliver, and how do I pay?',
    answer:
      'We offer nationwide delivery across Nigeria as well as international shipping. Payment can be made securely via card, bank transfer, or online checkout options during ordering.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F6F4EE] py-16 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side Info Header */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
            GOOD TO KNOW
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
            Questions, answered.
          </h2>

          <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed max-w-md">
            A few of the things people ask before they begin their healing journey with us.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="text-xs font-medium text-stone-800 hover:text-[#2D5A43] transition-colors inline-flex items-center gap-1"
            >
              <span>Still have a question? Get in touch</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right Side Accordion Container */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-stone-200/60 shadow-2xs divide-y divide-stone-200/80">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="font-serif text-base md:text-lg font-bold text-stone-900 group-hover:text-[#2D5A43] transition-colors">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="pt-4 text-xs md:text-sm text-stone-600 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}