export const PROJECT_COUNT = 6;
export const INITIAL_PROJECT_COUNT = 6;
export const PROJECT_BATCH_SIZE = 6;

export function nextVisibleCount(current: number, total = PROJECT_COUNT) {
  return total;
}

export function shouldShowCta(visibleCount: number, total = PROJECT_COUNT) {
  return true;
}
