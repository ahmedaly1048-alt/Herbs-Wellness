/**
 * Role-based authorization middleware.
 * Must be used AFTER the protect middleware.
 *
 * Usage: authorize("admin") or authorize("admin", "user")
 *
 * @param {...string} roles - Allowed roles
 * @returns Express middleware function
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in first.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Your role '${req.user.role}' is not permitted to access this resource.`,
      });
    }

    next();
  };
};

export default authorize;
