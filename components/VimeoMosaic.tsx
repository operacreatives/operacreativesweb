"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { buildVimeoEmbedUrl, type WorkVariant } from "@/lib/vimeo";
import { useGridRowUnit } from "@/hooks/useGridRowUnit";

export interface MosaicItem {
  id: string;
  variant: WorkVariant;
  thumbnailUrl: string;
}

// Renders the dynamic Selected Work mosaic (variant spans set via CSS classes).

export function VimeoMosaic({ items }: { items: MosaicItem[] }) {
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
      <div className="work-mosaic" data-testid="vimeo-grid" ref={gridRef} style={gridStyle}>
        {items.map((item, index) => {
          const isPreviewing = hoveredId === item.id && selectedId === null;
          const isVideoReady = isPreviewing && Boolean(loadedPreviewIds[item.id]);

          return (
            <button
              key={item.id}
              type="button"
              className={`work-mosaic__tile work-mosaic__tile--${item.variant}`}
              style={{ ["--i" as string]: index }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => {
                setHoveredId((current) => (current === item.id ? null : current));
                setLoadedPreviewIds((prev) => ({ ...prev, [item.id]: false }));
              }}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => {
                setHoveredId((current) => (current === item.id ? null : current));
                setLoadedPreviewIds((prev) => ({ ...prev, [item.id]: false }));
              }}
              onClick={() => setSelectedId(item.id)}
              aria-label={`Open Vimeo video ${item.id}`}
            >
              {isPreviewing ? (
                <iframe
                  className="work-mosaic__preview"
                  src={buildVimeoEmbedUrl(item.id, "preview")}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`Preview ${item.id}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ pointerEvents: "none" }}
                  ref={(el) => {
                    if (el && !loadedPreviewIds[item.id]) {
                      import("@vimeo/player").then(({ default: Player }) => {
                        const player = new Player(el);
                        player.on("playing", () => {
                          setLoadedPreviewIds((prev) => ({ ...prev, [item.id]: true }));
                        });
                      });
                    }
                  }}
                />
              ) : null}

              <Image
                src={item.thumbnailUrl}
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
              aria-label="Vimeo video player"
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
