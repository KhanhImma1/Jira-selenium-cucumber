import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../page/login.page";
import { driver } from "../common/hook"
import assert from 'assert';
import { Component } from "../common/component";

let loginPage: LoginPage;
let component: Component;
setDefaultTimeout(50 * 1000);

Given('User is on login page', async () => {
    await driver.get("https://id.atlassian.com/login");
})

// Scenario LOG-01
When('User logins with email as {string} and password as {string}', {timeout: 20*1000},  async (email, password) => {
    loginPage = new LoginPage(driver);
    await loginPage.login(email, password);
})

// Scenario LOG-02
When('User logins with email as {string} and incorrect password as {string}', {timeout: 20*1000},  async (email, password) => {
    loginPage = new LoginPage(driver);
    await loginPage.login(email, password);
})

Then('User should navigate to homepage', async () => {
    component = new Component(driver);
    await component.waitDisplay(loginPage.homepage);
    assert.equal(await driver.findElement(loginPage.homepage).isDisplayed() ,
                        true ,
                        "It's not homepage");
})

Then('Warning message is displayed', async () => {
    component = new Component(driver);
    await component.waitDisplay(loginPage.passwordWarningMessage);
    assert.equal(await driver.findElement(loginPage.passwordWarningMessage).isDisplayed() , 
                        true ,
                        "No show warning massage");
})