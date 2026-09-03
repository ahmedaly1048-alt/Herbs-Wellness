import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    id: { type: String },
    sku: { type: String, required: true },
    name: { type: String, required: true },
    weight: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 50 },
    details: { type: String },
    attributes: { type: Map, of: String },
  },
  { _id: false }
);

const breakdownSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    type: { type: String },
    benefits: [{ type: String }],
    suggestedUse: { type: String },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.Mixed },
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: String },
    comment: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true,
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      lowercase: true,
      trim: true,
    },
    images: {
      type: [String],
      default: ["/placeholder-product.jpg"],
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    requiresConsultation: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isVariable: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
    sku: {
      type: String,
    },
    weight: {
      type: String,
    },
    stock: {
      type: Number,
      default: 100,
    },
    variants: [variantSchema],
    breakdown: [breakdownSchema],
    reviewsList: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

// Fallback: If id is not explicitly passed, set it to slug
productSchema.pre("save", function () {
  if (!this.id) {
    this.id = this.slug;
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
