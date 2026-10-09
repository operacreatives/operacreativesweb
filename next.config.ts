import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/deck",
        destination: "https://www.papermark.com/view/cmv0vv6uv00hal006st3xyk8a",
        permanent: false,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
