import jwt from "jsonwebtoken";

/**
 * Generate a short-lived Access Token (1 day).
 * Used to authenticate API requests.
 *
 * @param {string} userId - The MongoDB _id of the user
 * @returns {string} signed JWT access token
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d",
  });
};

/**
 * Generate a long-lived Refresh Token (15 days).
 * Used only to obtain a new access token when the current one expires.
 *
 * @param {string} userId - The MongoDB _id of the user
 * @returns {string} signed JWT refresh token
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "15d",
  });
};
