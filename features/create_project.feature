Feature: Create new project

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"

  @project1 @positive
  Scenario: [PRO-01] Verify that user can create a new "Scum" template project
    Given User is on work page
    When User selects "Create Project" option from "Project" dropdown list on header bar
    Then "Software development" page title is displayed
    When Users click on "Scrum" option
    Then "Scrum" page title is displayed
    When User clicks on "Use template" button
    Then "Choose a project type" page title is displayed
    When User clicks on "Select a team-managed project" button
    Then "Add project details" page title is displayed
    When User creates new project with project name as "<project_name>"
    Then A popup containing message "Jira project successfully created" is displayed

    Examples: 
      | project_name   |
      | Good project 1 |

  @project @negative
  Scenario: [PRO-01] Verify that user cannot create a new "Scrum" template project with empty project name and empty project key
    Given User is on work page
    When User selects "Create Project" option from "Project" dropdown list on header bar
    Then "Software development" page title is displayed
    When Users click on "Scrum" option
    Then "Scrum" page title is displayed
    When User clicks on "Use template" button
    Then "Choose a project type" page title is displayed
    When User clicks on "Select a team-managed project" button
    Then "Add project details" page title is displayed
    When User creates new project with empty project name and empty project key
    Then Warning message "Project must have a name" is displayed
    Then Warning message "Project must have a key" is displayed
