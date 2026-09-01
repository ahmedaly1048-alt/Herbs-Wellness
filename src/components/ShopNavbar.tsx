"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Heart,
  User,
  ShoppingBag,
  Leaf,
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

  const isRouteActive = (route: string) => {
    if (!pathname) return false;
    if (route === "home") {
      return pathname === "/" || pathname === "/hub";
    }
    if (route === "shop") {
      return pathname === "/shop" || pathname.startsWith("/shop/");
    }
    if (route === "consultation") {
      return pathname === "/consultation" || pathname === "/hub/consultation";
    }
    return pathname === route;
  };

  return (
    <>
      <header
        id="hub-nav"
        className="w-full bg-[#FAF8F5] border-b border-stone-200/70 sticky top-0 z-40 font-sans border border-[#e5e7eb]"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between">
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3.5">
            <button
              onClick={toggleMenu}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-stone-800 hover:text-stone-950 hover:bg-[#EFEBE1] active:bg-[#E6E0D4] transition-colors md:hidden focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5 stroke-[1.8]" />
            </button>

            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
              {/* Circular Emblem Badge */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#2D5A43]/40 bg-white flex items-center justify-center shadow-2xs group-hover:border-[#2D5A43] transition-colors shrink-0">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D5A43]" />
              </div>
              <div className="flex flex-col justify-center gap-0.5 sm:gap-1">
                <span className="text-[13px] sm:text-sm font-serif font-bold tracking-[0.10em] sm:tracking-[0.14em] text-stone-900 uppercase leading-[1.1] block">
                  HERBS &amp; WELLNESS
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.17em] text-[#2D5A43] uppercase font-semibold mt-0.5 leading-none block">
                  F A R M A C Y
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[14px]">
            <Link
              href="/hub"
              className={`transition-colors ${isRouteActive("home")
                ? "font-medium text-stone-700"
                : "text-stone-500 hover:text-stone-700 font-normal"
                }`}
            >
              Home
            </Link>
            <Link
              href="/shop/catalog"
              className={`transition-colors ${isRouteActive("shop")
                ? "font-medium text-stone-700"
                : "text-stone-500 hover:text-stone-700 font-normal"
                }`}
            >
              Shop
            </Link>
            <Link
              href="/hub/consultation"
              className={`transition-colors ${isRouteActive("consultation")
                ? "font-medium text-stone-700"
                : "text-stone-500 hover:text-stone-700 font-normal"
                }`}
            >
              Consultation
            </Link>
            <Link
              href="/hub#herbalist"
              className="text-stone-500 hover:text-stone-700 font-normal transition-colors"
            >
              Herbalist
            </Link>
            <Link
              href="/hub#services"
              className="text-stone-500 hover:text-stone-700 font-normal transition-colors"
            >
              Services
            </Link>
            <Link
              href="/hub#contact"
              className="text-stone-500 hover:text-stone-700 font-normal transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 text-stone-800">
            <Link
              href="/shop/catalog"
              aria-label="Search"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#EFEBE1] active:bg-[#E6E0D4] transition-colors duration-150"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.8]" />
            </Link>

            <Link
              href="/shop/catalog"
              aria-label="Wishlist"
              className="w-10 h-10 rounded-full items-center justify-center hover:bg-[#EFEBE1] active:bg-[#E6E0D4] transition-colors duration-150 hidden md:flex"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
            </Link>

            <Link
              href="/hub/booking"
              aria-label="Account"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#EFEBE1] active:bg-[#E6E0D4] transition-colors duration-150"
            >
              <User className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.8]" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="View Cart"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#EFEBE1] active:bg-[#E6E0D4] transition-colors duration-150 relative cursor-pointer"
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.8]" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2D5A43] text-[9px] font-bold text-white shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity md:hidden"
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[93%] max-w-[93vw] sm:max-w-[420px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Mobile Header */}
        <div className="px-6 py-5 border-b border-stone-200/60 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-normal text-stone-900 tracking-tight">
            Menu
          </h2>
          <button
            onClick={toggleMenu}
            className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Mobile Menu Navigation */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-8 font-sans">
          {/* Main Navigation Category */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.18em] block">
              Navigation
            </span>

            <div className="space-y-1.5">
              <Link
                href="/"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("home")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Home
              </Link>

              <Link
                href="/hub/consultation"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("consultation")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Consultation
              </Link>

              <Link
                href="/hub#herbalist"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Herbalist
              </Link>

              <Link
                href="/hub#services"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Services
              </Link>

              <Link
                href="/hub#contact"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Contact
              </Link>

              <Link
                href="/shop/catalog"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("shop")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Shop
              </Link>
            </div>
          </div>

          {/* Information Category */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.18em] block">
              Information
            </span>

            <div className="space-y-1.5">
              <Link
                href="/policies"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("/policies")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Policies
              </Link>

              <Link
                href="/blog"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("/blog")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Blog
              </Link>

              <Link
                href="/help"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("/help")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Help
              </Link>
            </div>
          </div>

          {/* Feedback Category */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.18em] block">
              Feedback
            </span>

            <div className="space-y-1.5">
              <Link
                href="/review"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("/review")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Review
              </Link>

              <Link
                href="/suggestion"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("/suggestion")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Suggestion
              </Link>

              <Link
                href="/issue"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("/issue")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Issue
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-stone-200/60 bg-white space-y-3 shrink-0">
          <Link
            href="/hub/booking"
            onClick={toggleMenu}
            className="block w-full text-center bg-[#2D5A43] hover:bg-[#234734] text-white text-sm font-semibold py-3.5 px-4 rounded-full transition-colors shadow-xs"
          >
            Make an Appointment
          </Link>

          <Link
            href="/shop/catalog"
            onClick={toggleMenu}
            className="block w-full text-center bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-sm font-semibold py-3.5 px-4 rounded-full transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </aside>
    </>
  );
}