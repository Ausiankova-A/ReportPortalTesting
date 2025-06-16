import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const RPconfig = {
  apiKey: process.env.RP_API_KEY,
  endpoint: 'https://reportportal.epam.com/api/v1',
  project: 'anastasiya_ausiankova_personal',
  launch: 'Playwright test cases',
  attributes: [
    { key: 'includeTestSteps', value: 'true' },
    { key: 'extendTestDescriptionWithLastError', value: 'true' },
    { key: 'uploadVideo', value: 'true' },
    { key: 'uploadTrace', value: 'true' },
  ],
  description: 'Running playwright test cases',
};


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
    ['@reportportal/agent-js-playwright', RPconfig],
  ],
  use: {
    trace: 'on',
    screenshot: 'on', 
    storageState: 'state.json', 
  },

  projects: [
    {
      name: 'playwrightTests',
      testDir: './tests/playwrightTests',
      use: { ...devices['Desktop Chrome'],
        headless: false,
       },
    },

    {
      name: 'api', 
      testDir: './tests/api', 
    },
  ],

});
