const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'html',
  timeout: 60000, // 60 seconds timeout per test

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: undefined,

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    // Video recording settings
    video: {
      mode: 'on', // Record video for all tests
      size: { width: 1280, height: 720 }
    },

    // Screenshot settings
    screenshot: 'on', // Take screenshot on failure

    // Viewport size
    viewport: { width: 1280, height: 720 }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Output folder for videos and traces
  outputDir: 'test-results/',
});
