import { expect } from '@playwright/test';
import test from '@core/configuration/fixtures';

test.describe('User adds new dashboard', () => {
  
  test.beforeEach(async ({ page}) => {
    await page.goto(process.env.REPORT_PORTAL_URL);
  });
  
    test('Adding new dashboard', async ({ reportPortal, dashboardsPage}) => {

      await test.step('open Dashboard tab', async () => {
        await reportPortal.tabs.dashboards.click();
        await expect(dashboardsPage.title).toBeVisible();
      });

      await test.step('click Add New Dashboard', async () => {
        await dashboardsPage.addNewDashboardButton.first().click();
        await expect(dashboardsPage.addNewDashboard.nameField).toBeVisible();
      });

      await test.step('Fill Name field', async () => {
        await dashboardsPage.addNewDashboard.nameField.fill('Test');
      });

      await test.step('Fill Description field', async () => {
        await dashboardsPage.addNewDashboard.descriptionField.fill('Test description');
      });

      await test.step('Click Add button', async () => {
        await dashboardsPage.addNewDashboard.addButton.click();
      });

      await test.step('Widget page opens', async () => {
        await expect(dashboardsPage.addNewDashboard.addNewWidgetButton).toBeVisible();
      });
    });
  });