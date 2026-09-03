'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Leaf, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';

const PERKS = [
  'Track your orders & healing journey',
  'Save products to your wishlist',
  'Early access to therapy programs',
  'Earn reward points on every purchase',
];

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/shop';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState('');

  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated()) router.replace(redirect);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    if (!name || !email || !password || !confirm) { setLocalError('Please fill in all fields.'); return; }
    if (password.length < 6) { setLocalError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setLocalError('Passwords do not match.'); return; }
    const ok = await register(name, email, password);
    if (ok) router.push(redirect);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex">
      {/* Left: decorative panel */}
      <div className="hidden lg:flex w-[45%] relative overflow-hidden flex-col justify-between">
        <Image
          src="/bg1.jpg"
          alt="Herbs & Wellness"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D5A43]/80 via-[#2D5A43]/50 to-transparent" />

        <div className="relative z-10 p-12">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[13px] font-serif font-bold tracking-[0.14em] text-white uppercase block">
                HERBS &amp; WELLNESS
              </span>
              <span className="text-[10px] tracking-[0.17em] text-white/80 uppercase font-semibold">
                F A R M A C Y
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-12">
          <h2 className="text-white text-2xl font-serif mb-6 leading-relaxed">
            Join thousands healing<br />naturally with us.
          </h2>
          <ul className="space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-white/90 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D9C4AC] shrink-0 mt-0.5" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[400px]">

          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
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

          <h1 className="text-3xl font-serif text-stone-900 mb-1">Create account</h1>
          <p className="text-sm text-stone-500 mb-8">
            Start your holistic healing journey today.
          </p>

          {/* Error */}
          {displayError && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="register-name" className="block text-xs font-semibold text-stone-600 mb-1.5">
                Full name
              </label>
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="register-email" className="block text-xs font-semibold text-stone-600 mb-1.5">
                Email address
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="register-password" className="block text-xs font-semibold text-stone-600 mb-1.5">
                Password <span className="text-stone-400 font-normal">(min 6 characters)</span>
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 pr-12 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all shadow-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="register-confirm" className="block text-xs font-semibold text-stone-600 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="register-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 pr-12 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all shadow-sm"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2D5A43] hover:bg-[#234734] disabled:opacity-60 text-white text-sm font-semibold py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2D5A43]/20 mt-2"
            >
              {isLoading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
                : 'Create Free Account'
              }
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[11px] text-stone-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <Link
            href={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'}
            className="w-full block text-center bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-sm font-semibold py-4 rounded-full transition-all shadow-sm"
          >
            Sign in to existing account
          </Link>

          <p className="mt-6 text-center text-[11px] text-stone-400">
            By creating an account, you agree to our{' '}
            <Link href="/policies" className="text-[#2D5A43] hover:underline">Terms &amp; Privacy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
