import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home has one accessible manifesto and compliant core structure", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Brands need more than noise." })).toBeVisible();
  await expect(page.locator('.manifesto-echo__block--real > p:last-child')).toHaveCount(1);
  await expect(page.locator('.manifesto-echo__copy[aria-hidden="true"]')).toHaveCount(3);
  const results = await new AxeBuilder({ page }).exclude(".work-tile").analyze();
  expect(results.violations).toEqual([]);
});

test("header changes context and work archive reveals the CTA from data state", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const header = page.getByTestId("site-header");
  await expect(header).not.toHaveClass(/site-header--solid/);
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(header).toHaveClass(/site-header--solid/);
  await page.locator(".work-sentinel").scrollIntoViewIfNeeded();
  await expect(page.locator("figure.work-tile")).toHaveCount(33);
  await page.locator(".work-sentinel").scrollIntoViewIfNeeded();
  await expect(page.locator("figure.work-tile")).toHaveCount(48);
  await expect(page.getByRole("heading", { name: /world does not need more content/i })).toBeVisible();
  await expect(page.locator("figure.work-tile")).toHaveCount(48);
});

test("mobile menu traps navigation and contact form stays local", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile interaction");
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeHidden();
  await page.locator("#project-form").scrollIntoViewIfNeeded();
  await page.getByLabel("Name").fill("Mira Sen");
  await page.getByLabel("Email").fill("mira@example.com");
  await page.getByLabel("Tell us about it").fill("A full campaign and identity for a new cultural project.");
  await page.getByRole("button", { name: "Preview enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("nothing was sent");
});
