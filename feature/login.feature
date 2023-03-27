Feature: Check login Jira

  Scenario: Login successfully
    Given I visit login page
    When I login with email as "<email>" and password as "<password>"
    Then I should navigate to homepage

    Examples: 
      | email                   | password |
      | khanh.t.hoang@evizi.com | khanh123 |
      | htk@gmail.com           | abc123   |
