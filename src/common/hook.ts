import { After, Before } from "@cucumber/cucumber";
import { Builder, WebDriver } from "selenium-webdriver";

export let driver: WebDriver;

Before({timeout: 50*1000}, async () => {
    driver = await new Builder().forBrowser('chrome').build();
    // await driver.manage().setTimeouts();
    driver.manage().window().maximize();
})

// After(async () => {
//     await driver.quit();
// })