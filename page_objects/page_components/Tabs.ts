import { BasePage } from '@core/set-up/basePage';

export class Tabs extends BasePage{
    dashboards = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/dashboard"]');
    launches = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/launches"]');
    filters = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/filters"]');
    debug = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/userdebug/all"]');
    members = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/members"]');
    settings = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/settings"]');
    }