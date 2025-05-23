import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class AddNewDashboard extends BasePage {
    nameField: any;
    descriptionField: any;
    addButton: any;
    updateButton: any;
    addNewWidgetButton: any;
    addNewWidget: any;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        this.nameField = this.locatorAdapter.getLocator('input[placeholder="Enter dashboard name"]');
        this.descriptionField = this.locatorAdapter.getLocator('textarea[placeholder="Enter dashboard description"]');
        this.addButton = this.locatorAdapter.getLocator('button.bigButton__color-booger--EpRlL');
        this.updateButton = this.locatorAdapter.getLocator('button.bigButton__color-booger--EpRlL');
        this.addNewWidgetButton = this.locatorAdapter.getLocator('div.addDashboardButton__add-dashboard-btn--acseh button.ghostButton__ghost-button--r7c9T');
        this.addNewWidget = this.locatorAdapter.getLocator('.dashboardItemPage__buttons-block--QoL50:first-of-type button');
    }

    get widgetsNames(){
        return this.locatorAdapter.getLocators('.widgetHeader__widget-name-block--AOAHS');
    }

    get widgetHeaderLocator() {
            return this.locatorAdapter.getLocators('.widgetHeader__widget-header--ZGtj9');
    }

    async getWidgetHeaderCollection(): Promise<any> {
        const locator = await this.widgetHeaderLocator; 
        if (process.env.TEST_FRAMEWORK === 'wdio') {
            const module = await import('@pages/baseInterface/WDIOcollection');
           const WDIOCollection = module.WDIOCollection;
            return new WDIOCollection(Promise.resolve(locator), HeaderRow, this.locatorAdapter);
        }
}
}
export class HeaderRow extends BasePage {
    deleteWidget: any;
    editWidget: any;

    constructor(locatorOrElement: any, locatorAdapter: any) {
        super(undefined, locatorAdapter);

        if (!locatorAdapter) throw new Error('LocatorAdapter is required');

        const isPlaywright = typeof locatorOrElement?.locator === 'function';

        if (isPlaywright) {
            this.deleteWidget = locatorOrElement.locator('div.widgetHeader__control--SQilp.widgetHeader__mobile-hide--CFUwl');
            this.editWidget = locatorOrElement.locator('div.widgetHeader__control--SQilp.widgetHeader__mobile-hide--CFUwl:first-of-type');
        } else {
            this.deleteWidget = locatorOrElement.$$('div.widgetHeader__control--SQilp.widgetHeader__mobile-hide--CFUwl');
            this.editWidget = locatorOrElement.$('div.widgetHeader__control--SQilp.widgetHeader__mobile-hide--CFUwl:first-of-type');
        }
    }
}
