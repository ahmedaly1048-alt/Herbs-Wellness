"use client";

import React, { useEffect, useState, useRef } from "react";
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
  ChevronDown,
} from "lucide-react";

import { useCartStore } from "@/src/store/useCartStore";

const healingTracks = [
  {
    title: "Healing from GERD / Gastritis / Acid Reflux / Ulcer",
    href: "/shop/therapy/gerd-gastritis",
  },
  {
    title: "Hypertension Therapy",
    href: "/shop/therapy/hypertension",
  },
  {
    title: "Men's Reproductive Health",
    href: "/shop/therapy/mens-reproductive",
  },
  {
    title: "Preparing for Conception",
    href: "/shop/therapy/preparing-conception",
  },
  {
    title: "Reversing Diabetes",
    href: "/shop/therapy/reversing-diabetes",
  },
  {
    title: "Reversing PCOS",
    href: "/shop/therapy/reversing-pcos",
  },
  {
    title: "Cancer Therapy Program",
    href: "/shop/therapy/cancer-therapy",
  },
];

const exploreLinks = [
  {
    title: "Herbalist",
    href: "/hub#herbalist",
  },
  {
    title: "Services",
    href: "/hub#services",
  },
  {
    title: "Contact",
    href: "/hub#contact",
  },
];

export default function ShopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTherapyOpen, setIsTherapyOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  const openCart = useCartStore((state) => state.openCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Prevent SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTherapyOpen(false);
      }
      if (
        exploreRef.current &&
        !exploreRef.current.contains(event.target as Node)
      ) {
        setIsExploreOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTherapyOpen(false);
        setIsExploreOpen(false);
      }
    };

    if (isTherapyOpen || isExploreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTherapyOpen, isExploreOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setIsTherapyOpen(false);
    setIsExploreOpen(false);
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isRouteActive = (route: string) => {
    if (!pathname) return false;
    if (route === "home") {
      return pathname === "/" || pathname === "/hub";
    }
    if (route === "shop") {
      return pathname.startsWith("/shop/catalog");
    }
    if (route === "concerns") {
      return pathname.includes("#concerns");
    }
    if (route === "therapy") {
      return (
        pathname.startsWith("/shop/therapy") ||
        pathname === "/therapy-sessions" ||
        pathname.startsWith("/therapy-sessions")
      );
    }
    if (route === "explore") {
      return isExploreOpen;
    }
    if (route === "consultation") {
      return pathname === "/consultation" || pathname === "/hub/consultation";
    }
    if (route === "journal") {
      return pathname.includes("/journal") || pathname.includes("/blog");
    }
    if (route === "about") {
      return pathname === "/about" || pathname.startsWith("/about");
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
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[13.5px] lg:text-[14px]">
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
              href="/shop#concerns"
              className={`transition-colors ${isRouteActive("concerns")
                ? "font-medium text-stone-700"
                : "text-stone-500 hover:text-stone-700 font-normal"
                }`}
            >
              Concerns
            </Link>

            {/* Therapy session Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsTherapyOpen(!isTherapyOpen);
                  setIsExploreOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none ${isRouteActive("therapy")
                  ? "font-medium text-stone-700"
                  : isTherapyOpen
                    ? "text-stone-700 font-normal"
                    : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
                aria-expanded={isTherapyOpen}
                aria-haspopup="true"
              >
                <span>Therapy session</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isTherapyOpen ? "rotate-180 text-stone-800" : "text-stone-400"
                    }`}
                />
              </button>

              {/* Modal / Popover Dropdown Card */}
              {isTherapyOpen && (
                <div className="absolute top-full left-0 mt-2.5 w-[275px] sm:w-[295px] bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.10)] px-1.5 py-2.5 sm:px-1 sm:py-3 z-50 animate-fade-up">
                  <div className="space-y-1">
                    {/* Header Label */}
                    <div className="px-2.5 sm:px-3 pt-0.5 pb-0.5">
                      <span className="text-[10.5px] font-bold text-stone-400 uppercase tracking-[0.2em] block">
                        HEALING TRACKS
                      </span>
                    </div>

                    {/* Track List */}
                    <ul className="space-y-0.5">
                      {healingTracks.map((track, idx) => (
                        <li key={idx}>
                          <Link
                            href={track.href}
                            onClick={() => setIsTherapyOpen(false)}
                            className="block w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[13.5px] text-stone-800 hover:text-stone-950 hover:bg-[#EFECE6] border border-transparent hover:border-[#2D5A43]/45 transition-all duration-150 leading-snug font-normal"
                          >
                            {track.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Explore Dropdown */}
            <div className="relative" ref={exploreRef}>
              <button
                type="button"
                onClick={() => {
                  setIsExploreOpen(!isExploreOpen);
                  setIsTherapyOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none ${isRouteActive("explore")
                  ? "font-medium text-stone-700"
                  : isExploreOpen
                    ? "text-stone-700 font-normal"
                    : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
                aria-expanded={isExploreOpen}
                aria-haspopup="true"
              >
                <span>Explore</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isExploreOpen ? "rotate-180 text-stone-800" : "text-stone-400"
                    }`}
                />
              </button>

              {/* Modal / Popover Dropdown Card */}
              {isExploreOpen && (
                <div className="absolute top-full left-0 mt-2.5 w-[220px] bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.10)] px-1.5 py-2.5 sm:px-1 sm:py-3 z-50 animate-fade-up">
                  <div className="space-y-1">
                    {/* Header Label */}
                    <div className="px-2.5 sm:px-3 pt-0.5 pb-0.5">
                      <span className="text-[10.5px] font-bold text-stone-400 uppercase tracking-[0.2em] block">
                        EXPLORE
                      </span>
                    </div>

                    {/* Links List */}
                    <ul className="space-y-0.5">
                      {exploreLinks.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            href={link.href}
                            onClick={() => setIsExploreOpen(false)}
                            className="block w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[13.5px] text-stone-800 hover:text-stone-950 hover:bg-[#EFECE6] border border-transparent hover:border-[#2D5A43]/45 transition-all duration-150 leading-snug font-normal"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

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
              href="/blog"
              className={`transition-colors ${isRouteActive("journal")
                ? "font-medium text-stone-700"
                : "text-stone-500 hover:text-stone-700 font-normal"
                }`}
            >
              Journal
            </Link>

            <Link
              href="/about"
              className={`transition-colors ${isRouteActive("about")
                ? "font-medium text-stone-700"
                : "text-stone-500 hover:text-stone-700 font-normal"
                }`}
            >
              About
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
                href="/shop/catalog"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("shop")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Shop
              </Link>

              <Link
                href="/shop#concerns"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("concerns")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Concerns
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
                href="/blog"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("journal")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                Journal
              </Link>

              <Link
                href="/about"
                onClick={toggleMenu}
                className={`block py-1.5 text-[15px] transition-colors ${isRouteActive("about")
                  ? "font-medium text-stone-700"
                  : "text-stone-500 hover:text-stone-700 font-normal"
                  }`}
              >
                About
              </Link>
            </div>
          </div>

          {/* Explore Category */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.18em] block">
              Explore
            </span>

            <div className="space-y-1.5">
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
            </div>
          </div>

          {/* Therapy Session Category */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.18em] block">
              THERAPY SESSION
            </span>

            <div className="space-y-1.5">
              <Link
                href="/shop/therapy/gerd-gastritis"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Gut healing
              </Link>

              <Link
                href="/shop/therapy/hypertension"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Hypertension
              </Link>

              <Link
                href="/shop/therapy/mens-reproductive"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Men's fertility
              </Link>

              <Link
                href="/shop/therapy/preparing-conception"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Conception prep
              </Link>

              <Link
                href="/shop/therapy/reversing-diabetes"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Diabetes support
              </Link>

              <Link
                href="/shop/therapy/reversing-pcos"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                PCOS support
              </Link>

              <Link
                href="/shop/therapy/cancer-therapy"
                onClick={toggleMenu}
                className="block py-1.5 text-[15px] text-stone-500 hover:text-stone-700 font-normal transition-colors"
              >
                Cancer therapy
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
            Sign in
          </Link>

          <Link
            href="/hub/booking"
            onClick={toggleMenu}
            className="block w-full text-center bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-sm font-semibold py-3.5 px-4 rounded-full transition-colors"
          >
            Create Account
          </Link>
        </div>
      </aside>
    </>
  );
}