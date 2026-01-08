import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
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
      use: {
        ...devices['Desktop Chrome'],
  
        viewport: { width: 1440, height: 900 },
        launchOptions: {
          args: ['--window-size=1440,900', '--force-device-scale-factor=1'],
        },
      },
    },
  ]});
