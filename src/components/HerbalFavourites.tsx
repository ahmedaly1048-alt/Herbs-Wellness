'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  type: 'cart' | 'options';
  href: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Acne Tea',
    price: '₦20,450.00',
    image: '', // Replace with your image path (e.g., "/products/acne-tea.jpg")
    type: 'cart',
    href: '/shop/acne-tea',
  },
  {
    id: '2',
    name: 'Adaptogen (Capsules)',
    price: '₦28,000.00',
    image: '', // Replace with your image path (e.g., "/products/adaptogen.jpg")
    type: 'cart',
    href: '/shop/adaptogen',
  },
  {
    id: '3',
    name: 'Aparun',
    price: '₦19,000.00 – ₦35,000.00',
    image: '', // Replace with your image path (e.g., "/products/aparun.jpg")
    type: 'options',
    href: '/shop/aparun',
  },
  {
    id: '4',
    name: 'Gut Heal Tea',
    price: '₦30,000.00',
    image: '', // Replace with your image path (e.g., "/products/gut-heal-tea.jpg")
    type: 'options',
    href: '/shop/gut-heal-tea',
  },
];

export default function HerbalFavourites() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-[#EAEAEA] py-16 text-stone-900">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Section Title */}
        <h2 className="text-center font-serif text-3xl md:text-4xl text-stone-800 mb-12 tracking-normal font-normal">
          herbal favourites
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card flex flex-col items-center text-center group"
            >
              {/* Image Container with Fixed Aspect Ratio */}
              <div className="relative w-full aspect-square bg-white overflow-hidden shadow-sm mb-5">
                <Image
                  src={product.image || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Product Info */}
              <h3 className="font-semibold text-stone-900 text-sm md:text-base mb-1.5">
                {product.name}
              </h3>

              <p className="font-bold text-stone-900 text-xs md:text-sm mb-4">
                {product.price}
              </p>

              {/* Action Button */}
              {product.type === 'cart' ? (
                <button
                  type="button"
                  className="bg-[#0D4018] hover:bg-[#082b10] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
                >
                  Add to cart
                </button>
              ) : (
                <Link
                  href={product.href}
                  className="bg-[#0D4018] hover:bg-[#082b10] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 inline-block"
                >
                  Select options
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges Footer Bar */}
      <div className="w-full bg-[#0D4018] text-white mt-16 py-4 border-t border-emerald-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center text-xs md:text-sm font-medium tracking-wide">
          <span>made with care in Nigeria</span>
          <span className="hidden md:inline text-white/40">|</span>
          <span>NAFDAC approved</span>
          <span className="hidden md:inline text-white/40">|</span>
          <span>food grade only</span>
        </div>
      </div>
    </section>
  );
}