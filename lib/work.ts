import { fifaProjects } from "@/data/fifa-projects";
import { posters } from "@/data/posters";
import { vimeoProjects } from "@/data/vimeo-projects";
import { fetchVimeoAspect } from "@/lib/vimeo";

export interface VideoItem {
  id: string;
  thumb: string;
  // Portrait or square videos are shown whole instead of being cropped to 16:9.
  tall: boolean;
}

export interface WorkData {
  films: VideoItem[];
  fifa: VideoItem[];
  posters: string[];
}

async function videos(ids: string[]): Promise<VideoItem[]> {
  const aspects = await Promise.all(ids.map((id) => fetchVimeoAspect(id, 86400)));
  return aspects.map((a) => ({ id: a.id, thumb: a.thumbnailUrl, tall: a.ratio < 1.2 }));
}

export async function getWork(): Promise<WorkData> {
  const [films, fifa] = await Promise.all([
    videos(vimeoProjects.map((p) => p.id)),
    videos(fifaProjects.filter(Boolean)),
  ]);
  return { films, fifa, posters };
}

// Moves one film to a new position in the gallery only. The site's "reel:N" references keep the
// original data order, so the Services and Process thumbnails don't change.
export function placeFilm<T extends { id: string }>(items: T[], id: string, index: number): T[] {
  const from = items.findIndex((i) => i.id === id);
  if (from < 0) return items;
  const copy = [...items];
  const [item] = copy.splice(from, 1);
  copy.splice(index, 0, item);
  return copy;
}

export type PicRef = { kind: "poster"; src: string } | { kind: "video"; thumb: string } | null;

// Resolves "poster:3" / "reel:2" / "fifa:0" references used in lib/site.ts.
export function resolvePic(ref: string, work: WorkData): PicRef {
  const [kind, raw] = ref.split(":");
  const i = Number(raw);
  if (kind === "poster") return posters[i] ? { kind: "poster", src: `/assets/images/${posters[i]}` } : null;
  const list = kind === "fifa" ? work.fifa : work.films;
  return list[i] ? { kind: "video", thumb: list[i].thumb } : null;
}
