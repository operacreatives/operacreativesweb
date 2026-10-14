"use client";

import posthog from "posthog-js";
import { useState } from "react";
import { SHOWREEL } from "@/lib/site";
import { buildVimeoEmbedUrl } from "@/lib/vimeo";

// A big poster with a play button. The Vimeo player only loads after a tap,
// so the page stays fast, and then plays with sound.
export function ShowreelPlayer({ id, poster }: { id: string; poster?: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return <iframe src={buildVimeoEmbedUrl(id, "player")} title="Opera Creatives showreel" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  }

  return (
    <button
      type="button"
      className="reel__poster"
      aria-label={SHOWREEL.play}
      onClick={() => {
        try {
          posthog.capture("showreel_play", { source: "section" });
        } catch {
          // analytics must never block playback
        }
        setPlaying(true);
      }}
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" width={1920} height={1080} loading="lazy" decoding="async" />
      )}
      <span className="reel__play" aria-hidden="true">
        <i>▶</i>
        <b>{SHOWREEL.play}</b>
      </span>
    </button>
  );
}
