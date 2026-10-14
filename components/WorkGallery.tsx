"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { posterAlts } from "@/data/posters";
import { WORK_NOTES } from "@/lib/site";
import { buildVimeoEmbedUrl } from "@/lib/vimeo";
import type { VideoItem } from "@/lib/work";

type TabKey = "films" | "statics" | "fifa";
type Viewing = { kind: "video"; id: string } | { kind: "image"; src: string; alt: string } | null;

const pad = (n: number) => String(n + 1).padStart(2, "0");

export function WorkGallery({ films, fifa, posters }: { films: VideoItem[]; fifa: VideoItem[]; posters: string[] }) {
  const [tab, setTab] = useState<TabKey>("films");
  const [viewing, setViewing] = useState<Viewing>(null);
  // pendingId follows the mouse; hoverId catches up after a short delay so a
  // quick pass over a tile doesn't start a video.
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "films", label: "Films", count: films.length },
    { key: "statics", label: "Static Creatives", count: posters.length },
    { key: "fifa", label: "FIFA World Cup Anime Series", count: fifa.length },
  ];

  const close = useCallback(() => setViewing(null), []);

  useEffect(() => {
    if (!viewing) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewing, close]);

  useEffect(() => {
    if (!pendingId) return;
    const timer = setTimeout(() => setHoverId(pendingId), 350);
    return () => clearTimeout(timer);
  }, [pendingId]);

  const startHover = (id: string) => {
    if (window.matchMedia("(hover: hover)").matches) setPendingId(id);
  };
  const stopHover = () => setPendingId(null);

  const videoTiles = (items: VideoItem[], label: string) =>
    items.map((v, i) => (
      <button
        key={v.id}
        type="button"
        className={`tile ${v.tall ? "tall" : ""}`}
        aria-label={`Play film ${pad(i)}`}
        onClick={() => setViewing({ kind: "video", id: v.id })}
        onMouseEnter={() => startHover(v.id)}
        onMouseLeave={stopHover}
        onFocus={() => startHover(v.id)}
        onBlur={stopHover}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.thumb} alt={`${label} ${pad(i)}`} width={1280} height={720} loading="lazy" decoding="async" />
        {hoverId === v.id && pendingId === v.id && <iframe src={buildVimeoEmbedUrl(v.id, "preview")} title="" allow="autoplay" tabIndex={-1} />}
        <span className="no">{pad(i)}</span>
        <span className="play" aria-hidden="true">
          ▶
        </span>
      </button>
    ));

  return (
    <section className="pad on-light" id="work">
      <div className="work__head">
        <div>
          <span className="slate">Our work</span>
          <h2 className="display h2 rv">Selected work</h2>
        </div>
        <div className="tabs" role="tablist" aria-label="Work categories">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`work-tab-${t.key}`}
              aria-selected={tab === t.key}
              aria-controls="work-panel"
              className="tab"
              onClick={() => setTab(t.key)}
            >
              {t.label} <small>{t.count}</small>
            </button>
          ))}
        </div>
      </div>
      <p className="work__note">{WORK_NOTES[tab]}</p>

      <div role="tabpanel" id="work-panel" aria-labelledby={`work-tab-${tab}`} className={`wgrid ${tab === "statics" ? "statics" : ""}`}>
        {tab === "films" && videoTiles(films, "Opera Creatives film")}
        {tab === "fifa" && videoTiles(fifa, "FIFA World Cup anime series film")}
        {tab === "statics" &&
          posters.map((file, i) => (
            <button
              key={file}
              type="button"
              className="tile portrait"
              aria-label={`View creative ${pad(i)}`}
              onClick={() => setViewing({ kind: "image", src: `/assets/images/${file}`, alt: posterAlts[file] ?? "" })}
            >
              <Image src={`/assets/images/${file}`} alt={posterAlts[file] ?? ""} fill sizes="(max-width: 620px) 50vw, 240px" loading="lazy" />
              <span className="no">{pad(i)}</span>
              <span className="play" aria-hidden="true">
                +
              </span>
            </button>
          ))}
      </div>

      {viewing && (
        <div className="ov" role="dialog" aria-modal="true" aria-label="Viewer" onMouseDown={close}>
          <button type="button" className="lbx" aria-label="Close" onClick={close}>
            ×
          </button>
          {viewing.kind === "video" ? (
            <div className="lb" onMouseDown={(e) => e.stopPropagation()}>
              <iframe
                src={buildVimeoEmbedUrl(viewing.id, "player")}
                title="Opera Creatives film"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="lb img" onMouseDown={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={viewing.src} alt={viewing.alt} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
