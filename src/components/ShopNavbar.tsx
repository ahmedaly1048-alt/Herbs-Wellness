import Link from 'next/link';
import { Search, User, ShoppingBag, ChevronDown, Leaf } from 'lucide-react';

export default function ShopNavbar() {
  return (
    <header id="store-navbar" className="w-full bg-white border-b border-stone-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
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
          <Link href="/shop" className="text-[#125821] font-bold hover:text-[#0e461a] transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-[#125821] transition-colors">
            Shop
          </Link>

          {/* Categories Dropdown Link */}
          <div className="relative group/drop flex items-center gap-1 cursor-pointer hover:text-[#125821] transition-colors">
            <span>Categories</span>
            <ChevronDown className="w-4 h-4 text-stone-600" />
          </div>

          {/* Wired Booking Link */}
          <Link href="/hub/consultation" className="hover:text-[#125821] transition-colors">
            Booking
          </Link>

          <Link href="#blog" className="hover:text-[#125821] transition-colors">
            Blog
          </Link>
          <Link href="#about" className="hover:text-[#125821] transition-colors">
            About Us
          </Link>
          <Link href="#contact" className="hover:text-[#125821] transition-colors">
            Contact Us
          </Link>
        </nav>

        {/* Action Icons & Cart */}
        <div className="flex items-center gap-5 text-stone-800">
          <button aria-label="Search" className="hover:text-[#125821] transition-colors">
            <Search className="w-5 h-5 stroke-[2]" />
          </button>

          <button aria-label="Account" className="hover:text-[#125821] transition-colors">
            <User className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Cart Balance & Icon */}
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