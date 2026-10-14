"use client";

import posthog from "posthog-js";
import { LINKS } from "@/lib/site";

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
      {LINKS.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => track(l.label)}
          >
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
