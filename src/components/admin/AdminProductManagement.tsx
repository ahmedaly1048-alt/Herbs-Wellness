'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Layers,
  DollarSign,
  Boxes,
  Tag,
  Eye,
  Check,
  Flame,
  Stethoscope,
  UploadCloud,
} from 'lucide-react';
import { Product } from '@/src/types/product';
import { useAuthStore } from '@/src/store/useAuthStore';
import { uploadImageToCloudinary } from '@/src/lib/cloudinary';

const CATEGORIES = [
  { value: 'formulations', label: 'Herbal Formulations' },
  { value: 'herbal-teas', label: 'Herbal Teas & Infusions' },
  { value: 'tinctures-extracts', label: 'Tinctures & Extracts' },
  { value: 'reproductive-fertility', label: 'Reproductive & Fertility' },
  { value: 'gut-digestive-health', label: 'Gut & Digestive Health' },
  { value: 'brain-nervous-health', label: 'Brain & Nervous Health' },
  { value: 'bone-joint-health', label: 'Bone & Joint Health' },
  { value: 'mens-health', label: "Men's Vitality" },
  { value: 'skincare-topicals', label: 'Skincare & Topicals' },
  { value: 'wellness-bundles', label: 'Wellness Bundles' },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ProductFormData {
  id?: string;
  _id?: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  price: string;
  stock: string;
  sku: string;
  weight: string;
  description: string;
  images: string; // comma-separated or newline-separated
  featured: boolean;
  requiresConsultation: boolean;
}

const emptyForm: ProductFormData = {
  title: '',
  subtitle: '',
  slug: '',
  category: 'formulations',
  price: '25000',
  stock: '100',
  sku: '',
  weight: '100g',
  description: '',
  images: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
  featured: false,
  requiresConsultation: false,
};

export default function AdminProductManagement() {
  const { accessToken } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Confirmation state
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Cloudinary Image Upload state
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [showManualUrlInput, setShowManualUrlInput] = useState<boolean>(false);

  // Show temporary toast notification
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load products from backend API
  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/products`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error(`Failed to load products (${res.status})`);
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err: unknown) {
      console.error('Error fetching products:', err);
      setError((err as Error).message || 'Unable to connect to backend server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title?.toLowerCase().includes(q);
        const matchesSlug = p.slug?.toLowerCase().includes(q);
        const matchesSku = p.sku?.toLowerCase().includes(q);
        const matchesCategory = p.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSlug && !matchesSku && !matchesCategory) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Stock filter
      if (stockFilter === 'in_stock') {
        if ((p.stock ?? 100) <= 0) return false;
      } else if (stockFilter === 'low_stock') {
        const s = p.stock ?? 100;
        if (s <= 0 || s > 15) return false;
      } else if (stockFilter === 'out_of_stock') {
        if ((p.stock ?? 100) > 0) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  // Metric stats
  const stats = useMemo(() => {
    const total = products.length;
    const lowStock = products.filter((p) => (p.stock ?? 100) > 0 && (p.stock ?? 100) <= 15).length;
    const outOfStock = products.filter((p) => (p.stock ?? 100) <= 0).length;
    const featured = products.filter((p) => p.featured).length;
    const clinical = products.filter((p) => p.requiresConsultation).length;
    return { total, lowStock, outOfStock, featured, clinical };
  }, [products]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData({
      ...emptyForm,
      sku: `HW-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setFormError(null);
    setUploadError(null);
    setIsUploadingImage(false);
    setUploadProgress(0);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (product: Product) => {
    setModalMode('edit');
    setFormData({
      id: product.id,
      _id: (product as { _id?: string })._id || product.id,
      title: product.title || '',
      subtitle: product.subtitle || '',
      slug: product.slug || '',
      category: product.category || 'formulations',
      price: product.price !== undefined ? String(product.price) : '0',
      stock: product.stock !== undefined ? String(product.stock) : '100',
      sku: product.sku || '',
      weight: product.weight || '',
      description: product.description || '',
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images.join('\n') : '',
      featured: !!product.featured,
      requiresConsultation: !!product.requiresConsultation,
    });
    setFormError(null);
    setUploadError(null);
    setIsUploadingImage(false);
    setUploadProgress(0);
    setIsModalOpen(true);
  };

  // Parsed image list from formData.images
  const imageList = useMemo(() => {
    return formData.images
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((url) => url.startsWith('http') || url.startsWith('/'));
  }, [formData.images]);

  // Handle image file for Cloudinary upload (replaces old image with newly uploaded one)
  const handleImageFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      setUploadError('Please select a valid image file (JPG, PNG, WEBP, AVIF).');
      return;
    }

    setIsUploadingImage(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      const file = validFiles[0];
      const res = await uploadImageToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });

      if (res.url) {
        // Replaces the old image with the newly uploaded one
        setFormData((prev) => ({
          ...prev,
          images: res.url,
        }));

        showToast('Image uploaded and selected successfully!', 'success');
      }
    } catch (err: unknown) {
      console.error('Cloudinary upload error:', err);
      setUploadError(
        (err as Error).message ||
          'Failed to upload image to Cloudinary. Check your Cloudinary keys in .env.local'
      );
    } finally {
      setIsUploadingImage(false);
      setUploadProgress(0);
    }
  };

  // Remove image from product
  const handleRemoveImage = (indexToRemove?: number) => {
    if (indexToRemove === undefined) {
      setFormData((prev) => ({ ...prev, images: '' }));
      return;
    }
    const updated = imageList.filter((_, idx) => idx !== indexToRemove);
    setFormData((prev) => ({ ...prev, images: updated.join('\n') }));
  };

  // Auto-generate slug from Title if in create mode
  const handleTitleChange = (val: string) => {
    if (modalMode === 'create') {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({
        ...prev,
        title: val,
        slug: generatedSlug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  // Handle Save (Create or Update)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title.trim()) {
      setFormError('Product Title is required.');
      return;
    }
    if (!formData.slug.trim()) {
      setFormError('Product Slug is required.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Product Description is required.');
      return;
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum < 0) {
      setFormError('Please enter a valid price.');
      return;
    }

    const stockNum = parseInt(formData.stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setFormError('Please enter a valid stock quantity.');
      return;
    }

    const imageArray = formData.images
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const payload = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      slug: formData.slug.trim().toLowerCase(),
      category: formData.category.toLowerCase(),
      price: priceNum,
      stock: stockNum,
      sku: formData.sku.trim() || undefined,
      weight: formData.weight.trim() || undefined,
      description: formData.description.trim(),
      images: imageArray.length > 0 ? imageArray : ['/placeholder-product.jpg'],
      featured: formData.featured,
      requiresConsultation: formData.requiresConsultation,
      isVariable: false,
    };

    setIsSubmitting(true);
    try {
      const targetIdentifier = formData.id || formData._id || formData.slug;
      const url =
        modalMode === 'create'
          ? `${API_URL}/products`
          : `${API_URL}/products/${encodeURIComponent(targetIdentifier)}`;

      const method = modalMode === 'create' ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }

      showToast(
        modalMode === 'create'
          ? `Product "${payload.title}" created successfully!`
          : `Product "${payload.title}" updated successfully!`,
        'success'
      );

      setIsModalOpen(false);
      await loadProducts();
    } catch (err: unknown) {
      console.error('Error saving product:', err);
      setFormError((err as Error).message || 'Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirmation
  const handleDeleteProduct = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const targetId = (deleteTarget as { _id?: string })._id || deleteTarget.id || deleteTarget.slug;
      const res = await fetch(`${API_URL}/products/${encodeURIComponent(targetId)}`, {
        method: 'DELETE',
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete product.');
      }

      showToast(`Product "${deleteTarget.title}" deleted.`, 'success');
      setDeleteTarget(null);
      await loadProducts();
    } catch (err: unknown) {
      console.error('Error deleting product:', err);
      showToast((err as Error).message || 'Failed to delete product', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-medium animate-in fade-in slide-in-from-top duration-200 ${
            toastMessage.type === 'success'
              ? 'bg-[#2D5A43] text-white border-emerald-700'
              : 'bg-red-600 text-white border-red-700'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-200 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-80 transition-opacity p-0.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header & Fast Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-[#2D5A43]">
              <Boxes className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900">Product Inventory &amp; Catalog</h2>
          </div>
          <p className="text-xs text-stone-500 font-light mt-1">
            Manage your botanical formulations, pricing, stock levels, and store visibility.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadProducts}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#2D5A43]' : ''}`} />
            <span className="hidden md:inline">Refresh</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 bg-[#2D5A43] hover:bg-[#234734] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Total Products</span>
          <div className="text-2xl font-serif font-bold text-stone-900 mt-1">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">In Stock</span>
          <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">
            {stats.total - stats.outOfStock}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Low Stock (&le;15)</span>
          <div className="text-2xl font-serif font-bold text-amber-700 mt-1">{stats.lowStock}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Out of Stock</span>
          <div className="text-2xl font-serif font-bold text-red-600 mt-1">{stats.outOfStock}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Featured Items</span>
          <div className="text-2xl font-serif font-bold text-purple-700 mt-1">{stats.featured}</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/70 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by title, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#2D5A43] focus:bg-white transition-all text-stone-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-56">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-700 focus:outline-hidden focus:border-[#2D5A43] focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Categories ({products.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Stock status filter buttons */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl text-[11px] font-medium text-stone-600">
              <button
                onClick={() => setStockFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  stockFilter === 'all' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStockFilter('in_stock')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  stockFilter === 'in_stock'
                    ? 'bg-white text-emerald-800 shadow-2xs font-semibold'
                    : 'hover:text-stone-900'
                }`}
              >
                In Stock
              </button>
              <button
                onClick={() => setStockFilter('out_of_stock')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  stockFilter === 'out_of_stock'
                    ? 'bg-white text-red-700 shadow-2xs font-semibold'
                    : 'hover:text-stone-900'
                }`}
              >
                Out of Stock
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table Container */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#2D5A43]/40 bg-emerald-50 flex items-center justify-center animate-spin">
              <RefreshCw className="w-4 h-4 text-[#2D5A43]" />
            </div>
            <p className="text-xs text-stone-500 font-medium">Loading store catalog…</p>
          </div>
        ) : error ? (
          <div className="py-16 px-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-800">Failed to load products</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadProducts}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 px-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-800">No products found</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              {searchQuery || selectedCategory !== 'all' || stockFilter !== 'all'
                ? 'No items matched your search/filter criteria. Try clearing filters.'
                : 'No products in database. Click "Add New Product" to publish your first botanical item.'}
            </p>
            {(searchQuery || selectedCategory !== 'all' || stockFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setStockFilter('all');
                }}
                className="px-4 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50/75 border-b border-stone-200 text-[10px] uppercase font-bold tracking-wider text-stone-400">
                <tr>
                  <th className="py-3.5 px-5">Product Info</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock Level</th>
                  <th className="py-3.5 px-4">Attributes</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((product) => {
                  const imageSrc =
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : '/placeholder-product.jpg';
                  const stock = product.stock ?? 100;
                  const isOutOfStock = stock <= 0;
                  const isLowStock = stock > 0 && stock <= 15;

                  return (
                    <tr
                      key={product.id || product.slug}
                      className="hover:bg-[#F9FAF9] transition-colors group"
                    >
                      {/* Product Info */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-stone-100 overflow-hidden border border-stone-200/80 shrink-0">
                            <Image
                              src={imageSrc}
                              alt={product.title}
                              fill
                              sizes="48px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif font-bold text-stone-900 text-sm leading-snug">
                                {product.title}
                              </span>
                              {product.featured && (
                                <span
                                  className="inline-flex items-center gap-0.5 bg-purple-50 text-purple-700 border border-purple-200 text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                                  title="Featured Product"
                                >
                                  <Flame className="w-2.5 h-2.5" /> Featured
                                </span>
                              )}
                              {product.requiresConsultation && (
                                <span
                                  className="inline-flex items-center gap-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                                  title="Requires Consultation"
                                >
                                  <Stethoscope className="w-2.5 h-2.5" /> Clinical
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-400 font-mono">
                              slug: <span className="text-stone-600">/{product.slug}</span>
                              {product.sku && ` • SKU: ${product.sku}`}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block bg-[#EBF2EE] text-[#2D5A43] border border-[#2D5A43]/15 font-semibold text-[10px] px-2.5 py-1 rounded-full capitalize">
                          {product.category?.replace('-', ' ') || 'Formulation'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-serif font-bold text-stone-900 text-sm">
                          {product.price !== undefined ? `₦${product.price.toLocaleString()}` : 'Variable'}
                        </span>
                      </td>

                      {/* Stock Level */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isOutOfStock
                                ? 'bg-red-500 ring-4 ring-red-100'
                                : isLowStock
                                ? 'bg-amber-500 ring-4 ring-amber-100'
                                : 'bg-emerald-500 ring-4 ring-emerald-100'
                            }`}
                          />
                          <div>
                            <span
                              className={`font-semibold ${
                                isOutOfStock
                                  ? 'text-red-700'
                                  : isLowStock
                                  ? 'text-amber-700'
                                  : 'text-stone-800'
                              }`}
                            >
                              {isOutOfStock ? '0 (Out of Stock)' : `${stock} in stock`}
                            </span>
                            {isLowStock && (
                              <p className="text-[9px] text-amber-600 font-medium">Low inventory alert</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Attributes */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col text-[10px] text-stone-500 space-y-0.5">
                          {product.weight && <span>Weight: {product.weight}</span>}
                          <span>Rating: ★ {product.rating || 5.0}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/shop/product/${product.slug}`}
                            target="_blank"
                            className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                            title="Preview in Storefront"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-2 rounded-xl text-stone-500 hover:text-[#2D5A43] hover:bg-[#EBF2EE] transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info */}
        <div className="p-4 bg-stone-50/75 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing <strong className="font-semibold text-stone-800">{filteredProducts.length}</strong> of{' '}
            <strong className="font-semibold text-stone-800">{products.length}</strong> products
          </span>
          <span className="text-[11px] text-stone-400">Herbs &amp; Wellness Secure Database</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT PRODUCT MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#2D5A43] flex items-center justify-center">
                  {modalMode === 'create' ? <Plus className="w-5 h-5" /> : <Edit2 className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    {modalMode === 'create' ? 'Add New Botanical Product' : `Edit Product: ${formData.title}`}
                  </h3>
                  <p className="text-xs text-stone-500 font-light">
                    {modalMode === 'create'
                      ? 'Publish a new formulation or tea blend to the online store.'
                      : 'Modify product specifications, price, inventory and metadata.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmitForm} className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
              
              {formError && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Basic Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
                  <Tag className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>1. General Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Product Title */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-800">
                      Product Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., GlucoReg Blood Sugar Botanical Set"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900"
                    />
                  </div>

                  {/* Subtitle / Tagline */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-800">
                      Subtitle / Brief Hook
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Dual-Action Glucose Regulation & Diabetic Neuropathy Care"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800">
                      URL Slug <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., glucoreg-botanical-set"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                      className="w-full text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900"
                    />
                    <p className="text-[10px] text-stone-400">Used for URL: /shop/product/{formData.slug || 'slug'}</p>
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900 cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
                  <DollarSign className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>2. Pricing &amp; Stock</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800">
                      Price (₦) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="100"
                      placeholder="28500"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900 font-semibold"
                    />
                  </div>

                  {/* Stock Quantity */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800">
                      Stock Count <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="100"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900 font-semibold"
                    />
                  </div>

                  {/* SKU */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800">SKU Code</label>
                    <input
                      type="text"
                      placeholder="HW-4921"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900"
                    />
                  </div>

                  {/* Weight / Size */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800">Package Weight</label>
                    <input
                      type="text"
                      placeholder="120g / 60 Caps"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Media & Images (Cloudinary) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                    <Eye className="w-3.5 h-3.5 text-[#2D5A43]" />
                    <span>3. Imagery &amp; Media (Cloudinary)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowManualUrlInput(!showManualUrlInput)}
                    className="text-[11px] font-medium text-stone-500 hover:text-[#2D5A43] underline transition-colors cursor-pointer"
                  >
                    {showManualUrlInput ? 'Hide manual URL input' : 'Manual URL input'}
                  </button>
                </div>

                {/* Cloudinary Dropzone / Upload Box */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleImageFiles(e.dataTransfer.files);
                    }
                  }}
                  className={`relative border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                    isDragOver
                      ? 'border-[#2D5A43] bg-emerald-50/50 scale-[0.99]'
                      : 'border-stone-200 bg-stone-50/60 hover:bg-stone-50 hover:border-[#2D5A43]/40'
                  }`}
                >
                  <input
                    id="cloudinary-file-input"
                    type="file"
                    accept="image/*"
                    disabled={isUploadingImage}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleImageFiles(e.target.files);
                        e.target.value = '';
                      }
                    }}
                    className="hidden"
                  />

                  {isUploadingImage ? (
                    <div className="py-4 flex flex-col items-center justify-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 border border-[#2D5A43]/30 flex items-center justify-center animate-spin text-[#2D5A43]">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-stone-800">
                          Uploading image to Cloudinary… {uploadProgress}%
                        </p>
                        <div className="w-48 h-1.5 bg-stone-200 rounded-full overflow-hidden mx-auto">
                          <div
                            className="h-full bg-[#2D5A43] transition-all duration-200 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-stone-400">Fetching secure Cloudinary URL…</p>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="cloudinary-file-input"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-2"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-[#2D5A43] group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-stone-800">
                          Click to upload or drag &amp; drop product image
                        </p>
                        <p className="text-[11px] text-stone-400">
                          PNG, JPG, WEBP or AVIF up to 10MB • Auto-uploads to Cloudinary
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2D5A43] bg-[#EBF2EE] px-3 py-1 rounded-lg border border-[#2D5A43]/20 hover:bg-[#dfebe3] transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Select Image
                      </span>
                    </label>
                  )}
                </div>

                {/* Upload error banner */}
                {uploadError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between gap-2 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadError(null)}
                      className="p-1 hover:opacity-75 cursor-pointer text-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Gallery of Uploaded Images */}
                {imageList.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-stone-600">
                      <span>Selected Product Image</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {imageList.map((url, idx) => (
                        <div
                          key={idx}
                          className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 transition-all hover:border-stone-400"
                        >
                          <div className="relative aspect-square w-full">
                            <Image
                              src={url}
                              alt={`Product image ${idx + 1}`}
                              fill
                              sizes="(max-width: 640px) 50vw, 25vw"
                              className="object-cover"
                              unoptimized
                            />
                          </div>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Raw / Manual URL Textarea */}
                {showManualUrlInput && (
                  <div className="space-y-1.5 pt-2 border-t border-stone-100 animate-in fade-in">
                    <label className="text-xs font-semibold text-stone-700">
                      Raw Image URLs (One per line or comma-separated)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                      value={formData.images}
                      onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                      className="w-full text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl p-3 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900"
                    />
                    <p className="text-[10px] text-stone-400">
                      URLs uploaded via Cloudinary automatically appear here and get attached to the product.
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
                  <Layers className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>4. Botanical Description</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-800">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detailed holistic explanation of therapeutic benefits, herb blend, extraction methods and usage guidelines..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-3 focus:bg-white focus:border-[#2D5A43] focus:outline-hidden transition-all text-stone-900 leading-relaxed"
                  />
                </div>
              </div>

              {/* Flags and Options */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>5. Store Visibility Options</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="mt-0.5 rounded text-[#2D5A43] focus:ring-[#2D5A43] cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-stone-900">Featured Botanical</span>
                      <p className="text-[11px] text-stone-500 leading-tight">
                        Display in homepage showcase and top curated shelves.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.requiresConsultation}
                      onChange={(e) => setFormData({ ...formData, requiresConsultation: e.target.checked })}
                      className="mt-0.5 rounded text-[#2D5A43] focus:ring-[#2D5A43] cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-stone-900">Requires Consultation</span>
                      <p className="text-[11px] text-stone-500 leading-tight">
                        Mark as clinical item recommending herbalist assessment before checkout.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-[#2D5A43] hover:bg-[#234734] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving…</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{modalMode === 'create' ? 'Publish Product' : 'Save Changes'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-serif font-bold text-stone-900">Delete Botanical Product?</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <strong className="text-stone-900 font-semibold">{deleteTarget.title}</strong>? This action cannot be
                undone and will remove the product from customer storefronts.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                Keep Product
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                disabled={isDeleting}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting…</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
