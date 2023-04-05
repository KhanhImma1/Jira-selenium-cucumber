import { After, Before } from "@cucumber/cucumber";
import { Builder, WebDriver } from "selenium-webdriver";

export let driver: WebDriver;
export const TIMEFORPAGELOADED: number = 5000;
export const TIMEFORUNITGENERATED: number = 2000;
export const DEFAULTTIMEOUT: number = 50000;

Before({timeout: DEFAULTTIMEOUT}, async () => {
    driver = await new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();
})

// After(async () => {
//     await driver.quit();
// })