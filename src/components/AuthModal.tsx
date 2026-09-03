'use client';

import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Leaf, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  onSuccess?: () => void;
  message?: string; // e.g. "Please log in to add items to your cart"
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = 'login',
  onSuccess,
  message,
}: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState('');

  const { login, register, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
      setName(''); setEmail(''); setPassword(''); setConfirm('');
      setLocalError('');
      clearError();
    }
  }, [isOpen, defaultTab]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) { setLocalError('Please fill in all fields.'); return; }
    const ok = await login(email, password);
    if (ok) { onSuccess?.(); onClose(); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (!name || !email || !password || !confirm) { setLocalError('Please fill in all fields.'); return; }
    if (password.length < 6) { setLocalError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setLocalError('Passwords do not match.'); return; }
    const ok = await register(name, email, password);
    if (ok) { onSuccess?.(); onClose(); }
  };

  const displayError = localError || error;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={tab === 'login' ? 'Login' : 'Create Account'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden animate-fade-up">

        {/* Top decoration */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#2D5A43] via-[#4a8c6a] to-[#D9C4AC]" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-8 pt-7 pb-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-full border border-[#2D5A43]/30 bg-white flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#2D5A43]" />
            </div>
            <div>
              <span className="text-[11px] font-serif font-bold tracking-[0.14em] text-stone-900 uppercase block">
                HERBS &amp; WELLNESS
              </span>
              <span className="text-[9px] tracking-[0.17em] text-[#2D5A43] uppercase font-semibold">
                F A R M A C Y
              </span>
            </div>
          </div>

          {/* Context message */}
          {message && (
            <div className="mb-5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl px-4 py-3 leading-relaxed">
              {message}
            </div>
          )}

          {/* Tab Switcher */}
          <div className="flex gap-1 bg-stone-100 p-1 rounded-full mb-6">
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setLocalError(''); clearError(); }}
                className={`flex-1 text-xs font-semibold py-2 rounded-full transition-all ${
                  tab === t
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Error */}
          {displayError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">
              {displayError}
            </div>
          )}

          {/* Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Email address
                </label>
                <input
                  id="modal-login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="modal-login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 pr-11 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                id="modal-login-submit"
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2D5A43] hover:bg-[#234734] disabled:opacity-60 text-white text-sm font-semibold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
              </button>
            </form>
          )}

          {/* Register Form */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Full name
                </label>
                <input
                  id="modal-register-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Email address
                </label>
                <input
                  id="modal-register-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="modal-register-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 pr-11 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="modal-register-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 pr-11 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                id="modal-register-submit"
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2D5A43] hover:bg-[#234734] disabled:opacity-60 text-white text-sm font-semibold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</> : 'Create Account'}
              </button>
            </form>
          )}

          {/* Footer hint */}
          <p className="mt-5 text-center text-[11px] text-stone-400">
            {tab === 'login' ? (
              <>No account?{' '}
                <button type="button" onClick={() => setTab('register')} className="text-[#2D5A43] font-semibold hover:underline">
                  Create one free
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" onClick={() => setTab('login')} className="text-[#2D5A43] font-semibold hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
