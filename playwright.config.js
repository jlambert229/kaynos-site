import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/e2e/results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "tests/e2e/report" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npx vite preview --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    /* ---- Desktop browsers ---- */
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    /* ---- Mobile viewports ---- */
    {
      name: "ios-safari",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "ios-safari-landscape",
      use: {
        ...devices["iPhone 14 landscape"],
      },
    },
    {
      name: "ipad",
      use: { ...devices["iPad (gen 7)"] },
    },
    {
      name: "android-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
