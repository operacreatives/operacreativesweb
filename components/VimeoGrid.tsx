import { vimeoProjects } from "@/data/vimeo-projects";
import { fetchVimeoAspect } from "@/lib/vimeo";
import { VimeoMosaic, type MosaicItem } from "./VimeoMosaic";

// Server component: resolves each video's native aspect ratio from Vimeo, then
// hands the interactive mosaic a variant per tile so portrait videos render
// portrait, wide videos render wide — no forced squares.
export async function VimeoGrid() {
  const aspects = await Promise.all(
    vimeoProjects.map((project) => fetchVimeoAspect(project.id)),
  );

  // Promote two well-spaced landscapes into large 2x2 "feature" tiles so the
  // grid has rhythm without becoming a wall of identical cells. Kept sparse on
  // purpose — most tiles stay standard 16:9.
  const featureAt = new Set([2, 10]);
  let landscapeCount = 0;
  const items: MosaicItem[] = aspects.map((aspect) => {
    let variant = aspect.variant;
    if (variant === "landscape") {
      if (featureAt.has(landscapeCount)) {
        variant = "feature";
      }
      landscapeCount += 1;
    }
    return { id: aspect.id, variant, thumbnailUrl: aspect.thumbnailUrl };
  });

  return <VimeoMosaic items={items} />;
}
