import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  serverExternalPackages: ["pdf-parse"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
