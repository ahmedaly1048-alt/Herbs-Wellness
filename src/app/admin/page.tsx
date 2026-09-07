'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Leaf,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Package,
  RefreshCw,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  ImagePlus,
  X,
  Users,
  Star,
  AlertTriangle,
} from 'lucide-react';
import { Product } from '@/src/types/product';

// ─── Config ───────────────────────────────────────────────────────────────────
const TOKEN_KEY = 'hw_admin_token';
const USER_KEY = 'hw_admin_user';

const CATEGORY_OPTIONS = [
  'formulations',
  'herbal-teas',
  'aroma-healing',
  'balms-oils',
  'body-detox',
  'capsules',
  'feminine-care',
  'health-kits',
  'mens-wellness',
  'womens-health',
  'detox-cleanses',
  'immunity-relief',
  'superfoods',
];

type AdminUser = {
  _id: string;
  name?: string;
  username?: string;
  email?: string;
  role: string;
};

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const inputCls =
  'w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#2D5A43] focus:ring-2 focus:ring-[#2D5A43]/20 transition-colors';
const labelCls = 'block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5';
const btnPrimary =
  'inline-flex items-center justify-center gap-2 bg-[#2D5A43] hover:bg-[#234734] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
const btnGhost =
  'inline-flex items-center justify-center gap-2 border border-stone-300 hover:bg-stone-100 text-stone-700 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors disabled:opacity-50';

const EMPTY_FORM = {
  title: '',
  slug: '',
  category: 'formulations',
  subtitle: '',
  price: '',
  stock: '',
  description: '',
  image: '',
  featured: false,
  requiresConsultation: false,
  isVariable: false,
  variantsJson: '',
};

type DashboardStats = {
  totalProducts: number;
  featuredProducts: number;
  lowStockProducts: number;
  totalUsers: number;
};

