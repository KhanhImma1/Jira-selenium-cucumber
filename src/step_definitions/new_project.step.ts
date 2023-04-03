import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { NewProjectPage } from "../page/new_project.page"
import { driver } from "../common/hook"
import assert from "assert"
import { Component } from "../common/component";

let newProjectPage: NewProjectPage;
let component: Component;
setDefaultTimeout(50 * 1000);

Given(/^User is on work page \"([^\"]*)\"$/, async (url) => {
    await driver.navigate().to("https://htk-entry-auto.atlassian.net/");
    await driver.sleep(10 * 1000); // wait for page to load
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
        "It's not Software development page");
})

Then(/^"Scrum" page title is displayed$/, async () => {
    assert.equal((await driver.findElement(newProjectPage.scrumTitle).getText()).toString(),
        "Scrum",
        "It's not Scrum page")
})

Then(/^"Choose a project type" page title is displayed$/, async () => {
    assert.equal((await driver.findElement(newProjectPage.projectTypeTitle).getText()).toString(),
        "Choose a project type",
        "It's not Choose a project type page")
})

Then(/^"Add project details" page title is displayed$/, async () => {
    assert.equal((await driver.findElement(newProjectPage.projectDetailsTitle).getText()).toString(),
        "Add project details",
        "It's not Add project details page")
})

Then(/^A popup containing message "Jira project successfully created" is displayed$/, async () => {
    component = new Component(driver);
    await component.waitDisplay(newProjectPage.successMessage);
    assert.equal((await driver.findElement(newProjectPage.successMessage).getText()).toString(),
        "Jira project successfully created",
        "It's not Jira project successfully created popup")
})

Then(/^Warning message "Project must have a name" is displayed$/, async () => {
    component = new Component(driver);
    await component.waitDisplay(newProjectPage.nameWarningMessage);
    assert.equal(await driver.findElement(newProjectPage.nameWarningMessage).isDisplayed() ,
        true ,
        "No show name warning message")
})

Then(/^Warning message "Project must have a key" is displayed$/, async () => {
    await component.waitDisplay(newProjectPage.keyWarningMessage);
    assert.equal(await driver.findElement(newProjectPage.keyWarningMessage).isDisplayed() ,
        true ,
        "No show key warning message")
})

