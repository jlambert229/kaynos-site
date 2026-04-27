import { test, expect } from "@playwright/test";

/**
 * Both forms POST to "/" and rely on Netlify's form handler in production.
 * In `vite preview` the POST hits a static file server, so we use page.route()
 * to mock the response and exercise the success and error UI states.
 */

test.describe("Contact form", () => {
  test("blocks submit and shows field errors when required fields are empty", async ({ page }) => {
    await page.goto("/contact");
    // The submit button has type="submit"; with required attributes set, the
    // browser stops the submit and surfaces native validation. Validate that
    // the form did not transition to its success state.
    await page.locator(".contact-submit").click();
    await expect(page.locator(".contact-success")).toHaveCount(0);
    await expect(page.locator("form.contact-form")).toBeVisible();
  });

  test("shows custom error when email format is invalid", async ({ page }) => {
    await page.goto("/contact");
    // Fill name + invalid email + message, then bypass native email validation
    // by removing the type="email" before submitting so client-side validate()
    // runs and shows the custom message.
    await page.locator("#contact-name").fill("Test User");
    await page.locator("#contact-email").evaluate((el) => el.setAttribute("type", "text"));
    await page.locator("#contact-email").fill("not-an-email");
    await page.locator("#contact-msg").fill("Hello there.");
    await page.locator(".contact-submit").click();
    await expect(page.locator(".contact-error", { hasText: /valid email/i })).toBeVisible();
  });

  test("transitions to success state on a 200 response", async ({ page }) => {
    await page.route("**/", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({ status: 200, body: "" });
      } else {
        await route.continue();
      }
    });
    await page.goto("/contact");
    await page.locator("#contact-name").fill("Test User");
    await page.locator("#contact-email").fill("test@example.com");
    await page.locator("#contact-msg").fill("This is a test message.");
    await page.locator(".contact-submit").click();
    await expect(page.locator(".contact-success")).toBeVisible();
    await expect(page.locator(".contact-success h2")).toContainText(/got it/i);
  });

  test("shows error state on a non-2xx response", async ({ page }) => {
    await page.route("**/", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({ status: 500, body: "" });
      } else {
        await route.continue();
      }
    });
    await page.goto("/contact");
    await page.locator("#contact-name").fill("Test User");
    await page.locator("#contact-email").fill("test@example.com");
    await page.locator("#contact-msg").fill("This is a test message.");
    await page.locator(".contact-submit").click();
    await expect(page.locator(".contact-form-error")).toBeVisible();
    await expect(page.locator("form.contact-form")).toBeVisible();
  });
});

test.describe("Newsletter form", () => {
  test("requires consent checkbox before submit", async ({ page }) => {
    await page.goto("/");
    const form = page.locator("form[name='newsletter']");
    await form.scrollIntoViewIfNeeded();
    await form.locator(".newsletter-input").fill("test@example.com");
    await form.locator(".newsletter-btn").click();
    // Native required validation prevents transition to success state.
    await expect(page.locator(".newsletter-success")).toHaveCount(0);
  });

  test("transitions to success state on a 200 response", async ({ page }) => {
    await page.route("**/", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({ status: 200, body: "" });
      } else {
        await route.continue();
      }
    });
    await page.goto("/");
    const form = page.locator("form[name='newsletter']");
    await form.scrollIntoViewIfNeeded();
    await form.locator(".newsletter-input").fill("test@example.com");
    await form.locator("input[name='consent']").check();
    await form.locator(".newsletter-btn").click();
    await expect(page.locator(".newsletter-success")).toBeVisible();
  });

  test("shows error message on a non-2xx response", async ({ page }) => {
    await page.route("**/", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({ status: 500, body: "" });
      } else {
        await route.continue();
      }
    });
    await page.goto("/");
    const form = page.locator("form[name='newsletter']");
    await form.scrollIntoViewIfNeeded();
    await form.locator(".newsletter-input").fill("test@example.com");
    await form.locator("input[name='consent']").check();
    await form.locator(".newsletter-btn").click();
    await expect(page.locator(".newsletter-error")).toBeVisible();
  });
});
