import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { Before, After, Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../page/login.page";
import assert from 'assert';

let driver: WebDriver;
let loginPage: LoginPage;

setDefaultTimeout(50 * 1000);

Before(function () {
    driver = new Builder().forBrowser('chrome').build();
})

After(async function () {
    await driver.quit();
})

Given('User is on login page', async function () {
    driver.manage().window().maximize();
    await driver.get("https://id.atlassian.com/login");
})

When('User login with email as {string} and password as {string}', async function (email, password) {
    loginPage = new LoginPage(driver);
    await loginPage.login(email, password);
})

Then('User should navigate to homepage', async function () {
    assert.equal(((await driver.getCurrentUrl()).toString()), "https://start.atlassian.com/", "login fail");

    // if (((await driver.getCurrentUrl()).toString()) === "https://start.atlassian.com/") {
    //     console.log("login successfully");
    // } else {
    //     console.log("login fail");
    // } 
})