export interface Point {
  x: number;
  y: number;
}

export function clampVector(point: Point, maxDistance: number): Point {
  const magnitude = Math.hypot(point.x, point.y);
  if (!magnitude || magnitude <= maxDistance) return point;
  const scale = maxDistance / magnitude;
  return { x: point.x * scale, y: point.y * scale };
}

export function springStep(current: Point, target: Point, strength = 0.12): Point {
  return {
    x: current.x + (target.x - current.x) * strength,
    y: current.y + (target.y - current.y) * strength,
  };
}

export function nextBlinkDelay(random = Math.random()) {
  return 6_000 + random * 4_000;
}
