import { BasePage } from '@core/ui/basePage';

export class AddNewDashboard extends BasePage{
    nameField = this.page.locator('input[placeholder="Enter dashboard name"]');
    descriptionField = this.page.locator('textarea[placeholder="Enter dashboard description"]');
    addButton = this.page.locator('button.bigButton__color-booger--EpRlL');
    updateButton = this.page.locator('button.bigButton__color-booger--EpRlL');
        
   addNewWidgetButton = this.page.locator('div.addDashboardButton__add-dashboard-btn--acseh button.ghostButton__ghost-button--r7c9T');
    }