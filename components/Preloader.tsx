"use client";

import { useEffect, useState } from "react";
import "./Preloader.css";

export function Preloader() {
  const [stage, setStage] = useState<"idle" | "sliding" | "done">("idle");

  useEffect(() => {
    // 1. Force scroll to top on page refresh/load
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // 2. Start sliding instantly on mount (no holding/pausing)
    const initialDelay = setTimeout(() => {
      setStage("sliding");
    }, 10);

    // 3. Complete sequence in 3.0 seconds total
    const cleanupDelay = setTimeout(() => {
      setStage("done");
      window.dispatchEvent(new Event("introFinished"));
    }, 3000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(cleanupDelay);
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div className={`oc-preloader ${stage === "sliding" ? "is-sliding" : ""}`}>
      {/* The White Screen/Curtain */}
      <div className="oc-preloader__curtain">
        {/* Speed Lines trailing behind the pulling mascot */}
        <div className="oc-preloader__speed-lines">
          <span className="speed-line speed-line--1" />
          <span className="speed-line speed-line--2" />
          <span className="speed-line speed-line--3" />
          <span className="speed-line speed-line--4" />
          <span className="speed-line speed-line--5" />
        </div>

        {/* Doubled Mascot on the left edge with Vibration & Pull Animation */}
        <div className="oc-preloader__mascot-wrapper">
          <img
            src="/mascots/peekaboo_mascot_happy.webp"
            alt="Opera Creatives Mascot"
            className="oc-preloader__mascot-img"
          />
        </div>
      </div>
    </div>
  );
}
