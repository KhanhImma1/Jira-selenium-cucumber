Feature: Create new isssue

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"

  @issue
  Scenario: [ISS-01] Verify that user can create a new issue
    Given User is on work page
    When User clicks on "Create" button on header bar
    Then "Create issue" popup is opened
    When User selects issue type option as "<issue_type>" from Issue type dropdown list
    Then "<issue_type>" option is displayed on Issue type combobox
    When User enters summary data as "<summary>"
    When User clicks on "Create" button
    Then A popup with success message "You've created" is displayed
    When User view issue's detail
    When User deletes issue which has just created

    Examples: 
      | summary             | issue_type |
      | Final Exam issue #1 | Task       |
