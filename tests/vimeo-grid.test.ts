import { describe, expect, it } from "vitest";
import { buildVimeoEmbedUrl, buildVimeoThumbnailUrl } from "@/lib/vimeo";
import { vimeoProjects } from "@/data/vimeo-projects";

describe("vimeo grid helpers", () => {
  it("keeps the restored uploaded Vimeo list intact", () => {
    expect(vimeoProjects).toHaveLength(19);
    expect(vimeoProjects[0]?.id).toBe("1203214001");
    expect(vimeoProjects.at(-1)?.id).toBe("1152865784");
  });

  it("builds muted hover-preview embeds that autoplay cleanly", () => {
    const url = new URL(buildVimeoEmbedUrl("1203214001", "preview"));

    expect(url.origin).toBe("https://player.vimeo.com");
    expect(url.searchParams.get("background")).toBe("0");
    expect(url.searchParams.get("autoplay")).toBe("1");
    expect(url.searchParams.get("muted")).toBe("1");
    expect(url.searchParams.get("loop")).toBe("1");
    expect(url.searchParams.get("controls")).toBe("0");
  });

  it("builds full player embeds for the lightbox state", () => {
    const url = new URL(buildVimeoEmbedUrl("1203214001", "player"));

    expect(url.searchParams.get("background")).toBe("0");
    expect(url.searchParams.get("autoplay")).toBe("1");
    expect(url.searchParams.get("muted")).toBe("0");
    expect(url.searchParams.get("controls")).toBe("1");
  });

  it("builds thumbnail URLs without needing a title overlay", () => {
    expect(buildVimeoThumbnailUrl("1203214001")).toBe("https://vumbnail.com/1203214001.jpg");
  });
});
