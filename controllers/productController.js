import mongoose from "mongoose";
import Product from "../models/Product.js";

const fallbackProducts = [
  {
    _id: "fallback-1",
    id: "fallback-1",
    slug: "gut-digestion",
    title: "Gut & Digestion Care",
    subtitle: "Natural digestive support",
    category: "gut-digestion",
    description: "A gentle herbal wellness formula designed to support digestive comfort and daily balance.",
    featured: true,
    rating: 4.8,
    reviewCount: 18,
    price: 18000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-2",
    id: "fallback-2",
    slug: "immune-support",
    title: "Immune Support",
    subtitle: "Wellness and daily vitality",
    category: "immunity-relief",
    description: "Thoughtful plant-based support for immune resilience and everyday energy.",
    featured: true,
    rating: 4.9,
    reviewCount: 22,
    price: 22000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-3",
    id: "fallback-3",
    slug: "women-wellness",
    title: "Women’s Wellness",
    subtitle: "Hormonal balance & support",
    category: "womens-health",
    description: "Supportive herbal guidance for women’s wellness and ongoing balance.",
    featured: false,
    rating: 4.7,
    reviewCount: 12,
    price: 20000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getFallbackMatches = ({ category, search, featured }) => {
  let products = [...fallbackProducts];

  if (category && category !== "all") {
    products = products.filter((product) => product.category === category.toLowerCase());
  }

  if (featured === "true") {
    products = products.filter((product) => product.featured);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter((product) =>
      [product.title, product.subtitle, product.description].some((field) =>
        String(field || "").toLowerCase().includes(q)
      )
    );
  }

  return products;
};

// Helper to build query matching _id, slug, or id safely
const buildIdQuery = (id) => {
  const or = [{ slug: id.toLowerCase() }, { id }];
  if (mongoose.Types.ObjectId.isValid(id)) {
    or.unshift({ _id: id });
  }
  return { $or: or };
};

// ─── @desc    Get all products (with optional filtering by category, search, featured)
// ─── @route   GET /api/products
// ─── @access  Public
export const getProducts = async (req, res) => {
  const { category, search, featured, sort } = req.query;

  if (mongoose.connection.readyState !== 1) {
    const products = getFallbackMatches({ category, search, featured });
    const sorted = [...products];

    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return res.status(200).json({
      success: true,
      count: sorted.length,
      products: sorted,
      fallback: true,
      message: "MongoDB is unavailable; returning sample catalog data.",
    });
  }

  try {
    const query = {};

    if (category && category !== "all") {
      query.category = category.toLowerCase();
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const products = await Product.find(query).sort(sortOption);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch {
    const products = getFallbackMatches({ category, search, featured });
    return res.status(200).json({
      success: true,
      count: products.length,
      products,
      fallback: true,
      message: "MongoDB query failed; using sample product data instead.",
    });
  }
};

// ─── @desc    Get single product by slug or id
// ─── @route   GET /api/products/:slug
// ─── @access  Public
export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;

  if (mongoose.connection.readyState !== 1) {
    const product = fallbackProducts.find((item) => item.slug === slug.toLowerCase());
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      product,
      fallback: true,
    });
  }

  try {
    const product = await Product.findOne(buildIdQuery(slug));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch {
    const product = fallbackProducts.find((item) => item.slug === slug.toLowerCase());
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      product,
      fallback: true,
    });
  }
};

// ─── @desc    Create a product
// ─── @route   POST /api/products
// ─── @access  Private/Admin
export const createProduct = async (req, res) => {
  const { title, slug, category, description } = req.body;

  if (!title || !slug || !category || !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, slug, category, and description.",
    });
  }

  const cleanSlug = slug.toLowerCase().trim();
  const existing = await Product.findOne({ slug: cleanSlug });
  if (existing) {
    return res.status(409).json({
      success: false,
      message: `A product with slug '${cleanSlug}' already exists.`,
    });
  }

  const productData = {
    ...req.body,
    slug: cleanSlug,
    id: req.body.id || cleanSlug,
  };

  const product = await Product.create(productData);

  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    product,
  });
};

// ─── @desc    Update a product
// ─── @route   PATCH /api/products/:id
// ─── @access  Private/Admin
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate(
    buildIdQuery(id),
    req.body,
    { returnDocument: "after", runValidators: true }
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    product,
  });
};

// ─── @desc    Delete a product
// ─── @route   DELETE /api/products/:id
// ─── @access  Private/Admin
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete(buildIdQuery(id));

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
};

