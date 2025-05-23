import { browser } from '@wdio/globals';
import { loginSetupWDIO } from '@core/configuration/wdio-login-setup';
import { logger } from '@core/utils/logger';
import { PageFactory } from '@pages/PageFactory';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';
import dotenv from 'dotenv';

dotenv.config();

let pageFactory: PageFactory;
export const getPageFactory = () => {
  if (!pageFactory) {
    throw new Error('PageFactory is not initialized');
  }
  return pageFactory;
};

export const mochaHooks = {
  beforeAll: async function () {
    await loginSetupWDIO();
  },

  beforeEach: async function (this: Mocha.Context) {
    await browser.url(process.env.REPORT_PORTAL_URL || '');
    const locatorAdapter = new LocatorAdapter();
    pageFactory = new PageFactory(browser, locatorAdapter);
    this.pageFactory = pageFactory;
    logger.info(`User opened page ${process.env.REPORT_PORTAL_URL}`);
  },

  afterEach: async function (this: Mocha.Context) {
    const testName = this.currentTest?.title;
    const testStatus = this.currentTest?.state;

    if (testStatus === 'failed') {
      logger.error(`Test failed: ${testName}`);
      const screenshotPath = `./errorShots/${Date.now()}-${testName}.png`;
      await browser.saveScreenshot(screenshotPath);
      logger.info(`Screenshot saved: ${screenshotPath}`);
    } else {
      logger.info(`Test passed: ${testName}`);
    }
  },

  afterAll: async function () {
    logger.info('Testing is finished');
  }
};
