Feature: Create new isssue

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"
    Then User should navigate to homepage

  @issue @positive
  Scenario: Verify that user can create a new "Story" issue
    Given User is on work page "<url>"
    When User clicks on "Create" button on header bar
    Then "Create issue" popup is opened
    When User enters summary data as "<summary>"
    When User selects "Story" option from "Issue type" dropdown list
    Then "Story" option is displayed on "Issue type" combobox
    When User clicks on "Create" button
    Then A popup with success message is displayed

    Examples: 
      | url                                   | summary       |
      | https://htk-entry-auto.atlassian.net/ | Best issue #1 |
