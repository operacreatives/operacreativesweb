import "../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";

// The live site's chrome. Its styles are loaded only for these routes, so the
// /v2 preview (which has its own layout and CSS) can never be affected by them.
export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Preloader />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
