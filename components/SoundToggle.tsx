"use client";

import { useEffect, useRef, useState } from "react";

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="sound-toggle-container">
      <button 
        className={`sound-toggle-btn ${isPlaying ? "is-playing" : ""}`} 
        onClick={toggleSound}
        aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      >
        <span className="sound-bar" />
        <span className="sound-bar" />
        <span className="sound-bar" />
        <span className="sound-label">{isPlaying ? "SOUND ON" : "SOUND OFF"}</span>
      </button>
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/music/preview/mixkit-a-game-of-victory-86.mp3" 
        loop 
        preload="auto" 
      />
    </div>
  );
}
