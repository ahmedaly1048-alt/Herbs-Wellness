"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Leaf,
  ShoppingCart,
  User,
  Activity,
  PhoneCall,
} from "lucide-react";

import { useCartStore } from "@/src/store/useCartStore";

export default function ShopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const openCart = useCartStore((state) => state.openCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Prevent SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        id="hub-nav"
        className="w-full bg-white border-b border-stone-100 sticky top-0 z-40"
      >
        <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMenu}
              className="p-1 text-stone-700 hover:text-stone-900 md:hidden focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-7 h-7 text-[#88B04B]" />
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-widest text-stone-900 uppercase leading-none">
                  HERBS & WELLNESS
                </span>
                <span className="text-[8px] tracking-widest text-stone-500 uppercase leading-tight">
                  Holistic Integrative Clinic
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-stone-700">
            <Link
              href="/hub"
              className="hover:text-[#88B04B] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/hub/consultation"
              className="hover:text-[#88B04B] transition-colors"
            >
              Consultation
            </Link>
            <Link
              href="/hub#herbalist"
              className="hover:text-[#88B04B] transition-colors"
            >
              Herbalist
            </Link>
            <Link
              href="/hub#services"
              className="hover:text-[#88B04B] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/hub#contact"
              className="hover:text-[#88B04B] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/shop/catalog"
              className="hover:text-[#88B04B] transition-colors"
            >
              Shop
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCart}
              aria-label="View Cart"
              className="relative p-2 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 stroke-[1.8]" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#125821] text-[10px] font-bold text-white shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="hidden md:block">
              <Link
                href="/hub/booking"
                className="bg-[#9ACD32] hover:bg-[#88B04B] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                Make an Appointment
              </Link>
            </div>
          </div>
        </div>
      </header>

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
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Herbs & Wellness
          </h2>
          <button
            onClick={toggleMenu}
            className="p-1 text-stone-400 hover:text-stone-700"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Mobile Menu Navigation */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6 font-sans">
          {/* Main & Navigation Links */}
          <div className="space-y-1">
            <h3 className="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
              Navigation
            </h3>


            <Link
              href="/"
              onClick={toggleMenu}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive("/hub")
                  ? "bg-blue-50/80 text-blue-600 font-semibold"
                  : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <Link
              href="/hub/consultation"
              onClick={toggleMenu}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive("/hub/consultation")
                  ? "bg-blue-50/80 text-blue-600 font-semibold"
                  : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              <CalendarCheck2 className="w-5 h-5" />
              <span>Consultation</span>
            </Link>

            <Link
              href="/hub#herbalist"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Herbalist</span>
            </Link>

            <Link
              href="/hub#services"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <Activity className="w-5 h-5" />
              <span>Services</span>
            </Link>

            <Link
              href="/hub#contact"
              onClick={toggleMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Contact</span>
            </Link>

            <Link
              href="/shop/catalog"
              onClick={toggleMenu}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive("/shop/catalog") || isActive("/shop")
                  ? "bg-blue-50/80 text-blue-600 font-semibold"
                  : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              <Tag className="w-5 h-5" />
              <span>Shop</span>
            </Link>
          </div>

          {/* INFORMATION Category */}
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

          {/* FEEDBACK Category */}
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

          {/* Mobile Appointment CTA Button */}
          <div className="pt-2 pb-4">
            <Link
              href="/hub/booking"
              onClick={toggleMenu}
              className="block w-full text-center bg-[#9ACD32] hover:bg-[#88B04B] text-white text-xs font-bold px-5 py-3 rounded-full transition-colors duration-200"
            >
              Make an Appointment
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}