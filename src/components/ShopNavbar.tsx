"use client";

import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown, Leaf } from "lucide-react";
import { usePathname } from "next/navigation";

const CATEGORIES = [
  { name: "Herbal Teas", slug: "herbal-teas" },
  { name: "Herbal Tinctures", slug: "herbal-tinctures" },
  { name: "Capsules", slug: "capsules" },
  { name: "Herbal Sets", slug: "herbal-sets" },
  { name: "Formulations", slug: "formulations" },
  { name: "Catch-all", slug: "catch-all" },
  { name: "Sale", slug: "sale" },
];

export default function ShopNavbar() {
  const pathname = usePathname();

  return (
    <header
      id="store-navbar"
      className="w-full bg-white border-b border-stone-100 sticky top-0 z-40"
    >
      <div className="container mx-auto px-4 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Leaf className="w-7 h-7 text-[#125821]" />
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-[0.18em] uppercase text-stone-900 leading-tight">
              HERBS & WELLNESS
            </span>
            <span className="text-[8px] tracking-[0.12em] uppercase text-stone-500 leading-tight">
              Holistic Integrative Clinic
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-wide text-stone-700">
          <Link
            href="/shop"
            className="text-[#125821] font-bold hover:text-[#0e461a] transition-colors"
          >
            Home
          </Link>

          {/* Categories Dropdown */}
          <div className="relative group/drop py-6 cursor-pointer">
            <div className="flex items-center gap-1 group-hover/drop:text-[#125821] transition-colors">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4 text-stone-600 group-hover/drop:text-[#125821] transition-transform duration-200 group-hover/drop:rotate-180" />
            </div>

            {/* Dropdown Panel */}
            <div className="absolute top-full left-0 w-56 bg-white border-t-2 border-[#125821] shadow-lg rounded-b-sm opacity-0 invisible group-hover/drop:opacity-100 group-hover/drop:visible transition-all duration-200 ease-in-out z-50 py-2">
              <div className="flex flex-col">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/shop/category/${category.slug}`}
                    className="px-5 py-2.5 text-stone-700 text-sm font-normal hover:text-[#125821] hover:bg-stone-50 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/hub/consultation"
            className="hover:text-[#125821] transition-colors"
          >
            Booking
          </Link>
          <Link href="#blog" className="hover:text-[#125821] transition-colors">
            Blog
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${
              pathname === "/about"
                ? "text-[#125821] font-bold"
                : "hover:text-[#125821]"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/hub/consultation"
            className="hover:text-[#125821] transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-5 text-stone-800">
          <button
            aria-label="Search"
            className="hover:text-[#125821] transition-colors"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            aria-label="Account"
            className="hover:text-[#125821] transition-colors"
          >
            <User className="w-5 h-5 stroke-[2]" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <span>₦0.00</span>
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 stroke-[2]" />
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#125821] text-[9px] font-bold text-white">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
