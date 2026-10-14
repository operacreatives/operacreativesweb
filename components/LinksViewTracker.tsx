"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

// /links?ref=kshitij-qr: remember where the visitor came from, so every later event
// from this visit (link clicks, "Book a discovery call") carries the same ref.
export function LinksViewTracker() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref") || params.get("utm_source");
      if (ref) posthog.register({ ref });
      posthog.capture("links_view", { ref, referrer: document.referrer || null });
    } catch {
      // analytics must never break the page
    }
  }, []);
  return null;
}
