import Link from "next/link";
import { CookiePreferences } from "./CookiePreferences";
import { LogoMark } from "./LogoMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <LogoMark className="site-footer__logo" />
        <p>Independent creative company for brands that want to mean more.</p>
      </div>
      <div className="site-footer__links">
        <div>
          <Link href="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <CookiePreferences />
        </div>
        <div>
          <Link href="/contact#project-form" className="footer-link">
            Subscribe
          </Link>
          <Link href="/contact" className="footer-link">
            Connect
          </Link>
          <Link href="/contact#location" className="footer-link">
            Location
          </Link>
          <Link href="/sitemap.xml" className="footer-link">
            Sitemap
          </Link>
        </div>
      </div>
      <div className="site-footer__base">
        <span>© 2026 Opera Creatives</span>
        <span>Demo content / Built with intent</span>
      </div>
    </footer>
  );
}
