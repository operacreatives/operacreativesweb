"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/data/content";
import { LogoMark } from "./LogoMark";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-region]");
    if (!hero) {
      queueMicrotask(() => setSolid(true));
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-72px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header className={`site-header ${solid ? "site-header--solid" : ""}`} data-testid="site-header">
        <div className="site-header__inner">
          <LogoMark className="site-header__logo" priority />
          <nav className="site-header__nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="site-header__contact">
            Contact
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="site-header__menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>
      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={closeMenu} opener={menuButtonRef} />
      </div>
    </>
  );
}
