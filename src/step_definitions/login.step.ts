import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../page/login.page";
import { driver } from "../common/hook"
import assert from 'assert';

let loginPage: LoginPage;
setDefaultTimeout(50 * 1000);

Given('User is on login page', async () => {
    await driver.get("https://id.atlassian.com/login");
})

When('User logins with email as {string} and password as {string}', {timeout: 20*1000},  async (email, password) => {
    loginPage = new LoginPage(driver);
    await loginPage.login(email, password);
})

Then('User should navigate to homepage', async () => {
    assert.equal(((await driver.getCurrentUrl()).toString()), "https://start.atlassian.com/", "login fail");
})