import { expect } from '@playwright/test';
import { getPageFactory } from '@core/set-up/mochaHooks';

describe('Edit existing Dashboard', () => {
  const dashboardDescription = `DEMO DASHBOARD description-${Date.now()}`;

  it('User is able to edit a dashboard',async () => {
    const pageFactory = getPageFactory(); 

    await pageFactory.reportPortal.tabs.dashboards.click();
    await expect(pageFactory.dashboardsPage.title).toBeVisible();
    await expect(pageFactory.dashboardsPage.tableName.filter({ hasText: 'DEMO DASHBOARD' })).toBeVisible();
    await pageFactory.dashboardsPage.tableRow.filter({ hasText: 'DEMO DASHBOARD' }).editDashboard.click();
    await pageFactory.dashboardsPage.addNewDashboard.descriptionField.clear();
    await pageFactory.dashboardsPage.addNewDashboard.descriptionField.fill(dashboardDescription);
    await pageFactory.dashboardsPage.addNewDashboard.updateButton.click();
    await expect(pageFactory.dashboardsPage.tableDesciption.filter({ hasText: dashboardDescription })).toBeVisible();
    });
  });