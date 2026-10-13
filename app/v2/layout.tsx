import "./v2.css";
import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Mono } from "next/font/google";
import { Footer } from "@/components/v2/Footer";
import { Header } from "@/components/v2/Header";
import { RevealObserver } from "@/components/v2/RevealObserver";

// Separate font instances so the live site's fonts and CSS variables stay untouched.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700", "800"] });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], variable: "--font-bebas-neue", weight: ["400"] });
const spaceMono = Space_Mono({ subsets: ["latin"], variable: "--font-space-mono", weight: ["400", "700"] });

// Preview only: keep it out of search results until the redesign goes live.
export const metadata: Metadata = {
  title: { absolute: "Opera Creatives — AI-native production studio (v2 preview)" },
  description:
    "Opera Creatives is the AI-native production studio for animation, hybrid VFX, dubbing, brand films, commercials, UGC videos and product visuals.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.operacreatives.com/v2" },
};

export default function V2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`v2 ${inter.variable} ${bebasNeue.variable} ${spaceMono.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <a href="#v2-main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="v2-main">{children}</main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
