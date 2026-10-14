"use client";

import Image from "next/image";
import { useRef } from "react";
import { PROCESS, type ProcessStep } from "@/lib/site";
import type { PicRef } from "@/lib/work";

// Deterministic waveform so server and client render the same bars.
const BARS = Array.from({ length: 56 }, (_, i) => Math.round(18 + 72 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21 + 1))));
const PLAYHEAD = 58;

const SHOT_TYPES = ["Wide", "Mid", "Close"];
const CAPTIONS = [
  ["EN", "Hello, world."],
  ["HI", "नमस्ते दुनिया"],
  ["ES", "Hola, mundo."],
];
const RATIOS = ["9:16", "1:1", "16:9"];

function Thumb({ pic, sizes }: { pic: PicRef | undefined; sizes: string }) {
  if (!pic) return null;
  if (pic.kind === "poster") {
    return <Image src={pic.src} alt="" width={600} height={800} sizes={sizes} loading="lazy" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={pic.thumb} alt="" loading="lazy" />;
}

function Visual({ step, pics }: { step: ProcessStep; pics: (PicRef | null)[] }) {
  const sizes = "(max-width: 900px) 80vw, 400px";
  switch (step.visual) {
    case "mood":
      return (
        <div className="mood">
          {pics.map((p, i) => (
            <Thumb key={i} pic={p ?? undefined} sizes="200px" />
          ))}
        </div>
      );
    case "story":
      return (
        <div className="story">
          {pics.map((p, i) => (
            <figure key={i}>
              <div className="f">
                <Thumb pic={p ?? undefined} sizes="140px" />
              </div>
              <figcaption>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{SHOT_TYPES[i]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      );
    case "wave":
      return (
        <div className="wave" aria-hidden="true">
          <em>TRACK 01 · MIX</em>
          {BARS.map((h, i) => (
            <span
              key={i}
              style={{
                height: `${h}%`,
                opacity: (i / BARS.length) * 100 < PLAYHEAD ? 0.95 : 0.35,
                animationDelay: `${(i % 9) * 0.12}s`,
              }}
            />
          ))}
          <i />
          <b>00:01:12</b>
        </div>
      );
    case "dub":
      return (
        <div className="dubv">
          <Thumb pic={pics[0] ?? undefined} sizes={sizes} />
          <div className="ratios">
            {RATIOS.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
          <div className="caps">
            {CAPTIONS.map(([code, line]) => (
              <p key={code}>
                <b>{code}</b>
                {line}
              </p>
            ))}
          </div>
        </div>
      );
    default:
      return <Thumb pic={pics[0] ?? undefined} sizes={sizes} />;
  }
}

export function Process({ pics }: { pics: (PicRef | null)[][] }) {
  const film = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = film.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section className="proc pad on-dark" id="process">
      <span id="how-it-works" className="anchor" aria-hidden="true" />
      <div className="proc__head">
        <div>
          <span className="slate">How we work</span>
          <h2 className="display h2 rv">
            From brief to
            <br />
            final cut
          </h2>
        </div>
        <div className="proc__ctl">
          <button type="button" aria-label="Previous step" onClick={() => scroll(-1)}>
            ←
          </button>
          <button type="button" aria-label="Next step" onClick={() => scroll(1)}>
            →
          </button>
        </div>
      </div>
      <div className="film" ref={film}>
        {PROCESS.map((step, i) => (
          <article className="shot" key={step.title}>
            <div className="shot__top mono">
              <span>Shot {String(i + 1).padStart(2, "0")}</span>
              <span>00:0{i}:00</span>
            </div>
            <div className="shot__img">
              <Visual step={step} pics={pics[i] ?? []} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <span className="tag mono">{step.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
