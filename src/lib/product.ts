import { Product } from '@/src/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all products from MongoDB backend with optional filtering.
 */
export async function fetchProducts(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
  sort?: string;
}): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'all') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.featured) query.append('featured', 'true');
    if (params?.sort) query.append('sort', params.sort);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_URL}/products${queryString}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Backend returned status:', res.status);
      return [];
    }

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Failed to fetch products from backend:', error);
    return [];
  }
}

/**
 * Fetch a single product by slug from MongoDB backend.
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error(`Failed to fetch product by slug '${slug}':`, error);
    return null;
  }
}

/**
 * Format and return display price string (e.g. "₦4,500" or "From ₦28,500")
 */
export function getProductPriceDisplay(product: Product): string {
  if (!product) return '₦0.00';

  if (!product.isVariable && product.price !== undefined) {
    return `₦${product.price.toLocaleString()}`;
  }

  if (product.isVariable && product.variants?.length) {
    const prices = product.variants.map((v) => v.price);
    const minPrice = Math.min(...prices);
    return `From ₦${minPrice.toLocaleString()}`;
  }

  return '₦0.00';
}