import { describe, expect, it } from "vitest";
import { clampVector, nextBlinkDelay, springStep } from "@/lib/mascot";

describe("mascot motion", () => {
  it("clamps a pointer vector inside the socket", () => {
    const result = clampVector({ x: 30, y: 40 }, 10);
    expect(Math.hypot(result.x, result.y)).toBeCloseTo(10);
  });

  it("moves toward the target without overshooting", () => {
    expect(springStep({ x: 0, y: 0 }, { x: 10, y: -10 })).toEqual({ x: 1.2, y: -1.2 });
  });

  it("keeps randomized blinks between six and ten seconds", () => {
    expect(nextBlinkDelay(0)).toBe(6_000);
    expect(nextBlinkDelay(0.999)).toBeLessThan(10_000);
  });
});
