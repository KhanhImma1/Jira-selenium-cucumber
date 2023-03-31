import { Actions, By, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";

export class UpdateIssuePage {
    private driver: WebDriver;
    private component: Component;

    private yourWorkDroplist = By.xpath('//button/span[text()="Your work"]');
    private goToYourWorkOption = By.xpath('//span[text()="Go to Your Work page"]');
    private issueItemSelector = '//span[text()="{0}"]';
    public readonly issueKeyTitleSelector = '//div[@id="jira-issue-header"]//span[text()="{1}"]';
    public readonly summaryTitle = By.css('[data-testid*="summary.heading"]');
    private summaryTextBox = By.xpath('//textarea[@class="css-1m3hfg6"]');
    private confirmSummaryButton = By.xpath('//span[@aria-label="Confirm Summary"]');

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
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", this.driver.findElement(issueItem));
        await this.component.clickElement(issueItem);
    }

    public async replaceSummary(new_summary: string) {
        await this.component.waitDisplay(this.summaryTitle);
        await this.component.clickElement(this.summaryTitle);
        // await this.driver.sleep(5000);
        await this.component.waitDisplay(this.summaryTextBox);
        await this.driver.findElement(this.summaryTextBox).clear();
        await this.component.setText(this.summaryTextBox , new_summary);
        await this.component.clickElement(this.confirmSummaryButton);
        await this.component.waitDisplay(this.summaryTitle);
    }
}