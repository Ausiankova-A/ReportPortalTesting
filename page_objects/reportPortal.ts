import { BasePage } from '@core/ui/basePage';
import { LoginPage } from '@pages/LoginPage';
import { Tabs } from '@pages/page_components/Tabs';

export class ReportPortal extends BasePage{
    loginPage = new LoginPage(this.page);
    tabs = new Tabs(this.page);
}