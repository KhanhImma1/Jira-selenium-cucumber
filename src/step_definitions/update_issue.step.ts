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
    await updateIssuePage.clickIssueKeyItem(issueKey);
})

When(/^User replaces summary with \"([^\"]*)\" into summary textbox$/, async (new_summary) => {
    await updateIssuePage.replaceIssueSummary(new_summary);
})

When(/^User clicks on "Link issue" button$/, async () => {
    await updateIssuePage.clickLinkIssueButton();
})

When(/^User enters valid issue key as \"([^\"]*)\" into "Search for issues" textbox$/, async (linked_issue_key) => {
    await updateIssuePage.searchForIssueToLink(linked_issue_key);
})

When(/^User selects "Link type" option as \"([^\"]*)\" from "Link type" dropdown list$/, async (link_type) => {
    await updateIssuePage.selectLinkTypeOption(link_type);
})

When(/^User clicks on "Link" button$/, async () => {
    await updateIssuePage.clickLinkButton();
})

Then(/^User should navigate to \"([^\"]*)\" issue's detail page$/, async (issueKey) => {
    component = new Component(driver);
    let issueTitle = By.xpath(updateIssuePage.issueKeyTitleSelector.replace("{issue_key}", issueKey));
    await component.waitForDisplayed(issueTitle);
    assert.equal((await driver.findElement(issueTitle).getText()).toString(),
        issueKey,
        "Incorrect issue title");
})

Then(/^New summary \"([^\"]*)\" is displayed on summary title$/, async (new_summary) => {
    assert.equal((await driver.findElement(updateIssuePage.summaryTitle).getText()).toString() ,
        new_summary ,
        "Incorrect new summary title");
})

Then(/^The linked issue with issue_key as \"([^\"]*)\" is displayed on link type group as \"([^\"]*)\"$/ ,
    async (linked_issue_key , link_type) => {
    let linkTypeGroupLabel = By.xpath(updateIssuePage.linkTypeGroupLabelSelector.replace("{link_type}" , link_type));
    let linkedIssueKeyInGroup = By.xpath(updateIssuePage.linkedIssueKeyInGroupSelector.replace("{linked_issue_key}" , linked_issue_key)
                                                                                        .replace("{link_type}" , link_type));
    component = new Component(driver);
    await component.waitForDisplayed(linkTypeGroupLabel);
    await component.waitForDisplayed(linkedIssueKeyInGroup);
    assert.equal((await driver.findElement(linkTypeGroupLabel).getText()).toString() ,
        link_type ,
        "It's not link type added");
    assert.equal((await driver.findElement(linkedIssueKeyInGroup).getText()).toString() ,
        linked_issue_key ,
        "It's not linked issue key added");
})