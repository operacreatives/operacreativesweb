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

test.describe("search and AI visibility", () => {
  test("home page ships valid structured data", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const types = JSON.parse(raw ?? "{}")["@graph"].map((n: { "@type": string }) => n["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "WebPage", "FAQPage"]));
  });

  test("has exactly one h1 and a canonical link", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/www\.operacreatives\.com\/?$/);
  });

  test("/llms.txt, /robots.txt and /sitemap.xml are served", async ({ request }) => {
    const llms = await request.get("/llms.txt");
    expect(llms.status()).toBe(200);
    expect(await llms.text()).toContain("# Opera Creatives");
    expect((await request.get("/robots.txt")).status()).toBe(200);
    expect((await request.get("/sitemap.xml")).status()).toBe(200);
  });

  test("unknown pages show the branded 404 with noindex", async ({ page }) => {
    const res = await page.goto("/no/such/page", { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});

test.describe("links page", () => {
  test("is a standalone card with booking, showreel and the main links", async ({ page }) => {
    const res = await page.goto("/links");
    expect(res?.status()).toBe(200);
    await expect(page.getByTestId("site-header")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1, name: "Opera Creatives" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Book a discovery call/ })).toHaveAttribute("href", /cal\.com\/operacreatives/);
    await expect(page.locator("iframe[src*='player.vimeo.com/video/1233639706']")).toHaveCount(1);
    await expect(page.getByRole("link", { name: /Pitch deck/ })).toHaveAttribute("href", "/deck?ref=links");
    await expect(page.getByRole("link", { name: /Instagram/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /LinkedIn/ })).toBeVisible();
  });

  test("the home page still has its header", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("site-header")).toBeVisible();
  });
});

test.describe("showreel", () => {
  test("sits under the hero, has no extra hero button, and loads its player on the page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#showreel")).toHaveCount(1);
    await expect(page.locator(".hero").getByRole("button", { name: /showreel/i })).toHaveCount(0);
    await page.locator("#showreel").scrollIntoViewIfNeeded();
    await expect(page.locator("#showreel iframe[src*='player.vimeo.com/video/1233639706']")).toHaveCount(1);
  });

  test("the Showreel nav link is the first menu item", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".nav a").first()).toHaveAttribute("href", "#showreel");
  });
});

test.describe("work section on phones", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("shows a short preview, and View all / View less expands and collapses it", async ({ page }) => {
    await page.goto("/");
    const tiles = page.locator("#work-panel .tile:visible");
    await expect(tiles).toHaveCount(6);
    await page.getByRole("button", { name: /View all/ }).click();
    expect(await tiles.count()).toBeGreaterThan(6);
    await page.getByRole("button", { name: "View less" }).click();
    await expect(tiles).toHaveCount(6);
  });

  test("switching tabs starts collapsed again", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /View all/ }).click();
    await page.getByRole("tab", { name: /Static Creatives/ }).click();
    await expect(page.locator("#work-panel .tile:visible")).toHaveCount(6);
  });
});

test.describe("work section on desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("shows everything and no View all button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /View all/ })).toBeHidden();
    expect(await page.locator("#work-panel .tile:visible").count()).toBeGreaterThan(6);
  });
});
