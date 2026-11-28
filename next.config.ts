import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // V2 was previewed at /v2 and is now the live homepage (app/route.ts) and /portfolio.
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/portfolio", destination: "/portfolio", permanent: true },
    ];
  },
};

export default nextConfig;
