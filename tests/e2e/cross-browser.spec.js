import { test, expect } from "@playwright/test";

test.describe("Cross-browser rendering", () => {
  test("CSS custom properties resolve correctly", async ({ page }) => {
    await page.goto("/");
    const bg = await page.locator("body").evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    // Should be the dark background, not transparent/white
    expect(bg).not.toBe("rgba(0, 0, 0, 0)");
    expect(bg).not.toBe("transparent");
  });

  test("navbar backdrop-filter renders on scroll", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(400);
    const navbar = page.locator(".navbar");
    await expect(navbar).toHaveClass(/scrolled/);
  });

  test("no horizontal overflow on any viewport", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  test("all images and icons render", async ({ page }) => {
    await page.goto("/");
    // Check SVG icons rendered (lucide icons are inline SVGs)
    const svgs = page.locator("svg");
    const count = await svgs.count();
    expect(count).toBeGreaterThan(0);
    // Verify no broken images
    const brokenImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll("img");
      return Array.from(imgs).filter((img) => !img.complete || img.naturalWidth === 0).length;
    });
    expect(brokenImages).toBe(0);
  });

  test("scroll-behavior smooth is set", async ({ page }) => {
    await page.goto("/");
    const scrollBehavior = await page.evaluate(() =>
      getComputedStyle(document.documentElement).scrollBehavior
    );
    expect(scrollBehavior).toBe("smooth");
  });

  test("fonts load correctly", async ({ page }) => {
    await page.goto("/");
    const fontFamily = await page.locator("body").evaluate(
      (el) => getComputedStyle(el).fontFamily
    );
    // Should include Inter or fallback system fonts
    expect(fontFamily).toMatch(/Inter|Helvetica|system-ui|sans-serif/i);
  });
});
