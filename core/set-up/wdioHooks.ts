import { browser } from '@wdio/globals';
import { loginSetupWDIO } from '@core/configuration/wdio-login-setup';
import { logger } from '@core/utils/logger';
import { PageFactory } from '@pages/PageFactory';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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

    const dirPath = path.resolve('./errorShots');
    if (!fs.existsSync(dirPath)) {
      try {
        fs.mkdirSync(dirPath, { recursive: true });
        logger.info(`🗂 Created missing directory: ${dirPath}`);
      } catch (e) {
        logger.error(`❌ Failed to create directory: ${dirPath}`, e);
        return;
      }
    }

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${timestamp}-${testName?.replace(/\s+/g, '_')}.png`;
    const screenshotPath = path.join(dirPath, filename);

    try {
      await browser.saveScreenshot(screenshotPath);
      logger.info(`✅ Screenshot saved: ${screenshotPath}`);
    } catch (err) {
      logger.error(`❌ Failed to save screenshot to ${screenshotPath}:`, err);
    }
  } else {
    logger.info(`Test passed: ${testName}`);
  }
  },

  afterAll: async function () {
    logger.info('Testing is finished');
  }
};
