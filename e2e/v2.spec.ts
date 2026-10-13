import { expect, test } from "@playwright/test";

test.describe("v2 preview", () => {
  test("is a separate, non-indexed page with the new hero", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("From product shot to");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("booking buttons go straight to Cal.com", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "domcontentloaded" });
    const links = page.locator('a.btn[href^="https://cal.com/"]');
    expect(await links.count()).toBeGreaterThanOrEqual(3);
    await expect(links.first()).toHaveAttribute("target", "_blank");
  });

  test("work tabs switch between films, static creatives and FIFA series", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".tile")).toHaveCount(24);
    await page.getByRole("tab", { name: /Static Creatives/ }).click();
    await expect(page.locator(".tile")).toHaveCount(24);
    await page.getByRole("tab", { name: /FIFA World Cup Anime Series/ }).click();
    await expect(page.locator(".tile")).toHaveCount(12);
  });

  test("opening one FAQ closes the others", async ({ page }) => {
    await page.goto("/v2", { waitUntil: "domcontentloaded" });
    await page.locator("#faq summary").nth(0).click();
    await page.locator("#faq summary").nth(2).click();
    await expect(page.locator("#faq details[open]")).toHaveCount(1);
  });

  test("the live home page is untouched by v2", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("site-header")).toBeVisible();
    await expect(page.locator(".v2")).toHaveCount(0);
  });
});
