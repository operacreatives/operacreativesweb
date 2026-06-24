export type CollaborateMascotStage = "hidden" | "peek" | "celebrate";
export type CollaborateMascotMood = "normal" | "happy";

export function getCollaborateMascotState({
  isHovered,
  isCelebrating,
}: {
  isHovered: boolean;
  isCelebrating: boolean;
}): { stage: CollaborateMascotStage; mood: CollaborateMascotMood } {
  if (isCelebrating) {
    return { stage: "celebrate", mood: "happy" };
  }

  if (isHovered) {
    return { stage: "peek", mood: "normal" };
  }

  return { stage: "hidden", mood: "normal" };
}
