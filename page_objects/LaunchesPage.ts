import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class LaunchesPage extends BasePage {
    addFilterButton: any;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        this.addFilterButton = this.locatorAdapter.getLocator(
            '.launchFiltersToolbar__add-filter-button--Hgtlm'
        );
    }
}
