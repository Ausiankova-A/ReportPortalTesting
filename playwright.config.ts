import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwrightTests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'], 
    ['json', { outputFile: 'results.json' }], 
    ['allure-playwright'],
  ],
  use: {
    trace: 'on',
    screenshot: 'on', 
    storageState: 'state.json', 
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        headless: false,
       },
    },
  ],

});
