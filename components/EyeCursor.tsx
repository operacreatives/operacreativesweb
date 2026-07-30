"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const INTERACTIVE = "a, button, input, textarea, select, [role='button']";

export function EyeCursor() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    if (!eye || !pupil || !window.matchMedia("(pointer: fine)").matches) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let previous = { x: innerWidth / 2, y: innerHeight / 2 };
    let lastMove = performance.now();
    let idleTimer: ReturnType<typeof setTimeout>;

    const moveX = gsap.quickTo(eye, "x", { duration: reducedMotion ? 0 : 0.28, ease: "power3.out" });
    const moveY = gsap.quickTo(eye, "y", { duration: reducedMotion ? 0 : 0.28, ease: "power3.out" });
    const pupilX = gsap.quickTo(pupil, "x", { duration: reducedMotion ? 0 : 0.12, ease: "power2.out" });
    const pupilY = gsap.quickTo(pupil, "y", { duration: reducedMotion ? 0 : 0.12, ease: "power2.out" });

    const blink = (duration = 0.14) => {
      gsap.killTweensOf(eye, "scaleY");
      gsap.fromTo(
        eye,
        { scaleY: 1 },
        { scaleY: 0.1, duration: duration / 2, repeat: 1, yoyo: true, ease: "power2.inOut" },
      );
    };

    const scheduleBlink = () => {
      clearTimeout(idleTimer);
      if (reducedMotion) return;
      idleTimer = setTimeout(() => {
        if (performance.now() - lastMove > 4500) blink();
        scheduleBlink();
      }, 5000 + Math.random() * 3000);
    };

    const move = (event: PointerEvent) => {
      const velocityX = event.clientX - previous.x;
      const velocityY = event.clientY - previous.y;
      moveX(event.clientX);
      moveY(event.clientY);
      if (!reducedMotion) {
        pupilX(Math.max(-3, Math.min(3, velocityX * 0.18)));
        pupilY(Math.max(-2, Math.min(2, velocityY * 0.18)));
      }
      previous = { x: event.clientX, y: event.clientY };
      lastMove = performance.now();
      eye.classList.add("is-visible");
      scheduleBlink();
    };

    const updateState = (event: PointerEvent) => {
      const target = event.target as Element | null;
      eye.classList.toggle("is-link", Boolean(target?.closest(INTERACTIVE)));
      eye.classList.toggle(
        "is-focused",
        Boolean(target?.closest(".work-tile__media, .curtain-footer:not(.is-revealed)")),
      );
    };

    const click = () => blink(0.12);
    const hide = () => eye.classList.remove("is-visible");

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", updateState, { passive: true });
    document.addEventListener("pointerdown", click);
    document.documentElement.addEventListener("mouseleave", hide);
    scheduleBlink();

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", updateState);
      document.removeEventListener("pointerdown", click);
      document.documentElement.removeEventListener("mouseleave", hide);
      clearTimeout(idleTimer);
      gsap.killTweensOf([eye, pupil]);
    };
  }, []);

  return (
    <div ref={eyeRef} className="eye-cursor" aria-hidden="true">
      <span ref={pupilRef} className="eye-cursor__pupil" />
    </div>
  );
}
