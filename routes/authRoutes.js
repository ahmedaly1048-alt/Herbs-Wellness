import express from "express";
import {
  register,
  login,
  getMe,
  refreshAccessToken,
  logout,
} from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// @route  POST /api/auth/register
router.post("/register", register);

// @route  POST /api/auth/login
router.post("/login", login);

// @route  POST /api/auth/refresh
// Body: { refreshToken: "..." }
router.post("/refresh", refreshAccessToken);

// @route  POST /api/auth/logout  (requires valid access token)
router.post("/logout", protect, logout);

// @route  GET /api/auth/me
router.get("/me", protect, getMe);

export default router;
