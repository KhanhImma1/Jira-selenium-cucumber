import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { UpdateIssuePage } from "../page/update_issue.page";
import { Component } from "../common/component";
import { DEFAULT_TIMEOUT, driver } from "../common/hook"
import assert from "assert"

let updateIssuePage: UpdateIssuePage;
let component: Component;

setDefaultTimeout(DEFAULT_TIMEOUT);

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

When(/^User replaces description with \"([^\"]*)\" into description textarea$/, async (new_description) => {
    await updateIssuePage.replaceDescription(new_description);
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

When(/^User clicks on "Link" button on Linked issues area$/, async () => {
    await updateIssuePage.clickLinkButton();
})

When(/^User clicks on "Add web link" option from dropdown list next to "Link issue" button$/, async () => {
    await updateIssuePage.clickAddWebLink();
})

When(/^User enters valid URL as \"([^\"]*)\" into URL textbox$/, async (URL) => {
    await updateIssuePage.setURL(URL);
})

When(/^User enter link description as \"([^\"]*)\" into Link description textbox$/, async (link_description) => {
    await updateIssuePage.setLinkDescription(link_description);
})

When(/^User clicks on "Link" button on Web links area$/, async () => {
    await updateIssuePage.clickLinkWebButton();
})

When(/^User clicks on \"([^\"]*)\" item on Web links area$/, async (link_description) => {
    await updateIssuePage.clickToOpenWebLink(link_description);
})

Then(/^User should navigate to \"([^\"]*)\" issue's detail page$/, async (issueKey) => {
    component = new Component(driver);
    const issueKeyTitle = By.xpath(updateIssuePage.issueKeyTitleSelector.replace("{issue_key}", issueKey));
    await component.waitForDisplayed(issueKeyTitle);
    assert.equal((await driver.findElement(issueKeyTitle).getText()).toString(),
        issueKey,
        "Incorrect issue title");
})

Then(/^New summary \"([^\"]*)\" is displayed on summary title$/, async (new_summary) => {
    assert.equal((await driver.findElement(updateIssuePage.summaryTitle).getText()).toString(),
        new_summary,
        "Incorrect new summary title");
})

Then(/^New description \"([^\"]*)\" is displayed on description title$/, async (new_description) => {
    assert.equal((await driver.findElement(updateIssuePage.descriptionTextTitle).getText()).toString(),
        new_description,
        "Incorrect new description title");
})

Then(/^The linked issue with issue_key as \"([^\"]*)\" is displayed on link type group as \"([^\"]*)\"$/,
async (linked_issue_key, link_type) => {
    const linkTypeGroupLabel = By.xpath(updateIssuePage.linkTypeGroupLabelSelector.replace("{link_type}", link_type));
    const linkedIssueKeyInGroup = By.xpath(updateIssuePage.linkedIssueKeyInGroupSelector.replace("{linked_issue_key}", linked_issue_key)
            .replace("{link_type}", link_type));
    component = new Component(driver);
    await component.waitForDisplayed(linkTypeGroupLabel);
    await component.waitForDisplayed(linkedIssueKeyInGroup);
    assert.equal((await driver.findElement(linkTypeGroupLabel).getText()).toString(),
        link_type,
        "It's not link type added");
    assert.equal((await driver.findElement(linkedIssueKeyInGroup).getText()).toString(),
        linked_issue_key,
        "It's not linked issue key added");
})

Then(/^\"([^\"]*)\" item title is displayed on Web links area$/, async (link_description) => {
    const webLinkItemTitle = By.xpath(updateIssuePage.webLinkItemTitleSelector.replace("{link_description}", link_description));
    component = new Component(driver);
    await component.waitForDisplayed(webLinkItemTitle);
    assert.equal((await driver.findElement(webLinkItemTitle).getText()).toString(),
        link_description,
        "Incorrect link description title");
})

Then(/^New window is opended to navigate to web with title \"([^\"]*)\"$/, async (web_title) => {
    assert.equal((await driver.getTitle()).toString(),
        web_title,
        "It's incorrect web link to navigate ");
})