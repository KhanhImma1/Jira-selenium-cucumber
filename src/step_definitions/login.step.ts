import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../page/login.page";
import { driver } from "../common/hook"
import assert from 'assert';
import { Component } from "../common/component";

let loginPage: LoginPage;
let component: Component;
setDefaultTimeout(50 * 1000);

Given(/^User is on login page$/, async () => {
    await driver.get("https://id.atlassian.com/login");
})

When(/^User logins with email as \"([^\"]*)\" and password as \"([^\"]*)\"$/, async (email, password) => {
    loginPage = new LoginPage(driver);
    await loginPage.login(email, password);
})

Then(/^User should navigate to homepage$/, async () => {
    component = new Component(driver);
    await component.waitForDisplay(loginPage.homepage);
    assert.equal(await driver.findElement(loginPage.homepage).isDisplayed() ,
                        true ,
                        "It's not homepage");
})

Then(/^Warning message "Incorrect email address or password" is displayed$/, async () => {
    component = new Component(driver);
    await component.waitForDisplay(loginPage.passwordWarningMessage);
    assert.equal(await driver.findElement(loginPage.passwordWarningMessage).isDisplayed() , 
                        true ,
                        "No show warning massage");
})