"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeItem {
  id: string;
  type: "viewfinder" | "ugc" | "square";
  videoUrl: string;
  title: string;
  subtitle?: string;
  creator?: string;
}

const marqueeItems1: MarqueeItem[] = [
  { id: "1", type: "ugc", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-cars-42232-large.mp4", title: "UGC Motion", creator: "@sanchit_dev" },
  { id: "2", type: "viewfinder", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41851-large.mp4", title: "Laser Study", subtitle: "4K 60FPS" },
  { id: "3", type: "square", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mysterious-neon-light-tunnel-background-loop-41846-large.mp4", title: "Neon Light Tunnel", creator: "SCENE 02 / TAKE 01" },
  { id: "4", type: "viewfinder", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-circuit-board-loop-41847-large.mp4", title: "Tech Circuit", subtitle: "30FPS" },
];

const marqueeItems2: MarqueeItem[] = [
  { id: "5", type: "viewfinder", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-rotating-gears-inside-a-mechanism-loop-41849-large.mp4", title: "Mechanical Loop", subtitle: "24FPS" },
  { id: "6", type: "ugc", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-cars-42232-large.mp4", title: "Reel Concept", creator: "@anya_design" },
  { id: "7", type: "square", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41851-large.mp4", title: "Abstract Wave", creator: "SCENE 04 / TAKE 02" },
  { id: "8", type: "ugc", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mysterious-neon-light-tunnel-background-loop-41846-large.mp4", title: "UGC Concept 02", creator: "@noah_style" },
];

function WorkCard({ item }: { item: MarqueeItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    // Generate a ticking film timecode
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 24;
      const sec = Math.floor(Date.now() / 1000) % 60;
      const min = Math.floor(Date.now() / 60000) % 60;
      const hr = Math.floor(Date.now() / 3600000) % 24;
      
      const format = (val: number) => String(val).padStart(2, "0");
      setTimecode(`${format(hr)}:${format(min)}:${format(sec)}:${format(frame)}`);
    }, 41.6); // 24 FPS approximation

    return () => clearInterval(interval);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  switch (item.type) {
    case "ugc":
      return (
        <div className="marquee-card marquee-card--video-ugc" onClick={togglePlayback}>
          <div className="marquee-card__media">
            <video
              ref={videoRef}
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="marquee-card__video"
            />
            <div className="marquee-card__ugc-ui">
              <div className="marquee-card__ugc-top">
                <span className="marquee-card__badge">RAW FEED</span>
              </div>
              <div className="marquee-card__ugc-bottom">
                <p className="marquee-card__user">{item.creator}</p>
                <p className="marquee-card__caption">{item.title}</p>
                <div className="marquee-card__playbar">
                  <div className="marquee-card__playbar-progress" />
                </div>
              </div>
              <div className="marquee-card__ugc-actions">
                <div className="marquee-card__action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mini-icon">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>9:16</span>
                </div>
                <div className="marquee-card__action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mini-icon">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>Mute</span>
                </div>
              </div>
              {!isPlaying && <div className="marquee-card__play-indicator">⏸</div>}
            </div>
          </div>
        </div>
      );

    case "viewfinder":
      return (
        <div className="marquee-card marquee-card--video-viewfinder" onClick={togglePlayback}>
          <div className="marquee-card__media">
            <video
              ref={videoRef}
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="marquee-card__video"
            />
            {/* Viewfinder Cam Overlay */}
            <div className="viewfinder-overlay">
              <div className="viewfinder-top">
                <div className="viewfinder-rec">
                  <span className="rec-dot" />
                  <span>REC</span>
                </div>
                <div className="viewfinder-mode">{item.subtitle}</div>
              </div>
              
              <svg className="viewfinder-focus" viewBox="0 0 100 100">
                <path d="M 25 40 L 25 25 L 40 25" fill="none" stroke="white" strokeWidth="1.5" opacity="0.75" />
                <path d="M 75 40 L 75 25 L 60 25" fill="none" stroke="white" strokeWidth="1.5" opacity="0.75" />
                <path d="M 25 60 L 25 75 L 40 75" fill="none" stroke="white" strokeWidth="1.5" opacity="0.75" />
                <path d="M 75 60 L 75 75 L 60 75" fill="none" stroke="white" strokeWidth="1.5" opacity="0.75" />
                <circle cx="50" cy="50" r="4" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
              </svg>

              <div className="viewfinder-bottom">
                <div className="viewfinder-timecode">{timecode}</div>
                <div className="viewfinder-battery">🔋 100%</div>
              </div>
              {!isPlaying && <div className="marquee-card__play-indicator">⏸</div>}
            </div>
          </div>
        </div>
      );

    case "square":
      return (
        <div className="marquee-card marquee-card--video-square" onClick={togglePlayback}>
          <div className="marquee-card__media">
            <video
              ref={videoRef}
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="marquee-card__video"
            />
            {/* Focus lines and technical overlays */}
            <div className="square-focus-overlay">
              <div className="thirds-grid">
                <div className="grid-line grid-line--h1" />
                <div className="grid-line grid-line--h2" />
                <div className="grid-line grid-line--v1" />
                <div className="grid-line grid-line--v2" />
              </div>
              <div className="square-tech-info">
                <span>ISO 800</span>
                <span>F/2.8</span>
                <span>1/125</span>
              </div>
              <div className="square-title-info">
                <span>{item.creator}</span>
                <span>{item.title}</span>
              </div>
              {!isPlaying && <div className="marquee-card__play-indicator">⏸</div>}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function WorkMarquee() {
  return (
    <section className="marquee-section" data-hero-region>
      <div className="marquee-section__heading">
        <p className="section-kicker">AI Film Production Studio</p>
        <h2>Cinema-grade AI Film & Motion Campaigns.</h2>
        <p className="marquee-section__intro">
          We build cinematic AI commercials, film visuals, motion campaigns, and immersive brand experiences. AI-produced. Cinema-grade. Delivered at startup speed.
        </p>
      </div>

      <div className="marquee-wrapper">
        {/* Row 1 - Right to Left */}
        <div className="marquee-row marquee-row--left">
          <div className="marquee-track">
            {marqueeItems1.map((item) => (
              <WorkCard key={`r1-${item.id}`} item={item} />
            ))}
            {/* Duplicate for infinite loop */}
            {marqueeItems1.map((item) => (
              <WorkCard key={`r1-dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 - Left to Right */}
        <div className="marquee-row marquee-row--right">
          <div className="marquee-track">
            {marqueeItems2.map((item) => (
              <WorkCard key={`r2-${item.id}`} item={item} />
            ))}
            {/* Duplicate for infinite loop */}
            {marqueeItems2.map((item) => (
              <WorkCard key={`r2-dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
