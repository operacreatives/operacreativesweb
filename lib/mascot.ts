interface Point {
  x: number;
  y: number;
}

export function clampVector(vector: Point, maxRadius: number): Point {
  const distance = Math.hypot(vector.x, vector.y);

  if (distance <= maxRadius || distance === 0) {
    return vector;
  }

  const scale = maxRadius / distance;
  return {
    x: vector.x * scale,
    y: vector.y * scale,
  };
}

export function springStep(current: Point, target: Point): Point {
  return {
    x: Number((current.x + (target.x - current.x) * 0.12).toFixed(1)),
    y: Number((current.y + (target.y - current.y) * 0.12).toFixed(1)),
  };
}

export function nextBlinkDelay(seed: number): number {
  return Math.round(6_000 + Math.max(0, Math.min(seed, 0.9999)) * 4_000);
}
