"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/types";

interface WorkTileProps {
  project: Project;
  className?: string;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export function WorkTile({ project, className = "", isActive, onHover, onLeave }: WorkTileProps) {
  const [failed, setFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tileRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause video on hover
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  // Reveal tile when it scrolls into view
  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const typeLabel =
    project.gridType === "portrait"
      ? "UGC Video"
      : project.gridType === "landscape"
      ? "AI Cinematic"
      : "Product Visual";

  return (
    <figure
      ref={tileRef}
      className={`work-tile work-tile--${project.gridType || "square"} ${isActive ? "is-active" : ""} ${isVisible ? "is-visible" : ""} ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {project.videoUrl && (
        <video
          ref={videoRef}
          className="work-tile__video"
          src={project.videoUrl}
          loop
          muted
          playsInline
        />
      )}
      {!failed ? (
        <div className="work-tile__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: project.focalPosition }}
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div
          className="work-tile__fallback"
          role="img"
          aria-label={`${project.client} project image unavailable`}
        >
          <span>{project.fallbackLabel}</span>
        </div>
      )}

      <div className="work-tile__info">
        <span className="work-tile__client">{project.client}</span>
        <span className="work-tile__tag">{typeLabel}</span>
      </div>
    </figure>
  );
}
