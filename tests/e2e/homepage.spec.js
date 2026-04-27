import { test, expect } from "@playwright/test";
import { URLS } from "../../src/config/urls.js";
import { COACH_MONTHLY_PRICE } from "../../src/config/pricing.js";

test.describe("Homepage sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero section renders with CTA pointing at signup", async ({ page }) => {
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator("h1")).toContainText(/video review for bjj coaches/i);
    const trialCta = hero.getByRole("link", { name: /start 14-day trial/i });
    await expect(trialCta).toBeVisible();
    await expect(trialCta).toHaveAttribute("href", URLS.signup);
    const demoCta = hero.getByRole("link", { name: /see a demo/i });
    await expect(demoCta).toBeVisible();
    await expect(demoCta).toHaveAttribute("href", URLS.demoCoach);
  });

  test("features section loads", async ({ page }) => {
    const section = page.locator("#features");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator("h2")).toContainText(/what you get/i);
    const cards = section.locator(".feature-card");
    await expect(cards).toHaveCount(6);
  });

  test("pricing section renders with plan price and CTA pointing at signup", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await pricing.scrollIntoViewIfNeeded();
    await expect(pricing).toBeVisible();
    // Assert against the pricing constant rather than a generic regex so a
    // mismatch between config and copy fails this test loudly.
    await expect(pricing.locator(".pricing-amount")).toContainText(`$${COACH_MONTHLY_PRICE}`);
    const trialCta = pricing.getByRole("link", { name: /start 14-day trial/i });
    await expect(trialCta).toBeVisible();
    await expect(trialCta).toHaveAttribute("href", URLS.signup);
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
