"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { vimeoProjects } from "@/data/vimeo-projects";
import { buildVimeoEmbedUrl, buildVimeoThumbnailUrl } from "@/lib/vimeo";
import { CustomCursor } from "./CustomCursor";

export function VimeoGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);
  const [playingPreviews, setPlayingPreviews] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (hoveredId === null) {
      setPlayingPreviews({});
    }
  }, [hoveredId]);

  useEffect(() => {
    setIsPlayerLoaded(false);
    if (!selectedId) return;

    const timer = setTimeout(() => {
      setIsPlayerLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedId]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") return;
      if (typeof event.data !== "string") return;
      try {
        const data = JSON.parse(event.data);

        // Register for the "play" event when the player is ready
        if (data.event === "ready") {
          event.source?.postMessage(
            JSON.stringify({ method: "addEventListener", value: "play" }),
            { targetOrigin: "https://player.vimeo.com" }
          );
        }

        if (data.event === "play") {
          const iframes = document.querySelectorAll("iframe");
          const matchingIframe = Array.from(iframes).find(
            (iframe) => iframe.contentWindow === event.source
          );
          if (matchingIframe) {
            const vimeoId = matchingIframe.getAttribute("data-vimeo-id");
            const mode = matchingIframe.getAttribute("data-vimeo-mode");
            if (vimeoId) {
              if (mode === "player") {
                setIsPlayerLoaded(true);
              } else if (mode === "preview") {
                setPlayingPreviews((prev) => ({ ...prev, [vimeoId]: true }));
              }
            }
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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

  // Fullscreen management for the lightbox
  useEffect(() => {
    if (!selectedId) return;

    const element = document.getElementById("vimeo-lightbox-container");
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.warn("Fullscreen request failed:", err);
        });
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setSelectedId(null);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.warn("Fullscreen exit failed:", err);
        });
      }
    };
  }, [selectedId]);

  const featuredProject = vimeoProjects[0];
  const featuredBottomProject = vimeoProjects.find((p) => p.id === "1203213922");

  const gridProjects = vimeoProjects.filter(
    (project) => project.id !== "1203214003" && project.id !== "1203213922"
  );

  return (
    <section id="work" className="vimeo-grid-section">
      <CustomCursor isHovering={hoveredId !== null} />
      
      {featuredProject && (
        <div className="vimeo-featured-container">
          <button
            type="button"
            className="vimeo-featured-player vimeo-card"
            onMouseEnter={() => setHoveredId(featuredProject.id)}
            onMouseLeave={() => setHoveredId((current) => (current === featuredProject.id ? null : current))}
            onFocus={() => setHoveredId(featuredProject.id)}
            onBlur={() => setHoveredId((current) => (current === featuredProject.id ? null : current))}
            onClick={() => setSelectedId(featuredProject.id)}
            aria-label={`Open Vimeo video ${featuredProject.id}`}
            style={{ position: "relative", overflow: "hidden", display: "block", width: "100%", padding: 0 }}
          >
            <Image
              src={buildVimeoThumbnailUrl(featuredProject.id)}
              alt=""
              fill
              unoptimized
              sizes="100vw"
              className={`vimeo-card__thumbnail ${playingPreviews[featuredProject.id] ? "is-dimmed" : ""}`}
            />

            {hoveredId === featuredProject.id && selectedId === null ? (
              <iframe
                className={`vimeo-card__preview ${playingPreviews[featuredProject.id] ? "is-playing" : ""}`}
                src={buildVimeoEmbedUrl(featuredProject.id, "preview")}
                data-vimeo-id={featuredProject.id}
                data-vimeo-mode="preview"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                title={`Preview ${featuredProject.id}`}
                tabIndex={-1}
                aria-hidden="true"
                style={{ pointerEvents: "none" }}
                onLoad={(e) => {
                  e.currentTarget.contentWindow?.postMessage(
                    JSON.stringify({ method: "addEventListener", value: "play" }),
                    "https://player.vimeo.com"
                  );
                }}
              />
            ) : null}
          </button>
        </div>
      )}

      <div className="vimeo-grid" data-testid="vimeo-grid">
        {gridProjects.map((project) => {
          const isPreviewing = hoveredId === project.id && selectedId === null;
          const isPlaying = playingPreviews[project.id];

          return (
            <button
              key={project.id}
              type="button"
              className={`vimeo-card ${project.id === "1197465090" ? "vimeo-card--vertical" : ""}`}
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
                className={`vimeo-card__thumbnail ${isPlaying ? "is-dimmed" : ""}`}
              />

              {isPreviewing ? (
                <iframe
                  className={`vimeo-card__preview ${isPlaying ? "is-playing" : ""}`}
                  src={buildVimeoEmbedUrl(project.id, "preview")}
                  data-vimeo-id={project.id}
                  data-vimeo-mode="preview"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`Preview ${project.id}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ pointerEvents: "none" }}
                  onLoad={(e) => {
                    e.currentTarget.contentWindow?.postMessage(
                      JSON.stringify({ method: "addEventListener", value: "play" }),
                      "https://player.vimeo.com"
                    );
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {featuredBottomProject && (
        <div className="vimeo-featured-container vimeo-featured-container--bottom">
          <button
            type="button"
            className="vimeo-featured-player vimeo-card"
            onMouseEnter={() => setHoveredId(featuredBottomProject.id)}
            onMouseLeave={() => setHoveredId((current) => (current === featuredBottomProject.id ? null : current))}
            onFocus={() => setHoveredId(featuredBottomProject.id)}
            onBlur={() => setHoveredId((current) => (current === featuredBottomProject.id ? null : current))}
            onClick={() => setSelectedId(featuredBottomProject.id)}
            aria-label={`Open Vimeo video ${featuredBottomProject.id}`}
            style={{ position: "relative", overflow: "hidden", display: "block", width: "100%", padding: 0 }}
          >
            <Image
              src={buildVimeoThumbnailUrl(featuredBottomProject.id)}
              alt=""
              fill
              unoptimized
              sizes="100vw"
              className={`vimeo-card__thumbnail ${playingPreviews[featuredBottomProject.id] ? "is-dimmed" : ""}`}
            />

            {hoveredId === featuredBottomProject.id && selectedId === null ? (
              <iframe
                className={`vimeo-card__preview ${playingPreviews[featuredBottomProject.id] ? "is-playing" : ""}`}
                src={buildVimeoEmbedUrl(featuredBottomProject.id, "preview")}
                data-vimeo-id={featuredBottomProject.id}
                data-vimeo-mode="preview"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                title={`Preview ${featuredBottomProject.id}`}
                tabIndex={-1}
                aria-hidden="true"
                style={{ pointerEvents: "none" }}
                onLoad={(e) => {
                  e.currentTarget.contentWindow?.postMessage(
                    JSON.stringify({ method: "addEventListener", value: "play" }),
                    "https://player.vimeo.com"
                  );
                }}
              />
            ) : null}
          </button>
        </div>
      )}

      {selectedId ? (
        <div
          id="vimeo-lightbox-container"
          className={`vimeo-lightbox ${isPlayerLoaded ? "is-visible" : "is-loading"}`}
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
              data-vimeo-id={selectedId}
              data-vimeo-mode="player"
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
