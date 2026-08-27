// src/data/products.ts
import { Product } from "@/src/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "glucoreg-gluconeu-set",
    title: "GLUCOREG™ + GLUCONEU™",
    subtitle: "Glucose & Metabolic Support Set",
    slug: "glucoreg-gluconeu-set", // This becomes the URL: /shop/product/glucoreg-gluconeu-set
    category: "formulations",
    rating: 4.9,
    reviewCount: 28,
    requiresConsultation: true,
    images: ["/glucogerg.jpeg"],
    description: "A complementary herbal wellness combination...",
    isVariable: true,
    variants: [
      {
        id: "var-1",
        sku: "HW-GLU-SET-1",
        name: "Standard Pack (1 Month)",
        weight: "350g",
        price: 28500,
        details: "Includes 1x GLUCOREG™ + 1x GLUCONEU™",
      },
      {
        id: "var-2",
        sku: "HW-GLU-SET-2",
        name: "Double Protocol (2 Months)",
        weight: "700g",
        price: 52000,
        details: "Includes 2x GLUCOREG™ + 2x GLUCONEU™",
      },
    ],
    breakdown: [
      {
        name: "GLUCOREG™",
        tagline: "Glucose Balance Support",
        type: "Capsules (60 caps)",
        benefits: ["Healthy glucose balance", "Glucose utilization"],
        suggestedUse: "Take 2 capsules daily with a meal.",
      },
      {
        name: "GLUCONEU™",
        tagline: "Glucose Metabolic Support",
        type: "Herbal Tea (100g)",
        benefits: ["Healthy carbohydrate metabolism"],
        suggestedUse: "Steep 1 tea bag for 10-15 mins.",
      },
    ],
    reviewsList: [
      {
        id: 1,
        author: "Nneka A.",
        rating: 5,
        date: "August 14, 2026",
        comment: "Energy levels stabilized significantly after 3 weeks.",
      },
    ],
  },
  
  // PRODUCT #2 (Simple Product)
  {
    id: "chamomile-lavender-tea",
    title: "Organic Chamomile & Lavender Tea",
    subtitle: "Sleeptime Botanical Blend",
    slug: "chamomile-lavender-tea", // URL: /shop/product/chamomile-lavender-tea
    category: "herbal-teas",
    rating: 4.8,
    reviewCount: 12,
    requiresConsultation: false,
    images: ["/products/chamomile.jpg"],
    description: "Soothing organic herbal blend crafted for restful sleep.",
    isVariable: false,
    price: 4500,
    weight: "100g",
    sku: "HW-TEA-001",
    breakdown: [
      {
        name: "Chamomile & Lavender",
        tagline: "Rest & Recovery",
        type: "Loose Leaf / Tea Bags",
        benefits: ["Supports sleep quality", "Calms nervous system"],
        suggestedUse: "Drink 1 warm cup 30 minutes before bed.",
      }
    ],
    reviewsList: []
  },

  // ADD PRODUCTS 3 TO 50+ HERE...
];