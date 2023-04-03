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
      | NP2-2     | Replaced summary 2 |

  @attachfile
  Scenario: Verify that user can attach file in issue detail page
    Given User is on work page "url"
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    When User attachs a file with path as "<file_path>"
    Then The name "<file_name>" of file attached is displayed on attachments field of issue detail page

    Examples: 
      | issue_key | file_path                                                         | file_name        |
      | NP2-1     | C:\\Users\\Admijn\\Desktop\\CV Tester 2023\\BugReport_Format.xlsx | BugReport_Format |

  @linkissue
  Scenario: Verify that user can add new linked issues
    Given User is on work page "url"
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    When User clicks on "Link issue" button
    When User enters valid issue key as "<linked_issue_key>" into "Search for issues" textbox
    When User selects "Link type" option as "<link_type>" from "Link type" dropdown list
    When User clicks on "Link" button
    Then The linked issue with issue_key as "<linked_issue_key>" is displayed on link type group as "<link_type>"

    Examples: 
      | issue_key | linked_issue_key | link_type     |
      | NP2-2     | NP2-5            | is blocked by |
