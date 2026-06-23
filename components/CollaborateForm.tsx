"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getCollaborateMascotState } from "@/lib/collaborate";

function PeekabooMascot({
  side,
  stage,
  mood,
}: {
  side: "left" | "right";
  stage: "hidden" | "peek" | "celebrate";
  mood: "normal" | "happy";
}) {
  const src = mood === "happy" ? "/mascots/peekaboo_mascot_happy.png" : "/mascots/peekaboo_mascot.png";

  return (
    <div
      className={[
        "peekaboo-mascot",
        `peekaboo-mascot--${side}`,
        `peekaboo-mascot--${stage}`,
        stage === "celebrate" ? "peekaboo-mascot--dancing" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="peekaboo-mascot__crop">
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 140px, 220px"
          className="peekaboo-mascot__image"
        />
      </div>
    </div>
  );
}

export function CollaborateForm() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    if (!isCelebrating) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsCelebrating(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [isCelebrating]);

  const mascotState = getCollaborateMascotState({ isHovered, isCelebrating });

  const handleSceneClick = () => {
    setIsCelebrating(true);
    window.setTimeout(() => {
      window.open("https://calendly.com/operacreatives", "_blank", "noopener,noreferrer");
    }, 1500);
  };

  return (
    <section id="collaborate" className="collaborate-section">
      <PeekabooMascot side="left" stage={mascotState.stage} mood={mascotState.mood} />
      <PeekabooMascot side="right" stage={mascotState.stage} mood={mascotState.mood} />

      <div className="collaborate-section__inner">
        <span className="collaborate-section__eyebrow">REGISTER A CALL</span>
        <h2 className="collaborate-section__heading">
          LET&apos;S <span className="text-highlight">COLLABORATE</span>
        </h2>

        <div className="collaborate-section__divider-row">
          <div className="divider-line line-left" />
          <p className="collaborate-section__subheading">Because every brand deserves a standing ovation.</p>
          <div className="divider-line line-right" />
        </div>

        <div
          className="clapperboard-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="clapperboard-svg-wrapper">
            <svg viewBox="0 0 1000 800" className="clapperboard-svg" preserveAspectRatio="xMidYMid meet">
              <g className="film-reels-group">
                <g transform="translate(180, 600) rotate(-15)">
                  <circle cx="0" cy="0" r="120" fill="#111" stroke="#333" strokeWidth="8" />
                  <circle cx="0" cy="0" r="20" fill="#FFE066" />
                  {[0, 60, 120, 180, 240, 300].map((rot) => (
                    <g transform={`rotate(${rot})`} key={rot}>
                      <path
                        d="M 30 -20 L 90 -40 A 90 90 0 0 1 90 40 L 30 20 Z"
                        fill="#1A1A1A"
                        stroke="#333"
                        strokeWidth="3"
                      />
                    </g>
                  ))}
                </g>
                <g transform="translate(820, 650) rotate(25)">
                  <circle cx="0" cy="0" r="100" fill="#0A0A0A" stroke="#222" strokeWidth="6" />
                  <circle cx="0" cy="0" r="15" fill="#00E5FF" />
                  {[0, 72, 144, 216, 288].map((rot) => (
                    <g transform={`rotate(${rot})`} key={rot}>
                      <path
                        d="M 25 -15 L 75 -30 A 75 75 0 0 1 75 30 L 25 15 Z"
                        fill="#111"
                        stroke="#222"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </g>
                <path
                  d="M 180 480 C 300 300, 700 800, 820 550"
                  fill="none"
                  stroke="#050505"
                  strokeWidth="30"
                  strokeLinecap="round"
                />
                <path
                  d="M 180 480 C 300 300, 700 800, 820 550"
                  fill="none"
                  stroke="#222"
                  strokeWidth="30"
                  strokeDasharray="10 10"
                />
              </g>

              <g transform="translate(500, 450)">
                <rect x="-280" y="-180" width="560" height="380" rx="16" fill="#111" stroke="#000" strokeWidth="8" />
                <rect x="-260" y="-160" width="520" height="340" fill="none" stroke="#333" strokeWidth="4" rx="8" />

                <g fill="#444" fontSize="20" fontFamily="monospace" fontWeight="bold" letterSpacing="4">
                  <text x="-240" y="-120">
                    PROD. NO.
                  </text>
                  <line x1="-120" y1="-120" x2="240" y2="-120" stroke="#333" strokeWidth="2" />
                  <text x="-240" y="-80">
                    SCENE
                  </text>
                  <text x="-120" y="-80">
                    TAKE
                  </text>
                  <text x="80" y="-80">
                    SOUND
                  </text>
                </g>

                <rect x="-280" y="-220" width="560" height="40" rx="8" fill="#111" stroke="#000" strokeWidth="6" />
                <g fill="#F8F4EC">
                  {[-260, -180, -100, -20, 60, 140, 220].map((xOffset) => (
                    <polygon
                      key={`base-stripe-${xOffset}`}
                      points={`${xOffset},-220 ${xOffset + 30},-220 ${xOffset + 10},-180 ${xOffset - 20},-180`}
                    />
                  ))}
                </g>

                <g className={`clapper-bar ${isCelebrating ? "clapper-bar--celebrate" : ""}`}>
                  <rect x="-280" y="-260" width="560" height="40" rx="8" fill="#FFE066" stroke="#000" strokeWidth="6" />
                  <g fill="#111">
                    {[-180, -100, -20, 60, 140, 220].map((xOffset) => (
                      <polygon
                        key={`bar-stripe-${xOffset}`}
                        points={`${xOffset},-260 ${xOffset + 30},-260 ${xOffset + 10},-220 ${xOffset - 20},-220`}
                      />
                    ))}
                  </g>
                  <circle cx="-260" cy="-240" r="12" fill="#333" stroke="#000" strokeWidth="4" />
                  <circle cx="-260" cy="-240" r="4" fill="#111" />
                </g>
              </g>

              <g className="glow-group">
                <path d="M 250 200 Q 255 180 260 200 Q 280 205 260 210 Q 255 230 250 210 Q 230 205 250 200 Z" fill="#FFE066" />
                <path d="M 800 350 Q 805 340 810 350 Q 820 355 810 360 Q 805 370 800 360 Q 790 355 800 350 Z" fill="#00E5FF" />
                <circle cx="750" cy="250" r="4" fill="#FF4B6E" />
              </g>
            </svg>
          </div>

          <div className="clapperboard-form-overlay clapperboard-form-overlay--cta">
            <button type="button" className="clapper-submit-btn clapper-submit-btn--solo" onClick={handleSceneClick}>
              BOOK A CALL
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="submit-arrow-icon"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>

        <div className="collaborate-socials">
          <a
            href="https://linkedin.com/company/operacreatives"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="collaborate-social-link"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          <a
            href="https://x.com/operacreatives_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="collaborate-social-link"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>

          <a
            href="https://instagram.com/operacreatives_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="collaborate-social-link"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          <a
            href="mailto:hi@operacreatives.com"
            aria-label="Email"
            className="collaborate-social-link"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
