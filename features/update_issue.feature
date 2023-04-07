Feature: Update issue

  Background: User is logged in
    Given User is on login page
    When User logins with email as "khanh.t.hoang@evizi.com" and password as "khanh123"

  @replaceissuesummary
  Scenario: [ISS-04] Verify that user can replace issue's summary
    Given User creates a new issue with type "<issue_type>" and summary "<issue_summary>" and view that issue's detail
    When User replaces summary with "<new_summary>" into summary textbox
    Then New summary "<new_summary>" is displayed on summary title
    When User deletes issue which has just created

    Examples: 
      | issue_type | issue_summary    | new_summary                   |
      | Task       | First summary #1 | Replace final exam summary #1 |

  @viewissue
  Scenario: [ISS-03] Verify that user can view an issue's detail
    Given User is on work page
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    Then User should navigate to "<issue_key>" issue's detail page

    Examples: 
      | issue_key |
      | NP2-4     |

  @replacesummary
  Scenario: [ISS-04] Verify that user can replace issue's summary
    Given User is on work page
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    When User replaces summary with "<new_summary>" into summary textbox
    Then New summary "<new_summary>" is displayed on summary title

    Examples: 
      | issue_key | new_summary        |
      | NP2-11    | Replaced summary 3 |

  @replacedescription
  Scenario: [ISS-05] Verify that user can replace issue's description
    Given User is on work page
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    When User replaces description with "<new_description>" into description textarea
    Then New description "<new_description>" is displayed on description title

    Examples: 
      | issue_key | new_description        |
      | BP1-2     | Replaced description 1 |

  @attachfile
  Scenario: Verify that user can attach file in issue detail page
    Given User is on work page
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    When User attachs a file with file name as "<file_name>"
    Then The name "<file_name>" of file attached is displayed on attachments field of issue detail page

    Examples: 
      | issue_key | file_name             |
      | NP2-1     | BugReport_Format.xlsx |

  @linkissue
  Scenario: Verify that user can add new linked issues
    Given User is on work page
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    When User clicks on "Link issue" button
    When User enters valid issue key as "<linked_issue_key>" into "Search for issues" textbox
    When User selects "Link type" option as "<link_type>" from "Link type" dropdown list
    When User clicks on "Link" button on Linked issues area
    Then The linked issue with issue_key as "<linked_issue_key>" is displayed on link type group as "<link_type>"

    Examples: 
      | issue_key | linked_issue_key | link_type     |
      | NP2-2     | NP2-5            | is blocked by |

  @addweblink @positive
  Scenario: Verify that user can add new web link
    Given User is on work page
    When User selects "Go to Your Work page" option from "Your work" dropdown list
    When User clicks on an issue with issue key as "<issue_key>" on issue list
    When User clicks on "Add web link" option from dropdown list next to "Link issue" button
    When User enters valid URL as "<url>" into URL textbox
    When User enter link description as "<link_description>" into Link description textbox
    When User clicks on "Link" button on Web links area
    Then "<link_description>" item title is displayed on Web links area
    When User clicks on "<link_description>" item on Web links area
    Then New window is opended to navigate to web with title "<web_title>"

    Examples: 
      | issue_key | url            | link_description | web_title   |
      | NP2-15    | map.google.com | GG map           | Google Maps |
