import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { NewProjectPage } from "../page/new_project.page"
import { driver } from "../common/hook"
import assert from "assert"
import { Component } from "../common/component";
import { UpdateIssuePage } from "../page/update_issue.page";

let newProjectPage: NewProjectPage;
let component: Component;
let homepage: UpdateIssuePage
setDefaultTimeout(50 * 1000);

Given(/^User is on work page \"([^\"]*)\"$/, async (url) => {
    await driver.navigate().to("https://htk-entry-auto.atlassian.net/");
    homepage = new UpdateIssuePage(driver);
    await component.waitForDisplayed(homepage.yourWorkDroplist);
})

When(/^User selects "Create Project" option from "Project" dropdown list on header bar$/, async () => {
    newProjectPage = new NewProjectPage(driver);
    await newProjectPage.clickCreateProjectOption();
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

// Scenario PRO-02
When(/^User creates new project with empty project name and empty project key$/, async () => {
    newProjectPage = new NewProjectPage(driver);
    await newProjectPage.submitProject('');
})

Then(/^"Software development" page title is displayed$/, async () => {
    assert.equal((await driver.findElement(newProjectPage.softwareDevelopmentTitle).getText()).toString(),
        "Software development",
        "Software development page is not displayed");
})

Then(/^"Scrum" page title is displayed$/, async () => {
    assert.equal((await driver.findElement(newProjectPage.scrumTitle).getText()).toString(),
        "Scrum",
        "Scrum page is not displayed")
})

Then(/^"Choose a project type" page title is displayed$/, async () => {
    assert.equal((await driver.findElement(newProjectPage.projectTypeTitle).getText()).toString(),
        "Choose a project type",
        "Choose a project type page is not displayed")
})

Then(/^"Add project details" page title is displayed$/, async () => {
    assert.equal((await driver.findElement(newProjectPage.projectDetailsTitle).getText()).toString(),
        "Add project details",
        "Add project details page is not displayed")
})

Then(/^A popup containing message "Jira project successfully created" is displayed$/, async () => {
    component = new Component(driver);
    await component.waitForDisplayed(newProjectPage.successMessage);
    assert.equal((await driver.findElement(newProjectPage.successMessage).getText()).toString(),
        "Jira project successfully created",
        '"Jira project successfully created" popup is not displayed')
})

Then(/^Warning message "Project must have a name" is displayed$/, async () => {
    component = new Component(driver);
    await component.waitForDisplayed(newProjectPage.nameWarningMessage);
    assert.equal(await driver.findElement(newProjectPage.nameWarningMessage).isDisplayed() ,
        true ,
        'Warning message "Project must have a name" is not displayed')
})

Then(/^Warning message "Project must have a key" is displayed$/, async () => {
    await component.waitForDisplayed(newProjectPage.keyWarningMessage);
    assert.equal(await driver.findElement(newProjectPage.keyWarningMessage).isDisplayed() ,
        true ,
        'Warning message "Project must have a key" is not displayed')
})

