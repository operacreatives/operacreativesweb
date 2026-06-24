import { describe, expect, it } from "vitest";
import { getCollaborateMascotState } from "@/lib/collaborate";

describe("collaborate mascot state", () => {
  it("stays hidden until the clapperboard is active", () => {
    expect(getCollaborateMascotState({ isHovered: false, isCelebrating: false })).toEqual({
      mood: "normal",
      stage: "hidden",
    });
  });

  it("peeks with the normal face on hover", () => {
    expect(getCollaborateMascotState({ isHovered: true, isCelebrating: false })).toEqual({
      mood: "normal",
      stage: "peek",
    });
  });

  it("switches to the happy face while celebrating", () => {
    expect(getCollaborateMascotState({ isHovered: true, isCelebrating: true })).toEqual({
      mood: "happy",
      stage: "celebrate",
    });
  });
});
