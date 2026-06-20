"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { navItems } from "@/data/content";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  opener: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({ open, onClose, opener }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const openerElement = opener.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button") ?? [];
    focusables[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      openerElement?.focus();
    };
  }, [onClose, open, opener]);

  if (!open) return null;

  return (
    <div ref={panelRef} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className="mobile-menu__topline">
        <span>Opera Creatives</span>
        <button type="button" onClick={onClose} className="text-link">
          Close
        </button>
      </div>
      <nav aria-label="Mobile navigation" className="mobile-menu__nav">
        {navItems.map((item, index) => (
          <Link key={item.href} href={item.href} onClick={onClose}>
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </Link>
        ))}
        <Link href="/contact" onClick={onClose}>
          <span aria-hidden="true">06</span>
          Contact
        </Link>
      </nav>
      <p className="mobile-menu__note">Independent creative company. Bengaluru, Mumbai, and wherever the work takes us.</p>
    </div>
  );
}
