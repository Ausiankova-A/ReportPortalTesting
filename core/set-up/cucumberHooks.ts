import {
    BeforeAll,
    Before,
    After,
} from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { loginSetup } from '@core/configuration/login-setup';
import { PageFactory } from '@pages/PageFactory';
import { logger } from '@core/utils/logger';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

import dotenv from 'dotenv';
dotenv.config();

BeforeAll({ timeout: 60_000 },async () => {
  await loginSetup();
});

Before({ timeout: 20000 }, async function(){
      const storageState = 'state.json';
      this.browser = await chromium.launch({ headless: false });
      this.context = await this.browser.newContext({ storageState });
      this.page = await this.context.newPage();
      const locatorAdapter = new LocatorAdapter(this.page);
      this.pageFactory = new PageFactory(this.page, locatorAdapter);
      this.testData = {};

      if (!process.env.REPORT_PORTAL_URL) {
          throw new Error('Environment variable REPORT_PORTAL_URL is not set');
        }
      await this.page.goto(process.env.REPORT_PORTAL_URL);
      logger.info(`User opened page ${process.env.REPORT_PORTAL_URL}`);
});

After(async function() {
  if (this.page) {
    await this.page.close();
    logger.info('Page is closed');
  }
  if (this.context) {
    await this.context.close();
    logger.info('Context is closed');
  }
  if (this.browser) {
    await this.browser.close();
    logger.info('Browser is closed');
  }
});