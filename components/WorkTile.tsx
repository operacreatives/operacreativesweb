"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/types";
import { useCinema } from "@/context/CinemaContext";
import { useParallax } from "@/hooks/useParallax";

const PROJECT_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-rain-40036-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-vintage-cinema-camera-lens-41764-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-a-retro-camera-in-nature-41753-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-misty-forest-at-sunset-41711-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4",
];

export function WorkTile({ project, className = "" }: { project: Project, className?: string }) {
  const [failed, setFailed] = useState(false);
  const { openVideo } = useCinema();
  const parallaxRef = useParallax<HTMLElement>(0.08);

  const videoUrl = PROJECT_VIDEOS[project.id % PROJECT_VIDEOS.length];

  const handleOpen = () => {
    openVideo(videoUrl, project.title, project.client);
  };



  return (
    <figure
      ref={parallaxRef}
      className={`work-tile ${className}`}
      onClick={handleOpen}
    >
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
      <figcaption className="work-tile__caption">
        <strong>{project.client}</strong>
        <span>{project.title}</span>
      </figcaption>
    </figure>
  );
}
