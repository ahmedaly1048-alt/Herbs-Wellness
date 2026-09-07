import express from "express";
import { adminLogin } from "../controllers/adminAuthController.js";
import { uploadImage } from "../controllers/adminUploadController.js";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const router = express.Router();

// ─── PUBLIC ROUTE ─────────────────────────────────────────────────────────────
// ─── @desc    Admin login (username or email + password — admin role only)
// ─── @route   POST /api/admin/login
// ─── @access  Public (must be an existing admin account)
router.post("/login", adminLogin);

// All admin routes below require: valid JWT + admin role
router.use(protect, authorize("admin"));

// ─── @desc    Prepare an image for product storage
// ─── @route   POST /api/admin/upload
// ─── @access  Private/Admin
router.post("/upload", uploadImage);

// ─── @desc    Get all users
// ─── @route   GET /api/admin/users
// ─── @access  Private/Admin
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// ─── @desc    Get a single user by ID
// ─── @route   GET /api/admin/users/:id
// ─── @access  Private/Admin
router.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }
  return res.status(200).json({ success: true, user });
});

// ─── @desc    Update user role or status
// ─── @route   PATCH /api/admin/users/:id
// ─── @access  Private/Admin
router.patch("/users/:id", async (req, res) => {
  const { role, isActive } = req.body;

  const allowedUpdates = {};
  if (role !== undefined) allowedUpdates.role = role;
  if (isActive !== undefined) allowedUpdates.isActive = isActive;

  const user = await User.findByIdAndUpdate(req.params.id, allowedUpdates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  return res.status(200).json({
    success: true,
    message: "User updated successfully.",
    user,
  });
});

// ─── @desc    Delete a user
// ─── @route   DELETE /api/admin/users/:id
// ─── @access  Private/Admin
router.delete("/users/:id", async (req, res) => {
  // Prevent admin from deleting themselves
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot delete your own account.",
    });
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});

// ─── @desc    Admin dashboard summary
// ─── @route   GET /api/admin/dashboard
// ─── @access  Private/Admin
router.get("/dashboard", async (req, res) => {
  const [totalProducts, featuredProducts, lowStockProducts] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ featured: true }),
    Product.countDocuments({ stock: { $lte: 10 } }),
  ]);
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const activeUsers = await User.countDocuments({ isActive: true });

  return res.status(200).json({
    success: true,
    dashboard: {
      totalUsers,
      totalAdmins,
      activeUsers,
      totalProducts,
      featuredProducts,
      lowStockProducts,
      loggedInAdmin: req.user.toSafeObject(),
    },
  });
});

export default router;
