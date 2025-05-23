import { waitForVisible, waitForClickable } from '@core/utils/waiters';
import { CustomElement } from '@core/CustomElement';

describe('Adding New Dashboard', function () {
    const dashboardName = `Test-${Date.now()}`;

    it('User is able to create a dashboard', async function (this: Mocha.Context) {
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
    });
});
