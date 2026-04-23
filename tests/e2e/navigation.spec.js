import { test, expect } from "@playwright/test";

test.describe("Site navigation", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Kaynos/i);
  });

  test("navbar links are visible on desktop", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "Desktop nav hidden on mobile");
    await page.goto("/");
    await expect(page.locator(".navbar-links")).toBeVisible();
    await expect(page.locator('.navbar-links >> text="Features"')).toBeVisible();
    await expect(page.locator('.navbar-links >> text="Pricing"')).toBeVisible();
    await expect(page.locator('.navbar-links >> text="Demos"')).toBeVisible();
  });

  test("mobile menu opens and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu only on small screens");
    await page.goto("/");
    const toggle = page.locator(".mobile-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator(".mobile-menu.open")).toBeVisible();
    // Close with the X button
    await page.locator(".mobile-close").click();
    await expect(page.locator(".mobile-menu.open")).not.toBeVisible();
  });

  test("hash navigation scrolls to sections", async ({ page }) => {
    await page.goto("/");
    await page.locator('a[href="#features"]').first().click();
    await expect(page.locator("#features")).toBeInViewport();
  });

  test("internal page navigation works", async ({ page }) => {
    const routes = [
      { path: "/contact", heading: /get in touch/i },
      { path: "/changelog", heading: /what's new/i },
      { path: "/privacy", heading: /privacy policy/i },
      { path: "/getting-started", heading: /up and running/i },
      { path: "/accessibility", heading: /accessibility/i },
    ];
    for (const { path, heading } of routes) {
      await page.goto(path);
      await expect(page.locator("h1").first()).toContainText(heading);
    }
  });

  test("404 page renders for unknown route", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.locator("text=404")).toBeVisible();
  });
});
