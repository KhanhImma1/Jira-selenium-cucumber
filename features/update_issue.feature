Feature: Update issue

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"

  @viewissue
  Scenario: [ISS-03] Verify that user can view an issue's detail
    Given User is on work page "url"
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    Then User should navigate to "<issue_key>" issue's detail page

    Examples: 
      | issue_key |
      | NP2-4     |

  @replacesummary
  Scenario: [ISS-04] Verify that user can replace issue's summary
    Given User is on work page "url"
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    When User replaces summary with "<new_summary>" into summary textbox
    Then New summary "<new_summary>" is displayed on summary title

    Examples: 
      | issue_key | new_summary        |
      | NP2-1     | Replaced summary 1 |
