"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const windStreaks = [
  { top: '15%', width: '150%', duration: 0.8, delay: 0.1 },
  { top: '35%', width: '250%', duration: 1.2, delay: 0.4 },
  { top: '45%', width: '120%', duration: 0.9, delay: 0.7 },
  { top: '65%', width: '200%', duration: 1.1, delay: 0.2 },
  { top: '85%', width: '180%', duration: 0.85, delay: 0.5 },
];

const creativeWakeShapes = [
  { top: '20%', left: '-10%', type: 'circle', color: 'bg-yellow-400', size: 'w-8 h-8', rotate: 0, driftX: -60 },
  { top: '75%', left: '0%', type: 'square', color: 'bg-blue-500', size: 'w-6 h-6', rotate: 15, driftX: -40 },
  { top: '15%', left: '15%', type: 'circle', color: 'bg-red-500', size: 'w-4 h-4', rotate: 0, driftX: -80 },
  { top: '85%', left: '10%', type: 'square', color: 'bg-green-400', size: 'w-10 h-10', rotate: 45, driftX: -50 },
  { top: '45%', left: '-20%', type: 'circle', color: 'bg-purple-400', size: 'w-12 h-12', rotate: 0, driftX: -70 },
  { top: '30%', left: '-5%', type: 'square', color: 'bg-orange-400', size: 'w-5 h-5', rotate: 30, driftX: -30 },
];

const mascotSpeedLines = [
  { top: '30%', left: '10%', baseWidth: 20, height: 4, color: 'bg-red-500', delay: 0 },
  { top: '40%', left: '5%', baseWidth: 35, height: 6, color: 'bg-black/20', delay: 0.1 },
  { top: '55%', left: '-5%', baseWidth: 25, height: 3, color: 'bg-red-500', delay: 0.05 },
  { top: '70%', left: '15%', baseWidth: 15, height: 5, color: 'bg-black/10', delay: 0.15 },
  { top: '80%', left: '0%', baseWidth: 30, height: 4, color: 'bg-red-500', delay: 0.08 },
  { top: '25%', left: '0%', baseWidth: 10, height: 3, color: 'bg-black/15', delay: 0.2 },
  { top: '65%', left: '5%', baseWidth: 40, height: 2, color: 'bg-red-500', delay: 0.12 },
];

export function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true);

  if (!showIntro) return null;

  return (
    <motion.div
      initial={{ x: 0, rotateY: 0, rotateZ: 0, scale: 1 }}
      animate={{ 
        x: "150vw",
        rotateY: -12, // lifts left edge towards camera
        rotateZ: 2,   // slight twist
        scale: 0.95   // slightly scales down to emphasize depth
      }}
      transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      style={{ 
        willChange: "transform",
        transformOrigin: "right center",
        transformPerspective: 1500 
      }}
      onAnimationComplete={() => setShowIntro(false)}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* 1. The Paper Background Layer with clipped effects & curved peeling edge */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#fdfdfd] via-[#fdfdfd] to-red-100 overflow-hidden shadow-[-40px_0_120px_rgba(0,0,0,0.15)]"
        initial={{ borderTopLeftRadius: "0vh", borderBottomLeftRadius: "0vh" }}
        animate={{ borderTopLeftRadius: "40vh", borderBottomLeftRadius: "40vh" }}
        transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      >
        
        {/* Massive Parallax Typography Watermark (Premium Red Identity) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          initial={{ x: "10%", opacity: 0 }}
          animate={{ x: "-30%", opacity: 1 }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        >
          <span 
            className="text-[40vw] font-black tracking-tighter opacity-10 whitespace-nowrap"
            style={{ 
              WebkitTextStroke: '6px #EF4444', 
              color: 'transparent' 
            }}
          >
            OPERA
          </span>
        </motion.div>

        {/* SVG Noise/Grain Texture for Premium Paper feel */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30 mix-blend-multiply">
          <filter id="paperNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paperNoise)" />
        </svg>

        {/* Paper Gradient to simulate 3D lighting/shadows on the peeling page */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-transparent to-transparent opacity-30 mix-blend-multiply pointer-events-none" />

        {/* Blueprint Dot Grid Matrix with intense Parallax */}
        <motion.div 
          className="absolute inset-0 opacity-[0.1]" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #EF4444 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} 
          initial={{ backgroundPosition: "0px 0px" }}
          animate={{ backgroundPosition: "-400px 0px" }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        />

        {/* High-Speed Wind Tunnel Effects */}
        <div className="absolute inset-0">
          {windStreaks.map((streak, i) => (
            <motion.div
              key={`wind-${i}`}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20"
              style={{
                top: streak.top,
                width: streak.width,
                left: '-100%',
              }}
              animate={{
                x: ['0%', '200%'],
              }}
              transition={{
                duration: streak.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: streak.delay,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* 2. Mascot Container (NO overflow-hidden so it can bleed out on the left) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[40%] h-[90vh] w-[90vh] max-h-[1200px] max-w-[1200px] min-h-[600px] min-w-[600px]">
        {/* 3. Creative Wake (Playful & Energetic) */}
        {creativeWakeShapes.map((shape, i) => (
          <motion.div
            key={`wake-${i}`}
            className={`absolute ${shape.size} ${shape.color} ${shape.type === 'circle' ? 'rounded-full' : 'rounded-md shadow-sm'} -z-10`}
            style={{ top: shape.top, left: shape.left }}
            initial={{ scale: 0, opacity: 0, rotate: 0, x: 0 }}
            animate={{ 
              scale: [0, 1.2, 1], 
              opacity: [0, 0.8, 0.6],
              rotate: [0, shape.rotate + 90],
              x: [0, shape.driftX]
            }}
            transition={{ 
              duration: 1.5, 
              delay: 0.1 + i * 0.1, 
              ease: 'easeOut'
            }}
          />
        ))}

        {/* Animated High-Frequency Speed Lines trailing behind the mascot */}
        {mascotSpeedLines.map((line, i) => (
          <motion.div
            key={`mascot-speed-${i}`}
            className={`absolute ${line.color} rounded-full`}
            style={{ top: line.top, left: line.left, height: `${line.height}px` }}
            initial={{ width: `${line.baseWidth}%`, opacity: 0.5, x: 0 }}
            animate={{ 
              width: [`${line.baseWidth * 0.5}%`, `${line.baseWidth * 1.5}%`, `${line.baseWidth * 0.5}%`],
              opacity: [0.2, 0.9, 0.2],
              x: [0, -40, 0] 
            }}
            transition={{ 
              duration: 0.15 + (i * 0.02), // staggered very fast pulsing
              repeat: Infinity, 
              ease: "linear",
              delay: line.delay 
            }}
          />
        ))}

        {/* High-speed wobble on mascot */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -5, 5, -5, 0], rotate: [0, -2, 2, -1, 0] }}
          transition={{ duration: 0.3, repeat: 6, ease: "linear", delay: 0.15 }}
        >
          <Image
            src="/mascots/peekaboo_mascot_happy.png"
            alt="Mascot peeling the page"
            fill
            className="object-contain drop-shadow-[20px_0_30px_rgba(0,0,0,0.3)]"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
