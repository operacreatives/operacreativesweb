"use client";

import { useState, useEffect } from "react";

export function CollaborateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.open("https://calendly.com/operacreatives", "_blank", "noopener,noreferrer");
    }, 1000);
  };

  return (
    <section id="collaborate" className="collaborate-section">
      <div className="collaborate-section__inner">
        <span className="collaborate-section__eyebrow">REGISTER A CALL</span>
        <h2 className="collaborate-section__heading">
          LET'S <span className="text-highlight">COLLABORATE</span>
        </h2>
        <div className="collaborate-section__divider-row">
          <div className="divider-line line-left" />
          <p className="collaborate-section__subheading">
            Because every brand deserves a standing ovation.
          </p>
          <div className="divider-line line-right" />
        </div>

        {/* Clapperboard Container */}
        <div className="clapperboard-container">
          <div className="clapperboard-svg-wrapper">
            <svg
              viewBox="0 0 1000 800"
              className="clapperboard-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <ellipse
                cx="500"
                cy="730"
                rx="350"
                ry="40"
                fill="#600000"
                opacity="0.6"
                filter="blur(20px)"
              />
              
              {/* Background Reels with Floating Animation */}
              <g className="film-reels-group">
                {/* Left Reel */}
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
                {/* Right Reel */}
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
                {/* Film Strip Path */}
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

              {/* Main Board Base */}
              <g transform="translate(500, 450)">
                <rect x="-280" y="-180" width="560" height="380" rx="16" fill="#111" stroke="#000" strokeWidth="8" />
                <rect x="-260" y="-160" width="520" height="340" fill="none" stroke="#333" strokeWidth="4" rx="8" />
                
                {/* Text details inside clapper */}
                <g fill="#444" fontSize="20" fontFamily="monospace" fontWeight="bold" letterSpacing="4">
                  <text x="-240" y="-120">PROD. NO.</text>
                  <line x1="-120" y1="-120" x2="240" y2="-120" stroke="#333" strokeWidth="2" />
                  <text x="-240" y="-80">SCENE</text>
                  <text x="-120" y="-80">TAKE</text>
                  <text x="80" y="-80">SOUND</text>
                </g>

                {/* Hinge base */}
                <rect x="-280" y="-220" width="560" height="40" rx="8" fill="#111" stroke="#000" strokeWidth="6" />
                <g fill="#F8F4EC">
                  {[-260, -180, -100, -20, 60, 140, 220].map((xOffset) => (
                    <polygon
                      key={`base-stripe-${xOffset}`}
                      points={`${xOffset},-220 ${xOffset + 30},-220 ${xOffset + 10},-180 ${xOffset - 20},-180`}
                    />
                  ))}
                </g>

                {/* Animated Clapper Bar */}
                <g
                  className="clapper-bar"
                  style={{
                    transformOrigin: "-260px -200px",
                    transform: isSubmitting ? "rotate(0deg)" : "rotate(-15deg)",
                    transition: "transform 0.2s cubic-bezier(0.175,0.885,0.32,1.275)"
                  }}
                >
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

              {/* Sparks / Glow overlay */}
              <g className="glow-group">
                <path d="M 250 200 Q 255 180 260 200 Q 280 205 260 210 Q 255 230 250 210 Q 230 205 250 200 Z" fill="#FFE066" />
                <path d="M 800 350 Q 805 340 810 350 Q 820 355 810 360 Q 805 370 800 360 Q 790 355 800 350 Z" fill="#00E5FF" />
                <circle cx="750" cy="250" r="4" fill="#FF4B6E" />
              </g>
            </svg>
          </div>

          {/* Form Overlaid on Clapperboard */}
          <div className="clapperboard-form-overlay">
            <form onSubmit={handleSubmit} className="clapperboard-form">
              <input
                type="text"
                placeholder="PROD. NAME (Your Name)"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="clapper-input"
              />
              <input
                type="email"
                placeholder="CONTACT FREQ. (Your Email)"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="clapper-input"
              />
              <button type="submit" className="clapper-submit-btn">
                BOOK A SCENE
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="submit-arrow-icon"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
