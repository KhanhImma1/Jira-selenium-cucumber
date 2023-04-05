import { By, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";
import { TIMEFORUNITGENERATED } from "../common/hook";

export class NewIssuePage {
    private driver: WebDriver;
    private component: Component;

    private createIssueGlobalButton = By.css('#createGlobalItem');
    public readonly createIssueTitle = By.css('[class="css-hz5ces"]');
    public readonly storyOption = By.xpath('//div[text()="Story"]');
    private issueTypeCombobox = By.css('[id*="issue-type-select"]');
    public readonly issueTypeOptionSelector = '//div[text()="{issue_type}"]';
    private summaryTextBox = By.css('input#summary-field');
    private createButton = By.css('button[type="submit"]');
    public readonly successPopup = By.css('[class="css-1s3ezfq"]');
    

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async openCreateIssuePopup() {
        await this.component.waitForDisplayed(this.createIssueGlobalButton);
        await this.component.clickElement(this.createIssueGlobalButton);
        await this.component.waitForDisplayed(this.createIssueTitle);
    }

    public async selectStoryOption() {
        await this.component.waitForDisplayed(this.issueTypeCombobox);
        if ((await this.driver.findElement(this.storyOption).isDisplayed()) == false) {
            await this.component.clickElement(this.issueTypeCombobox);
            await this.component.waitForDisplayed(this.storyOption);
            await this.component.clickElement(this.storyOption)
        }
    }
    
    public async inputIssueSummary(value: string) {
        await this.component.waitForDisplayed(this.summaryTextBox);
        await this.component.clickElement(this.summaryTextBox);
        await this.component.setText(this.summaryTextBox, value);
    }

    public async submitIssue() {
        await this.driver.sleep(TIMEFORUNITGENERATED); // wait for Create button generated to get selector
        await this.component.waitForDisplayed(this.createButton);
        await this.component.clickElement(this.createButton);
    }

    public async selectIssueTypeOption(issue_type: string) {
        let issueTypeOption = By.xpath(this.issueTypeOptionSelector.replace("{issue_type}" , issue_type));
        await this.component.clickElement(this.issueTypeCombobox);
        await this.driver.sleep(TIMEFORUNITGENERATED); // wait for issue type dropdownlist generated to get selector
        await this.component.waitForDisplayed(issueTypeOption);
        await this.component.clickElement(issueTypeOption);
    }
}