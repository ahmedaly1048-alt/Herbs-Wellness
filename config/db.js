import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("⚠️ MONGO_URI is not configured. API routes will run in degraded mode until MongoDB is available.");
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}. Continuing in degraded mode.`);
    return false;
  }
};

export const isMongoReady = () => mongoose.connection.readyState === 1;

export default connectDB;
