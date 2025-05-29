import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class DebugPage extends BasePage {
    launchNameField: any;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        this.launchNameField = this.locatorAdapter.getLocator(
            '.fieldFilterEntity__entity-input-holder--B3XuM'
        );
    }
}
