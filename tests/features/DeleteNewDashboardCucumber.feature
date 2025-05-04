Feature: Deleting dashboard from Report Portal

    Background:
        Given I set unique name with prefix "ForDeletion" and today date as DashboardName

    Scenario: As a user, I can delete dashboard
        When I click on "reportPortal > tabs > dashboards" button
        And I click on "dashboardsPage > addNewDashboardButton" button
        And I fill in "dashboardsPage > addNewDashboard > nameField" field with "DashboardName"
        And I fill in "dashboardsPage > addNewDashboard > descriptionField" field with "Test description"
        And I click on "dashboardsPage > addNewDashboard > addButton" button
        Then I expect element "dashboardsPage > addNewDashboard > addNewWidgetButton" is visible
        When I click on "reportPortal > tabs > dashboards" button
        Then I expect element "dashboardsPage > tableName" with text "DashboardName" is visible
        When I delete element "dashboardsPage > tableRow" with text "DashboardName"
        And I click on "dashboardsPage > deleteconfirmation" button
        Then I expect element "dashboardsPage > tableName" with text "DashboardName" is hidden
        But I expect element "dashboardsPage > tableName" with text "DEMO DASHBOARD" is visible