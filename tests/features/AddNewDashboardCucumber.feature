Feature: Adding new dashboard on Report Portal

  Scenario Outline: As a user, I add new dashboard with different names and description
    Given I set unique name with prefix "<Prefix>" and today date as DashboardName
    When I click on "reportPortal > tabs > dashboards" button
    And I click on "dashboardsPage > addNewDashboardButton" button
    And I fill in "dashboardsPage > addNewDashboard > nameField" field with "DashboardName"
    And I fill in "dashboardsPage > addNewDashboard > descriptionField" field with "<Description>"
    And I click on "dashboardsPage > addNewDashboard > addButton" button
    Then I expect element "dashboardsPage > addNewDashboard > addNewWidgetButton" is visible
    When I click on "reportPortal > tabs > dashboards" button
    Then I expect element "dashboardsPage > tableName" with text "DashboardName" is visible

  Examples:
    | Prefix       | Description              |
    | TestA        | This is first dashboard  |
    | Automation   | Automation description   |
    | DemoDash     | Dashboard for demo       |
