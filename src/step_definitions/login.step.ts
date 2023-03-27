import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { Before, After, Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { Component } from "../common/component";
import assert from 'assert';

let driver: WebDriver;
let component: Component;

setDefaultTimeout(50 * 1000);

Before(function () {
    driver = new Builder().forBrowser('chrome').build();
})
After(async function () {
    await driver.quit();
})

Given('I visit login page', async function () {
    driver.manage().window().maximize();
    await driver.get("https://id.atlassian.com/login");
})

When('I login with email as {string} and password as {string}', async function (email, password) {
    component = new Component(driver);
    let emailTxtbox = By.css("#username");
    let loginBtn = By.css("#login-submit");
    let passwordTxtbox = By.css("#password");
    await component.setText(emailTxtbox, email);
    await component.clickElement(loginBtn);
    await component.isDisplayed(passwordTxtbox);
    await component.setText(passwordTxtbox, password);
    await component.clickElement(loginBtn);
    await driver.sleep(3000);
})

Then('I should navigate to homepage', async function () {
    assert.equal(((await driver.getCurrentUrl()).toString()), "https://start.atlassian.com/", "login fail");
    // if (((await driver.getCurrentUrl()).toString()) === "https://start.atlassian.com/") {
    //     console.log("login successfully");
    // } else {
    //     console.log("login fail");
    // } 
})