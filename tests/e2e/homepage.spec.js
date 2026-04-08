import { test, expect } from "@playwright/test";

test.describe("Homepage sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero section renders with CTA", async ({ page }) => {
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator("h1")).toContainText(/coaching moments/i);
    await expect(hero.locator("text=Try It Free")).toBeVisible();
    await expect(hero.locator("text=See a Demo")).toBeVisible();
  });

  test("features section loads", async ({ page }) => {
    const section = page.locator("#features");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator("h2")).toContainText(/what you get/i);
    const cards = section.locator(".feature-card");
    await expect(cards).toHaveCount(4);
  });

  test("pricing section renders with toggle", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await pricing.scrollIntoViewIfNeeded();
    await expect(pricing).toBeVisible();
    // Monthly/Annual toggle
    const toggleBtns = pricing.locator(".pricing-toggle-btn");
    await expect(toggleBtns).toHaveCount(2);
  });

  test("calculator slider is interactive", async ({ page }) => {
    const calc = page.locator("#calculator");
    await calc.scrollIntoViewIfNeeded();
    const slider = calc.locator('input[type="range"]');
    await expect(slider).toBeVisible();
    // Drag slider and verify results update
    await slider.fill("10");
    await expect(calc.locator(".calc-result-value").first()).toBeVisible();
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
    await expect(footer.locator("text=Product")).toBeVisible();
    await expect(footer.locator("text=Resources")).toBeVisible();
    await expect(footer.locator("text=Legal")).toBeVisible();
  });
});
