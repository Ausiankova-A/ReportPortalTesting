import { ReportPortal } from '@pages/reportPortal';
import { DashboardsPage } from '@pages/DashboardsPage';
import { LaunchesPage } from '@pages/LaunchesPage';
import { FiltersPage } from '@pages/FiltersPage';
import { DebugPage } from '@pages/DebugPage';
import { ProjectMembersPage } from '@pages/ProjectMembersPage';
import { ProjectSettingsPage } from '@pages/ProjectSettingsPage';

export class PageFactory {
    public reportPortal: ReportPortal;
    public dashboardsPage: DashboardsPage;
    public launchesPage: LaunchesPage;
    public filtersPage: FiltersPage;
    public debugPage: DebugPage;
    public projectMembersPage: ProjectMembersPage;
    public projectSettingsPage: ProjectSettingsPage;

    constructor(page: any) {
        this.reportPortal = new ReportPortal(page);
        this.dashboardsPage = new DashboardsPage(page);
        this.launchesPage = new LaunchesPage(page);
        this.filtersPage = new FiltersPage(page);
        this.debugPage = new DebugPage(page);
        this.projectMembersPage = new ProjectMembersPage(page);
        this.projectSettingsPage = new ProjectSettingsPage(page);
    }
}
