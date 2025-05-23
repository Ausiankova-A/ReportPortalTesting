import { ReportPortal } from '@pages/reportPortal';
import { DashboardsPage } from '@pages/DashboardsPage';
import { LaunchesPage } from '@pages/LaunchesPage';
import { FiltersPage } from '@pages/FiltersPage';
import { DebugPage } from '@pages/DebugPage';
import { ProjectMembersPage } from '@pages/ProjectMembersPage';
import { ProjectSettingsPage } from '@pages/ProjectSettingsPage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class PageFactory {
    public reportPortal: ReportPortal;
    public dashboardsPage: DashboardsPage;
    public launchesPage: LaunchesPage;
    public filtersPage: FiltersPage;
    public debugPage: DebugPage;
    public projectMembersPage: ProjectMembersPage;
    public projectSettingsPage: ProjectSettingsPage;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        this.reportPortal = new ReportPortal(page, locatorAdapter);
        this.dashboardsPage = new DashboardsPage(page, locatorAdapter);
        this.launchesPage = new LaunchesPage(page, locatorAdapter);
        this.filtersPage = new FiltersPage(page, locatorAdapter);
        this.debugPage = new DebugPage(page, locatorAdapter);
        this.projectMembersPage = new ProjectMembersPage(page, locatorAdapter);
        this.projectSettingsPage = new ProjectSettingsPage(page, locatorAdapter);
    }
}
