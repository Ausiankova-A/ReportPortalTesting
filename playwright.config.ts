import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // reporter: 'html',
  reporter: [
    ['list'], // Стандартный вывод в консоль
    ['json', { outputFile: 'results.json' }], // JSON-отчет
    ['allure-playwright'], // Allure-репортер
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
