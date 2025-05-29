import { BasePage } from '@pages/baseInterface/basePage';
import { AddNewDashboard } from '@pages/AddNewDashboard';
import { AddNewWidget } from '@pages/AddNewWidget';
import { collection } from '@pages/baseInterface/collection';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';
import dotenv from 'dotenv';

dotenv.config();

export class DashboardsPage extends BasePage {
    title: any;
    addNewDashboardButton: any;
    table: any;
    tableRow: any;
    deleteconfirmation: any;
    addNewDashboard: AddNewDashboard;
    addNewWidget: AddNewWidget;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        this.title = this.locatorAdapter.getLocator('span[title="All Dashboards"]');
        this.addNewDashboardButton = this.locatorAdapter.getLocator('.ghostButton__mobile-minified--d60VQ');
        this.table = this.locatorAdapter.getLocator('[class*="dashboardTable__dashboard-table"]');
        this.tableRow = collection(this.locatorAdapter.getLocators('[class*="gridRow__grid-row-wrapper--xj8DG"]'), TableRow, this.locatorAdapter);
        this.deleteconfirmation = this.locatorAdapter.getLocator('[class*="bigButton__color-tomato"]');
        this.addNewDashboard = new AddNewDashboard(page, locatorAdapter);
        this.addNewWidget = new AddNewWidget(page, locatorAdapter);
    }

     get tableName(){
        return this.locatorAdapter.getLocators('[class*="dashboardTable__name"]');
    }
     get tableDesciption(){
        return this.locatorAdapter.getLocators('[class*="dashboardTable__description"]');
    }

    get tableRowLocator() {
        return this.locatorAdapter.getLocators('[class*="gridRow__grid-row-wrapper--xj8DG"]');
    }
    async getTableRowCollection(): Promise<any> {
    const locator = await this.tableRowLocator; 
    if (process.env.TEST_FRAMEWORK === 'wdio') {
        const module = await import('@pages/baseInterface/WDIOcollection');
       const WDIOCollection = module.WDIOCollection;
        return new WDIOCollection(Promise.resolve(locator), TableRow, this.locatorAdapter);
    }
}

}

export class TableRow extends BasePage {
    deleteDashboard: any;
    editDashboard: any;

    constructor(locatorOrElement: any, locatorAdapter: any) {
        super(undefined, locatorAdapter);

        if (!locatorAdapter) throw new Error('LocatorAdapter is required');

        const isPlaywright = typeof locatorOrElement?.locator === 'function';

        if (isPlaywright) {
            this.deleteDashboard = locatorOrElement.locator('[class*="dashboardTable__delete-cell"]');
            this.editDashboard = locatorOrElement.locator('[class*="dashboardTable__edit-cell"]');
        } else {
            this.deleteDashboard = locatorOrElement.$('[class*="dashboardTable__delete-cell"]');
            this.editDashboard = locatorOrElement.$('[class*="dashboardTable__edit-cell"]');
        }
    }
}

