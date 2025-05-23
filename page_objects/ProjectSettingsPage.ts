import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class ProjectSettingsPage extends BasePage {
    title: any;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        this.title = this.locatorAdapter.getLocator('.navigation__header--TkpQg');
    }
}
