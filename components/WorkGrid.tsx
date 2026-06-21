"use client";

import { useState } from "react";
import { projects } from "@/data/content";
import { WorkTile } from "./WorkTile";
import { CustomCursor } from "./CustomCursor";

export function WorkGrid() {
  // Use exactly 15 static projects
  const staticProjects = projects.slice(0, 15);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

  return (
    <section id="work" className="work-section">
      <CustomCursor isHovering={hoveredProjectId !== null} />
      <div className="work-grid" data-testid="work-grid">
        {staticProjects.map((project) => (
          <WorkTile 
            key={project.id} 
            project={project} 
            isActive={hoveredProjectId === project.id}
            onHover={() => setHoveredProjectId(project.id)}
            onLeave={() => setHoveredProjectId(null)}
          />
        ))}
      </div>
    </section>
  );
}
