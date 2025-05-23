import { browser } from '@wdio/globals';
import { ReportPortal } from '@pages/reportPortal';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export async function loginSetupWDIO() {
    const locatorAdapter = new LocatorAdapter();
    const reportPortal = new ReportPortal(browser, locatorAdapter);
    await browser.url(process.env.REPORT_PORTAL_URL || '');
    await reportPortal.loginPage.loginWdio();
}
