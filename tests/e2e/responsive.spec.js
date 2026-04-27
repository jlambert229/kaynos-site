import { test, expect } from "@playwright/test";

test.describe("Responsive layout", () => {
  test("hero CTA buttons stack on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Layout test for mobile only");
    await page.goto("/");
    const ctaRow = page.locator(".hero-cta-row");
    // On mobile, buttons should stack — row height should be > a single button
    const buttons = ctaRow.locator(".btn, a.btn");
    const count = await buttons.count();
    if (count > 1) {
      const firstBox = await buttons.first().boundingBox();
      const lastBox = await buttons.last().boundingBox();
      // Stacked = last button top is below first button bottom
      expect(lastBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 5);
    }
  });

  test("feature cards stack in single column on small screens", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Layout test for mobile only");
    await page.goto("/");
    const features = page.locator("#features");
    await features.scrollIntoViewIfNeeded();
    const cards = features.locator(".feature-card");
    const count = await cards.count();
    if (count >= 2) {
      const first = await cards.first().boundingBox();
      const second = await cards.nth(1).boundingBox();
      // Stacked = second card below first (not side-by-side)
      expect(second.y).toBeGreaterThan(first.y + first.height - 5);
    }
  });

  test("footer columns reflow on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    // Footer grid should be visible
    await expect(footer.locator(".footer-grid")).toBeVisible();
  });

  test("no text truncation or overflow on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Overflow test for mobile only");
    await page.goto("/");
    const overflowElements = await page.evaluate(() => {
      const problems = [];
      const all = document.querySelectorAll("h1, h2, h3, p, span, a");
      for (const el of all) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0) continue;
        if (rect.right > window.innerWidth + 2) {
          problems.push({
            tag: el.tagName,
            text: el.textContent?.slice(0, 40),
            right: Math.round(rect.right),
            viewport: window.innerWidth,
          });
        }
      }
      return problems;
    });
    expect(overflowElements).toHaveLength(0);
  });

  test("comparison table is scrollable on small screens", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Table scroll test for mobile only");
    await page.goto("/");
    const wrap = page.locator(".cmp-table-wrap");
    await wrap.scrollIntoViewIfNeeded();
    const overflowX = await wrap.evaluate(
      (el) => getComputedStyle(el).overflowX
    );
    expect(overflowX).toBe("auto");
  });

  test("layout has no horizontal overflow at the 720px tablet-landscape boundary", async ({ page }) => {
    // The CSS jumps between 640 and 768 with nothing tuned for the in-between
    // tablet-landscape range. Catch any horizontal overflow that creeps in.
    await page.setViewportSize({ width: 720, height: 1024 });
    await page.goto("/");
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);

    // Hero, features, pricing, and the comparison wrapper should all stay
    // inside the viewport at this width.
    for (const selector of ["#hero", "#features", "#pricing", ".cmp-table-wrap"]) {
      const locator = page.locator(selector);
      await locator.first().scrollIntoViewIfNeeded();
      const right = await locator.first().evaluate((el) => Math.round(el.getBoundingClientRect().right));
      expect(right, `${selector} extends past viewport`).toBeLessThanOrEqual(720 + 1);
    }
  });
});
