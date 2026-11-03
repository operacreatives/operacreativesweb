"use client";

import posthog from "posthog-js";
import { LINKS, OWNED_LINKS, OWNED_PAGES_TITLE } from "@/lib/site";

type Link = (typeof LINKS)[number];

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

function List({ links, offset = 0 }: { links: Link[]; offset?: number }) {
  return (
    <ul className="lk-list">
      {links.map((l, i) => (
        <li key={l.href} style={{ ["--i" as string]: i + offset }}>
          <a
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => track(`${l.label} ${l.note}`)}
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

export function LinkList() {
  return (
    <>
      <List links={LINKS} />
      <h2 className="lk-group">{OWNED_PAGES_TITLE}</h2>
      <List links={OWNED_LINKS} offset={LINKS.length} />
    </>
  );
}
