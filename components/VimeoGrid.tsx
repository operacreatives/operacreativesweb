"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { vimeoProjects } from "@/data/vimeo-projects";
import { buildVimeoEmbedUrl, buildVimeoThumbnailUrl } from "@/lib/vimeo";

export function VimeoGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    <section id="work" className="vimeo-grid-section">
      <div className="vimeo-grid" data-testid="vimeo-grid">
        {vimeoProjects.map((project) => {
          const isPreviewing = hoveredId === project.id && selectedId === null;

          return (
            <button
              key={project.id}
              type="button"
              className="vimeo-card"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId((current) => (current === project.id ? null : current))}
              onFocus={() => setHoveredId(project.id)}
              onBlur={() => setHoveredId((current) => (current === project.id ? null : current))}
              onClick={() => setSelectedId(project.id)}
              aria-label={`Open Vimeo video ${project.id}`}
            >
              <Image
                src={buildVimeoThumbnailUrl(project.id)}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`vimeo-card__thumbnail ${isPreviewing ? "is-dimmed" : ""}`}
              />

              {isPreviewing ? (
                <iframe
                  className="vimeo-card__preview"
                  src={buildVimeoEmbedUrl(project.id, "preview")}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`Preview ${project.id}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ pointerEvents: "none" }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {selectedId ? (
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
        </div>
      ) : null}
    </section>
  );
}
