import { By, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";

export class NewIssuePage {
    private driver: WebDriver;
    private component: Component;

    private createIssueGlobalButton = By.css('#createGlobalItem');
    readonly createIssueTitle = By.css('[class="css-hz5ces"]');
    private issueTypeCombobox = By.css('[id*="issue-type-select"]');
    private issueTypeMenu = By.xpath('//div[contains(@class, "menu")]');
    readonly issueTypeOptionSelector = '//div[text()="{issue_type}"]';
    private summaryTextBox = By.css('input#summary-field');
    private createIssuePopup = By.css('section[data-testid*="modal"]');
    private createButton = By.css('button[type="submit"]');
    readonly successPopup = By.css('[class="css-1s3ezfq"]');



    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async openCreateIssuePopup() {
        await this.component.waitForDisplayed(this.createIssueGlobalButton);
        await this.component.clickElement(this.createIssueGlobalButton);
        await this.component.waitForDisplayed(this.createIssueTitle);
    }

    public async inputIssueSummary(value: string) {
        await this.component.waitForDisplayed(this.summaryTextBox);
        await this.component.clickElement(this.summaryTextBox);
        await this.component.setText(this.summaryTextBox, value);
    }

    public async submitIssue() {
        await this.component.waitForDisplayed(this.createIssuePopup);
        await this.component.clickElement(this.createButton);
    }

    public async selectIssueTypeOption(issue_type: string) {
        const issueTypeOption = By.xpath(this.issueTypeOptionSelector.replace("{issue_type}", issue_type));
        await this.component.clickElement(this.issueTypeCombobox);
        await this.component.waitForDisplayed(this.issueTypeMenu);
        await this.component.clickElement(issueTypeOption);
    }
}