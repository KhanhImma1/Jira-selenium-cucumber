import { Actions, By, Key, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";

export class UpdateIssuePage {
    private driver: WebDriver;
    private component: Component;

    private yourWorkDroplist = By.xpath('//button/span[text()="Your work"]');
    private goToYourWorkOption = By.xpath('//span[text()="Go to Your Work page"]');
    public readonly summaryTitle = By.css('[data-testid*="summary.heading"]');
    private summaryTextBox = By.xpath('//h1[contains(@data-test-id,"summary")]//textarea');
    private confirmSummaryButton = By.xpath('//span[@aria-label="Confirm Summary"]');
    private attachButton = By.css('[data-test-id*="add-attachment"]');
    private issueItemSelector = '//small/span[text()="{0}"]';
    public readonly issueKeyTitleSelector = '//div[@id="jira-issue-header"]//span[text()="{1}"]';
    public readonly attachedfileSelector = '[data-test-media-name*="{2}"]';

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async clickGoToYourWorkOption() {
        await this.component.waitDisplay(this.yourWorkDroplist);
        await this.component.clickElement(this.yourWorkDroplist);
        await this.component.waitDisplay(this.goToYourWorkOption);
        await this.component.clickElement(this.goToYourWorkOption);
    }

    public async clickIssueItem(issueKey: string) {
        let issueItem = By.xpath(this.issueItemSelector.replace("{0}", issueKey));
        await this.component.waitDisplay(issueItem);
        // await this.driver.executeScript("arguments[0].scrollIntoView(true);", this.driver.findElement(issueItem));
        await this.component.clickElement(issueItem);
    }

    public async replaceSummary(new_summary: string) {
        await this.component.waitDisplay(this.summaryTitle);
        await this.component.clickElement(this.summaryTitle);
        await this.component.waitDisplay(this.summaryTextBox);
        await this.driver.actions().keyDown(Key.CONTROL).sendKeys("a").keyUp(Key.CONTROL).perform();
        await this.driver.actions().sendKeys(Key.DELETE).perform();
        await this.component.setText(this.summaryTextBox , new_summary);
        await this.component.clickElement(this.confirmSummaryButton);
        await this.component.waitDisplay(this.summaryTitle);
    }

    public async attachFile(file_path: string) {
        await this.component.waitDisplay(this.attachButton);
        let attach = await this.driver.findElement(this.attachButton);
        await attach.sendKeys(file_path);
    }
}