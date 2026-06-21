import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/newsreader/600.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CinemaProvider } from "@/context/CinemaContext";
import { CinemaManager } from "@/components/CinemaManager";

export const metadata: Metadata = {
  metadataBase: new URL("https://opera-creatives.example"),
  title: {
    default: "Opera Creatives — Ideas with a pulse",
    template: "%s — Opera Creatives",
  },
  description: "Opera Creatives is an independent creative company for brands that want to mean more.",
  openGraph: {
    title: "Opera Creatives",
    description: "Ideas with a pulse. Images with staying power.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CinemaProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CinemaManager />
        </CinemaProvider>
      </body>
    </html>
  );
}
