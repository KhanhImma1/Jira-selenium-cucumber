Feature: Create new isssue

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"

  @issue @positive
  Scenario: [ISS-01] Verify that user can create a new "Story" issue
    Given User is on work page
    When User clicks on "Create" button on header bar
    Then "Create issue" popup is opened
    When User enters summary data as "<summary>"
    When User selects "Story" option from "Issue type" dropdown list
    Then "Story" option is displayed on "Issue type" combobox
    When User clicks on "Create" button
    Then A popup with success message "You've created" is displayed

    Examples: 
      | summary       |
      | Best issue #1 |

  @issue2
  Scenario: [ISS-02] Verify that user can create a new issue
    Given User is on work page
    When User clicks on "Create" button on header bar
    Then "Create issue" popup is opened
    When User enters summary data as "<summary>"
    When User selects issue type option as "<issue_type>" from Issue type dropdown list
    Then "<issue_type>" option is displayed on Issue type combobox
    When User clicks on "Create" button
    Then A popup with success message "You've created" is displayed

    Examples: 
      | summary        | issue_type |
      | Worst issue #2 | Bug        |
