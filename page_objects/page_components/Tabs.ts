import { BasePage } from '@pages/baseInterface/basePage';
import dotenv from 'dotenv';

dotenv.config();

export class Tabs extends BasePage{
    // dashboards = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/dashboard"]');
    // launches = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/launches"]');
    // filters = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/filters"]');
    // debug = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/userdebug/all"]');
    // members = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/members"]');
    // settings = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N a[href="#default_personal/settings"]');

    dashboards = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${process.env.DASHBOARD_NAME}/dashboard"]`);
    launches = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${process.env.DASHBOARD_NAME}/launches"]`);
    filters = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${process.env.DASHBOARD_NAME}/filters"]`);
    debug = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${process.env.DASHBOARD_NAME}/userdebug/all"]`);
    members = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${process.env.DASHBOARD_NAME}/members"]`);
    settings = this.page.locator(`.sidebarButton__sidebar-nav-btn--gbV_N a[href="#${process.env.DASHBOARD_NAME}/settings"]`);
    }