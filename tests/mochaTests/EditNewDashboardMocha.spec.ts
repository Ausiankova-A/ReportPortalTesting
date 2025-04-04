import { expect } from '@playwright/test';
import { getPage } from '@core/ui/mochaHooks';
import { PageFactory } from '@pages/PageFactory';

import dotenv from 'dotenv';

dotenv.config();

describe('Edit existing Dashboard', () => {
  let pageFactory: PageFactory;

  beforeEach(async () => {
    const page = getPage(); 
    pageFactory = new PageFactory(page); 
    if (!process.env.REPORT_PORTAL_URL) {
      throw new Error('Environment variable REPORT_PORTAL_URL is not set');
    }
    await page.goto(process.env.REPORT_PORTAL_URL);
  });

  it('User is able to edit a dashboard',async () => {
    await pageFactory.reportPortal.tabs.dashboards.click();
    await expect(pageFactory.dashboardsPage.title).toBeVisible();
    await expect(pageFactory.dashboardsPage.tableName.filter({ hasText: 'DEMO DASHBOARD' })).toBeVisible();
    await pageFactory.dashboardsPage.tableRow.filter({ hasText: 'DEMO DASHBOARD' }).editDashboard.click();
    await pageFactory.dashboardsPage.addNewDashboard.descriptionField.clear();
    await pageFactory.dashboardsPage.addNewDashboard.descriptionField.fill('DEMO DASHBOARD description');
    await pageFactory.dashboardsPage.addNewDashboard.updateButton.click();
    await expect(pageFactory.dashboardsPage.tableDesciption.filter({ hasText: 'DEMO DASHBOARD description' })).toBeVisible();
    });
  });