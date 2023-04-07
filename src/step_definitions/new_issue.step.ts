import { Given, Then, When } from "@cucumber/cucumber";
import { NewIssuePage } from "../page/new_issue.page";
import { UpdateIssuePage } from "../page/update_issue.page";
import { driver } from "../common/hook"
import assert from "assert"
import { Component } from "../common/component";
import { By } from "selenium-webdriver";

let newIssuePage: NewIssuePage;
let component: Component;
let homePage: UpdateIssuePage;

Given(/^User creates a new issue with type \"([^\"]*)\" and summary \"([^\"]*)\" and view that issue's detail$/,
async (issue_type, issue_summary) => {
    homePage = new UpdateIssuePage(driver);
    component = new Component(driver);
    newIssuePage = new NewIssuePage(driver);
    await driver.navigate().to("https://htk-entry-auto.atlassian.net/");
    await component.waitForDisplayed(homePage.yourWorkDroplist);
    await newIssuePage.openCreateIssuePopup();
    await newIssuePage.selectIssueTypeOption(issue_type);
    await newIssuePage.inputIssueSummary(issue_summary);
    await newIssuePage.submitIssue();
    await newIssuePage.viewIssueDetail();
})

When(/^User selects \"([^\"]*)\" option from change issue type dropdown list$/, async (issue_type2) => {
    newIssuePage = new NewIssuePage(driver);
    await newIssuePage.changeIssueType(issue_type2);
})

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

When(/^User view issue's detail$/, async () => {
    await newIssuePage.viewIssueDetail();
})

When(/^User deletes issue which has just created$/, async () => {
    await newIssuePage.deleteIssue();
})

When(/^User searchs by issue summary \"([^\"]*)\"$/, async (issue_summary) => {
    await newIssuePage.searchIssue(issue_summary);
})

Then(/^"Create issue" popup is opened$/, async () => {
    component = new Component(driver);
    assert.equal((await component.getReadyText(newIssuePage.createIssueTitle)).toString(),
                        "Create issue",
                        "The Create issue popup is not displayed");
})

Then(/^A popup with success message "You've created" is displayed$/, async () => {
    component = new Component(driver);
    assert.match((await component.getReadyText(newIssuePage.successPopup)).toString(),
                        /You've created/ ,
                        "The Success popup is not displayed");
})

Then(/^\"([^\"]*)\" option is displayed on Issue type combobox$/, async (issue_type) => {
    component = new Component(driver);
    const issueTypeOption = By.xpath(newIssuePage.issueTypeOptionSelector.replace("{issue_type}" , issue_type));
    assert.equal((await component.getReadyText(issueTypeOption)).toString() ,
                                          issue_type ,
                                          "The selected option is not displayed on Issue type combobox");
})

Then(/^New issue type \"([^\"]*)\" icon is displayed next to issue key on issue header bar$/, async (issue_type2) => {
    component = new Component(driver);
    const issueTypeOptionissueTypeIcon = By.xpath(newIssuePage.issueTypeIconSelection.replace("{issue_type2}" , issue_type2));
    assert.equal((await (await component.waitForDisplayed(issueTypeOptionissueTypeIcon)).getAttribute("aria-label")).toString() ,
                                          (issue_type2 + " - Change issue type") ,
                                          "The changed issue type icon is not displayed next to issue key on issue header bar");
})

Then(/^No result message label is displayed on Search page$/, async () => {
    component = new Component(driver);
    assert.equal((await (await component.waitForDisplayed(newIssuePage.searchResultLabel)).isDisplayed()),
                        true ,
                        "No result message label is not displayed on Search page");
})