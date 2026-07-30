import { fifaProjects } from "@/data/fifa-projects";
import { fetchVimeoAspect } from "@/lib/vimeo";
import { FifaMosaic, type FifaSlot } from "./FifaMosaic";

// Server component: resolves a high-resolution thumbnail straight from Vimeo's
// CDN for every filled slot (empty strings stay as "coming soon" placeholders).
export async function FifaWorldCup() {
  const slots: FifaSlot[] = await Promise.all(
    fifaProjects.map(async (id) => {
      if (!id) return null;
      const aspect = await fetchVimeoAspect(id);
      return { id, thumbnailUrl: aspect.thumbnailUrl };
    }),
  );

  return <FifaMosaic slots={slots} />;
}
