"use client";

import { useEffect, useRef, useState } from "react";
import { buildVimeoEmbedUrl } from "@/lib/vimeo";

// The player is added to the page a little before it scrolls into view, so it
// is already loaded when people arrive. It plays (muted) as soon as it is on
// screen and pauses when it leaves. The sound button turns the audio on.
export function ShowreelPlayer({ id }: { id: string }) {
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const player = useRef<import("@vimeo/player").default | null>(null);
  const visible = useRef(false);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);

  const src = (() => {
    const url = new URL(buildVimeoEmbedUrl(id, "player"));
    url.searchParams.set("autoplay", "0");
    url.searchParams.set("muted", "1");
    url.searchParams.set("loop", "1");
    return url.toString();
  })();

  // 1) load the player when it is within a screenful of view
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 2) once loaded, play while on screen and pause when it is not
  useEffect(() => {
    const el = box.current;
    const iframe = frame.current;
    if (!near || !el || !iframe) return;
    let cancelled = false;
    let io: IntersectionObserver | undefined;

    import("@vimeo/player").then(({ default: Player }) => {
      if (cancelled) return;
      const p = new Player(iframe);
      player.current = p;
      p.ready().then(() => {
        if (cancelled) return;
        setReady(true);
        if (visible.current) p.play().catch(() => {});
      });
      io = new IntersectionObserver(
        ([e]) => {
          visible.current = e.isIntersecting;
          if (e.isIntersecting) p.play().catch(() => {});
          else p.pause().catch(() => {});
        },
        { threshold: 0.4 },
      );
      io.observe(el);
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      player.current?.destroy().catch(() => {});
      player.current = null;
    };
  }, [near]);

  const toggleSound = () => {
    const p = player.current;
    if (!p) return;
    const next = !muted;
    setMuted(next);
    p.setMuted(next).catch(() => {});
    if (!next) {
      p.setVolume(1).catch(() => {});
      p.play().catch(() => {});
    }
  };

  return (
    <div ref={box} className="reel__box">
      {!ready && (
        <div className="reel__loading" aria-hidden="true">
          <i>▶</i>
        </div>
      )}
      {near && <iframe ref={frame} className={ready ? "on" : ""} src={src} title="Opera Creatives showreel" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />}
      {ready && (
        <button type="button" className="reel__sound" onClick={toggleSound} aria-label={muted ? "Turn the showreel sound on" : "Turn the showreel sound off"}>
          {muted ? "Sound on" : "Sound off"}
        </button>
      )}
    </div>
  );
}
