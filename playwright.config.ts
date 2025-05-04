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
      // name: 'chromium',
      name: 'playwrightTests',  // Название проекта для UI/API тестов
      testDir: './tests/playwrightTests',
      use: { ...devices['Desktop Chrome'],
        headless: false,
       },
    },

    {
      name: 'api',  // Название проекта для API тестов
      testDir: './tests/api',  // Папка для API тестов
      // use: {
      //   baseURL: 'https://api.example.com',  // Базовый URL для API тестов
      //   // Другие настройки, специфичные для API тестов
      // },
    },
  ],

});
