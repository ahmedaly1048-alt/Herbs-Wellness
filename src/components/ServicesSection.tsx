'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    id: '1',
    title: 'Holistic Health Assessment',
    description:
      'We offer a personalized assessment of your health concerns and goals, that blends the best of herbal medicine with the precision of modern science. We’ll conduct a thorough review of your medical history',
    image: '/s1 (2).jpg', // Replace with path e.g. "/services/assessment.jpg"
  },
  {
    id: '2',
    title: 'Naturopathic Medicine',
    description:
      'Naturopathy is a holistic approach to your wellness. By finding the root cause of your symptoms and emphasizing on individualized treatments, we strive to optimize your health. Our approaches include',
    image: '/s2.jpg', // Replace with path e.g. "/services/naturopathy.jpg"
  },
  {
    id: '3',
    title: 'Holistic Nutrition',
    description:
      'Guiding you to a lifestyle and dietary change according to your body constituents and individual needs focusing on gut health, optimal bodily function and disease prevention and reversal.',
    image: '/s3.jpg', // Replace with path e.g. "/services/nutrition.jpg"
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.service-card',
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
            Services
          </h2>
          {/* Lime Green Accent Line */}
          <div className="w-10 h-1 bg-[#9ACD32] rounded-full mb-4" />
          <p className="text-stone-600 text-xs md:text-sm max-w-2xl">
            We blend herbal medicine, nutrition, and modern science for personalized healing.
          </p>
        </div>

        {/* 3-Column Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="service-card flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Card Header Image */}
              <div className="relative w-full h-56 bg-stone-100 overflow-hidden">
                <Image
                  src={service.image || '/placeholder-service.jpg'}
                  alt={service.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Card Body Content */}
              <div className="p-6 flex flex-col items-center text-center flex-grow">
                <h3 className="text-lg font-bold text-stone-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}