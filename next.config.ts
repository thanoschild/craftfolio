import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  serverExternalPackages: ["pdf-parse"],
  images: {
    domains: ['img.clerk.com'],
  },
};

export default nextConfig;
