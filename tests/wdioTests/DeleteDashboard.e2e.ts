import { waitForVisible, waitForClickable } from '@core/utils/waiters';
import { CustomElement } from '@core/CustomElement';

describe('Deleting Dashboard', function () {
    const dashboardName = `ForDeletion-${Date.now()}`;

    it('User is able to delete a dashboard', async function (this: Mocha.Context) {
        const pageFactory = this.pageFactory;

        await pageFactory.reportPortal.tabs.dashboards.click();
        await waitForVisible(pageFactory.dashboardsPage.title);
        await pageFactory.dashboardsPage.addNewDashboardButton.click();
        await waitForVisible(
            pageFactory.dashboardsPage.addNewDashboard.nameField
        );
        await pageFactory.dashboardsPage.addNewDashboard.nameField.setValue(
            dashboardName
        );
        await pageFactory.dashboardsPage.addNewDashboard.descriptionField.setValue(
            'Test description'
        );
        await pageFactory.dashboardsPage.addNewDashboard.addButton.click();
        await waitForVisible(
            pageFactory.dashboardsPage.addNewDashboard.addNewWidgetButton
        );
        await waitForClickable(pageFactory.reportPortal.tabs.dashboards);
        await pageFactory.reportPortal.tabs.dashboards.click();
        await waitForVisible(pageFactory.dashboardsPage.title);
        await CustomElement.expectElementContainingTextIsDisplayed(pageFactory.dashboardsPage.tableName, dashboardName);

        const dashboards = await pageFactory.dashboardsPage.getTableRowCollection();
        const dashboardForDelition = await dashboards.find(async (el: any) => {
            return (await el.getText()).includes(dashboardName);
        });
        await dashboardForDelition.deleteDashboard.click();
    
        await pageFactory.dashboardsPage.deleteconfirmation.click();
        await CustomElement.expectElementContainingTextIsNOTDisplayed(pageFactory.dashboardsPage.tableName, dashboardName);
    });
});
