import { test as baseTest } from '@playwright/test';
import { ReportPortal } from '@pages/reportPortal';
import { DashboardsPage } from '@pages/DashboardsPage';
import { LaunchesPage } from '@pages/LaunchesPage';
import { FiltersPage } from '@pages/FiltersPage';
import { DebugPage } from '@pages/DebugPage';
import { ProjectMembersPage } from '@pages/ProjectMembersPage';
import { ProjectSettingsPage } from '@pages/ProjectSettingsPage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

type ReportPortalFixtures = {
    reportPortal: ReportPortal;
    dashboardsPage: DashboardsPage;
    launchesPage: LaunchesPage;
    filtersPage: FiltersPage;
    debugPage: DebugPage;
    projectMembersPage: ProjectMembersPage;
    projectSettingsPage: ProjectSettingsPage;
    locatorAdapter: LocatorAdapter;
}

const test = baseTest.extend<ReportPortalFixtures>({
    page: async ({ page }, use) => {
        if (!process.env.REPORT_PORTAL_URL) {
          throw new Error('Environment variable REPORT_PORTAL_URL is not set');
        }
        await page.goto(process.env.REPORT_PORTAL_URL);
        await use(page); 
      },

    locatorAdapter: async ({ page }, use) => {
    const adapter = new LocatorAdapter(page);
    await use(adapter);
  },

    reportPortal: async ({ page, locatorAdapter  }, use) => {
        const reportPortal = new ReportPortal(page, locatorAdapter);
        await use(reportPortal);
    },
    dashboardsPage: async ({ page, locatorAdapter  }, use) => {
        const dashboardsPage = new DashboardsPage(page, locatorAdapter );
        await use(dashboardsPage);
    },
    launchesPage: async ({ page, locatorAdapter  }, use) => {
        const launchesPage = new LaunchesPage(page, locatorAdapter );
        await use(launchesPage);
    },
    filtersPage: async ({ page, locatorAdapter  }, use) => {
        const filtersPage = new FiltersPage(page, locatorAdapter );
        await use(filtersPage);
    },
    debugPage: async ({ page, locatorAdapter  }, use) => {
        const debugPage = new DebugPage(page, locatorAdapter );
        await use(debugPage);
    },
    projectMembersPage: async ({ page, locatorAdapter  }, use) => {
        const projectMembersPage = new ProjectMembersPage(page, locatorAdapter );
        await use(projectMembersPage);
    },
    projectSettingsPage: async ({ page, locatorAdapter  }, use) => {
        const projectSettingsPage = new ProjectSettingsPage(page, locatorAdapter );
        await use(projectSettingsPage);
    },
});

export const { expect } = baseTest;
export default test;