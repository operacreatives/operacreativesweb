"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export function CustomCursor({ isHovering }: { isHovering: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  // Framer Motion values for smooth physical tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX + 15); // Offset to bottom-right of the actual cursor
      cursorY.set(e.clientY + 15);
    };
    
    // Only show the cursor wrapper when mouse is in the window
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="mascot-cursor-wrapper"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isHovering ? 1 : 0,
        opacity: isHovering ? 1 : 0,
      }}
    >
      <Image 
        src="/logo-oc.png" 
        alt="Custom Cursor" 
        width={40} 
        height={29} 
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
      />
    </motion.div>
  );
}
