Feature: login Jira

  @login @positive
  Scenario: [LOG-01] Verify that user can login jira with email and password
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"
    Then User should navigate to homepage

  @login @negative
  Scenario: [LOG-02] Verify that user can login jira with valid email and incorrect password
    Given User is on login page
    When User logins with email as "<email>" and password as "<password>"
    Then Warning message "Incorrect email address or password" is displayed

    Examples: 
      | email                   | password  |
      | khanh.t.hoang@evizi.com | abc@#$123 |
      | khanh.t.hoang@evizi.com | JKAJHAKSJ |
