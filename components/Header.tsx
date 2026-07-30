"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "./LogoMark";

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

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
    <header className={`site-header ${solid ? "site-header--solid" : ""}`} data-testid="site-header">
      <div className="site-header__inner">
        <div className="site-header__left">
        </div>
        <div className="site-header__center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="cursor-pointer appearance-none bg-transparent border-none p-0 outline-none hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
          >
            <LogoMark className="site-header__logo" priority />
          </button>
        </div>
        <div className="site-header__right">
          <a href="#collaborate" className="site-header__contact-link">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

