"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export function CustomCursor({ isHovering }: { isHovering: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  // Framer Motion values for smooth physical tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX + 14);
      cursorY.set(e.clientY + 14);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="mascot-cursor-wrapper"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 40,
        height: 29,
        pointerEvents: "none",
        zIndex: 9999,
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isHovering && isVisible ? 1 : 0,
        opacity: isHovering && isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovering && isVisible ? 1 : 0,
        opacity: isHovering && isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <Image
        src="/logo-oc-small.webp"
        alt="Custom Cursor"
        width={40}
        height={29}
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
        priority
      />
    </motion.div>
  );
}
