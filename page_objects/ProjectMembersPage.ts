import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class ProjectMembersPage extends BasePage {
    title: any;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        this.title = this.locatorAdapter.getLocator(
            'span[title="[object Object]"]'
        );
    }
}
