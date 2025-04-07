import { expect } from '@playwright/test';
import { getPageFactory } from '@core/set-up/mochaHooks';

describe('Adding New Dashboard', () => { 
  const dashboardName = `Test-${Date.now()}`;
  
  it('User is able to create a dashboard',async () => {
    const pageFactory = getPageFactory(); 

    await pageFactory.reportPortal.tabs.dashboards.click();
    await expect(pageFactory.dashboardsPage.title).toBeVisible();
    await pageFactory.dashboardsPage.addNewDashboardButton.first().click();
    await expect(pageFactory.dashboardsPage.addNewDashboard.nameField).toBeVisible();
    await pageFactory.dashboardsPage.addNewDashboard.nameField.fill(dashboardName);
    await pageFactory.dashboardsPage.addNewDashboard.descriptionField.fill('Test description');
    await pageFactory.dashboardsPage.addNewDashboard.addButton.click();
    await expect(pageFactory.dashboardsPage.addNewDashboard.addNewWidgetButton).toBeVisible();
    await pageFactory.reportPortal.tabs.dashboards.click();
    await expect(pageFactory.dashboardsPage.tableName.filter({ hasText: dashboardName })).toBeVisible();
    });
  });