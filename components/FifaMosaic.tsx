"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { buildVimeoEmbedUrl, type WorkVariant } from "@/lib/vimeo";
import { useGridRowUnit } from "@/hooks/useGridRowUnit";
import { FifaStarIcon } from "./FifaStarIcon";

export type FifaSlot = { id: string; variant: WorkVariant; thumbnailUrl: string } | null;

export function FifaMosaic({ slots }: { slots: FifaSlot[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadedPreviewIds, setLoadedPreviewIds] = useState<Record<string, boolean>>({});
  const { ref: gridRef, style: gridStyle } = useGridRowUnit();

  useEffect(() => {
    if (!selectedId) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedId]);

  return (
    <>
      <p className="fifa-minimal-note">
        Anime series released during the FIFA World Cup, generating over 150 million impressions across social media.
      </p>

      <div className="work-mosaic" data-testid="fifa-grid" ref={gridRef} style={gridStyle}>
        {slots.map((slot, index) => {
          const number = String(index + 1).padStart(2, "0");

          if (!slot) {
            return (
              <div
                key={`slot-${index}`}
                className="work-mosaic__tile work-mosaic__tile--empty"
                aria-hidden="true"
              >
                <span className="work-mosaic__placeholder-index">{number}</span>
                <span className="work-mosaic__placeholder-label">Coming soon</span>
              </div>
            );
          }

          const { id, variant, thumbnailUrl } = slot;
          const isPreviewing = hoveredId === id && selectedId === null;
          const isVideoReady = isPreviewing && Boolean(loadedPreviewIds[id]);

          return (
            <button
              key={id}
              type="button"
              className={`work-mosaic__tile work-mosaic__tile--${variant}`}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => {
                setHoveredId((current) => (current === id ? null : current));
                setLoadedPreviewIds((prev) => ({ ...prev, [id]: false }));
              }}
              onFocus={() => setHoveredId(id)}
              onBlur={() => {
                setHoveredId((current) => (current === id ? null : current));
                setLoadedPreviewIds((prev) => ({ ...prev, [id]: false }));
              }}
              onClick={() => setSelectedId(id)}
              aria-label={`Open FIFA World Cup video ${id}`}
            >
              {isPreviewing ? (
                <iframe
                  className="work-mosaic__preview"
                  src={buildVimeoEmbedUrl(id, "preview")}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`Preview ${id}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ pointerEvents: "none" }}
                  ref={(el) => {
                    if (el && !loadedPreviewIds[id]) {
                      import("@vimeo/player").then(({ default: Player }) => {
                        const player = new Player(el);
                        player.on("playing", () => {
                          setLoadedPreviewIds((prev) => ({ ...prev, [id]: true }));
                        });
                      });
                    }
                  }}
                />
              ) : null}

              <Image
                src={thumbnailUrl}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 50vw, 33vw"
                className={`work-mosaic__thumb ${isVideoReady ? "is-dimmed" : ""}`}
              />

              <span className="work-mosaic__play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
                </svg>
              </span>

              <span className="fifa-card-star" aria-hidden="true">
                <FifaStarIcon width={12} height={12} />
                FIFA
              </span>
            </button>
          );
        })}
      </div>

      {selectedId && typeof document !== "undefined"
        ? createPortal(
            <div
              className="vimeo-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="FIFA World Cup video player"
              onClick={() => setSelectedId(null)}
            >
              <button
                type="button"
                className="vimeo-lightbox__close"
                onClick={() => setSelectedId(null)}
                aria-label="Close video player"
              >
                Close
              </button>
              <div className="vimeo-lightbox__frame" onClick={(event) => event.stopPropagation()}>
                <iframe
                  className="vimeo-lightbox__player"
                  src={buildVimeoEmbedUrl(selectedId, "player")}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`Player ${selectedId}`}
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