export default function AdminPage() {
  // ─── Auth state ─────────────────────────────────────────────────────────────
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // ─── Products ───────────────────────────────────────────────────────────────
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState('');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // ─── Add-product form ───────────────────────────────────────────────────────
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ─── Image upload ───────────────────────────────────────────────────────────
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Restore existing admin session on mount ────────────────────────────────
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) {
      queueMicrotask(() => setChecking(false));
      return;
    }

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${savedToken}` },
      cache: 'no-store',
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('invalid session');
        const data = await res.json();
        if (data.user?.role !== 'admin') throw new Error('not admin');
        setToken(savedToken);
        setAdmin(data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      })
      .finally(() => setChecking(false));
  }, []);

  const loadProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError('');
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (!res.ok) throw new Error(`API responded with ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch {
      setProductsError('Could not load products. Is the backend running?');
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    if (!token) return;
    setStatsLoading(true);
    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Could not load dashboard stats.');
      const data = await res.json();
      setStats(data.dashboard);
    } catch {
      setStats(null);
    } finally {
      setStatsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      queueMicrotask(() => {
        loadProducts();
        loadDashboard();
      });
    }
  }, [token, loadProducts, loadDashboard]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed.');

      setToken(data.accessToken);
      setAdmin(data.user);
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setPassword('');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setAdmin(null);
    setProducts([]);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Auto-generate slug from the title while the user hasn't typed one manually
      ...(name === 'title' && !prev.slug.trim() ? { slug: toSlug(value) } : {}),
    }));
    setFormError('');
    setFormSuccess('');
  };

  // ─── Image upload ───────────────────────────────────────────────────────────
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Could not read the selected file.'));
      reader.readAsDataURL(file);
    });

  const compressImage = async (file: File): Promise<string> => {
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      return fileToBase64(file);
    }

    const source = await createImageBitmap(file);
    const maxDimension = 1400;
    const scale = Math.min(1, maxDimension / Math.max(source.width, source.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(source.width * scale));
    canvas.height = Math.max(1, Math.round(source.height * scale));
    canvas.getContext('2d')?.drawImage(source, 0, 0, canvas.width, canvas.height);
    source.close();
    return canvas.toDataURL('image/webp', 0.82);
  };

  const handleImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file
    if (!file) return;

    setUploadError('');
    setFormError('');
    setFormSuccess('');

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file (PNG, JPG, WebP, etc.).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image is too large — max 10MB.');
      return;
    }

    setUploading(true);
    try {
      const base64 = await compressImage(file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Upload failed.');
      }
      setForm((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    const title = form.title.trim();
    const description = form.description.trim();
    const price = form.price === '' ? undefined : Number(form.price);
    const stock = form.stock === '' ? undefined : Number(form.stock);

    if (!title) {
      setFormError('Title is required.');
      setSubmitting(false);
      return;
    }
    if (!description) {
      setFormError('Description is required.');
      setSubmitting(false);
      return;
    }
    if (price !== undefined && (Number.isNaN(price) || price < 0)) {
      setFormError('Price must be a valid non-negative number.');
      setSubmitting(false);
      return;
    }

    let variants: unknown[] | undefined;
    let isVariable = form.isVariable;
    if (form.variantsJson.trim()) {
      try {
        const parsed = JSON.parse(form.variantsJson);
        if (!Array.isArray(parsed)) throw new Error('not an array');
        variants = parsed;
        isVariable = true;
      } catch {
        setFormError(
          'Variants must be valid JSON array (e.g. [{"sku":"HW-1","name":"1 Month","price":4500}]).'
        );
        setSubmitting(false);
        return;
      }
    }

    const payload: Record<string, unknown> = {
      title,
      slug: form.slug.trim() ? toSlug(form.slug) : toSlug(title),
      category: form.category,
      description,
      featured: form.featured,
      requiresConsultation: form.requiresConsultation,
      isVariable,
      images: form.image.trim() ? [form.image.trim()] : ['/placeholder-product.jpg'],
    };
    if (form.subtitle.trim()) payload.subtitle = form.subtitle.trim();
    if (price !== undefined) payload.price = price;
    if (stock !== undefined) payload.stock = stock;
    if (variants) payload.variants = variants;

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create product.');

      setFormSuccess(`Product "${data.product.title}" created successfully.`);
      setForm(EMPTY_FORM);
      loadProducts();
      loadDashboard();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product: Product) => {
    const id = product._id || product.id || product.slug;
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) return;

    setDeletingId(String(id));
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(String(id))}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete product.');
      setProducts((prev) =>
        prev.filter((p) => p._id !== product._id && p.id !== product.id)
      );
      loadDashboard();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Render: auth check gate ────────────────────────────────────────────────
  if (checking) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#2D5A43]" />
        <p className="text-sm text-stone-500 font-medium">Checking session…</p>
      </div>
    );
  }

  // ─── Render: login ──────────────────────────────────────────────────────────
  if (!token || !admin) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-[#2D5A43] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to store
        </Link>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl border border-stone-200/70 overflow-hidden">
            <div className="bg-[#2D5A43] px-8 py-7 text-center">
              <span className="inline-flex w-12 h-12 rounded-full bg-white/10 items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </span>
              <h1 className="font-serif text-2xl font-bold text-white mt-3 tracking-wide">
                Admin Panel
              </h1>
              <p className="text-xs text-stone-300/90 mt-1 font-light">
                Herbs &amp; Wellness Farmacy — staff only
              </p>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-5">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                Restricted access
              </div>

              <div>
                <label htmlFor="username" className={labelCls}>
                  Username or email
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={labelCls}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {loginError}
                </p>
              )}

              <button type="submit" disabled={loggingIn} className={`${btnPrimary} w-full`}>
                {loggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-[11px] text-stone-400 mt-6 leading-relaxed">
            Authorized personnel only. All admin activity is protected by role-based access.
          </p>
        </div>
      </div>
    );
  }

  // ─── Render: dashboard ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-100">
      {/* Top bar */}
      <header className="bg-[#2D5A43] text-white sticky top-0 z-20 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Leaf className="w-4.5 h-4.5" />
            </span>
            <div>
              <h1 className="font-serif font-bold text-lg leading-tight">Herbs &amp; Wellness Admin</h1>
              <p className="text-[11px] text-stone-300/90">
                Welcome back, {admin.name || admin.username || 'Admin'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-200 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              View store
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-100 bg-red-900/30 hover:bg-red-900/50 px-4 py-2 rounded-full transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Live products', value: stats?.totalProducts ?? products.length, icon: Package, tone: 'text-[#2D5A43] bg-[#2D5A43]/10' },
            { label: 'Featured', value: stats?.featuredProducts ?? 0, icon: Star, tone: 'text-amber-700 bg-amber-100' },
            { label: 'Low stock', value: stats?.lowStockProducts ?? 0, icon: AlertTriangle, tone: 'text-red-700 bg-red-100' },
            { label: 'Customers', value: stats?.totalUsers ?? 0, icon: Users, tone: 'text-sky-700 bg-sky-100' },
          ].map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className="bg-white rounded-2xl border border-stone-200/70 shadow-sm p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">{label}</p>
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${tone}`}>
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <p className={`mt-3 text-2xl font-bold text-stone-900 ${statsLoading ? 'animate-pulse' : ''}`}>{value}</p>
            </div>
          ))}
        </section>

        {/* Add product */}
        <section className="bg-white rounded-3xl border border-stone-200/70 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-9 h-9 rounded-xl bg-[#2D5A43]/10 flex items-center justify-center">
              <Plus className="w-4.5 h-4.5 text-[#2D5A43]" />
            </span>
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900">Add new product</h2>
              <p className="text-xs text-stone-500 -mt-0.5">
                Prices are in Naira (₦). New items appear in the store immediately.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="title" className={labelCls}>
                  Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Moringa & Ginger Tonic"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="slug" className={labelCls}>
                  Slug (URL)
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={form.slug}
                  onChange={handleFormChange}
                  placeholder="auto-generated"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className={labelCls}>
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleFormChange}
                className={inputCls}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subtitle" className={labelCls}>
                Subtitle
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                value={form.subtitle}
                onChange={handleFormChange}
                placeholder="Short tagline shown on cards"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="price" className={labelCls}>
                Price (₦)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min={0}
                step="any"
                value={form.price}
                onChange={handleFormChange}
                placeholder="e.g. 8500"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="stock" className={labelCls}>
                Stock (units)
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min={0}
                value={form.stock}
                onChange={handleFormChange}
                placeholder="e.g. 50"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Product image</label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={handleImageSelected}
              />

              {form.image ? (
                /* Preview + change/remove */
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white border border-stone-200 mx-auto">
                    <Image
                      src={form.image}
                      alt="Product preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5A43] hover:text-white border border-[#2D5A43]/30 hover:bg-[#2D5A43] px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, image: '' }))}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-white border border-red-200 hover:bg-red-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                /* Upload dropzone button */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full rounded-xl border-2 border-dashed border-stone-300 hover:border-[#2D5A43] hover:bg-[#2D5A43]/5 px-4 py-7 flex flex-col items-center justify-center gap-2 text-stone-500 hover:text-[#2D5A43] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin text-[#2D5A43]" />
                      <span className="text-xs font-semibold">Uploading…</span>
                    </>
                  ) : (
                    <>
                      <span className="w-10 h-10 rounded-full bg-[#2D5A43]/10 flex items-center justify-center">
                        <ImagePlus className="w-5 h-5" />
                      </span>
                      <span className="text-xs font-semibold">
                        Click to upload an image
                      </span>
                      <span className="text-[10px] text-stone-400">
                        PNG, JPG, WebP or GIF · max 10MB
                      </span>
                    </>
                  )}
                </button>
              )}

              {uploadError && (
                <p className="mt-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {uploadError}
                </p>
              )}

              <p className="mt-2 text-[10px] text-stone-400">
                {form.image
                  ? 'Image prepared — it will be saved with this product.'
                  : 'Images are compressed and stored with the product.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 cursor-pointer pb-2.5">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleFormChange}
                  className="w-4 h-4 accent-[#2D5A43]"
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 cursor-pointer pb-2.5">
                <input
                  type="checkbox"
                  name="requiresConsultation"
                  checked={form.requiresConsultation}
                  onChange={handleFormChange}
                  className="w-4 h-4 accent-[#2D5A43]"
                />
                Consultation req.
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 cursor-pointer pb-2.5">
                <input
                  type="checkbox"
                  name="isVariable"
                  checked={form.isVariable}
                  onChange={handleFormChange}
                  className="w-4 h-4 accent-[#2D5A43]"
                />
                Has variants
              </label>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className={labelCls}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={form.description}
                onChange={handleFormChange}
                placeholder="Describe what this product is and its benefits…"
                className={inputCls}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="variantsJson" className={labelCls}>
                Variants (optional, JSON array)
              </label>
              <textarea
                id="variantsJson"
                name="variantsJson"
                rows={3}
                value={form.variantsJson}
                onChange={handleFormChange}
                placeholder='[{"sku":"HW-001","name":"1 Month Supply","weight":"350g","price":8500,"stock":30}]'
                className={`${inputCls} font-mono text-xs`}
              />
            </div>

            {formError && (
              <p className="md:col-span-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {formError}
              </p>
            )}
            {formSuccess && (
              <p className="md:col-span-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                {formSuccess}
              </p>
            )}

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-1">
              <button type="submit" disabled={submitting} className={btnPrimary}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Publish product
                  </>
                )}
              </button>
              <button
                type="reset"
                onClick={() => {
                  setForm(EMPTY_FORM);
                  setFormError('');
                  setFormSuccess('');
                }}
                className={btnGhost}
              >
                Clear form
              </button>
            </div>
          </form>
        </section>

        {/* Product list */}
        <section className="bg-white rounded-3xl border border-stone-200/70 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-[#2D5A43]/10 flex items-center justify-center">
                <Package className="w-4.5 h-4.5 text-[#2D5A43]" />
              </span>
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900">
                  Products ({products.length})
                </h2>
                <p className="text-xs text-stone-500 -mt-0.5">Everything currently live in the store</p>
              </div>
            </div>
            <button onClick={loadProducts} disabled={productsLoading} className={btnGhost}>
              <RefreshCw className={`w-4 h-4 ${productsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {productsError && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
              {productsError}
            </p>
          )}

          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left text-sm min-w-160">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-stone-400">Product</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-stone-400">Category</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-stone-400">Price</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-stone-400">Stock</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const basePrice =
                    product.isVariable && product.variants?.length
                      ? Math.min(...product.variants.map((v) => v.price))
                      : product.price;
                  return (
                    <tr
                      key={product.id || product.slug}
                      className="border-b border-stone-100 last:border-b-0 hover:bg-stone-50/70"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden shrink-0">
                            {product.images?.[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.title}
                                width={40}
                                height={40}
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <Package className="w-4.5 h-4.5 text-stone-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-stone-800 truncate">{product.title}</p>
                            <p className="text-[11px] text-stone-400 truncate">/{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-stone-600">{product.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        {basePrice !== undefined ? (
                          <span className="text-xs font-semibold text-stone-800">
                            ₦{basePrice.toLocaleString()}
                            {product.isVariable && product.variants?.length ? '+' : ''}
                          </span>
                        ) : (
                          <span className="text-xs text-stone-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                            (product.stock ?? 0) > 0
                              ? 'bg-green-50 text-green-700'
                              : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {product.stock ?? '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(product)}
                          disabled={deletingId === String(product.id || product.slug)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-white border border-red-200 hover:bg-red-600 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                        >
                          {deletingId === String(product.id || product.slug) ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {products.length === 0 && !productsLoading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-stone-400">
                      No products found. Add your first product above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400 font-medium">
          <p>© 2026 Herbs &amp; Wellness Farmacy. Admin panel.</p>
          <Link href="/" className="hover:text-[#2D5A43] transition-colors">
            Back to storefront
          </Link>
        </div>
      </footer>
    </div>
  );
}