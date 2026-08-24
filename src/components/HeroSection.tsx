import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface HeroSectionProps {
  id: string;
  bgImage: string;
  imageAlt: string;
  ctaText: string;
  headingText: ReactNode;
  headerContent?: ReactNode;
  alignTextRight?: boolean;
  href?: string;
}

export default function HeroSection({
  id,
  bgImage,
  imageAlt,
  ctaText,
  headingText,
  headerContent,
  alignTextRight = false,
  href,
}: HeroSectionProps) {
  const content = (
    <div
      className={`relative z-10 mb-16 md:mb-24 flex flex-col group/link ${
        alignTextRight
          ? 'items-end text-right pr-2 lg:pr-8'
          : 'items-start text-left pl-2 lg:pl-8'
      }`}
    >
      <span className="text-lg sm:text-xl lg:text-2xl font-sans font-medium tracking-wide text-white uppercase mb-2 transition-transform duration-300 group-hover/link:translate-x-1">
        {ctaText}
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-white">
        {headingText}
      </h2>
    </div>
  );

  return (
    <section
      id={id}
      className="group relative flex h-screen md:h-auto w-full flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-500" />
      </div>

      <header className="relative z-10">{headerContent}</header>

      {href ? (
        <Link href={href} className="block w-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </section>
  );
}