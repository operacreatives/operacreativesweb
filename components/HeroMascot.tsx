"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { homeManifesto, projects } from "@/data/content";
import metrics from "@/data/logo-metrics.json";
import { clampVector, nextBlinkDelay, springStep, type Point } from "@/lib/mascot";
import { ManifestoEcho } from "./ManifestoEcho";

type MascotStyle = CSSProperties & {
  "--socket-left": string;
  "--socket-top": string;
  "--socket-width": string;
  "--socket-height": string;
  "--pupil-x": string;
  "--pupil-y": string;
};

export function HeroMascot() {
  const heroRef = useRef<HTMLElement>(null);
  const socketRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const currentRef = useRef<Point>({ x: 0, y: 0 });
  const maxDistanceRef = useRef(8);
  const frameRef = useRef<number | null>(null);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setCoarsePointer(pointerQuery.matches);
    };
    sync();
    motionQuery.addEventListener("change", sync);
    pointerQuery.addEventListener("change", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      pointerQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    const resizeObserver = new ResizeObserver(() => {
      maxDistanceRef.current = Math.max(2, socket.getBoundingClientRect().width * 0.11);
      targetRef.current = clampVector(targetRef.current, maxDistanceRef.current);
    });
    resizeObserver.observe(socket);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion || coarsePointer) {
      targetRef.current = { x: 0, y: 0 };
      currentRef.current = { x: 0, y: 0 };
      return;
    }

    const handlePointer = (event: PointerEvent) => {
      const rect = socketRef.current?.getBoundingClientRect();
      if (!rect) return;
      const vector = {
        x: (event.clientX - (rect.left + rect.width / 2)) * 0.035,
        y: (event.clientY - (rect.top + rect.height / 2)) * 0.035,
      };
      targetRef.current = clampVector(vector, maxDistanceRef.current);
    };
    const reset = () => {
      targetRef.current = { x: 0, y: 0 };
    };
    const animate = () => {
      currentRef.current = springStep(currentRef.current, targetRef.current);
      setPosition(currentRef.current);
      frameRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", handlePointer);
      document.documentElement.removeEventListener("mouseleave", reset);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [coarsePointer, reducedMotion, visible]);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    let blinkTimer: ReturnType<typeof setTimeout>;
    let openTimer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      blinkTimer = setTimeout(() => {
        setBlinking(true);
        openTimer = setTimeout(() => {
          setBlinking(false);
          schedule();
        }, 120);
      }, nextBlinkDelay());
    };
    schedule();
    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(openTimer);
    };
  }, [reducedMotion, visible]);

  const renderedPosition = coarsePointer || reducedMotion || !visible ? { x: 0, y: 0 } : position;
  const mascotStyle: MascotStyle = {
    "--socket-left": `${metrics.socketLeft}%`,
    "--socket-top": `${metrics.socketTop}%`,
    "--socket-width": `${metrics.socketWidth}%`,
    "--socket-height": `${metrics.socketHeight}%`,
    "--pupil-x": `${renderedPosition.x}px`,
    "--pupil-y": `${renderedPosition.y}px`,
  };

  return (
    <section ref={heroRef} className="home-hero" data-hero-region>
      <div className="hero-mosaic" aria-hidden="true">
        {projects.slice(0, 32).map((project, index) => (
          <div className={`hero-mosaic__tile hero-mosaic__tile--${index + 1}`} key={project.id}>
            <Image src={project.image} alt="" fill sizes="(min-width: 1440px) 13vw, 25vw" priority={index < 16} />
          </div>
        ))}
      </div>
      <div className="hero-mascot" style={mascotStyle} data-testid="hero-mascot">
        <span className="hero-mascot__keyline" aria-hidden="true" />
        <Image src="/logo-oc-base.png" alt="Opera Creatives" width={889} height={645} priority sizes="70vw" />
        <div ref={socketRef} className={`hero-mascot__socket ${blinking ? "is-blinking" : ""}`} aria-hidden="true">
          <span className="hero-mascot__pupil hero-mascot__pupil--one" />
          <span className="hero-mascot__pupil hero-mascot__pupil--two" />
        </div>
      </div>
      <ManifestoEcho {...homeManifesto} className="home-hero__manifesto" />
    </section>
  );
}
