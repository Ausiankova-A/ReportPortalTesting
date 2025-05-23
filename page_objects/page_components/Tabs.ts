import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';
import dotenv from 'dotenv';

dotenv.config();

export class Tabs extends BasePage {
    dashboards: any;
    launches: any;
    filters: any;
    debug: any;
    members: any;
    settings: any;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        const dashboardName = process.env.DASHBOARD_NAME;

        this.dashboards = this.locatorAdapter.getLocator(
            `.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${dashboardName}/dashboard"]`
        );
        this.launches = this.locatorAdapter.getLocator(
            `.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${dashboardName}/launches"]`
        );
        this.filters = this.locatorAdapter.getLocator(
            `.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${dashboardName}/filters"]`
        );
        this.debug = this.locatorAdapter.getLocator(
            `.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${dashboardName}/userdebug/all"]`
        );
        this.members = this.locatorAdapter.getLocator(
            `.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${dashboardName}/members"]`
        );
        this.settings = this.locatorAdapter.getLocator(
            `.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${dashboardName}/settings"]`
        );
    }
}
