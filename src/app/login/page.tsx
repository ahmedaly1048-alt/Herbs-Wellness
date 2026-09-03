'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Leaf, Loader2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/shop';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login, isLoading, error, clearError, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated()) {
      if (user?.role === 'admin') {
        router.replace('/admin/dashboard');
      } else {
        router.replace(redirect);
      }
    }
  }, [isAuthenticated, user, redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    if (!email || !password) { setLocalError('Please fill in all fields.'); return; }
    const ok = await login(email, password);
    if (ok) {
      const loggedInUser = useAuthStore.getState().user;
      if (loggedInUser?.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push(redirect);
      }
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex">
      {/* Left: form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-[400px]">

          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-full border border-[#2D5A43]/40 bg-white flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-[#2D5A43]" />
            </div>
            <div>
              <span className="text-[13px] font-serif font-bold tracking-[0.14em] text-stone-900 uppercase block">
                HERBS &amp; WELLNESS
              </span>
              <span className="text-[10px] tracking-[0.17em] text-[#2D5A43] uppercase font-semibold">
                F A R M A C Y
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-serif text-stone-900 mb-1">Welcome back</h1>
          <p className="text-sm text-stone-500 mb-8">
            Sign in to your account to continue healing.
          </p>

          {/* Error */}
          {displayError && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">
              {displayError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-stone-600 mb-1.5">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all shadow-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-xs font-semibold text-stone-600">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#2D5A43] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 pr-12 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2D5A43] hover:bg-[#234734] disabled:opacity-60 text-white text-sm font-semibold py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2D5A43]/20 mt-2"
            >
              {isLoading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                : 'Sign In'
              }
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[11px] text-stone-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Register CTA */}
          <Link
            href={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register'}
            className="w-full block text-center bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-sm font-semibold py-4 rounded-full transition-all shadow-sm"
          >
            Create a free account
          </Link>

          <p className="mt-6 text-center text-[11px] text-stone-400">
            By continuing, you agree to our{' '}
            <Link href="/policies" className="text-[#2D5A43] hover:underline">Terms &amp; Privacy</Link>.
          </p>
        </div>
      </div>

      {/* Right: decorative image panel (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <Image
          src="/bg3.jpg"
          alt="Herbs & Wellness"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D5A43]/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-14">
          <blockquote className="text-white">
            <p className="text-2xl font-serif leading-relaxed mb-4">
              &ldquo;Healing begins when you nourish your body with nature&rsquo;s wisdom.&rdquo;
            </p>
            <footer className="text-sm text-white/70 font-light tracking-wider uppercase">
              — Herbs &amp; Wellness Farmacy
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
