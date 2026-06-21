"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/types";
import { useParallax } from "@/hooks/useParallax";

interface WorkTileProps {
  project: Project;
  className?: string;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

const PROJECT_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-rain-40036-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-vintage-cinema-camera-lens-41764-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-a-retro-camera-in-nature-41753-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-misty-forest-at-sunset-41711-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4",
];

export function WorkTile({ project, className = "", isActive, onHover, onLeave }: WorkTileProps) {
  const [failed, setFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const parallaxRef = useParallax<HTMLElement>(0.08);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  useEffect(() => {
    if (!parallaxRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -100px 0px" });
    observer.observe(parallaxRef.current);
    return () => observer.disconnect();
  }, [parallaxRef]);

  return (
    <figure
      ref={parallaxRef}
      className={`work-tile ${project.isUGC ? "is-ugc" : ""} ${isActive ? "is-active" : ""} ${isVisible ? "is-visible" : ""} ${className}`}
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
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 100vw"
            style={{ objectPosition: project.focalPosition }}
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div className="work-tile__fallback" role="img" aria-label={`${project.client} project image unavailable`}>
          <span>{project.fallbackLabel}</span>
        </div>
      )}
    </figure>
  );
}
