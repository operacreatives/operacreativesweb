import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://opera-creatives.example";
  return ["", "/privacy"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date("2026-06-21"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
