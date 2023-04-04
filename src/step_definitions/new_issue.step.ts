import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { NewIssuePage } from "../page/new_issue.page";
import { driver } from "../common/hook"
import assert from "assert"
import { Component } from "../common/component";

let newIssuePage: NewIssuePage;
let component: Component;

setDefaultTimeout(50 * 1000);

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