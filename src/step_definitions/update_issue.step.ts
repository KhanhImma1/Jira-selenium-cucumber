import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { UpdateIssuePage } from "../page/update_issue.page";
import { Component } from "../common/component";
import { driver } from "../common/hook"
import assert from "assert"

let updateIssuePage: UpdateIssuePage;
let component: Component;

setDefaultTimeout(50 * 1000);

When(/^User selects "Go to Your Work page" option from "Your work" dropdown list$/, async () => {
    updateIssuePage = new UpdateIssuePage(driver);
    await updateIssuePage.clickGoToYourWorkOption();
})

When(/^User clicks on an issue with issue key as \"([^\"]*)\" on issue list$/, async (issueKey) => {
    await updateIssuePage.clickIssueItem(issueKey);
})

When(/^User replaces summary with \"([^\"]*)\" into summary textbox$/, async (new_summary) => {
    await updateIssuePage.replaceSummary(new_summary);
})

Then(/^User should navigate to \"([^\"]*)\" issue's detail page$/, async (issueKey) => {
    component = new Component(driver);
    let issueTitle = By.xpath(updateIssuePage.issueKeyTitleSelector.replace("{1}", issueKey));
    await component.waitDisplay(issueTitle);
    assert.equal((await driver.findElement(issueTitle).getText()).toString(),
        issueKey,
        "Incorrect issue title");
})

Then(/^New summary \"([^\"]*)\" is displayed on summary title$/, async (new_summary) => {
    assert.equal((await driver.findElement(updateIssuePage.summaryTitle).getText()).toString() ,
        new_summary ,
        "Incorrect new summary title");
})