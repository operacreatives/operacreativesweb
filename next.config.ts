import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    // V2 preview for team approval: static pages in public/v2. The live home page is untouched.
    // beforeFiles so the [slug] short-link route never catches them.
    return {
      beforeFiles: [
        { source: "/v2", destination: "/v2/index.html" },
        { source: "/v2/portfolio", destination: "/v2/portfolio.html" },
      ],
    };
  },
};

export default nextConfig;
