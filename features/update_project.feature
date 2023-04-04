Feature: Update project

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"

  @startsprint
  Scenario: [PRO-05] Verify that user can start a new sprint in project
    Given User is on work page
    When User selects "View all projects" option from "Project" dropdown list on header bar
    When User clicks on an project name item as "<project_name>"
    Then User should navigate to "<project_name>" work page
    When User clicks on "Backlog" button on left menu
    When User clicks on "Create sprint" button on backlog tag
    When User creates new issue with issue summary as "<issue_summary>" on new sprint and click "Start sprint" button on new sprint tag
    Then The "Start Sprint" popup is displayed
    When User replaces new Sprint name as "<sprint_name>" into "Sprint name" textbox on Start Sprint popup
    When User selects a duration as "<duration>" options from "Duration" dropdown list on Start Sprint popup
    When User selects a start date as "<start_day>" and start time as "<start_time>" from datetime picker on Start Sprint popup
    When User clicks on "Start" button on Start Sprint popup
    Then A popup with message "Sprint started" is displayed
    Then The sprint name "<sprint_name>" is displayed on Board page

    Examples: 
      | project_name  | sprint_name         | duration | start_day | start_time |
      | New-Project-5 | The fisrt sprint #1 |  3 weeks |  5/6/2023 |    2:30 PM |
