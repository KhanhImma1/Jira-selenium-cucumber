import { Then, When } from "@cucumber/cucumber";
import { NewIssuePage } from "../page/new_issue.page";
import { driver } from "../common/hook"
import assert from "assert"
import { Component } from "../common/component";
import { By } from "selenium-webdriver";

let newIssuePage: NewIssuePage;
let component: Component;

When(/^User clicks on "Create" button on header bar$/, async () => {
    newIssuePage = new NewIssuePage(driver);
    await newIssuePage.openCreateIssuePopup();
})

When(/^User enters summary data as \"([^\"]*)\"$/, async (summary) => {
    await newIssuePage.inputIssueSummary(summary);
})

When(/^User selects issue type option as \"([^\"]*)\" from Issue type dropdown list$/, async (issue_type) => {
    await newIssuePage.selectIssueTypeOption(issue_type);
})

When(/^User clicks on "Create" button$/, async () => {
    await newIssuePage.submitIssue();
})

Then(/^"Create issue" popup is opened$/, async () => {
    assert.equal((await component.getReadyText(newIssuePage.createIssueTitle)).toString(),
                                            "Create issue",
                                            "The Create issue popup is not displayed");
})

Then(/^A popup with success message "You've created" is displayed$/, async () => {
    component = new Component(driver);
    assert.equal((await component.waitForDisplayed(newIssuePage.successPopup)).isDisplayed(),
                                            true ,
                                            "The Success popup is not displayed");
})

Then(/^\"([^\"]*)\" option is displayed on Issue type combobox$/, async (issue_type) => {
    component = new Component(driver);
    const issueTypeOption = By.xpath(newIssuePage.issueTypeOptionSelector.replace("{issue_type}" , issue_type));
    assert.equal((await component.getReadyText(issueTypeOption)).toString() ,
                                          issue_type ,
                                          "The selected option is not displayed on Issue type combobox");
})