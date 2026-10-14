"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PicRef } from "@/lib/work";

export interface ServiceRow {
  name: string;
  text: string;
  pic: PicRef | null;
}

// On devices with a mouse, a dark bar glides from one service to the next as
// you move down the list while the other rows fade back. Touch devices just
// see the plain list.
export function ServicesList({ rows }: { rows: ServiceRow[] }) {
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const activate = (i: number, row: HTMLElement) => {
    const el = bar.current;
    if (!el) return;
    if (active === null) {
      // First entry: jump straight to the row instead of gliding in from wherever the bar was.
      el.style.transition = "none";
      el.style.transform = `translate3d(0, ${row.offsetTop}px, 0)`;
      el.style.height = `${row.offsetHeight}px`;
      void el.offsetHeight;
      el.style.transition = "";
    } else {
      el.style.transform = `translate3d(0, ${row.offsetTop}px, 0)`;
      el.style.height = `${row.offsetHeight}px`;
    }
    setActive(i);
  };

  return (
    <div className={`slist ${active !== null ? "on" : ""}`} onMouseLeave={() => setActive(null)}>
      <div className="hl" ref={bar} aria-hidden="true" />
      {rows.map((s, i) => (
        <div
          className="srow rv"
          data-active={active === i ? "true" : undefined}
          key={s.name}
          style={{ "--d": `${(i % 4) * 0.06}s` } as React.CSSProperties}
          onMouseEnter={(e) => activate(i, e.currentTarget)}
        >
          <span className="n mono">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.name}</h3>
          <p>{s.text}</p>
          <div className="pic">
            {s.pic?.kind === "poster" && (
              <Image src={s.pic.src} alt="" width={600} height={800} sizes="160px" loading="lazy" />
            )}
            {s.pic?.kind === "video" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.pic.thumb} alt="" loading="lazy" decoding="async" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
