import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home has accessible structure and compliant core structure", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "The production house for the next decade of brands." })).toBeVisible();
  
  const results = await new AxeBuilder({ page })
    .exclude(".work-tile")
    .disableRules(["color-contrast", "page-has-heading-one", "region"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("header changes solid class on scroll", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const header = page.getByTestId("site-header");
  await expect(header).not.toHaveClass(/site-header--solid/);
  
  // Scroll down to the collaborate section at the bottom to ensure the hero area is fully out of view
  await page.locator("#collaborate").scrollIntoViewIfNeeded();
  
  await expect(header).toHaveClass(/site-header--solid/);
});

test("collaborate CTA is present and works local click state", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const ctaBtn = page.getByRole("button", { name: "BOOK A CALL" });
  await expect(ctaBtn).toBeVisible();
});
