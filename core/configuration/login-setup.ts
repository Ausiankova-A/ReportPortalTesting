const { chromium } = require('playwright'); 
import { ReportPortal } from '@pages/reportPortal';

export async function loginSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const reportPortal = new ReportPortal(page);
  
    await page.goto(process.env.REPORT_PORTAL_URL);
    await reportPortal.loginPage.login();
    await page.context().storageState({ path: 'state.json' });
  
    await page.close();
    await context.close();
    await browser.close();
  }
  
  loginSetup();