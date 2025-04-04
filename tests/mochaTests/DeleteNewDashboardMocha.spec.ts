import { expect } from '@playwright/test';
import { getPage } from '@core/ui/mochaHooks';
import { PageFactory } from '@pages/PageFactory';

import dotenv from 'dotenv';

dotenv.config();

describe('Deliting existing Dashboard', () => {
  let pageFactory: PageFactory;

  beforeEach(async () => {
    const page = getPage(); 
    pageFactory = new PageFactory(page); 
    if (!process.env.REPORT_PORTAL_URL) {
      throw new Error('Environment variable REPORT_PORTAL_URL is not set');
    }
    await page.goto(process.env.REPORT_PORTAL_URL);
  });

  it('User is able to delete a dashboard',async () => {
    await pageFactory.reportPortal.tabs.dashboards.click()
    await expect(pageFactory.dashboardsPage.title).toBeVisible();
    await pageFactory.dashboardsPage.addNewDashboardButton.first().click();
    await expect(pageFactory.dashboardsPage.addNewDashboard.nameField).toBeVisible();
    await pageFactory.dashboardsPage.addNewDashboard.nameField.fill('ForDeleting');
    await pageFactory.dashboardsPage.addNewDashboard.addButton.click();
    await expect(pageFactory.dashboardsPage.addNewDashboard.addNewWidgetButton).toBeVisible();
    await pageFactory.reportPortal.tabs.dashboards.click()
    await expect(pageFactory.dashboardsPage.tableName.filter({ hasText: "ForDeleting" })).toBeVisible();
    await pageFactory.dashboardsPage.tableRow.filter({ hasText: "ForDeleting" }).deleteDashboard.click();
    await pageFactory.dashboardsPage.deleteconfirmation.click();
    await expect(pageFactory.dashboardsPage.tableName.filter({ hasText: "ForDeleting" })).toBeHidden();
    });
  });