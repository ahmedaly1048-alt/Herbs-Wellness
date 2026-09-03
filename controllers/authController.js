import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

// ─── Helper: hash a refresh token before DB storage ──────────────────────────
const hashToken = async (token) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(token, salt);
};

// ─── Helper: build the standard token response ───────────────────────────────
const sendTokenResponse = async (user, statusCode, res) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Store hashed refresh token + expiry in DB (15 days from now)
  const hashedRefresh = await hashToken(refreshToken);
  const refreshExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  await User.findByIdAndUpdate(user._id, {
    refreshToken: hashedRefresh,
    refreshTokenExpiry: refreshExpiry,
  });

  return res.status(statusCode).json({
    success: true,
    accessToken,           // 1 day — attach to Authorization: Bearer header
    refreshToken,          // 15 days — store securely on client (httpOnly cookie recommended)
    expiresIn: "1d",
    refreshExpiresIn: "15d",
    user: user.toSafeObject(),
  });
};

// ─── @desc    Register a new user
// ─── @route   POST /api/auth/register
// ─── @access  Public
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and password.",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists.",
    });
  }

  // role is always 'user' on self-registration — admins are seeded
  const user = await User.create({ name, email, password, role: "user" });

  return sendTokenResponse(user, 201, res);
};

// ─── @desc    Login user & return both tokens
// ─── @route   POST /api/auth/login
// ─── @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password.",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: "Your account has been deactivated. Contact support.",
    });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  return sendTokenResponse(user, 200, res);
};

// ─── @desc    Refresh access token using a valid refresh token
// ─── @route   POST /api/auth/refresh
// ─── @access  Public (requires refresh token in body)
export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token is required.",
    });
  }

  // 1. Verify the refresh token signature
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return res.status(401).json({
      success: false,
      message: "Refresh token is invalid or expired. Please log in again.",
    });
  }

  // 2. Find user and include stored refresh token for comparison
  const user = await User.findById(decoded.id).select("+refreshToken +refreshTokenExpiry");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found. Please log in again.",
    });
  }

  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: "Account deactivated. Contact support.",
    });
  }

  // 3. Validate token against stored hash (also checks expiry via matchRefreshToken)
  const isValid = await user.matchRefreshToken(refreshToken);
  if (!isValid) {
    // Possible token reuse attack — clear stored token
    await User.findByIdAndUpdate(decoded.id, {
      refreshToken: null,
      refreshTokenExpiry: null,
    });
    return res.status(401).json({
      success: false,
      message: "Refresh token is invalid or has been revoked. Please log in again.",
    });
  }

  // 4. Rotate: issue new access token + new refresh token (refresh token rotation)
  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  const hashedRefresh = await hashToken(newRefreshToken);
  const refreshExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  await User.findByIdAndUpdate(user._id, {
    refreshToken: hashedRefresh,
    refreshTokenExpiry: refreshExpiry,
  });

  return res.status(200).json({
    success: true,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn: "1d",
    refreshExpiresIn: "15d",
  });
};

// ─── @desc    Logout — revoke stored refresh token
// ─── @route   POST /api/auth/logout
// ─── @access  Private
export const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    refreshToken: null,
    refreshTokenExpiry: null,
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// ─── @desc    Get currently logged-in user profile
// ─── @route   GET /api/auth/me
// ─── @access  Private
export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user.toSafeObject(),
  });
};
