import { test as baseTest } from '@playwright/test';
import { ReportPortal } from '@pages/reportPortal';
import { DashboardsPage } from '@pages/DashboardsPage';
import { LaunchesPage } from '@pages/LaunchesPage';
import { FiltersPage } from '@pages/FiltersPage';
import { DebugPage } from '@pages/DebugPage';
import { ProjectMembersPage } from '@pages/ProjectMembersPage';
import { ProjectSettingsPage } from '@pages/ProjectSettingsPage';

type ReportPortalFixtures = {
    reportPortal: ReportPortal;
    dashboardsPage: DashboardsPage;
    launchesPage: LaunchesPage;
    filtersPage: FiltersPage;
    debugPage: DebugPage;
    projectMembersPage: ProjectMembersPage;
    projectSettingsPage: ProjectSettingsPage;
}

const test = baseTest.extend<ReportPortalFixtures>({
    reportPortal: async ({ page }, use) => {
        const reportPortal = new ReportPortal(page);
        await use(reportPortal);
    },
    dashboardsPage: async ({ page }, use) => {
        const dashboardsPage = new DashboardsPage(page);
        await use(dashboardsPage);
    },
    launchesPage: async ({ page }, use) => {
        const launchesPage = new LaunchesPage(page);
        await use(launchesPage);
    },
    filtersPage: async ({ page }, use) => {
        const filtersPage = new FiltersPage(page);
        await use(filtersPage);
    },
    debugPage: async ({ page }, use) => {
        const debugPage = new DebugPage(page);
        await use(debugPage);
    },
    projectMembersPage: async ({ page }, use) => {
        const projectMembersPage = new ProjectMembersPage(page);
        await use(projectMembersPage);
    },
    projectSettingsPage: async ({ page }, use) => {
        const projectSettingsPage = new ProjectSettingsPage(page);
        await use(projectSettingsPage);
    },
});

export const { expect } = baseTest;
export default test;