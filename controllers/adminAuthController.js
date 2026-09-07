import bcrypt from "bcryptjs";
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

// ─── @desc    Admin login — username/email + password, admin role only
// ─── @route   POST /api/admin/login
// ─── @access  Public (returns tokens only for admin accounts)
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide username and password.",
    });
  }

  const identifier = username.trim().toLowerCase();

  // Find by username OR email so the admin panel can accept either form
  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("+password");

  if (!user || user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials.",
    });
  }

  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: "This admin account has been deactivated.",
    });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials.",
    });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Store hashed refresh token + expiry (15 days)
  const hashedRefresh = await hashToken(refreshToken);
  const refreshExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  await User.findByIdAndUpdate(user._id, {
    refreshToken: hashedRefresh,
    refreshTokenExpiry: refreshExpiry,
  });

  return res.status(200).json({
    success: true,
    accessToken,
    refreshToken,
    expiresIn: "1d",
    refreshExpiresIn: "15d",
    user: user.toSafeObject(),
  });
};