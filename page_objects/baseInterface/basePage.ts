import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class BasePage {
    protected page: any;
    protected locatorAdapter: LocatorAdapter;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        this.page = page;
        this.locatorAdapter = locatorAdapter;
    }
}
