"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SITE_NAME } from "@/lib/v2/site";
import { BookButton } from "./BookButton";

export function Header() {
  const [open, setOpen] = useState(false);

  // Lock page scroll behind the open phone menu; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`hdr ${open ? "menu" : ""}`} data-testid="v2-header">
      <Link href="/v2" className="logo" aria-label={`${SITE_NAME} home`} onClick={() => setOpen(false)}>
        <Image src="/logo-oc-mark.webp" alt="" width={360} height={261} priority />
        <span>{SITE_NAME}</span>
      </Link>
      <nav className="nav" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="hdr__actions">
        <BookButton source="header" />
        <button
          type="button"
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>
    </header>
  );
}
