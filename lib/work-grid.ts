export const PROJECT_COUNT = 48;
export const INITIAL_PROJECT_COUNT = 18;
export const PROJECT_BATCH_SIZE = 15;

export function nextVisibleCount(current: number, total = PROJECT_COUNT) {
  if (current >= total) return total;
  return Math.min(total, current + PROJECT_BATCH_SIZE);
}

export function shouldShowCta(visibleCount: number, total = PROJECT_COUNT) {
  return visibleCount >= total;
}
