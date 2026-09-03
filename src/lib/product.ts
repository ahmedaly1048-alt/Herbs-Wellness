import { Product } from '@/src/types/product';
import { PRODUCTS } from '../data/product';

// Get all products
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

// Get products by category (matches navbar slugs like 'herbal-teas', 'formulations')
export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((product) => product.category.toLowerCase() === categorySlug.toLowerCase());
}

// Get single product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

// Get price display string ("₦4,500" or "From ₦8,500")
export function getProductPriceDisplay(product: Product): string {
  if (!product.isVariable && product.price) {
    return `₦${product.price.toLocaleString()}`;
  }

  if (product.isVariable && product.variants?.length) {
    const prices = product.variants.map((v) => v.price);
    const minPrice = Math.min(...prices);
    return `From ₦${minPrice.toLocaleString()}`;
  }

  return '₦0.00';
}