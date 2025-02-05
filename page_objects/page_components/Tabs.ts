import { BasePage } from '@core/basePage';

export class Tabs extends BasePage{
    dashboards = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#sap-saas/dashboard"]`);
    launches = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#sap-saas/launches"]`);
    filters = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#sap-saas/filters"]`);
    debug = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#sap-saas/userdebug/all"]`);
    members = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#sap-saas/members"]`);
    settings = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#sap-saas/settings"]`);
    }