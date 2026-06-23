import vimeoThumbnails from "../data/vimeo-thumbnails.json";

export type VimeoMode = "preview" | "player";

export function buildVimeoEmbedUrl(id: string, mode: VimeoMode): string {
  const url = new URL(`https://player.vimeo.com/video/${id}`);

  url.searchParams.set("autopause", "0");
  url.searchParams.set("badge", "0");
  url.searchParams.set("byline", "0");
  url.searchParams.set("dnt", "1");
  url.searchParams.set("portrait", "0");
  url.searchParams.set("title", "0");
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("autoplay", "1");
  url.searchParams.set("api", "1");

  if (mode === "preview") {
    url.searchParams.set("background", "0");
    url.searchParams.set("controls", "0");
    url.searchParams.set("loop", "1");
    url.searchParams.set("muted", "1");
  } else {
    url.searchParams.set("background", "0");
    url.searchParams.set("controls", "1");
    url.searchParams.set("loop", "0");
    url.searchParams.set("muted", "0");
  }

  return url.toString();
}

export function buildVimeoThumbnailUrl(id: string): string {
  const thumbnails = vimeoThumbnails as Record<string, string>;
  if (thumbnails[id]) {
    return thumbnails[id];
  }
  return `https://vumbnail.com/${id}.jpg`;
}
