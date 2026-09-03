
export type ProductVariant = {
  id: string;
  sku: string;
  name: string; // e.g., "1 Month Supply", "50ml Bottle"
  weight?: string;
  price: number;
  stock?: number;
  details?: string;
  attributes?: Record<string, string>;
};

export type ProductBreakdown = {
  name: string;
  tagline: string;
  type: string;
  benefits: string[];
  suggestedUse: string;
};

export type ProductReview = {
  id: number | string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  slug: string; // The URL slug (e.g. 'glucoreg-gluconeu-set')
  description: string;
  category: string; // Matches navbar slugs like 'herbal-teas', 'formulations'
  images: string[];
  rating?: number;
  reviewCount?: number;
  requiresConsultation?: boolean; // Set true for clinical items
  featured?: boolean; // Set true to highlight in "Herbal Favourites" section
  isVariable: boolean; // True if it has variants (e.g. 50ml / 100ml)
  price?: number; // Base price for simple products
  variants?: ProductVariant[]; // Variant options for variable products
  breakdown?: ProductBreakdown[]; // Formulation details
  reviewsList?: ProductReview[]; // Reviews specific to this item
  sku?: string;
  weight?: string;
  stock?: number; // Quantity on hand; 0 = out of stock. Undefined = treat as in stock.
};