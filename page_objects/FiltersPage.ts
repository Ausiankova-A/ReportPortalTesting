import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class FiltersPage extends BasePage {
    addFilterButton: any;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        this.addFilterButton = this.locatorAdapter.getLocator(
            '.ghostButton__ghost-button--r7c9T'
        );
    }
}
