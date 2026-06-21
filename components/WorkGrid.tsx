"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/content";
import { CTABand } from "./CTABand";

interface WorkGridItemProps {
  project: typeof projects[0];
  index: number;
}

function WorkGridItem({ project, index }: WorkGridItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // trigger once
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`work-item-row ${isEven ? "work-item-row--even" : "work-item-row--odd"} ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="work-item-media">
        <div className="work-item-media-frame">
          <img
            src={project.image}
            alt={project.alt}
            style={{ objectPosition: project.focalPosition }}
            className="work-item-img"
          />
        </div>
      </div>
      
      <div className="work-item-info">
        <span className="work-item-number">0{index + 1}</span>
        <h3 className="work-item-client">{project.client}</h3>
        <h4 className="work-item-title">{project.title}</h4>
        
        <div className="work-item-tags">
          <span className="work-item-tag">AI PRODUCTION</span>
          <span className="work-item-tag">CINEMA GRADE</span>
        </div>
      </div>
    </div>
  );
}

export function WorkGrid() {
  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="work-section__heading">
        <p className="section-kicker">SELECTED SHOWCASE</p>
        <h2 id="work-title">Made to be remembered.</h2>
        <span>6 PROJECTS</span>
      </div>

      <div className="work-showcase-list">
        {projects.map((project, index) => (
          <WorkGridItem key={project.id} project={project} index={index} />
        ))}
      </div>

      <CTABand />
    </section>
  );
}
