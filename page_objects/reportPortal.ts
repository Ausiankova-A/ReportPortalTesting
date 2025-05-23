import { BasePage } from '@pages/baseInterface/basePage';
import { LoginPage } from '@pages/LoginPage';
import { Tabs } from '@pages/page_components/Tabs';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class ReportPortal extends BasePage {
    loginPage: LoginPage;
    tabs: Tabs;
    locatorAdapter: LocatorAdapter;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);
        this.locatorAdapter = locatorAdapter;

        this.loginPage = new LoginPage(page, locatorAdapter);
        this.tabs = new Tabs(page, locatorAdapter);
    }
}
