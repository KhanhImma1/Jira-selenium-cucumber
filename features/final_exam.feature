Feature: Create new kanban project

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"

  @createkanbanproject
  Scenario: [FE-01] Verify that user can create a new project with "Kanban" template
    Given User is on work page
    When User selects "Create Project" option from "Project" dropdown list on header bar
    Then "Software development" page title is displayed
    When Users click on "Kanban" option
    Then "Kanban" page title is displayed
    When User clicks on "Use template" button
    Then "Choose a project type" page title is displayed
    When User clicks on "Select a team-managed project" button
    Then "Add project details" page title is displayed
    When User creates new project with project name as "<project_name>"
    Then A popup containing message "Jira project successfully created" is displayed
    When User view project's details
    When User deletes project "<project_name>" which has just created

    Examples: 
      | project_name                |
      | Final Exam kanban project 1 |

  @changeissuetype
  Scenario: [FE-02] Verify that user can change Story issue type to Task type
    Given User creates a new issue with type "<issue_type>" and summary "<issue_summary>" and view that issue's detail
    When User selects "<issue_type2>" option from change issue type dropdown list
    Then New issue type "<issue_type2>" icon is displayed next to issue key on issue header bar
    When User deletes issue which has just created

    Examples: 
      | issue_summary        | issue_type | issue_type2 |
      | Final exam summary 1 | Story      | Task        |

  @deletestoryissue
  Scenario: [FE-03] Verify that user can delete an existing Story issue
    Given User creates a new issue with type "<issue_type>" and summary "<issue_summary>" and view that issue's detail
    When User deletes issue which has just created
    When User searchs by issue summary "<issue_summary>"
    Then No result message label is displayed on Search page

    Examples: 
      | issue_summary               | issue_type |
      | Final exam delete summary 2 | Story      |
