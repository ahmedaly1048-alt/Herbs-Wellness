import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never returned in queries by default
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role must be either 'user' or 'admin'",
      },
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // ─── Refresh token storage ────────────────────────────────────────────────
    refreshToken: {
      type: String,
      select: false, // Never returned in queries by default
      default: null,
    },
    refreshTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Pre-save hook: Hash password before saving ─────────────────────────────
userSchema.pre("save", async function () {
  // Only hash if password was modified (or is new)
  if (!this.isModified("password")) {
    return; // Just return to exit the function
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  // No need to call next() at the end of an async function
});

// ─── Instance method: Compare entered password with hashed password ──────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ─── Instance method: Compare incoming refresh token with stored hash ─────────
userSchema.methods.matchRefreshToken = async function (incomingToken) {
  if (!this.refreshToken) return false;
  // Check expiry first
  if (this.refreshTokenExpiry && this.refreshTokenExpiry < new Date()) return false;
  return await bcrypt.compare(incomingToken, this.refreshToken);
};

// ─── Instance method: Return safe user object (no password) ──────────────────
userSchema.methods.toSafeObject = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const User = mongoose.model("User", userSchema);

export default User;
