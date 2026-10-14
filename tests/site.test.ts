import { describe, expect, it } from "vitest";
import { fifaProjects } from "@/data/fifa-projects";
import { posters } from "@/data/posters";
import { vimeoProjects } from "@/data/vimeo-projects";
import { posterAlts } from "@/data/posters";
import { buildJsonLd, jsonLdString } from "@/lib/seo";
import { BOOK_LABEL, CAL_URL, FAQS, LINKS, NAV, PROCESS, SHOWREEL_ID, SERVICES, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import { resolvePic, type WorkData } from "@/lib/work";

const work: WorkData = {
  films: vimeoProjects.map((p) => ({ id: p.id, thumb: `https://example.test/${p.id}.jpg`, tall: false })),
  fifa: fifaProjects.map((id) => ({ id, thumb: `https://example.test/${id}.jpg`, tall: false })),
  posters,
};

describe("homepage content", () => {
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

describe("search and AI visibility", () => {
  it("keeps the title and description within what Google shows", () => {
    expect(SITE_TITLE.length).toBeLessThanOrEqual(60);
    expect(SITE_DESCRIPTION.length).toBeLessThanOrEqual(160);
  });

  it("describes the studio, its services and every FAQ in structured data", () => {
    const graph = buildJsonLd()["@graph"];
    const org = graph.find((n) => n["@type"] === "Organization");
    const faq = graph.find((n) => n["@type"] === "FAQPage");
    expect(org?.sameAs).toHaveLength(3);
    expect(org?.knowsAbout).toHaveLength(SERVICES.length);
    expect(org?.hasOfferCatalog?.itemListElement).toHaveLength(SERVICES.length);
    expect(faq?.mainEntity).toHaveLength(FAQS.length);
  });

  it("serialises structured data that cannot break out of its script tag", () => {
    const out = jsonLdString();
    expect(out).not.toContain("<");
    expect(() => JSON.parse(out)).not.toThrow();
  });

  it("has descriptive alt text for every poster", () => {
    expect(Object.keys(posterAlts).sort()).toEqual([...posters].sort());
    for (const alt of Object.values(posterAlts)) expect(alt.length).toBeGreaterThan(15);
  });
});

describe("links page", () => {
  it("lists the deck, website, socials and email, each exactly once", () => {
    const labels = LINKS.map((l) => l.label);
    expect(labels).toEqual(["Pitch deck", "Website", "Instagram", "LinkedIn", "X", "Email"]);
    expect(new Set(LINKS.map((l) => l.href)).size).toBe(LINKS.length);
    expect(LINKS.find((l) => l.label === "Pitch deck")?.href).toBe("/deck?ref=links");
    for (const l of LINKS.filter((x) => x.external)) expect(l.href.startsWith("https://")).toBe(true);
  });
});

describe("showreel", () => {
  it("has a nav link and a Vimeo id", () => {
    expect(NAV.some((n) => n.href === "#showreel")).toBe(true);
    expect(SHOWREEL_ID).toMatch(/^\d+$/);
  });
});

describe("work gallery order", () => {
  it("moves one film to a chosen tile without losing or duplicating any", async () => {
    const { placeFilm } = await import("@/lib/work");
    const items = ["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => ({ id }));
    const moved = placeFilm(items, "b", 7).map((i) => i.id);
    expect(moved).toEqual(["a", "c", "d", "e", "f", "g", "h", "b"]);
    expect(placeFilm(items, "missing", 0)).toBe(items);
  });
});
