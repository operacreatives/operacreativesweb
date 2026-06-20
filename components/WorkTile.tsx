"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/types";

export function WorkTile({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="work-tile">
      {!failed ? (
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw"
          style={{ objectPosition: project.focalPosition }}
          onError={() => setFailed(true)}
        />
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
