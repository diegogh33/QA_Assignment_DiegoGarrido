import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL || "http://localhost:8080";

export default defineConfig({
  testDir: "./tests",
  retries: 1,
  workers: 4,
  timeout: 15000,
  expect: {
    timeout: 3000,
  },
  reporter: "html",
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  projects: [
    // {
    //   name: "Safari",
    //   use: {
    //     browserName: "webkit",
    //     headless: false,
    //     screenshot: "on", //'on', 'off', 'only-on-failure'
    //     trace: "on", //'on', 'off', 'retain-on-failure'
    //     ...devices["iPhone 12"],
    //   },
    // },
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        headless: true,
        screenshot: "on", //'on', 'off', 'only-on-failure'
        trace: "on", //'on', 'off', 'retain-on-failure'
        ignoreHttpsErrors: true,
        permissions: ["geolocation"],
        video: "retain-on-failure",
        testDir: "tests/ui/specs", // Point to your UI tests
        // viewport: { width: 720, height: 720 },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        headless: true,
        screenshot: "on", //'on', 'off', 'only-on-failure'
        trace: "on", //'on', 'off', 'retain-on-failure'
        ignoreHttpsErrors: true,
        permissions: ["geolocation"],
        video: "on",
        testDir: "tests/ui/specs", // Point to your UI tests
        // viewport: { width: 720, height: 720 },
      },
    },
    // API Project
    {
      name: "api",
      testDir: "tests/api/tests", // Point to your API tests directory
      use: {
        headless: true, // API tests don't require a browser UI
      },
    },
  ],
});
