import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', { outputFolder: '../reports/html-report' }],
  ['allure-playwright', { outputFolder: 'reports/allure-results' }]],

  use: {
    navigationTimeout: 15000,
    actionTimeout: 15000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport:{width:1280,height:720},
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      
    },
  ],

});
