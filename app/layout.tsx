import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/newsreader/600.css";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntroAnimation } from "@/components/IntroAnimation";

const SITE_URL = "https://www.operacreatives.com";
const SITE_NAME = "Opera Creatives";
const SITE_TITLE = "Opera Creatives — The Production House for the Next Decade of Brands";
const SITE_DESCRIPTION =
  "Opera Creatives is an AI-native creative studio built for the speed that e-commerce demands. We blend strategy, storytelling, and production to create work that moves culture.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "Opera Creatives",
    "creative studio",
    "production house",
    "AI-native",
    "e-commerce creative",
    "brand films",
    "content production",
    "UGC",
    "social media content",
    "brand storytelling",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  // Contact
  // hi@operacreatives.com

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Opera Creatives — The Production House for the Next Decade of Brands",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@operacreatives",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: SITE_URL,
  },

  category: "creative studio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <IntroAnimation />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
