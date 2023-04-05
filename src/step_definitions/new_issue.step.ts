import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
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

When(/^User selects "Story" option from "Issue type" dropdown list$/, async () => {
    await newIssuePage.selectStoryOption();
})

When(/^User clicks on "Create" button$/, async () => {
    await newIssuePage.submitIssue();
})

When('User selects issue type option as {string} from Issue type dropdown list', async (issue_type) => {
    await newIssuePage.selectIssueTypeOption(issue_type);
    console.log("checked");
})

Then(/^"Create issue" popup is opened$/, async () => {
    assert.equal((await driver.findElement(newIssuePage.createIssueTitle).getText()).toString(),
                                            "Create issue",
                                            "The Create issue popup is not displayed");
})


Then(/^"Story" option is displayed on "Issue type" combobox$/, async () => {
    component = new Component(driver);
    await component.waitForDisplayed(newIssuePage.storyOption);
    assert.equal(await driver.findElement(newIssuePage.storyOption).isDisplayed(),
                                          true ,
                                          "The Story option is not displayed on Issue type combobox");
})

Then(/^A popup with success message "You've created" is displayed$/, async () => {
    component = new Component(driver);
    await component.waitForDisplayed(newIssuePage.successPopup);
    assert.equal(await driver.findElement(newIssuePage.successPopup).isDisplayed(),
                                            true ,
                                            "The Success popup is not displayed");
})

Then('{string} option is displayed on Issue type combobox', async (issue_type) => {
    component = new Component(driver);
    let issueTypeOption = By.xpath(newIssuePage.issueTypeOptionSelector.replace("{issue_type}" , issue_type));
    await component.waitForDisplayed(issueTypeOption);
    assert.equal((await driver.findElement(issueTypeOption).getText()).toString() ,
                                          issue_type ,
                                          "The selected option is not displayed on Issue type combobox");
                                          console.log("checked");
})