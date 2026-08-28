'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Menu,
  X,
  Building2,
  Tag,
  CalendarCheck2,
  FileText,
  Edit3,
  BookOpen,
  Star,
  Asterisk,
  Smile,
  Info,
  Newspaper,
  Phone,
  CalendarDays,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

interface NavigationProps {
  links: NavItem[];
  className?: string;
}

// Pick a suitable icon for the homepage panel links
function getItemIcon(name: string) {
  const key = name.toLowerCase();
  if (key.includes('about')) return <Info className="w-5 h-5" />;
  if (key.includes('blog')) return <Newspaper className="w-5 h-5" />;
  if (key.includes('contact')) return <Phone className="w-5 h-5" />;
  if (key.includes('appointment') || key.includes('book')) return <CalendarDays className="w-5 h-5" />;
  return <ChevronRight className="w-5 h-5" />;
}

export default function Navigation({ links, className = '' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => pathname === path;

  const linkClasses = (path: string) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-blue-50/80 text-blue-600 font-semibold'
        : 'text-stone-800 hover:bg-stone-50'
    }`;

  return (
    <>
      {/* Desktop horizontal nav (unchanged) */}
      <nav className={`hidden md:flex items-center gap-6 ${className}`}>
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            aria-label={`Navigate to ${item.name}`}
            className="text-sm font-semibold tracking-wider text-stone-200 hover:text-white uppercase transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Open Menu"
        className="p-1.5 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors md:hidden focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Drawer Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/40 z-50 transition-opacity md:hidden"
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Herbs & Wellness
          </h2>
          <button
            type="button"
            onClick={toggleMenu}
            className="p-1 text-stone-400 hover:text-stone-700"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Mobile Menu Navigation */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6 font-sans">
          {/* Core Pages Section (same as ShopNavbar) */}
          <div className="space-y-1">
            <Link href="/" onClick={toggleMenu} className={linkClasses('/')}>
              <Building2 className="w-5 h-5" />
              <span>Welcome</span>
            </Link>

            <Link href="/shop" onClick={toggleMenu} className={linkClasses('/shop')}>
              <Tag className="w-5 h-5" />
              <span>Products</span>
            </Link>

            <Link
              href="/hub/consultation"
              onClick={toggleMenu}
              className={linkClasses('/hub/consultation')}
            >
              <CalendarCheck2 className="w-5 h-5" />
              <span>Services</span>
            </Link>

            {/* Homepage panel links passed in (about, blog, contact, appointment) */}
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={toggleMenu}
                className={linkClasses(item.href)}
              >
                {getItemIcon(item.name)}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* INFORMATION Category (kept as-is) */}
          <div className="space-y-1">
            <h3 className="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
              Information
            </h3>

            <Link
              href="/policies"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>Policies</span>
            </Link>

            <Link
              href="/blog"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <Edit3 className="w-5 h-5" />
              <span>Blog</span>
            </Link>

            <Link
              href="/help"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>Help</span>
            </Link>
          </div>

          {/* FEEDBACK Category (kept as-is) */}
          <div className="space-y-1">
            <h3 className="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
              Feedback
            </h3>

            <Link
              href="/review"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <Star className="w-5 h-5" />
              <span>Review</span>
            </Link>

            <Link
              href="/suggestion"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <Asterisk className="w-5 h-5" />
              <span>Suggestion</span>
            </Link>

            <Link
              href="/issue"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <Smile className="w-5 h-5" />
              <span>Issue</span>
            </Link>
          </div>
        </div>

        {/* Appointment CTA */}
        <div className="p-4 border-t border-stone-100">
          <Link
            href="/hub/booking"
            onClick={toggleMenu}
            className="block bg-[#9ACD32] hover:bg-[#88B04B] text-white text-xs font-bold px-5 py-2.5 rounded-full text-center transition-colors duration-200"
          >
            Make an Appointment
          </Link>
        </div>
      </aside>
    </>
  );
}