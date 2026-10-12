import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        // Printed QR code on business cards points here. Change the destination
        // to redirect the card anywhere; keep permanent: false so browsers don't cache it.
        source: "/qr",
        destination: "/deck?ref=card",
        permanent: false,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
