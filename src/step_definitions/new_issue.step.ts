import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { NewIssuePage } from "../page/new_issue.page";
import { driver } from "../common/hook"
import assert from "assert"
import { Component } from "../common/component";

let newIssuePage: NewIssuePage;
let component: Component;

setDefaultTimeout(50 * 1000);

// Scenario ISS-01
When('User clicks on "Create" button on header bar', async () => {
    newIssuePage = new NewIssuePage(driver);
    await newIssuePage.openCreateIssuePopup();
})

When('User enters summary data as {string}', async (summary) => {
    await newIssuePage.inputSummary(summary);

})

When('User selects "Story" option from "Issue type" dropdown list', async () => {
    await newIssuePage.selectStoryOption();
})

When('User clicks on "Create" button', async () => {
    await newIssuePage.submitIssue();

})

Then('"Create issue" popup is opened', async () => {
    assert.equal((await driver.findElement(newIssuePage.createIssueTitle).getText()).toString(),
        "Create issue",
        "No show Create issue popup");
})


Then('"Story" option is displayed on "Issue type" combobox', async () => {
    component = new Component(driver);
    await component.waitDisplay(newIssuePage.storyOption);
    assert.equal(await driver.findElement(newIssuePage.storyOption).isDisplayed(),
                        true ,
                        "No show Story issue type");
})

Then('A popup with success message is displayed', async () => {
    component = new Component(driver);
    await component.waitDisplay(newIssuePage.successPopup);
    assert.equal(await driver.findElement(newIssuePage.successPopup).isDisplayed(),
                        true ,
                        "No show success popup");
})

// Scenario ISS-02