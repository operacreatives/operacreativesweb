"use client";

import { projects } from "@/data/content";
import { CTABand } from "./CTABand";

interface WorkCardProps {
  project: typeof projects[0];
}

function WorkCard({ project }: WorkCardProps) {
  return (
    <div className="work-card">
      <div className="work-card__media">
        <img
          src={project.image}
          alt={project.alt}
          style={{ objectPosition: project.focalPosition }}
          className="work-card__img"
        />
        <span className="work-card__badge">STATIC</span>
      </div>
      <div className="work-card__caption">
        <strong className="work-card__client">{project.client}</strong>
        <span className="work-card__title">{project.title}</span>
      </div>
    </div>
  );
}

export function WorkGrid() {
  const row1Items = projects.slice(0, 5);
  const row2Items = projects.slice(5, 10);

  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="work-section__heading">
        <p className="section-kicker">SELECTED SHOWCASE</p>
        <h2 id="work-title">Made to be remembered.</h2>
        <span>10 projects</span>
      </div>

      <div className="work-marquee-wrapper">
        {/* Layer 1 - Left to Right */}
        <div className="work-marquee-row work-marquee-row--left">
          <div className="work-marquee-track">
            {row1Items.map((project) => (
              <WorkCard key={`w1-${project.id}`} project={project} />
            ))}
            {/* Duplicate for infinite loop */}
            {row1Items.map((project) => (
              <WorkCard key={`w1-dup-${project.id}`} project={project} />
            ))}
          </div>
        </div>

        {/* Layer 2 - Right to Left */}
        <div className="work-marquee-row work-marquee-row--right">
          <div className="work-marquee-track">
            {row2Items.map((project) => (
              <WorkCard key={`w2-${project.id}`} project={project} />
            ))}
            {/* Duplicate for infinite loop */}
            {row2Items.map((project) => (
              <WorkCard key={`w2-dup-${project.id}`} project={project} />
            ))}
          </div>
        </div>
      </div>

      <CTABand />
    </section>
  );
}
