import type { NextConfig } from "next";

/**
 * URL of the Express backend (port 5000). Override with NEXT_PUBLIC_API_URL
 * or BACKEND_URL in staging/production.
 */
const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return {
      // Forward API traffic to the Express backend.
      // NOTE: /api/checkout is intentionally NOT listed here — it is served by
      // the Next.js route handler at src/app/api/checkout/route.ts.
      beforeFiles: [
        { source: "/api/auth/:path*", destination: `${BACKEND_URL}/api/auth/:path*` },
        { source: "/api/admin/:path*", destination: `${BACKEND_URL}/api/admin/:path*` },
        { source: "/api/products/:path*", destination: `${BACKEND_URL}/api/products/:path*` },
        { source: "/api/health", destination: `${BACKEND_URL}/api/health` },
      ],
    };
  },
};

export default nextConfig;
