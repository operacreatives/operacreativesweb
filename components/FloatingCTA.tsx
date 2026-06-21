"use client";

import { useEffect, useState } from "react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      // Show CTA after scrolling 400px
      // Hide CTA when we approach the collaborate form at the bottom (within 850px of page bottom)
      if (scrollY > 400 && docHeight - (scrollY + winHeight) > 850) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#collaborate"
      className={`floating-cta-btn ${visible ? "floating-cta-btn--visible" : ""}`}
      aria-label="Collaborate with us"
    >
      Let's Collaborate <span>↗</span>
    </a>
  );
}
