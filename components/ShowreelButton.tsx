"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { buildVimeoEmbedUrl } from "@/lib/vimeo";

const SHOWREEL_ID = "1233639706";

// Brand pill button that opens the full showreel in the same lightbox used by
// the work grid.
export function ShowreelButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal to <body>: an ancestor wrapper has a transform, which would otherwise
  // make "fixed" position relative to the page instead of the viewport.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div className="showreel-cta">
        <button type="button" className="showreel-cta__btn" onClick={() => setOpen(true)}>
          <span className="showreel-cta__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
            </svg>
          </span>
          <span className="showreel-cta__label">Watch Showreel</span>
        </button>
      </div>

      {open
        ? createPortal(
            <div
              className="vimeo-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Opera Creatives showreel"
              onClick={() => setOpen(false)}
            >
              <button
                type="button"
                className="vimeo-lightbox__close"
                onClick={() => setOpen(false)}
                aria-label="Close showreel"
              >
                Close
              </button>
              <div className="vimeo-lightbox__frame" onClick={(event) => event.stopPropagation()}>
                <iframe
                  className="vimeo-lightbox__player"
                  src={buildVimeoEmbedUrl(SHOWREEL_ID, "player")}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Opera Creatives showreel"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>,
    document.body,
  );
}
