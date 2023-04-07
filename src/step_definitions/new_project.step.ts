import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { NewProjectPage } from "../page/new_project.page"
import { DEFAULT_TIMEOUT , driver } from "../common/hook"
import assert from "assert"
import { Component } from "../common/component";
import { UpdateIssuePage } from "../page/update_issue.page";

let newProjectPage: NewProjectPage;
let component: Component;
let homePage: UpdateIssuePage;

setDefaultTimeout(DEFAULT_TIMEOUT);

Given(/^User is on work page$/, async () => {
    await driver.navigate().to("https://htk-entry-auto.atlassian.net/");
    homePage = new UpdateIssuePage(driver);
    component = new Component(driver);
    await component.waitForDisplayed(homePage.yourWorkDroplist);
})

When(/^User selects "Create Project" option from "Project" dropdown list on header bar$/, async () => {
    newProjectPage = new NewProjectPage(driver);
    await newProjectPage.clickCreateProjectOption();
})

When(/^Users click on "Kanban" option$/, async () => {
    await newProjectPage.clickKanbanOption();
})

When(/^Users click on "Scrum" option$/, async () => {
    await newProjectPage.clickScrumButton();
})

When(/^User clicks on "Use template" button$/, async () => {
    await newProjectPage.clickUseTemplateButton();
})

When(/^User clicks on "Select a team-managed project" button$/, async () => {
    await newProjectPage.clickTeamManagedButton();
})

When(/^User creates new project with project name as \"([^\"]*)\"$/, async (name) => {
    await newProjectPage.submitProject(name);
})

When(/^User creates new project with empty project name and empty project key$/, async () => {
    newProjectPage = new NewProjectPage(driver);
    await newProjectPage.submitProject('');
})

When(/^User view project's details$/, async () => {
    await newProjectPage.viewProjectDetail();
})

When(/^User deletes project \"([^\"]*)\" which has just created$/, async (project_name) => {
    await newProjectPage.deleteProject(project_name);
})

Then(/^"Software development" page title is displayed$/, async () => {
    assert.equal((await component.getReadyText(newProjectPage.softwareDevelopmentTitle)).toString(),
        "Software development",
        "The Software development page is not displayed");
})

Then(/^"Kanban" page title is displayed$/, async () => {
    assert.equal((await component.getReadyText(newProjectPage.kanbanPageTitle)).toString(),
        "Kanban",
        "The Kanban page is not displayed")
})

Then(/^"Scrum" page title is displayed$/, async () => {
    assert.equal((await component.getReadyText(newProjectPage.scrumTitle)).toString(),
        "Scrum",
        "The Scrum page is not displayed")
})

Then(/^"Choose a project type" page title is displayed$/, async () => {
    assert.equal((await component.getReadyText(newProjectPage.projectTypeTitle)).toString(),
        "Choose a project type",
        "The Choose a project type page is not displayed")
})

Then(/^"Add project details" page title is displayed$/, async () => {
    assert.equal((await component.getReadyText(newProjectPage.projectDetailsTitle)).toString(),
        "Add project details",
        "The Add project details page is not displayed")
})

Then(/^A popup containing message "Jira project successfully created" is displayed$/, async () => {
    component = new Component(driver);
    assert.equal((await component.getReadyText(newProjectPage.successMessage)).toString(),
        "Jira project successfully created",
        'The "Jira project successfully created" popup is not displayed')
})

Then(/^Warning message "Project must have a name" is displayed$/, async () => {
    component = new Component(driver);
    assert.equal((await component.waitForDisplayed(newProjectPage.nameWarningMessage)).isDisplayed() ,
        true ,
        'The warning message "Project must have a name" is not displayed')
})

Then(/^Warning message "Project must have a key" is displayed$/, async () => {
    assert.equal((await component.waitForDisplayed(newProjectPage.keyWarningMessage)).isDisplayed() ,
        true ,
        'The warning message "Project must have a key" is not displayed')
})

