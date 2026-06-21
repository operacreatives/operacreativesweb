"use client";

import { useEffect, useRef, useState } from "react";
import { useCinema } from "@/context/CinemaContext";

export function CinemaManager() {
  const { activeVideo, closeVideo } = useCinema();
  const [isMobile, setIsMobile] = useState(true);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);



  // Handle mobile detection
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0)
      );
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);



  // Monitor HUD ticking effect
  useEffect(() => {
    if (!activeVideo) return;
    let frames = 0;
    const interval = setInterval(() => {
      frames++;
      const f = String(frames % 24).padStart(2, "0");
      const s = String(Math.floor(frames / 24) % 60).padStart(2, "0");
      const m = String(Math.floor(frames / (24 * 60)) % 60).padStart(2, "0");
      const h = String(Math.floor(frames / (24 * 60 * 60)) % 24).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 1000 / 24);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo, closeVideo]);

  return (
    <>


      {/* 3. Director's Monitor Theater Viewport */}
      {activeVideo && (
        <div className="director-monitor-overlay" onClick={closeVideo}>
          <div className="director-monitor-container" onClick={(e) => e.stopPropagation()}>
            {/* Camera Crop Guidelines (Letterboxing) */}
            <div className="monitor-crop monitor-crop--top" />
            <div className="monitor-crop monitor-crop--bottom" />

            {/* Interactive Screen */}
            <div className="monitor-screen">
              <video
                ref={videoRef}
                src={activeVideo.url}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="monitor-video"
              />

              {/* Aspect Grid lines overlay */}
              <div className="monitor-gridlines" />

              {/* Monitor HUD */}
              <div className="monitor-hud">
                {/* HUD Top Bar */}
                <div className="hud-row hud-row--top">
                  <div className="hud-item rec-indicator">
                    <span className="rec-dot" />
                    <span>REC</span>
                  </div>
                  <div className="hud-item tc-code">{timecode}</div>
                  <div className="hud-item">8K RAW</div>
                  <div className="hud-item battery-status">
                    <span>94%</span>
                    <div className="battery-icon">
                      <div className="battery-fill" />
                    </div>
                  </div>
                </div>

                {/* HUD Corner Brackets */}
                <div className="hud-bracket bracket--tl" />
                <div className="hud-bracket bracket--tr" />
                <div className="hud-bracket bracket--bl" />
                <div className="hud-bracket bracket--br" />

                {/* Crosshair Center */}
                <div className="hud-center-cross" />

                {/* Left/Right Decibel Audio Meters */}
                <div className="hud-audio-meter hud-audio-meter--left">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={`l-${i}`}
                      className={`audio-segment segment-${i}`}
                      style={{ animationDelay: `${i * 0.04}s` }}
                    />
                  ))}
                </div>
                <div className="hud-audio-meter hud-audio-meter--right">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={`r-${i}`}
                      className={`audio-segment segment-${i}`}
                      style={{ animationDelay: `${i * 0.06}s` }}
                    />
                  ))}
                </div>

                {/* HUD Bottom Bar */}
                <div className="hud-row hud-row--bottom">
                  <div className="hud-group">
                    <div className="hud-item">F: 85mm</div>
                    <div className="hud-item">T: 2.8</div>
                    <div className="hud-item">ISO 800</div>
                  </div>
                  <div className="hud-group">
                    <div className="hud-item">FPS 24.00</div>
                    <div className="hud-item">SHUTTER 180°</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor Settings & Footer Bar */}
            <div className="monitor-controls">
              <div className="monitor-meta">
                <span className="meta-client">{activeVideo.client}</span>
                <span className="meta-divider">//</span>
                <span className="meta-title">{activeVideo.title}</span>
              </div>

              <div className="control-buttons">
                <button
                  type="button"
                  className="control-btn control-btn--mute"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? "UNMUTE AUDIO" : "MUTE AUDIO"}
                </button>
                <button
                  type="button"
                  className="control-btn control-btn--close"
                  onClick={closeVideo}
                >
                  DISMISS MONITOR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
