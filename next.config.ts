import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    ppr: false, // Partial Pre-rendering — opt-in per page
  },
};

export default nextConfig;
