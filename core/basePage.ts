import { Page } from '@playwright/test';

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    locator(selector: string) {
        return this.page.locator(selector);
    }
}
