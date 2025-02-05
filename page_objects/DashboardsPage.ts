import { BasePage } from '@core/basePage';
import { AddNewDashboard } from '@pages/AddNewDashboard';

export class DashboardsPage extends BasePage{
    title = this.page.locator(`span[title="All Dashboards"]`);
    addNewDashboardButton = this.page.locator(`.ghostButton__mobile-minified--d60VQ`);

   
    addNewDashboard = new AddNewDashboard(this.page); 
    }
