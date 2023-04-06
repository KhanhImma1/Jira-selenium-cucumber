import { After, Before } from "@cucumber/cucumber";
import { Builder, WebDriver } from "selenium-webdriver";

export let driver: WebDriver;
export const DEFAULT_TIMEOUT: number = 50000;
export const WAIT_FOR_ELEMENT_TIMEOUT: number = 20000;

Before({timeout: DEFAULT_TIMEOUT}, async () => {
    driver = await new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();
})

// After(async () => {
//     await driver.quit();
// })