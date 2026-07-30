"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

// Measures the mosaic's actual column width and returns a fixed row height
// (colWidth * 9/16). Applying it as `grid-auto-rows` locks every row to the
// same height, so tiles that span 2 rows (feature / portrait) align perfectly
// with the standard 16:9 cells around them — no collapsed slivers or seams.
export function useGridRowUnit() {
  const ref = useRef<HTMLDivElement>(null);
  const [rowUnit, setRowUnit] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const measure = () => {
      const columns = getComputedStyle(el)
        .gridTemplateColumns.split(" ")
        .filter(Boolean);
      const colWidth = parseFloat(columns[0]);
      if (colWidth > 0) {
        setRowUnit((colWidth * 9) / 16);
      }
    };

    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    rowUnit != null ? { gridAutoRows: `${rowUnit}px` } : undefined;

  return { ref, style };
}
