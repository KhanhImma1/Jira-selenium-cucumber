import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { WebDriver } from "selenium-webdriver";
import { NewProjectPage } from "../page/new_project.page"
import { driver } from "../common/hook"
import assert from "assert"

let newProjectPage: NewProjectPage;
setDefaultTimeout(50 * 1000);

Given('User is on work page {string}', async (url) => {
    await driver.navigate().to(url);
    await driver.sleep(10 * 1000); // wait for page to load
})

When('User selects "Create Project" option from "Project" dropdown list on header bar', async () => {
    newProjectPage = new NewProjectPage(driver);
    await newProjectPage.newProject();
})

Then('"Software development" page title is displayed', async () => {
    assert.equal((await driver.findElement(newProjectPage.softwareDevelopmentTitle).getText()).toString(),
        "Software development",
        "Wrong way 1");
})

When('Users click on "Scrum" option', async () => {
    await newProjectPage.newScrumProject1();
})

Then('"Scrum" page title is displayed', async () => {
    assert.equal((await driver.findElement(newProjectPage.scrumTitle).getText()).toString(),
        "Scrum",
        "Wrong way 2")
})

When('User clicks on "Use template" button', async () => {
    await newProjectPage.newScrumProject2();
})

Then('"Choose a project type" page title is displayed', async () => {
    assert.equal((await driver.findElement(newProjectPage.projectTypeTitle).getText()).toString(),
        "Choose a project type",
        "Wrong way 3")
})

When('User clicks on "Select a team-managed project" button', async () => {
    await newProjectPage.newScrumProject3();
})

Then('"Add project details" page title is displayed', async () => {
    assert.equal((await driver.findElement(newProjectPage.projectDetailsTitle).getText()).toString(),
        "Add project details",
        "Wrong way 4")
})

When('User creates new project with project name as {string}', async (name) => {
    await newProjectPage.newScrumProject4(name);
})

Then('A popup containing message "Jira project successfully created" is displayed', async () => {
    assert.equal((await driver.findElement(newProjectPage.successMessage).getText()).toString(),
        "Jira project successfully created",
        "Wrong way 5")
})