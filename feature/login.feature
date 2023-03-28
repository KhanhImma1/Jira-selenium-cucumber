Feature: Check login Jira

  Scenario: Verify that user can login jira with email and password
    Given User is on login page
    When User login with email as "<email>" and password as "<password>"
    Then User should navigate to homepage

    Examples: 
      | email                   | password |
      | khanh.t.hoang@evizi.com | khanh123 |
