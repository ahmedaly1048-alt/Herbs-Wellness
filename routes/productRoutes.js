import express from "express";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

// Admin-protected routes
router.post("/", protect, authorize("admin"), createProduct);
router.patch("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;
