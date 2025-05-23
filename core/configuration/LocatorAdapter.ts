import { $, $$ } from '@wdio/globals';

type Framework = 'playwright' | 'wdio';

export class LocatorAdapter {
    private framework: Framework;

    constructor(private page?: any) {
        const fw = process.env.TEST_FRAMEWORK?.toLowerCase();
        if (fw === 'playwright' || fw === 'wdio') {
            this.framework = fw;
        } else {
            throw new Error(
                'Invalid TEST_FRAMEWORK value in .env. Use "playwright" or "wdio".'
            );
        }
    }

    getLocator(selector: string): any {
        if (this.framework === 'playwright') {
            return this.page.locator(selector);
        } else if (this.framework === 'wdio') {
            return $(selector);
        } else {
            throw new Error(`Unsupported framework: ${this.framework}`);
        }
    }

    getLocators(selector: string) {
        if (this.framework === 'playwright') {
            return this.page.locator(selector);
        } else if (this.framework === 'wdio') {
            return $$(selector);
        } else {
            throw new Error(`Unsupported framework: ${this.framework}`);
        }
    }
}
