import { test, expect } from "@playwright/test";

test.describe("Homepage sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero section renders with CTA", async ({ page }) => {
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator("h1")).toContainText(/video review for bjj coaches/i);
    await expect(hero.getByText("Try It Free")).toBeVisible();
    await expect(hero.getByText("See a Demo")).toBeVisible();
  });

  test("features section loads", async ({ page }) => {
    const section = page.locator("#features");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator("h2")).toContainText(/what you get/i);
    const cards = section.locator(".feature-card");
    await expect(cards).toHaveCount(4);
  });

  test("pricing section renders with plan price and CTA", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await pricing.scrollIntoViewIfNeeded();
    await expect(pricing).toBeVisible();
    await expect(pricing.locator(".pricing-amount")).toContainText(/\$\d+/);
    await expect(pricing.getByText("Start 14-Day Trial")).toBeVisible();
  });

  test("FAQ items expand on click", async ({ page }) => {
    const faq = page.locator("#faq");
    await faq.scrollIntoViewIfNeeded();
    const firstQuestion = faq.locator(".faq-question").first();
    await firstQuestion.click();
    await expect(faq.locator(".faq-answer--open").first()).toBeVisible();
  });

  test("footer renders with all link columns", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.locator(".footer-col-title")).toHaveCount(3);
    await expect(footer.getByText("Product")).toBeVisible();
    await expect(footer.getByText("Resources")).toBeVisible();
    await expect(footer.getByText("Legal")).toBeVisible();
  });
});
