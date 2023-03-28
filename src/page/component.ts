import { By, until, WebDriver } from "selenium-webdriver";

export class Component {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async isLocated(locator: By) {
        await this.driver.wait(until.elementLocated(locator), 10000);
    }

    public async isDisplayed(locator: By) {
        let element = this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), 10000);
    }

    public async getTxt(locator: By) {
        await this.isLocated(locator);
        await this.driver.findElement(locator).getText();
    }

    public async clickElement(locator: By) {
        await this.isLocated(locator);
        await this.driver.findElement(locator).click();
    }

    public async setText(locator: By, value: string) {
        await this.isLocated(locator);
        await this.driver.findElement(locator).sendKeys(value);
    }
}