const { chromium } = require('playwright'); 
import { ReportPortal } from '@pages/reportPortal';
import { logger } from '@core/utils/logger';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export async function loginSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const locatorAdapter = new LocatorAdapter(page);
    const reportPortal = new ReportPortal(page, locatorAdapter);
  
    await page.goto(process.env.REPORT_PORTAL_URL);
    await reportPortal.loginPage.login();
    await page.context().storageState({ path: 'state.json' });
    logger.info('State is stored');
  
    await page.close();
    await context.close();
    await browser.close();
  }
  
  loginSetup();