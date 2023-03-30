Feature: login Jira

  @login @positive
  Scenario: Verify that user can login jira with email and password
    Given User is on login page
    When User logins with email as "<email>" and password as "<password>"
    Then User should navigate to homepage

    Examples: 
      | email                   | password |
      | khanh.t.hoang@evizi.com | khanh123 |

  @login @negative
  Scenario: Verify that user can login jira with valid email and incorrect password
    Given User is on login page
    When User logins with email as "<email>" and incorrect password as "<password>"
    Then Warning message is displayed

    Examples: 
      | email                   | password  |
      | khanh.t.hoang@evizi.com | abc@#$123 |
