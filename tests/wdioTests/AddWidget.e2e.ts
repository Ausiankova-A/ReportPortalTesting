// import { waitForVisible, waitForClickable } from '@core/utils/waiters';
// import { CustomElement } from '@core/CustomElement';
// import { browser } from '@wdio/globals';
// import { hoverElement } from '@core/utils/jsActions';

// describe('Widgets', function () {
//     const widgetName = `Widget-${Date.now()}`;
//     const widgetDescription = `WidgetDescription-${Date.now()}`;

//     it('User is able to create, edit and delete widget', async function (this: Mocha.Context) {
//         const pageFactory = this.pageFactory;
// //adding new widget
//         await pageFactory.reportPortal.tabs.dashboards.click();
//         await waitForVisible(pageFactory.dashboardsPage.title);
//         await(await CustomElement.findElementByText(pageFactory.dashboardsPage.tableName,'DEMO DASHBOARD')).click();
//         await waitForClickable(pageFactory.dashboardsPage.addNewDashboard.addNewWidget);
//         await pageFactory.dashboardsPage.addNewDashboard.addNewWidget.click();
//         await (await CustomElement.findElementByText(pageFactory.dashboardsPage.addNewWidget.widgetType, 'Launch statistics chart')).click();
//         await pageFactory.dashboardsPage.addNewWidget.nextStepButton.click();
//         await pageFactory.dashboardsPage.addNewWidget.demoFilter.click();
//         await pageFactory.dashboardsPage.addNewWidget.nextStepButton.click();
//         await waitForVisible(pageFactory.dashboardsPage.addNewWidget.widgetName);
//         await pageFactory.dashboardsPage.addNewWidget.widgetName.setValue(widgetName);
//         await pageFactory.dashboardsPage.addNewWidget.addButton.click();  
//         await waitForClickable(pageFactory.dashboardsPage.addNewDashboard.addNewWidget);
//         await browser.pause(2000);
//         await CustomElement.expectElementContainingTextIsDisplayed(pageFactory.dashboardsPage.addNewDashboard.widgetsNames, widgetName);
// //editing new widget
//         await hoverElement(await CustomElement.findElementByText(pageFactory.dashboardsPage.addNewDashboard.widgetsNames, widgetName));
//         let widgets = await pageFactory.dashboardsPage.addNewDashboard.getWidgetHeaderCollection();
//         let newcreatedWidget = await widgets.find(async (el: any) => {
//             return (await el.getText()).includes(widgetName);
//         });
//         await waitForVisible(newcreatedWidget.editWidget);
//         await newcreatedWidget.editWidget.click();
//         await waitForVisible(pageFactory.dashboardsPage.addNewWidget.widgetDescription);
//         await pageFactory.dashboardsPage.addNewWidget.widgetDescription.setValue(widgetDescription);
//         await pageFactory.dashboardsPage.addNewWidget.saveButton.click(); 
//         await waitForClickable(pageFactory.dashboardsPage.addNewDashboard.addNewWidget);
// //deleting new widget
//         await hoverElement(await CustomElement.findElementByText(pageFactory.dashboardsPage.addNewDashboard.widgetsNames, widgetName));
//         await waitForVisible(newcreatedWidget.editWidget);
//         await newcreatedWidget.deleteWidget[1].click();
//         await pageFactory.dashboardsPage.deleteconfirmation.click();
//         await browser.pause(2000);
//         await CustomElement.expectElementContainingTextIsNOTDisplayed(pageFactory.dashboardsPage.addNewDashboard.widgetsNames, widgetName); 
//     });
// });
