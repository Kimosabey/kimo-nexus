import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 400, 560, 640, 760, 900, 1024, 1200, 1320],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 560, 640, 1280],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
