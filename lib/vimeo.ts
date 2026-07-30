export type VimeoMode = "preview" | "player";

export function buildVimeoEmbedUrl(id: string, mode: VimeoMode): string {
  const url = new URL(`https://player.vimeo.com/video/${id}`);

  url.searchParams.set("autopause", "0");
  url.searchParams.set("badge", "0");
  url.searchParams.set("byline", "0");
  url.searchParams.set("dnt", "1");
  url.searchParams.set("portrait", "0");
  url.searchParams.set("title", "0");
  url.searchParams.set("logo", "0");
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("autoplay", "1");

  if (mode === "preview") {
    url.searchParams.set("background", "0");
    url.searchParams.set("controls", "0");
    url.searchParams.set("loop", "1");
    url.searchParams.set("muted", "1");
    url.searchParams.set("quality", "360p"); // Force low-res for instant hover playback
  } else {
    url.searchParams.set("background", "0");
    url.searchParams.set("controls", "1");
    url.searchParams.set("loop", "0");
    url.searchParams.set("muted", "0");
    url.searchParams.set("quality", "auto"); // High quality when clicked
  }

  return url.toString();
}

// Fallback used only when the oEmbed thumbnail lookup fails — a low-res proxy,
// better than nothing but never the preferred path.
export function buildVimeoThumbnailUrl(id: string): string {
  const baseId = id.split("?")[0];
  return `https://vumbnail.com/${baseId}.jpg`;
}

// Vimeo's oEmbed endpoint caps thumbnail_url at 1280px, but its CDN happily
// serves any width if you rewrite the size suffix on the URL directly
// (…-d_1280 -> …-d_2560). This gets us genuinely high-resolution stills
// straight from Vimeo instead of a third-party low-res proxy.
export function upscaleVimeoThumbnail(thumbnailUrl: string, width = 2560): string {
  return thumbnailUrl.replace(/-d_\d+(x\d+)?(?=(\?|$))/, `-d_${width}`);
}

export type WorkVariant = "landscape" | "portrait" | "feature";

export interface VimeoAspect {
  id: string;
  width: number;
  height: number;
  ratio: number;
  variant: WorkVariant;
  thumbnailUrl: string;
}

// Portrait videos (9:16-ish) become tall tiles; everything else is a standard
// 16:9 cell. "feature" (a large 2x2 tile) is assigned separately for rhythm.
export function variantForRatio(ratio: number): WorkVariant {
  return ratio < 0.9 ? "portrait" : "landscape";
}

// Fetches a video's real pixel dimensions and a high-resolution thumbnail from
// Vimeo's public oEmbed endpoint so each tile can be laid out in its native
// orientation with a crisp still. Falls back to 16:9 + a low-res proxy image if
// the video is unavailable or the request fails, so the grid never breaks.
export async function fetchVimeoAspect(id: string): Promise<VimeoAspect> {
  const fallback = (): VimeoAspect => ({
    id,
    width: 16,
    height: 9,
    ratio: 16 / 9,
    variant: "landscape",
    thumbnailUrl: buildVimeoThumbnailUrl(id),
  });

  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${id}`)}&width=1280`,
      { cache: "no-store" },
    );
    if (!res.ok) return fallback();
    const data = (await res.json()) as {
      width?: number;
      height?: number;
      thumbnail_url?: string;
    };
    const width = Number(data.width);
    const height = Number(data.height);
    if (!width || !height) return fallback();
    const ratio = width / height;
    const thumbnailUrl = data.thumbnail_url
      ? upscaleVimeoThumbnail(data.thumbnail_url)
      : buildVimeoThumbnailUrl(id);
    return { id, width, height, ratio, variant: variantForRatio(ratio), thumbnailUrl };
  } catch {
    return fallback();
  }
}
