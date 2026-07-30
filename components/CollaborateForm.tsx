"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const CAL_BOOKING_URL = "https://cal.com/operacreatives";
// Flattened film tape and implemented transparent reel cutouts
const LONG_PRESS_MS = 1800; // 1.8 seconds long-press to trigger action scene

export function CollaborateForm() {
  const [isHoveringBoard, setIsHoveringBoard] = useState(false);
  const [isActionTriggered, setIsActionTriggered] = useState(false);
  const [isFlapping, setIsFlapping] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isActionTriggered) return;

    setIsActionTriggered(true);
    setIsFlapping(true); // Close the clapperboard

    // Open clapperboard back up slightly after the flap
    setTimeout(() => {
      setIsFlapping(false);
    }, 400);

    // After 2 seconds of dancing, redirect
    setTimeout(() => {
      window.open(CAL_BOOKING_URL, "_blank");
      // Reset state shortly after opening new tab
      setTimeout(() => {
        setIsActionTriggered(false);
      }, 1200);
    }, 2000);
  };

  const mascotState = isActionTriggered
    ? "action"
    : isHoveringBoard
    ? "hover"
    : "resting";

  const mascotImgSrc =
    mascotState === "happy" || mascotState === "action"
      ? "/mascots/peekaboo_mascot_happy.webp"
      : "/mascots/peekaboo_mascot.webp";

  const isArmOpen = !(isFlapping || isActionTriggered);

  return (
    <section id="collaborate" className="collaborate-section">
      <div className="collaborate-header">
        <h2 className="collaborate-heading">
          <span className="text-white">LET&apos;S </span>
          <span className="text-black">COLLABORATE</span>
        </h2>
        <div className="collaborate-divider-row">
          <span className="divider-line" />
          <p className="collaborate-subheading">
            BECAUSE EVERY BRAND DESERVES A STANDING OVATION.
          </p>
          <span className="divider-line" />
        </div>
      </div>

      {/* Left Mascot (Screen Edge Anchor) */}
      <div className={`mascot-container mascot-left ${mascotState}`}>
        <div className="mascot-img-wrapper">
          <Image
            src={mascotImgSrc}
            alt="Mascot"
            width={400}
            height={400}
            className="mascot-img"
            priority
          />
        </div>
      </div>

      {/* Right Mascot (Screen Edge Anchor) */}
      <div className={`mascot-container mascot-right ${mascotState}`}>
        <div className="mascot-img-wrapper">
          <Image
            src={mascotImgSrc}
            alt="Mascot"
            width={400}
            height={400}
            className="mascot-img"
            priority
          />
        </div>
      </div>

      <div className="collaborate-stage">
        {/* Central Clapperboard Assembly */}
        <div
          className="clapperboard-wrapper"
          onMouseEnter={() => setIsHoveringBoard(true)}
          onMouseLeave={() => {
            setIsHoveringBoard(false);
          }}
        >
          {/* True SVG Clapperboard matching reference image 1:1 */}
          <div className={`clapperboard-svg-container ${isArmOpen ? "clapperboard-is-open" : "clapperboard-is-closed"}`}>
            <svg viewBox="0 0 600 500" className="clapper-vector" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="stripe-yw-flat" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
                  <rect width="23" height="46" fill="#FFE86E" />
                  <rect x="23" width="23" height="46" fill="#141414" />
                </pattern>

                <pattern id="stripe-bw-flat" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
                  <rect width="17" height="34" fill="#F0F0F2" />
                  <rect x="17" width="17" height="34" fill="#141414" />
                </pattern>

                <filter id="clapper-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000000" floodOpacity="0.45" />
                </filter>

                {/* 5-Spoke Reel Cutouts */}
                <g id="reel-cutouts">
                  <path d="M -12,-24 L 12,-24 L 38,-76 L -38,-76 Z" fill="#0A0A0B" />
                  <path d="M -12,-24 L 12,-24 L 38,-76 L -38,-76 Z" fill="#0A0A0B" transform="rotate(72)" />
                  <path d="M -12,-24 L 12,-24 L 38,-76 L -38,-76 Z" fill="#0A0A0B" transform="rotate(144)" />
                  <path d="M -12,-24 L 12,-24 L 38,-76 L -38,-76 Z" fill="#0A0A0B" transform="rotate(216)" />
                  <path d="M -12,-24 L 12,-24 L 38,-76 L -38,-76 Z" fill="#0A0A0B" transform="rotate(288)" />
                </g>
              </defs>

              {/* 1. High Sweeping 3D Film Tape (Rendered BEHIND the board) */}
              <g filter="url(#clapper-shadow)">
                <path d="M 120 370 C 180 210, 270 240, 330 360 C 370 440, 470 470, 520 400" fill="none" stroke="#0B0B0C" strokeWidth="40" strokeLinecap="round" />
                <path d="M 120 370 C 180 210, 270 240, 330 360 C 370 440, 470 470, 520 400" fill="none" stroke="#28282B" strokeWidth="32" strokeLinecap="round" />
              </g>

              {/* 2. Left Film Reel (Rendered BEHIND the board) */}
              <g className="clapper-reel" transform="translate(100, 395)">
                <circle cx="0" cy="0" r="95" fill="#1C1C1E" stroke="#000000" strokeWidth="8" filter="url(#clapper-shadow)" />
                <use href="#reel-cutouts" />
                <circle cx="0" cy="0" r="18" fill="#FFD700" stroke="#000000" strokeWidth="4" />
              </g>

              {/* 3. Right Film Reel (Rendered BEHIND the board) */}
              <g className="clapper-reel" transform="translate(520, 415)">
                <circle cx="0" cy="0" r="72" fill="#1C1C1E" stroke="#000000" strokeWidth="8" filter="url(#clapper-shadow)" />
                <g transform="scale(0.76)">
                  <use href="#reel-cutouts" />
                </g>
                <circle cx="0" cy="0" r="14" fill="#00E5FF" stroke="#000000" strokeWidth="4" />
              </g>

              {/* 4. Main Slate Body with Drop Shadow */}
              <g filter="url(#clapper-shadow)">
                {/* Slate Base Board */}
                <rect x="100" y="190" width="400" height="230" rx="10" fill="#1A1A1C" stroke="#000000" strokeWidth="8" />

                {/* Fine Inner Border */}
                <rect x="110" y="240" width="380" height="170" rx="6" fill="none" stroke="#2C2C2E" strokeWidth="1.5" />

                {/* Fixed Header Bar */}
                <path d="M 100 206 A 10 10 0 0 1 110 190 L 490 190 A 10 10 0 0 1 500 206 L 500 226 L 100 226 Z" fill="url(#stripe-bw-flat)" stroke="#000000" strokeWidth="8" />
                <line x1="100" y1="226" x2="500" y2="226" stroke="#000000" strokeWidth="8" />

                {/* Red Recording Dot */}
                <circle cx="476" cy="208" r="4.5" fill="#FF3B30" />

                {/* Cyan Diamond Accent Badge */}
                <polygon points="494,202 501,208 494,214 487,208" fill="#00E5FF" />

                {/* Slate Lines & Labels */}
                <g opacity="0.65">
                  <text x="135" y="272" fill="#88888A" fontFamily="'Space Mono', monospace" fontSize="13" fontWeight="bold" letterSpacing="4">PROD. NO.</text>
                  <line x1="250" y1="267" x2="465" y2="267" stroke="#3A3A3C" strokeWidth="1.5" />

                  <text x="135" y="322" fill="#88888A" fontFamily="'Space Mono', monospace" fontSize="12" fontWeight="bold" letterSpacing="4">SCENE</text>
                  <text x="235" y="322" fill="#88888A" fontFamily="'Space Mono', monospace" fontSize="12" fontWeight="bold" letterSpacing="4">TAKE</text>
                  <text x="365" y="322" fill="#88888A" fontFamily="'Space Mono', monospace" fontSize="12" fontWeight="bold" letterSpacing="4">SOUND</text>
                </g>
              </g>

              {/* 5. Hinged Top Arm */}
              <g className="clapper-top-arm">
                <rect x="100" y="140" width="400" height="38" rx="6" fill="url(#stripe-yw-flat)" stroke="#000000" strokeWidth="8" />

                {/* Hinge Joint on Left */}
                <circle cx="120" cy="159" r="18" fill="#1F1F21" stroke="#000000" strokeWidth="6" />
                <circle cx="120" cy="159" r="6" fill="#0B0B0C" />

                {/* Yellow Sparkle Detail */}
                <path d="M 100 144 Q 107 144 107 137 Q 107 144 114 144 Q 107 144 107 151 Q 107 144 100 144 Z" fill="#FFD700" />
              </g>
            </svg>

            {/* Overlaid Button HTML (for accurate hit area & CSS animations) */}
            <div className="clapperboard-btn-overlay">
              <button
                type="button"
                className={`clapper-cta-btn ${isActionTriggered ? "is-action" : ""}`}
                onClick={handleClick}
                aria-label="Book a Scene"
              >
                <span className="clapper-cta-btn__text">
                  {isActionTriggered ? "Proceeding" : "BOOK A SCENE ↗"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Yellow Social Media & Contact Links */}
      <div className="collaborate-socials" aria-label="Social media & contact channels">
        <a
          href="https://linkedin.com/company/operacreatives"
          target="_blank"
          rel="noopener noreferrer"
          className="collaborate-social-btn"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="#FFE86E">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </a>

        <a
          href="https://x.com/operacreatives_"
          target="_blank"
          rel="noopener noreferrer"
          className="collaborate-social-btn"
          aria-label="Twitter / X"
          title="Twitter / X"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFE86E">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a
          href="https://www.instagram.com/operacreatives_"
          target="_blank"
          rel="noopener noreferrer"
          className="collaborate-social-btn"
          aria-label="Instagram"
          title="Instagram"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFE86E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        <a
          href="mailto:hi@operacreatives.com"
          className="collaborate-social-btn"
          aria-label="Email Us"
          title="Email Us (hi@operacreatives.com)"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFE86E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="3" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
