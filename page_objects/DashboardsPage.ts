import { BasePage } from '@pages/baseInterface/basePage';
import { AddNewDashboard } from '@pages/AddNewDashboard';
import { collection } from '@pages/baseInterface/collection';

export class DashboardsPage extends BasePage{
    title = this.page.locator('span[title="All Dashboards"]');
    addNewDashboardButton = this.page.locator('.ghostButton__mobile-minified--d60VQ');
    table = this.page.locator('[class*="dashboardTable__dashboard-table"]');
    tableName = this.page.locator('[class*="dashboardTable__name"]');
    tableDesciption = this.page.locator('[class*="dashboardTable__description"]');

    tableRow = collection(this.page.locator('[class*="gridRow__grid-row-wrapper--xj8DG"]'), TableRow);

    deleteconfirmation = this.page.locator('[class*="bigButton__color-tomato"]');

    addNewDashboard = new AddNewDashboard(this.page); 
    }

    export class TableRow extends BasePage{
    deleteDashboard = this.page.locator('[class*="dashboardTable__delete-cell"]');
    editDashboard = this.page.locator('[class*="dashboardTable__edit-cell"]');
    }
