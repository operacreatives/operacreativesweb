"use client";

import posthog from "posthog-js";
import { useCallback, useEffect, useState } from "react";
import { SHOWREEL, SHOWREEL_ID } from "@/lib/site";
import { buildVimeoEmbedUrl } from "@/lib/vimeo";

// "Watch showreel" button for the hero: opens the reel in a full-screen player.
export function ShowreelButton() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className="btn btn--ghost btn--play"
        onClick={() => {
          try {
            posthog.capture("showreel_play", { source: "hero" });
          } catch {
            // analytics must never block playback
          }
          setOpen(true);
        }}
      >
        <i aria-hidden="true">▶</i>
        <span>{SHOWREEL.play}</span>
      </button>
      {open && (
        <div className="ov" role="dialog" aria-modal="true" aria-label="Showreel" onMouseDown={close}>
          <button type="button" className="lbx" aria-label="Close" onClick={close}>
            ×
          </button>
          <div className="lb" onMouseDown={(e) => e.stopPropagation()}>
            <iframe src={buildVimeoEmbedUrl(SHOWREEL_ID, "player")} title="Opera Creatives showreel" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          </div>
        </div>
      )}
    </>
  );
}
