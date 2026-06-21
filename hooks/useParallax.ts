"use client";

import { useEffect, useRef } from "react";

export function useParallax<T extends HTMLElement = HTMLElement>(speed = 0.08) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Disable parallax on mobile for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let rafId: number;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    observer.observe(element);

    const animate = () => {
      if (isVisible) {
        const rect = element.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distance = elementCenter - viewportCenter;
        const yOffset = distance * speed;

        const media = element.querySelector("img, video") as HTMLElement;
        if (media) {
          media.style.transform = `translate3d(0, ${yOffset}px, 0) scale(1.15)`;
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}
