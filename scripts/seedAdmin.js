/**
 * Admin Seed Script
 * ─────────────────
 * Creates/updates the admin user used to sign in to the admin panel at /admin.
 * Run: npm run seed:admin
 *
 * Credentials: username "admin" / password "admin"
 */

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const ADMIN_NAME = "Super Admin";
const ADMIN_USERNAME = "admin";
const ADMIN_EMAIL = "admin@herbs.com";
const ADMIN_PASSWORD = "admin"; // Admin panel password (username: admin / password: admin)

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Hash manually: "admin" is shorter than the 6-char registration minimum,
    // so we bypass schema validation here. bcrypt.compare (used by login) still works.
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Upsert so re-running updates the credentials without creating duplicates.
    const admin = await User.findOneAndUpdate(
      { $or: [{ username: ADMIN_USERNAME }, { email: ADMIN_EMAIL }] },
      {
        $set: {
          name: ADMIN_NAME,
          username: ADMIN_USERNAME,
          email: ADMIN_EMAIL,
          password: hashedPassword,
          role: "admin",
          isActive: true,
        },
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    console.log("🎉 Admin ready:");
    console.log(`   Name:     ${admin.name}`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email:    ${admin.email}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   Role:     ${admin.role}`);
    console.log(`   Panel:    http://localhost:3000/admin`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
