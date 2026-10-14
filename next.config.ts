import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // The redesign was previewed at /v2 before it became the home page.
    return [{ source: "/v2", destination: "/", permanent: true }];
  },
};

export default nextConfig;
