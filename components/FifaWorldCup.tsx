import { fifaProjects } from "@/data/fifa-projects";
import { fetchVimeoAspect } from "@/lib/vimeo";
import { FifaMosaic, type FifaSlot } from "./FifaMosaic";

// Server component: resolves each video's native aspect ratio and a
// high-resolution thumbnail straight from Vimeo's CDN for every filled slot
// (empty strings stay as "coming soon" placeholders). Mirrors VimeoGrid's
// approach so the FIFA grid gets the same size rhythm instead of a wall of
// identical 16:9 boxes.
export async function FifaWorldCup() {
  const aspects = await Promise.all(
    fifaProjects.map(async (id) => {
      if (!id) return null;
      return fetchVimeoAspect(id);
    }),
  );

  const featureAt = new Set([1, 6]);
  let landscapeCount = 0;
  const slots: FifaSlot[] = aspects.map((aspect) => {
    if (!aspect) return null;
    let variant = aspect.variant;
    if (variant === "landscape") {
      if (featureAt.has(landscapeCount)) {
        variant = "feature";
      }
      landscapeCount += 1;
    }
    return { id: aspect.id, variant, thumbnailUrl: aspect.thumbnailUrl };
  });

  return <FifaMosaic slots={slots} />;
}
