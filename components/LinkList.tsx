"use client";

import posthog from "posthog-js";
import { LINKS } from "@/lib/site";

const ICONS: Record<string, React.ReactNode> = {
  "Pitch deck": (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M10 9.2v4.6l4-2.3zM8 21h8M12 17v4" />
    </>
  ),
  Website: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6 1.4 0 2.1 1 2.1 2.6v3" />
    </>
  ),
  X: <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />,
  Email: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
};

function track(label: string) {
  try {
    posthog.capture("links_click", { label });
  } catch {
    // analytics must never block a link
  }
}

export function LinkList() {
  return (
    <ul className="lk-list">
      {LINKS.map((l, i) => (
        <li key={l.label} style={{ ["--i" as string]: i }}>
          <a
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => track(l.label)}
          >
            <em aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[l.label]}
              </svg>
            </em>
            <span>
              <b>{l.label}</b>
              <small>{l.note}</small>
            </span>
            <i aria-hidden="true">↗</i>
          </a>
        </li>
      ))}
    </ul>
  );
}
