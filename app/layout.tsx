import "./site.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bebas_Neue, Inter, Space_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: ["400"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const SITE_URL = "https://www.operacreatives.com";
const SITE_NAME = "Opera Creatives";
const SITE_TITLE = "Opera Creatives — AI-native production studio for anime, VFX, dubbing and brand films";
const SITE_DESCRIPTION =
  "Opera Creatives is the AI-native production studio for animation, hybrid VFX, dubbing, brand films, commercials, UGC videos and product visuals. From product shot to full blown film.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "Opera Creatives",
    "AI-native production studio",
    "anime animation",
    "hybrid VFX",
    "dubbing",
    "brand films",
    "commercials",
    "UGC videos",
    "product visuals",
    "FIFA World Cup anime series",
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
        alt: "Opera Creatives — AI-native production studio",
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

  category: "production studio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body suppressHydrationWarning>
        <div className={`site ${inter.variable} ${bebasNeue.variable} ${spaceMono.variable}`}>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <RevealObserver />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
