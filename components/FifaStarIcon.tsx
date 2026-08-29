export function FifaStarIcon({ width = 26, height = 26, className }: { width?: number; height?: number; className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} width={width} height={height} aria-hidden="true">
      {/* Outer 4-point sparkle star design */}
      <path
        d="M14 0 C14 8, 20 14, 28 14 C20 14, 14 20, 14 28 C14 20, 8 14, 0 14 C8 14, 14 8, 14 0 Z"
        fill="var(--red, #EA0916)"
        stroke="#000000"
        strokeWidth="1.5"
      />
      {/* Inner gold sparkle core */}
      <path
        d="M14 6 C14 10, 17 14, 22 14 C17 14, 14 18, 14 22 C14 18, 11 14, 6 14 C11 14, 14 10, 14 6 Z"
        fill="#FFD700"
      />
    </svg>
  );
}
