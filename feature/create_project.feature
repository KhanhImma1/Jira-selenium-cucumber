Feature: Create new project

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"
    Then User should navigate to homepage

  @project @positive
  Scenario: Verify that user can create a new "Scum" template project
    Given User is on work page "<url>"
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
      | url                                   | project_name    |
      | https://htk-entry-auto.atlassian.net/ | Best-Practise-3 |
