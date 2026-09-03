/**
 * Product Seed Script
 * ───────────────────
 * Seeds the initial catalog into MongoDB Atlas.
 * Run once: npm run seed:products
 */

import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const INITIAL_PRODUCTS = [
  {
    id: "glucoreg-gluconeu-set",
    title: "GLUCOREG™ + GLUCONEU™",
    subtitle: "Glucose & Metabolic Support Set",
    slug: "glucoreg-gluconeu-set",
    category: "formulations",
    rating: 4.9,
    reviewCount: 28,
    requiresConsultation: true,
    featured: true,
    images: ["/glucogerg2-Photoroom.png"],
    description:
      "A complementary herbal wellness combination designed to provide comprehensive nutritional support for healthy blood sugar metabolism, energy balance, and cellular health.",
    isVariable: true,
    stock: 50,
    variants: [
      {
        id: "var-1",
        sku: "HW-GLU-SET-1",
        name: "Standard Pack (1 Month)",
        weight: "350g",
        price: 28500,
        stock: 30,
        details: "Includes 1x GLUCOREG™ + 1x GLUCONEU™",
      },
      {
        id: "var-2",
        sku: "HW-GLU-SET-2",
        name: "Double Protocol (2 Months)",
        weight: "700g",
        price: 52000,
        stock: 20,
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
        suggestedUse: "Steep 1 tea bag for 10-15 mins in boiled water.",
      },
    ],
    reviewsList: [
      {
        id: 1,
        author: "Nneka A.",
        rating: 5,
        date: "August 14, 2026",
        comment: "Energy levels stabilized significantly after 3 weeks. Highly recommend!",
      },
      {
        id: 2,
        author: "Tunde O.",
        rating: 5,
        date: "July 22, 2026",
        comment: "Great botanical quality and very fast dispatch.",
      },
    ],
  },
  {
    id: "chamomile-lavender-tea",
    title: "Organic Chamomile & Lavender Tea",
    subtitle: "Sleeptime Botanical Blend",
    slug: "chamomile-lavender-tea",
    category: "herbal-teas",
    rating: 4.8,
    reviewCount: 12,
    requiresConsultation: false,
    featured: true,
    images: ["/sellers_bottle.png"],
    description:
      "Soothing organic herbal blend crafted with whole organic Egyptian chamomile flowers and French lavender buds to promote calm, relaxation, and restful sleep.",
    isVariable: false,
    price: 4500,
    weight: "100g",
    sku: "HW-TEA-001",
    stock: 80,
    breakdown: [
      {
        name: "Chamomile & Lavender",
        tagline: "Rest & Recovery",
        type: "Loose Leaf / Tea Bags",
        benefits: ["Supports sleep quality", "Calms nervous system", "Eases daily stress"],
        suggestedUse: "Drink 1 warm cup 30 minutes before bed.",
      },
    ],
    reviewsList: [
      {
        id: 1,
        author: "Peace K.",
        rating: 5,
        date: "August 3, 2026",
        comment: "It relieved tension and helped me sleep peacefully within minutes.",
      },
    ],
  },
];

const seedProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is missing in .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Upsert products so re-running the script updates without duplicate errors
    for (const prod of INITIAL_PRODUCTS) {
      await Product.findOneAndUpdate(
        { slug: prod.slug },
        prod,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`📦 Seeded product: ${prod.title} (${prod.slug})`);
    }

    console.log("🎉 All products seeded successfully into MongoDB Atlas!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding products failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
