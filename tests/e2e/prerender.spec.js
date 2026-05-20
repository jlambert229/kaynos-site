import { test, expect } from "@playwright/test";

test.describe("Prerendered dist output", () => {
  test("contact page HTML includes prerendered title before hydration", async ({ page }) => {
    const response = await page.goto("/contact");
    expect(response?.ok()).toBeTruthy();
    const html = await page.content();
    expect(html).toMatch(/<title[^>]*>[^<]*contact[^<]*<\/title>/i);
  });

  test("getting-started page includes prerendered h1 text", async ({ page }) => {
    await page.goto("/getting-started");
    await expect(page.locator("h1").first()).toContainText(/up and running/i);
  });
});
