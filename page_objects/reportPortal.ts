import { BasePage } from '@core/set-up/basePage';
import { LoginPage } from '@pages/LoginPage';
import { Tabs } from '@pages/page_components/Tabs';

export class ReportPortal extends BasePage{
    loginPage = new LoginPage(this.page);
    tabs = new Tabs(this.page);
}