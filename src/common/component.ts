import { By, until, WebDriver } from "selenium-webdriver";

export class Component {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    public async waitForLocated(locator: By) {
        await this.driver.wait(until.elementLocated(locator) , 20*1000);
    }

    public async waitForDisplayed(locator: By) {
        await this.waitForLocated(locator);
        let element = this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element) , 20*1000)
    }

    public async getTextReady(locator: By) {
        await this.waitForLocated(locator);
        await this.driver.findElement(locator).getText();
    }

    public async clickElement(locator: By) {
        await this.waitForLocated(locator);
        await this.driver.findElement(locator).click();
    }

    public async setText(locator: By, value: string) {
        await this.waitForLocated(locator);
        await this.driver.findElement(locator).sendKeys(value);
    }

    public async scrollIntoElementByJavaScript(locator: By) {
        await this.driver.executeScript("arguments[0].scrollIntoView(true);" , 
                                        this.driver.findElement(locator));
    }
}