import { test, expect } from "@playwright/test";

/* Round-4 audit: Plausible event tagging, comparison-table competitor
 * pricing removed (cherry-picked + drifts out of date), and the
 * /for/students "Safe for kids" card linking to /privacy#minors.
 *
 * These assertions guard against silent breakage of the event tags
 * (a class removal would silently un-track a CTA) and against a
 * regression that re-introduces competitor monthly prices.
 */

test.describe("Round-4 instrumentation", () => {
  test("primary CTAs carry Plausible event classes on the home page", async ({ page }) => {
    await page.goto("/");
    const trialClassed = page.locator("a.plausible-event-name\\=Signup");
    await expect(trialClassed.first()).toBeVisible();
    expect(await trialClassed.count()).toBeGreaterThanOrEqual(4);

    const demoCoachClassed = page.locator("a.plausible-event-name\\=Demo\\+Coach");
    await expect(demoCoachClassed.first()).toBeVisible();
    expect(await demoCoachClassed.count()).toBeGreaterThanOrEqual(3);

    const demoStudentClassed = page.locator("a.plausible-event-name\\=Demo\\+Student");
    await expect(demoStudentClassed.first()).toBeVisible();
    expect(await demoStudentClassed.count()).toBeGreaterThanOrEqual(1);
  });

  test("Plausible script is the tagged-events build", async ({ page }) => {
    await page.goto("/");
    const scriptSrc = await page
      .locator('script[src*="plausible.io"]')
      .getAttribute("src");
    expect(scriptSrc).toContain("script.tagged-events.js");
  });

  test("comparison table no longer surfaces cherry-picked competitor monthly prices", async ({ page }) => {
    await page.goto("/");
    const comparison = page.locator("#comparison");
    await comparison.scrollIntoViewIfNeeded();
    const headerText = await comparison.locator(".cmp-header").innerText();
    expect(headerText).not.toMatch(/\$50\/mo/);
    expect(headerText).not.toMatch(/\$30\/mo/);
    expect(headerText).toContain("CoachNow");
    expect(headerText).toContain("OnForm");
  });

  test("safe-for-kids card on /for/students links to the minors anchor", async ({ page }) => {
    await page.goto("/for/students");
    const link = page.getByRole("link", { name: /how we handle minors/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/privacy#minors");
  });

  test("minors anchor exists on /privacy", async ({ page }) => {
    await page.goto("/privacy#minors");
    const target = page.locator("#minors");
    await expect(target).toBeVisible();
    await expect(target.locator("h2")).toContainText(/children/i);
  });
});

/* Note on what is NOT tested here: actually firing a Plausible event POST
 * requires window.location.hostname to match data-domain="kaynos.net"
 * — Plausible's tagged-events.js refuses to send (and may not define
 * the global) on 127.0.0.1 / preview hosts by design, to keep dev data
 * out of prod stats. Verify the live event POST in the deploy preview
 * or production by clicking a Trial CTA and watching the network panel
 * for `POST plausible.io/api/event` with `n: "Signup"`. */
