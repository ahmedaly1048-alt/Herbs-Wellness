'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    id: '1',
    title: 'Herbal Teas',
    subtitle: 'Loose Leaf, Tea Bags & Powders',
    image: '', // Replace with your image path (e.g., "/categories/herbal-teas.jpg")
    href: '/shop/category/herbal-teas',
  },
  {
    id: '2',
    title: 'Herbal Tinctures',
    subtitle: 'Liquid Herbal Extracts (alcohol)',
    image: '', // Replace with your image path (e.g., "/categories/tinctures.jpg")
    href: '/shop/category/tinctures',
  },
  {
    id: '3',
    title: 'Capsules',
    subtitle: 'Vegan Capsules',
    image: '', // Replace with your image path (e.g., "/categories/capsules.jpg")
    href: '/shop/category/capsules',
  },
  {
    id: '4',
    title: 'Herbal Sets',
    subtitle: 'Synergistic Herbal Blends',
    image: '', // Replace with your image path (e.g., "/categories/herbal-sets.jpg")
    href: '/shop/category/herbal-sets',
  },
  {
    id: '5',
    title: 'Formulations',
    subtitle: 'Personal & General Wellness',
    image: '', // Replace with your image path (e.g., "/categories/formulations.jpg")
    href: '/shop/category/formulations',
  },
  {
    id: '6',
    title: 'Catch-all',
    subtitle: 'Tea Kettles, Wellness E-books, Souvenirs, Jars & More',
    image: '', // Replace with your image path (e.g., "/categories/catch-all.jpg")
    href: '/shop/category/catch-all',
  },
];

export default function ShopByCategory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.category-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 text-stone-900">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Section Title */}
        <h2 className="text-center font-serif text-3xl md:text-4xl text-stone-800 mb-12 font-normal tracking-wide">
          shop by category
        </h2>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="category-card flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Category Image Box */}
              <div className="relative w-full aspect-square bg-stone-100 overflow-hidden shadow-sm mb-4">
                <Image
                  src={cat.image || '/placeholder-category.jpg'}
                  alt={cat.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Category Info */}
              <h3 className="font-bold text-[#125821] text-base md:text-lg mb-1 group-hover:text-[#0b3815] transition-colors">
                {cat.title}
              </h3>

              <p className="text-stone-500 text-xs md:text-sm font-medium leading-relaxed max-w-[220px]">
                {cat.subtitle}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-14">
          <Link
            href="/shop/all"
            className="bg-[#0D4018] hover:bg-[#082b10] text-white font-bold text-xs md:text-sm px-8 py-3.5 rounded-full uppercase tracking-wider transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            SHOP ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}