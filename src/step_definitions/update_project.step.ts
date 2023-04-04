import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { UpdateProjectPage } from "../page/update_project.page";
import { Component } from "../common/component";
import { driver } from "../common/hook"
import assert from "assert"

let updateProjectPage: UpdateProjectPage;
let component: Component;

setDefaultTimeout(50 * 1000);

When(/^User selects "View all projects" option from "Project" dropdown list on header bar$/, async () => {
    updateProjectPage = new UpdateProjectPage(driver);
    await updateProjectPage.clickViewAllProjectsOption();
})

When(/^User clicks on an project name item as \"([^\"]*)\"$/, async (project_name) => {
    await updateProjectPage.clickProjectNameItem(project_name);
})

When(/^User clicks on "Backlog" button on left menu$/, async () => {
    await updateProjectPage.clickBacklogButton();
})

When(/^User clicks on "Create sprint" button on backlog tag$/, async () => {
    await updateProjectPage.clickCreateSprintButton();
})

When(/^User creates new issue with issue summary as \"([^\"]*)\" on new sprint and click "Start sprint" button on new sprint tag$/ ,
async (issue_summary) => {
    await updateProjectPage.createNewIssueOnNewSprint(issue_summary);
})

When(/^User replaces new Sprint name as \"([^\"]*)\" into "Sprint name" textbox on Start Sprint popup$/ ,
async (sprint_name) => {
    await updateProjectPage.replaceNewSprintName(sprint_name);
})

When(/^User selects a duration as \"([^\"]*)\" options from "Duration" dropdown list on Start Sprint popup$/ ,
async (duration) => {
    await updateProjectPage.selectDurationOption(duration);
})

When(/^User selects a start date as \"([^\"]*)\" and start time as \"([^\"]*)\" from datetime picker on Start Sprint popup$/ ,
async (start_day , start_time) => {
    await updateProjectPage.selectStartDateTimeOption(start_day , start_time);
})

When(/^User clicks on "Start" button on Start Sprint popup$/, async () => {
    await updateProjectPage.clickStartButton();
})

Then(/^User should navigate to \"([^\"]*)\" work page$/, async (project_name) => {
    component = new Component(driver);
    let projectPageTitle = By.xpath(updateProjectPage.projectPageTitleSelector.replace("{project_name}" , project_name));
    await component.waitForDisplayed(projectPageTitle);
    assert.equal((await driver.findElement(projectPageTitle).getText()).toString() ,
                    project_name ,
                    "Incorrect project name title");
})

Then(/^The "Start Sprint" popup is displayed$/, async () => {
    await component.waitForDisplayed(updateProjectPage.startSprintPopupTitle);
    assert.equal((await driver.findElement(updateProjectPage.startSprintPopupTitle).getText()).toString() ,
                    "Start Sprint",
                    "The Start Sprint popup is not displayed");
})

Then(/^A popup with message "Sprint started" is displayed$/, async () => {
    await component.waitForDisplayed(updateProjectPage.sprintStartedMessage);
    assert.equal((await driver.findElement(updateProjectPage.sprintStartedMessage).getText()).toString() ,
                    "Sprint started",
                    'The popup with message "Sprint started" is displayed');
})

Then(/^The sprint name \"([^\"]*)\" is displayed on Board page$/, async (sprint_name) => {
    await component.waitForDisplayed(updateProjectPage.sprintNameTitleOnBoard);
    assert.equal((await driver.findElement(updateProjectPage.sprintNameTitleOnBoard).getText()).toString() ,
                    sprint_name,
                    'The popup with message "Sprint started" is displayed');
})