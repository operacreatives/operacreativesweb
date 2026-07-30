"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type LiquidShape = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topFocus: number;
  rightFocus: number;
  bottomFocus: number;
  leftFocus: number;
};

type PixiWorkImageProps = {
  src: string;
  alt: string;
  focalPosition: string;
  onError: () => void;
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function edgeOffset(position: number, focus: number, amplitude: number) {
  const distance = position - focus;
  return Math.exp(-(distance * distance) / 0.022) * amplitude;
}

function traceLiquidFrame(
  graphics: import("pixi.js").Graphics,
  width: number,
  height: number,
  shape: LiquidShape,
) {
  const steps = 24;
  graphics.moveTo(0, edgeOffset(0, shape.leftFocus, shape.left));
  for (let step = 0; step <= steps; step += 1) {
    const progress = step / steps;
    graphics.lineTo(width * progress, edgeOffset(progress, shape.topFocus, shape.top));
  }
  for (let step = 0; step <= steps; step += 1) {
    const progress = step / steps;
    graphics.lineTo(width - edgeOffset(progress, shape.rightFocus, shape.right), height * progress);
  }
  for (let step = steps; step >= 0; step -= 1) {
    const progress = step / steps;
    graphics.lineTo(width * progress, height - edgeOffset(progress, shape.bottomFocus, shape.bottom));
  }
  for (let step = steps; step >= 0; step -= 1) {
    const progress = step / steps;
    graphics.lineTo(edgeOffset(progress, shape.leftFocus, shape.left), height * progress);
  }
  graphics.closePath();
}

export function PixiWorkImage({ src, alt, focalPosition, onError }: PixiWorkImageProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<import("pixi.js").Application | null>(null);
  const maskRef = useRef<import("pixi.js").Graphics | null>(null);
  const outlineRef = useRef<import("pixi.js").Graphics | null>(null);
  const drawRef = useRef<(() => void) | null>(null);
  const lastPointer = useRef({ x: 0, y: 0, time: 0 });
  const shapeRef = useRef<LiquidShape>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    topFocus: 0.5,
    rightFocus: 0.5,
    bottomFocus: 0.5,
    leftFocus: 0.5,
  });
  const [ready, setReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseInRef = useRef(false);

  useEffect(() => {
    if (!isHovered) {
      // If not hovered, cleanup and destroy PixiJS instance
      gsap.killTweensOf(shapeRef.current);
      drawRef.current = null;
      maskRef.current = null;
      outlineRef.current = null;
      if (appRef.current) {
        appRef.current.destroy({ removeView: true }, true);
        appRef.current = null;
      }
      setReady(false);
      return;
    }
    const host = hostRef.current;
    if (!host) return;
    const staticOnly =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !supportsWebGL();
    if (staticOnly) return;
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;
    const init = async () => {
      if (appRef.current || cancelled) return;
      const {
        Application: PixiApplication,
        Assets,
        Graphics: PixiGraphics,
        Sprite: PixiSprite,
      } = await import("pixi.js");
      if (cancelled) return;
      const app = new PixiApplication();
      await app.init({
        backgroundAlpha: 0,
        antialias: true,
        preference: "webgl",
        resolution: Math.min(devicePixelRatio, 1.5),
        autoDensity: true,
      });
      if (cancelled) {
        app.destroy({ removeView: true }, true);
        return;
      }
      let texture;
      try {
        texture = await Assets.load(src);
      } catch {
        onError();
        app.destroy({ removeView: true }, true);
        return;
      }
      if (cancelled) {
        app.destroy({ removeView: true }, true);
        return;
      }
      const image = new PixiSprite(texture);
      const mask = new PixiGraphics();
      const outline = new PixiGraphics();
      image.mask = mask;
      app.stage.addChild(image, mask, outline);
      host.appendChild(app.canvas);
      appRef.current = app;
      maskRef.current = mask;
      outlineRef.current = outline;
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        app.renderer.resize(width, height);
        const scale = Math.max(width / texture.width, height / texture.height);
        image.scale.set(scale);
        image.x = (width - texture.width * scale) / 2;
        image.y = (height - texture.height * scale) / 2;
        drawRef.current = () => {
          mask.clear();
          traceLiquidFrame(mask, width, height, shapeRef.current);
          mask.fill(0xffffff);
          outline.clear();
          traceLiquidFrame(outline, width, height, shapeRef.current);
          // no outline stroke — border removed per design
        };
        drawRef.current();
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();
      setReady(true);
      // Trigger enter animation when application is initialized
      gsap.to(shapeRef.current, {
        top: 8,
        right: 13,
        bottom: 9,
        left: 7,
        duration: 0.58,
        ease: "elastic.out(1, 0.42)",
        overwrite: true,
        onUpdate: () => drawRef.current?.(),
      });
    };
    void init();
    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      resizeObserver = undefined;
      gsap.killTweensOf(shapeRef.current);
      drawRef.current = null;
      maskRef.current = null;
      outlineRef.current = null;
      if (appRef.current) {
        appRef.current.destroy({ removeView: true }, true);
        appRef.current = null;
      }
      setReady(false);
    };
  }, [isHovered, src, onError]);

  const enter = () => {
    mouseInRef.current = true;
    if (!isHovered) {
      setIsHovered(true);
    } else {
      gsap.to(shapeRef.current, {
        top: 8,
        right: 13,
        bottom: 9,
        left: 7,
        duration: 0.58,
        ease: "elastic.out(1, 0.42)",
        overwrite: true,
        onUpdate: () => drawRef.current?.(),
      });
    }
  };

  const deformEdge = (event: React.PointerEvent<HTMLDivElement>) => {
    const host = hostRef.current;
    if (!host || !appRef.current) return;
    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const distances: Record<string, number> = {
      top: y,
      right: rect.width - x,
      bottom: rect.height - y,
      left: x,
    };
    const edge = Object.keys(distances).reduce(
      (closest, candidate) => (distances[candidate] < distances[closest] ? candidate : closest),
      "top",
    );
    const now = performance.now();
    const travelled = Math.hypot(
      event.clientX - lastPointer.current.x,
      event.clientY - lastPointer.current.y,
    );
    const elapsed = Math.max(8, now - lastPointer.current.time);
    const amplitude = Math.min(Math.min(rect.width, rect.height) * 0.13, 12 + (travelled / elapsed) * 34);
    const focus = edge === "top" || edge === "bottom" ? x / rect.width : y / rect.height;
    const focusKey = `${edge}Focus` as keyof LiquidShape;
    shapeRef.current[focusKey] = Math.max(0.08, Math.min(0.92, focus));
    host.dataset.distortion = amplitude.toFixed(1);
    gsap.to(shapeRef.current, {
      [edge]: amplitude,
      duration: 0.16,
      ease: "power3.out",
      overwrite: "auto",
      onUpdate: () => drawRef.current?.(),
    });
    lastPointer.current = { x: event.clientX, y: event.clientY, time: now };
  };

  const settle = () => {
    mouseInRef.current = false;
    gsap.to(shapeRef.current, {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      duration: 0.78,
      ease: "elastic.out(1, 0.38)",
      overwrite: true,
      onUpdate: () => drawRef.current?.(),
      onComplete: () => {
        if (!mouseInRef.current) {
          setIsHovered(false);
        }
        if (hostRef.current) hostRef.current.dataset.distortion = "0";
      },
    });
    lastPointer.current = { x: 0, y: 0, time: 0 };
  };

  return (
    <div
      ref={hostRef}
      className={`work-tile__media${ready ? " is-webgl" : ""}`}
      data-renderer={ready ? "webgl" : "static"}
      data-effect="perimeter-mask"
      data-distortion="0"
      onPointerEnter={enter}
      onPointerMove={deformEdge}
      onPointerLeave={settle}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw"
        style={{ objectPosition: focalPosition }}
        onError={onError}
      />
    </div>
  );
}
