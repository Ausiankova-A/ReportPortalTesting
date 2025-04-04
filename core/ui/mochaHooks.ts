import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { LoginPage } from '@pages/LoginPage'

import dotenv from 'dotenv';

dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;

before(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  if (!process.env.REPORT_PORTAL_URL) {
    throw new Error('Environment variable REPORT_PORTAL_URL is not set');
} 
  const loginPage = new LoginPage(page);
  await page.goto(process.env.REPORT_PORTAL_URL);
  await loginPage.login();
  await page.context().storageState({ path: 'state.json' });
  await page.close();
  await context.close();
});

beforeEach(async function () {
  const storageState = 'state.json';
  context = await browser.newContext({ storageState });
  page = await context.newPage();
});

afterEach(async function () {
  if (page) {
    await page.close();
  }
});

after(async function () {
  if (browser) {
    await browser.close(); 
  }
});

export function getPage() {
  return page;
}