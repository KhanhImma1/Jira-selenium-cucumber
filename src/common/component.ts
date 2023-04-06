import { By, until, WebDriver } from "selenium-webdriver";
import { WAIT_FOR_ELEMENT_TIMEOUT } from "../common/hook"

export class Component {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async waitForDisplayed(locator: By) {
        await this.driver.wait(until.elementLocated(locator), WAIT_FOR_ELEMENT_TIMEOUT , 'Element is not located');
        const element = await this.driver.findElement(locator);
        return await this.driver.wait(until.elementIsVisible(element), WAIT_FOR_ELEMENT_TIMEOUT , 'Element is not visible');
    }

    public async clickElement(locator: By) {
        (await this.waitForDisplayed(locator)).click();
    }

    public async setText(locator: By, value: string) {
        (await this.waitForDisplayed(locator)).sendKeys(value);
    }

    public async getReadyText(locator: By) {
        return (await this.waitForDisplayed(locator)).getText();
    }

    public async scrollIntoElementByJavaScript(locator: By) {
        await this.driver.wait(until.elementLocated(locator), WAIT_FOR_ELEMENT_TIMEOUT , 'Element is not located');
        const element = await this.driver.findElement(locator);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }
}