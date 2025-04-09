import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { loginSetup } from '@core/configuration/login-setup';
import { PageFactory } from '@pages/PageFactory';
import { logger } from '@core/utils/logger';

import dotenv from 'dotenv';

dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let pageFactory: PageFactory;

before(async function () {
  await loginSetup();
});

beforeEach(async function () {
  browser = await chromium.launch({ headless: false });
  const storageState = 'state.json';
  context = await browser.newContext({ storageState });
  page = await context.newPage();
  pageFactory = new PageFactory(page); 
  if (!process.env.REPORT_PORTAL_URL) {
    throw new Error('Environment variable REPORT_PORTAL_URL is not set');
  }
  await page.goto(process.env.REPORT_PORTAL_URL);
  logger.info(`User opened page ${process.env.REPORT_PORTAL_URL}`);
});

afterEach(async function () {
  if (page) {
    await page.close();
    logger.info('Page is closed');
  }
});

after(async function () {
  if (browser) {
    await browser.close(); 
    logger.info('Browser is closed');
  }
});

export function getPageFactory() {
  return pageFactory;
}