import { describe, expect, it } from "vitest";
import { fifaProjects } from "@/data/fifa-projects";
import { posters } from "@/data/posters";
import { vimeoProjects } from "@/data/vimeo-projects";
import { BOOK_LABEL, CAL_URL, FAQS, PROCESS, SERVICES } from "@/lib/v2/site";
import { resolvePic, type WorkData } from "@/lib/v2/work";

const work: WorkData = {
  films: vimeoProjects.map((p) => ({ id: p.id, thumb: `https://example.test/${p.id}.jpg`, tall: false })),
  fifa: fifaProjects.map((id) => ({ id, thumb: `https://example.test/${id}.jpg`, tall: false })),
  posters,
};

describe("v2 homepage content", () => {
  it("sends every booking button straight to the Cal.com page", () => {
    const url = new URL(CAL_URL);
    expect(url.hostname).toBe("cal.com");
    expect(url.pathname.startsWith("/operacreatives/")).toBe(true);
    expect(BOOK_LABEL).toBe("Book a discovery call");
  });

  it("lists the services, process steps and questions without duplicates", () => {
    expect(new Set(SERVICES.map((s) => s.name)).size).toBe(SERVICES.length);
    expect(PROCESS).toHaveLength(6);
    expect(new Set(FAQS.map((f) => f.q)).size).toBe(FAQS.length);
  });

  it("only points at pictures that exist", () => {
    for (const ref of [...SERVICES.map((s) => s.pic), ...PROCESS.flatMap((p) => p.pics)]) {
      expect(resolvePic(ref, work), ref).not.toBeNull();
    }
  });

  it("ships the static creatives referenced by the gallery", () => {
    expect(posters).toHaveLength(24);
    expect(new Set(posters).size).toBe(posters.length);
  });
});
