import { describe, expect, it } from "vitest";
import { INITIAL_PROJECT_COUNT, nextVisibleCount, PROJECT_COUNT, shouldShowCta } from "@/lib/work-grid";

describe("work grid pagination", () => {
  it("loads 18, then two deterministic batches without exceeding the archive", () => {
    const second = nextVisibleCount(INITIAL_PROJECT_COUNT);
    const third = nextVisibleCount(second);
    expect([INITIAL_PROJECT_COUNT, second, third]).toEqual([18, 33, 48]);
    expect(nextVisibleCount(third)).toBe(PROJECT_COUNT);
  });

  it("keys CTA visibility to data state", () => {
    expect(shouldShowCta(47)).toBe(false);
    expect(shouldShowCta(48)).toBe(true);
  });
});
