Feature: Editing dashboard from Report Portal

    Background:
        Given I set unique name with prefix "DEMO DASHBOARD description" and today date as dashboardDescription

    Scenario: As a user, I can edit dashboard
        When I click on "reportPortal > tabs > dashboards" button
        And I click on "dashboardsPage > addNewDashboardButton" button
        And I fill in "dashboardsPage > addNewDashboard > nameField" field with "For editing"
        And I click on "dashboardsPage > addNewDashboard > addButton" button
        Then I expect element "dashboardsPage > addNewDashboard > addNewWidgetButton" is visible
        When I click on "reportPortal > tabs > dashboards" button
        Then I expect element "dashboardsPage > tableName" with text "For editing" is visible
        When I edit element "dashboardsPage > tableRow" with text "For editing"
        And I fill in "dashboardsPage > addNewDashboard > descriptionField" field with "dashboardDescription"
        And I click on "dashboardsPage > addNewDashboard > updateButton" button
        Then I expect dashboard has the following data:
      | Name        | For editing |
      | Description | dashboardDescription |