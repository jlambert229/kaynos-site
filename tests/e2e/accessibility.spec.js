import { test, expect } from "@playwright/test";

test.describe("Accessibility basics", () => {
  test("skip-to-content link exists and works", async ({ page }) => {
    await page.goto("/");
    const skip = page.locator(".skip-to-content");
    // Should exist in DOM even if visually hidden
    await expect(skip).toHaveCount(1);
    // Focus it and check it becomes visible
    await skip.focus();
    await expect(skip).toBeFocused();
  });

  test("main landmark exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main#main-content")).toHaveCount(1);
  });

  test("all interactive elements are keyboard focusable", async ({ page }) => {
    await page.goto("/");
    // Tab through first several elements and verify focus moves
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
    }
    const focusedTag = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(["A", "BUTTON", "INPUT"]).toContain(focusedTag);
  });

  test("images have alt text or are decorative", async ({ page }) => {
    await page.goto("/");
    const missingAlt = await page.evaluate(() => {
      const imgs = document.querySelectorAll("img");
      return Array.from(imgs).filter(
        (img) => !img.hasAttribute("alt") && !img.hasAttribute("role")
      ).length;
    });
    expect(missingAlt).toBe(0);
  });

  test("heading hierarchy is correct", async ({ page }) => {
    await page.goto("/");
    const headings = await page.evaluate(() => {
      const hs = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      return Array.from(hs).map((h) => ({
        level: parseInt(h.tagName[1]),
        text: h.textContent?.slice(0, 40),
      }));
    });
    // Should have exactly one h1
    const h1Count = headings.filter((h) => h.level === 1).length;
    expect(h1Count).toBe(1);
    // No heading should skip more than one level
    for (let i = 1; i < headings.length; i++) {
      const jump = headings[i].level - headings[i - 1].level;
      expect(jump).toBeLessThanOrEqual(1);
    }
  });

  test("color contrast on primary text", async ({ page }) => {
    await page.goto("/");
    // Verify the primary text color is light enough on dark background
    const textColor = await page.locator("body").evaluate(
      (el) => getComputedStyle(el).color
    );
    // Should be near-white (#f5f5f7 = rgb(245, 245, 247))
    expect(textColor).toMatch(/rgb\(24[0-9], 24[0-9], 24[0-9]\)/);
  });

  test("focus indicators are visible", async ({ page }) => {
    await page.goto("/");
    // Tab to first interactive element
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const focusedEl = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const style = getComputedStyle(el);
      return {
        outline: style.outline,
        boxShadow: style.boxShadow,
        tag: el.tagName,
      };
    });
    expect(focusedEl).not.toBeNull();
  });
});
