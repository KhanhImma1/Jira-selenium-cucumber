import { By, until, WebDriver } from "selenium-webdriver";

export class Component {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async waitForLocated(locator: By) {
        await this.driver.wait(until.elementLocated(locator), 20 * 1000);
    }

    public async waitForDisplayed(locator: By) {
        await this.waitForLocated(locator);
        let element = this.driver.findElement(locator);
        return await this.driver.wait(until.elementIsVisible(element), 20 * 1000);
    }

    public async getTextReady(locator: By) {
        await this.waitForLocated(locator);
        await this.driver.findElement(locator).getText();
    }

    public async clickElement(locator: By) {
        let element = await this.waitForDisplayed(locator);
        if (element) {
            await element.click();
        }
    }

    public async setText(locator: By, value: string) {
        let element = await this.waitForDisplayed(locator);
        if (element) {
            await element.sendKeys(value);
        }
    }

    public async scrollIntoElementByJavaScript(locator: By) {
        let element = await this.driver.findElement(locator);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }
}