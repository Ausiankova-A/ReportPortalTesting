import { expect } from '@playwright/test';
import { getPageFactory } from '@core/set-up/mochaHooks';

describe('Deliting existing Dashboard', () => {
  const dashboardName = `ForDeletion-${Date.now()}`;

  it('User is able to delete a dashboard',async () => {
    const pageFactory = getPageFactory(); 

    await pageFactory.reportPortal.tabs.dashboards.click();
    await expect(pageFactory.dashboardsPage.title).toBeVisible();
    await pageFactory.dashboardsPage.addNewDashboardButton.first().click();
    await expect(pageFactory.dashboardsPage.addNewDashboard.nameField).toBeVisible();
    await pageFactory.dashboardsPage.addNewDashboard.nameField.fill(dashboardName);
    await pageFactory.dashboardsPage.addNewDashboard.addButton.click();
    await expect(pageFactory.dashboardsPage.addNewDashboard.addNewWidgetButton).toBeVisible();
    await pageFactory.reportPortal.tabs.dashboards.click();
    await expect(pageFactory.dashboardsPage.tableName.filter({ hasText: dashboardName })).toBeVisible();
    await pageFactory.dashboardsPage.tableRow.filter({ hasText: dashboardName }).deleteDashboard.click();
    await pageFactory.dashboardsPage.deleteconfirmation.click();
    await expect(pageFactory.dashboardsPage.tableName.filter({ hasText: dashboardName })).toBeHidden();
    });
  });