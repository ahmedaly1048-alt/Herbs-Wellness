import { Product } from "@/src/types/product";
import { PRODUCTS } from "@/src/data/product";

/**
 * Resolve the API base URL.
 * - In the browser we use the relative "/api" path. Next.js rewrites (see
 *   next.config.ts) forward those requests to the Express backend, which
 *   avoids CORS issues and behaves identically in dev & production.
 * - On the server (Server Components) we use an absolute URL because Node's
 *   fetch does not resolve relative paths.
 */
function resolveApiBase(): string {
  if (typeof window !== "undefined") return "/api";
  return (
    (process.env.NEXT_PUBLIC_API_URL ||
      process.env.BACKEND_URL ||
      "http://localhost:5000").replace(/\/$/, "") + "/api"
  );
}

export interface ProductQuery {
  category?: string;
  search?: string;
  featured?: string;
  sort?: string;
}

/**
 * Fetch all products from the backend API.
 * Falls back to the local static catalog (src/data/product.ts) when the API
 * is unreachable so the storefront never renders empty.
 */
export async function fetchProducts(query: ProductQuery = {}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const qs = params.toString();
    const url = `${resolveApiBase()}/products${qs ? `?${qs}` : ""}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);

    const data = await res.json();
    return (Array.isArray(data.products) ? data.products : []) as Product[];
  } catch {
    return PRODUCTS;
  }
}

/**
 * Fetch a single product by slug. Falls back to the static catalog.
 */
export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const res = await fetch(
      `${resolveApiBase()}/products/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`API responded with ${res.status}`);

    const data = await res.json();
    return data.product as Product;
  } catch {
    return PRODUCTS.find((p) => p.slug === slug);
  }
}