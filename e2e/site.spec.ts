import { expect, test } from "@playwright/test";

test.describe("homepage", () => {
  test("shows the hero and is indexable", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("From product shot to");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /^index/);
  });

  test("booking buttons go straight to Cal.com", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const links = page.locator('a.btn[href^="https://cal.com/"]');
    expect(await links.count()).toBeGreaterThanOrEqual(3);
    await expect(links.first()).toHaveAttribute("target", "_blank");
  });

  test("work tabs switch between films, static creatives and FIFA series", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".tile")).toHaveCount(24);
    await page.getByRole("tab", { name: /Static Creatives/ }).click();
    await expect(page.locator(".tile")).toHaveCount(24);
    await page.getByRole("tab", { name: /FIFA World Cup Anime Series/ }).click();
    await expect(page.locator(".tile")).toHaveCount(12);
  });

  test("opening one FAQ closes the others", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("#faq summary").nth(0).click();
    await page.locator("#faq summary").nth(2).click();
    await expect(page.locator("#faq details[open]")).toHaveCount(1);
  });

  test("old in-page links still land on a section", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    for (const id of ["work", "how-it-works", "collaborate", "footer"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });
});

test.describe("links that must never break", () => {
  test("/v2 redirects to the home page", async ({ request }) => {
    const res = await request.get("/v2", { maxRedirects: 0 });
    expect([301, 302, 307, 308]).toContain(res.status());
    expect(new URL(res.headers()["location"], "http://localhost").pathname).toBe("/");
  });

  test("/qr and /nfc redirect to the deck with their ref", async ({ request }) => {
    for (const [slug, ref] of [["qr", "card"], ["nfc", "nfc"]]) {
      const res = await request.get(`/${slug}`, { maxRedirects: 0 });
      expect([301, 302, 307, 308]).toContain(res.status());
      expect(res.headers()["location"]).toContain(`/deck?ref=${ref}`);
    }
  });

  test("/deck serves the pitch deck", async ({ request }) => {
    const res = await request.get("/deck");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/html");
  });

  test("unknown short links are a 404, not the home page", async ({ request }) => {
    const res = await request.get("/this-does-not-exist");
    expect(res.status()).toBe(404);
  });
});
