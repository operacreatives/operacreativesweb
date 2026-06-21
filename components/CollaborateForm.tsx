"use client";

import { useState, useRef, useEffect } from "react";

interface RobotMascotProps {
  side: "left" | "right";
  mood: "idle" | "happy1" | "happy2" | "clapping";
  visible: boolean;
}

function RobotMascot({ side, mood, visible }: RobotMascotProps) {
  const isClapping = mood === "clapping";
  const isHappy2 = mood === "happy2" || isClapping;
  const isHappy1 = mood === "happy1" || isHappy2;
  
  // Mouth path calculation
  const mouthPath = isClapping
    ? "M -22 2 Q 0 28 22 2"
    : isHappy2
    ? "M -20 2 Q 0 22 20 2"
    : isHappy1
    ? "M -16 2 Q 0 16 16 2"
    : "M -16 2 L 16 2";
    
  // Glow elements color
  const glowColor = isHappy2 ? "#FFE066" : "#00E5FF";
  
  // Arm rotation during clapping
  const rotateLeftArm = isClapping ? "rotate(60)" : "rotate(0)";
  const rotateRightArm = isClapping ? "rotate(-60)" : "rotate(0)";
  const scaleFactor = isClapping ? 1.05 : 1;
  
  // Determine positioning offsets
  // Left: visible -10%, hidden -90%
  // Right: visible 10%, hidden 90%
  const translateVal = side === "left"
    ? (visible ? "-12%" : "-90%")
    : (visible ? "12%" : "90%");
    
  return (
    <div 
      className={`mascot-container mascot-container--${side}`}
      style={{
        transform: `translateY(-50%) translateX(${translateVal}) scale(${scaleFactor})`,
        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <svg 
        viewBox="0 0 310 530" 
        className="mascot-svg"
        style={{ transform: side === "right" ? "scaleX(-1)" : "none" }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes robotBounce {
            0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)}
          }
          @keyframes antennaGlow {
            0%,100%{opacity:1} 50%{opacity:0.35}
          }
        `}} />
        
        <g 
          style={{ 
            animation: isClapping ? "robotBounce 0.35s ease-in-out infinite" : "none",
            transformOrigin: "155px 260px"
          }}
        >
          {/* Legs */}
          <rect x="108" y="380" width="38" height="130" rx="16" fill="#1A1A1A" stroke="#111" strokeWidth="5" />
          <rect x="164" y="380" width="38" height="130" rx="16" fill="#1A1A1A" stroke="#111" strokeWidth="5" />
          
          {/* Feet */}
          <ellipse cx="127" cy="508" rx="30" ry="12" fill="#111" stroke="#000" strokeWidth="3" />
          <ellipse cx="183" cy="508" rx="30" ry="12" fill="#111" stroke="#000" strokeWidth="3" />
          
          {/* Joints */}
          <rect x="108" y="418" width="38" height="9" rx="4" fill="#FFE066" />
          <rect x="164" y="418" width="38" height="9" rx="4" fill="#FFE066" />
          
          {/* Body */}
          <rect x="75" y="220" width="160" height="170" rx="36" fill="#F8F4EC" stroke="#111" strokeWidth="8" />
          
          {/* Screen */}
          <rect x="96" y="238" width="118" height="80" rx="14" fill="#111" />
          <rect x="107" y="250" width="45" height="9" rx="4" fill={glowColor} opacity="0.9" />
          <rect x="107" y="268" width="68" height="5" rx="2" fill="#fff" opacity="0.5" />
          <rect x="107" y="280" width="50" height="5" rx="2" fill="#fff" opacity="0.5" />
          <circle cx="185" cy="278" r="12" fill="none" stroke={glowColor} strokeWidth="3" />
          <circle cx="185" cy="278" r="5" fill={glowColor} />
          
          {/* Dial */}
          <circle cx="155" cy="356" r="11" fill="#333" stroke="#111" strokeWidth="3" />
          <circle cx="155" cy="356" r="4" fill="#555" />
          
          {/* Left Arm */}
          <g style={{ transformOrigin: "80px 250px", transform: rotateLeftArm, transition: "transform 0.15s ease" }}>
            <path d="M 80 250 Q 30 290 25 350" fill="none" stroke="#111" strokeWidth="36" strokeLinecap="round" opacity="0.12" />
            <path d="M 80 250 Q 30 290 25 350" fill="none" stroke="#F8F4EC" strokeWidth="30" strokeLinecap="round" />
            <circle cx="25" cy="362" r="22" fill="#FFE066" stroke="#111" strokeWidth="5" />
          </g>
          
          {/* Right Arm */}
          <g style={{ transformOrigin: "235px 250px", transform: rotateRightArm, transition: "transform 0.15s ease" }}>
            <path d="M 235 235 Q 285 300 285 360" fill="none" stroke="#111" strokeWidth="36" strokeLinecap="round" opacity="0.12" />
            <path d="M 235 250 Q 285 300 285 360" fill="none" stroke="#F8F4EC" strokeWidth="30" strokeLinecap="round" />
            <circle cx="285" cy="372" r="22" fill="#FFE066" stroke="#111" strokeWidth="5" />
          </g>
          
          {/* Neck */}
          <rect x="136" y="168" width="38" height="58" rx="10" fill="#DDD" stroke="#111" strokeWidth="5" />
          
          {/* Head */}
          <g style={{ transformOrigin: "155px 120px", transform: "rotate(2deg)" }}>
            <rect x="80" y="68" width="150" height="106" rx="32" fill="#F8F4EC" stroke="#111" strokeWidth="8" />
            <rect x="75" y="96" width="160" height="56" rx="18" fill="#111" />
            
            {/* Eyes */}
            <circle cx="122" cy="124" r="16" fill={glowColor} filter="url(#eyeBlur)" />
            <circle cx="122" cy="124" r="7" fill="#fff" />
            
            <circle cx="188" cy="124" r="16" fill={glowColor} filter="url(#eyeBlur)" />
            <circle cx="188" cy="124" r="7" fill="#fff" />
            
            {isHappy1 && (
              <>
                <circle cx="128" cy="118" r="4" fill="white" opacity="0.7" />
                <circle cx="194" cy="118" r="4" fill="white" opacity="0.7" />
              </>
            )}
            
            {/* Mouth */}
            <g transform="translate(155, 152)">
              <path d={mouthPath} fill="none" stroke={glowColor} strokeWidth="5" strokeLinecap="round" style={{ transition: "d 0.25s ease" }} />
            </g>
            
            {/* Head Side Parts */}
            <rect x="62" y="103" width="22" height="56" rx="10" fill="#111" stroke="#333" strokeWidth="5" />
            <rect x="226" y="103" width="22" height="56" rx="10" fill="#111" stroke="#333" strokeWidth="5" />
            
            {/* Antenna */}
            <line x1="210" y1="68" x2="236" y2="22" stroke="#555" strokeWidth="7" strokeLinecap="round" />
            <circle cx="238" cy="18" r="10" fill="#FF4B6E" style={{ animation: isHappy1 ? "antennaGlow 0.5s infinite" : "antennaGlow 2s infinite" }} />
          </g>
        </g>
        
        <defs>
          <filter id="eyeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export function CollaborateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.open("https://calendly.com/operacreatives", "_blank", "noopener,noreferrer");
    }, 1200);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Mascots visible when:
  // - Form is hovered
  // - Input is focused
  // - Name is filled
  // - Email is filled
  // - Submitting
  const showMascots = isHovered || isFocused || name.length > 0 || email.length > 0 || isSubmitting;

  // Determine robot mood
  let mood: "idle" | "happy1" | "happy2" | "clapping" = "idle";
  if (isSubmitting) {
    mood = "clapping";
  } else if (name.length > 0 && email.length > 0) {
    mood = "happy2";
  } else if (name.length > 0 || email.length > 0) {
    mood = "happy1";
  }

  return (
    <section id="collaborate" className="collaborate-section">
      {/* Robot Mascots */}
      <RobotMascot side="left" mood={mood} visible={showMascots} />
      <RobotMascot side="right" mood={mood} visible={showMascots} />

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
        <div 
          className="clapperboard-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="clapper-input"
              />
              <input
                type="email"
                placeholder="CONTACT FREQ. (Your Email)"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="clapper-input"
              />
              <button 
                type="submit" 
                className="clapper-submit-btn"
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
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
