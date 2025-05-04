import { expect } from '@playwright/test';
import test from '@core/configuration/fixtures';

test.describe('User check that tabs are openning', () => {
    test('Check tabs', async ({ reportPortal, dashboardsPage, launchesPage, filtersPage, debugPage, projectMembersPage, projectSettingsPage }) => {

      await test.step('open Dashboard tab', async () => {
        await reportPortal.tabs.dashboards.click();
        await expect(dashboardsPage.title).toBeVisible();
      });

      await test.step('open Launches tab', async () => {
        await reportPortal.tabs.launches.click();
        await expect(launchesPage.addFilterButton).toBeVisible();
      });

      await test.step('open Filters tab', async () => {
        await reportPortal.tabs.filters.click();
        await expect(filtersPage.addFilterButton).toBeVisible();
      });

      await test.step('open Debug tab', async () => {
        await reportPortal.tabs.debug.click();
        await expect(debugPage.launchNameField).toBeVisible();
      });

      await test.step('open ProjectMembers tab', async () => {
        await reportPortal.tabs.members.click();
        await expect(projectMembersPage.title).toBeVisible();
      });

      await test.step('open Project Settings tab', async () => {
        await reportPortal.tabs.settings.click();
        await expect(projectSettingsPage.title).toBeVisible();
      });
    });
  });