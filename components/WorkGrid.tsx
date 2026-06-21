"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { workRows } from "@/data/content";
import { INITIAL_PROJECT_COUNT, nextVisibleCount, PROJECT_COUNT, shouldShowCta } from "@/lib/work-grid";
import { CTABand } from "./CTABand";
import { WorkTile } from "./WorkTile";
import { CustomCursor } from "./CustomCursor";

export function WorkGrid() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECT_COUNT);
  const [loading, setLoading] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const renderedRows = useMemo(() => workRows.slice(0, Math.ceil(visibleCount / 3)), [visibleCount]);
  const complete = shouldShowCta(visibleCount);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || complete) return;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        timer = setTimeout(() => {
          setVisibleCount((current) => nextVisibleCount(current));
          loadingRef.current = false;
          setLoading(false);
        }, 320);
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [complete]);

  return (
    <section id="work" className="work-section">
      <CustomCursor isHovering={hoveredProjectId !== null} />
      <div className="work-grid" data-testid="work-grid">
        {renderedRows.map((row) => (
          <Fragment key={row.id}>
            <div className={`work-row work-row--${row.height}`}>
              {row.projects.map((project) => (
                <WorkTile 
                  key={project.id} 
                  project={project} 
                  isActive={hoveredProjectId === project.id}
                  onHover={() => setHoveredProjectId(project.id)}
                  onLeave={() => setHoveredProjectId(null)}
                />
              ))}
            </div>
          </Fragment>
        ))}
        {loading && (
          <div className="work-row work-row--standard work-row--skeleton" aria-label="Loading more projects">
            {[0, 1, 2].map((item) => (
              <div className="work-skeleton" key={item} />
            ))}
          </div>
        )}
      </div>
      {!complete && <div ref={sentinelRef} className="work-sentinel" aria-hidden="true" />}
      {complete && <CTABand />}
    </section>
  );
}
