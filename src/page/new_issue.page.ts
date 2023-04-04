import { By, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";

export class NewIssuePage {
    private driver: WebDriver;
    private component: Component;

    private createIssueGlobalButton = By.css('#createGlobalItem');
    public readonly createIssueTitle = By.css('[class="css-hz5ces"]');
    private issueTypeCombobox = By.css('[class="bjmwba-0 hApeTB"] [class="sc-1lie33m-0 bELLbo"]');
    public readonly storyOption = By.xpath('//div[text()="Story"]');
    private summaryTextBox = By.css('input#summary-field');
    private createButton = By.css('button[type="submit"]');
    public readonly successPopup = By.css('[class="css-1s3ezfq"]');
    

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async openCreateIssuePopup() {
        await this.component.waitForDisplay(this.createIssueGlobalButton);
        await this.component.clickElement(this.createIssueGlobalButton);
        await this.component.waitForDisplay(this.createIssueTitle);
    }

    public async selectStoryOption() {
        await this.component.waitForDisplay(this.issueTypeCombobox);
        if ((await this.driver.findElement(this.storyOption).isDisplayed()) == false) {
            await this.component.clickElement(this.issueTypeCombobox);
            await this.component.waitForDisplay(this.storyOption);
            await this.component.clickElement(this.storyOption)
        }
    }
    
    public async inputSummary(value: string) {
        await this.component.waitForDisplay(this.summaryTextBox);
        await this.component.clickElement(this.summaryTextBox);
        await this.component.setText(this.summaryTextBox, value);
    }

    public async submitIssue() {
        await this.component.waitForDisplay(this.createButton);
        await this.component.clickElement(this.createButton);
    }
}