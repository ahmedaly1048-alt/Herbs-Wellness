/**
 * Admin Seed Script
 * ─────────────────
 * Creates the initial admin user in the database.
 * Run once: node scripts/seedAdmin.js
 *
 * Update the ADMIN_* variables below before running.
 */

import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

const ADMIN_NAME = "Super Admin";
const ADMIN_EMAIL = "admin@herbs.com";
const ADMIN_PASSWORD = "Admin@123"; // Change this!

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Check if admin already exists
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log(`⚠️  Admin already exists: ${existing.email}`);
      process.exit(0);
    }

    // Create admin user — bypass role restriction by directly setting role
    const admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });

    console.log(`🎉 Admin created successfully!`);
    console.log(`   Name:  ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role:  ${admin.role}`);
    console.log(`   ID:    ${admin._id}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
