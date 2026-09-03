'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Leaf,
  ShieldCheck,
  Users,
  Package,
  ShoppingBag,
  TrendingUp,
  LogOut,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Store,
  LayoutDashboard,
  Boxes,
  Lock,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';
import AdminProductManagement from '@/src/components/admin/AdminProductManagement';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'overview'>('products');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated()) {
        router.replace('/login?redirect=/admin/dashboard');
      } else if (!isAdmin()) {
        router.replace('/shop');
      }
    }
  }, [mounted, isAuthenticated, isAdmin, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!mounted || !isAuthenticated() || !isAdmin()) {
    return (
      <div className="min-h-screen bg-[#F6F4EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#2D5A43]/40 bg-white flex items-center justify-center animate-pulse">
            <Leaf className="w-5 h-5 text-[#2D5A43]" />
          </div>
          <p className="text-xs text-stone-500 font-medium">Verifying admin credentials…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-stone-800 font-sans flex flex-col">
      {/* Admin Topbar */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3.5 flex items-center justify-between">
          
          {/* Logo & Badge */}
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full border border-[#2D5A43]/40 bg-white flex items-center justify-center shadow-2xs group-hover:border-[#2D5A43] transition-colors">
                <Leaf className="w-4 h-4 text-[#2D5A43]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-serif font-bold tracking-[0.12em] text-stone-900 uppercase leading-tight">
                  HERBS &amp; WELLNESS
                </span>
                <span className="text-[9px] tracking-[0.18em] text-[#2D5A43] uppercase font-semibold">
                  ADMIN PORTAL
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1 bg-[#EBF2EE] text-[#2D5A43] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#2D5A43]/20">
              <ShieldCheck className="w-3 h-3" />
              Admin
            </span>
          </div>

          {/* Right Action Icons & User */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 px-3.5 py-2 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              View Shop
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-stone-200">
              <div className="w-8 h-8 rounded-full bg-[#2D5A43] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-stone-900 leading-tight">{user?.name}</p>
                <p className="text-[10px] text-stone-400 leading-tight">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 space-y-8 flex-1">
        
        {/* Welcome Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#2D5A43] via-[#244b37] to-[#1e3d2d] rounded-3xl p-7 sm:p-9 text-white shadow-lg">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-emerald-100 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#D9C4AC]" />
                Command Center &amp; Inventory Management
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight">
                Welcome back, <span className="font-semibold text-[#D9C4AC]">{user?.name}</span>!
              </h1>
              
              <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed">
                Directly manage your entire store product inventory, create new botanicals, edit prices, monitor stock levels, or remove deprecated items.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/shop/catalog"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-semibold backdrop-blur-sm transition-colors cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>Live Catalog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200/80 pb-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#2D5A43] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Product Management</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#2D5A43] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview &amp; Shortcuts</span>
          </button>
        </div>

        {/* Tab 1: Product Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <AdminProductManagement />
          </div>
        )}

        {/* Tab 2: Overview & Shortcuts */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Stat 1 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Total Role</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#2D5A43] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-serif font-bold text-stone-900 uppercase">Super Admin</div>
                  <p className="text-[11px] text-stone-500">Root Access Granted</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Catalog Engine</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-serif font-bold text-stone-900">Active REST API</div>
                  <p className="text-[11px] text-stone-500">Full CRUD Enabled</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">User Access</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-serif font-bold text-stone-900">RBAC Enabled</div>
                  <p className="text-[11px] text-stone-500">JWT dual-token auth</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-2xs space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Store Status</span>
                  <div className="w-8 h-8 rounded-xl bg-[#EBF2EE] text-[#2D5A43] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-serif font-bold text-[#2D5A43]">Operational</div>
                  <p className="text-[11px] text-stone-500">Backend API connected</p>
                </div>
              </div>

            </div>

            {/* Quick Action Navigation Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-3xl border border-stone-200/70 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#2D5A43] flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">Manage Catalog</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    Add new items, adjust prices, edit descriptions and monitor stock counts in real time.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className="inline-flex items-center justify-between text-xs font-semibold text-[#2D5A43] hover:text-[#234734] pt-2 group text-left cursor-pointer"
                >
                  <span>Open Product Management</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-stone-200/70 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">Orders &amp; Sessions</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    Inspect customer therapy bookings, consultations, and dispatched wellness kits.
                  </p>
                </div>
                <Link
                  href="/hub/consultation"
                  className="inline-flex items-center justify-between text-xs font-semibold text-amber-800 hover:text-amber-950 pt-2 group"
                >
                  <span>Consultation Hub</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-stone-200/70 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">Storefront Preview</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    Switch over to customer view to experience the storefront, browse collections, and test journeys.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-between text-xs font-semibold text-stone-800 hover:text-stone-950 pt-2 group"
                >
                  <span>Open Storefront</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

