"use client";

import { useRef } from "react";
import { PROCESS } from "@/lib/v2/site";
import type { PicRef } from "@/lib/v2/work";
import Image from "next/image";

export function Process({ pics }: { pics: PicRef[] }) {
  const film = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = film.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section className="proc pad on-dark" id="process">
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
        {PROCESS.map((step, i) => {
          const pic = pics[i];
          return (
            <article className="shot" key={step.title}>
              <div className="shot__top mono">
                <span>Shot {String(i + 1).padStart(2, "0")}</span>
                <span>00:0{i}:00</span>
              </div>
              <div className="shot__img">
                {pic?.kind === "poster" && (
                  <Image src={pic.src} alt="" width={600} height={800} sizes="(max-width: 900px) 80vw, 400px" loading="lazy" />
                )}
                {pic?.kind === "video" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pic.thumb} alt="" loading="lazy" />
                )}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="tag mono">{step.tag}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
