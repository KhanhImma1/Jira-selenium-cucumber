import { By, until, WebDriver } from "selenium-webdriver";

export class Component {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async waitLocate(locator: By) {
        await this.driver.wait(until.elementLocated(locator) , 20*1000);
    }

    public async waitDisplay(locator: By) {
        await this.waitLocate(locator);
        let element = this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element) , 20*1000)
    }

    public async getTextReady(locator: By) {
        await this.waitLocate(locator);
        await this.driver.findElement(locator).getText();
    }

    public async clickElement(locator: By) {
        await this.waitLocate(locator);
        await this.driver.findElement(locator).click();
    }

    public async setText(locator: By, value: string) {
        await this.waitLocate(locator);
        await this.driver.findElement(locator).sendKeys(value);
    }
}