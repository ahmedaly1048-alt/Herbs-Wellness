import mongoose from "mongoose";
import Product from "../models/Product.js";

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
};

// ─── @desc    Get single product by slug or id
// ─── @route   GET /api/products/:slug
// ─── @access  Public
export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;

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
    { new: true, runValidators: true }
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

