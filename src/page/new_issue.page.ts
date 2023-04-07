import { By, Key, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";
import { classicNameResolver } from "typescript";

export class NewIssuePage {
    private driver: WebDriver;
    private component: Component;

    private createIssueGlobalButton = By.css('#createGlobalItem');
    readonly createIssueTitle = By.css('[class="css-hz5ces"]');
    private issueTypeCombobox = By.css('[id*="issue-type-select"]');
    private issueTypeMenu = By.xpath('//div[contains(@class, "menu")]');
    readonly issueTypeOptionSelector = '//div[text()="{issue_type}"]';
    private summaryTextBox = By.css('input#summary-field');
    private popupContent = By.css('div[id*="modal-dropzone"]');
    private createButton = By.css('button[type="submit"]');
    readonly successPopup = By.css('[class="css-1s3ezfq"]');
    private viewIssueButton = By.xpath('//a//span[text()="View issue"]');
    private actionsButton = By.css('button[aria-label="Actions"]');
    private deleteOption = By.xpath('//button//span[text()="Delete"]');
    private deleteButtonOnPopup = By.xpath('//button[contains(@data-testid,"actions.delete")]//span[text()="Delete"]');
    private changeIssueButton = By.css('button[data-testid*="change-issue-type"]');
    private issueTypeOptionSelection = '//button//span[text()="{issue_type2}"]'
    readonly issueTypeChangeMessage = By.xpath('//div[text()="Issue type changed"]');
    readonly issueTypeIconSelection = '//button[contains(@aria-label,"{issue_type2}")]';
    private searchTextbox = By.css('input[data-test-id*="search"]');
    readonly searchResultLabel = By.css('div[class*="no-results-message"]');
    private projectBoardContent = By.css('div[data-test-id="software-board.board"]');
    private searchPopup = By.css('[data-test-id*="dialog-wrapper"]');

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async searchIssue(issue_summary: string) {
        await this.component.waitForDisplayed(this.projectBoardContent);
        await this.component.clickElement(this.searchTextbox);
        await this.component.setText(this.searchTextbox, issue_summary);
        await this.component.waitForDisplayed(this.searchPopup);
        // await this.component.clickElement(this.advancedSearchButton);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async changeIssueType(issue_type2: string) {
        const issueTypeOption = By.xpath(this.issueTypeOptionSelection.replace("{issue_type2}" , issue_type2));
        await this.component.clickElement(this.changeIssueButton);
        await this.component.clickElement(issueTypeOption);
    }

    public async openCreateIssuePopup() {
        await this.component.waitForDisplayed(this.createIssueGlobalButton);
        await this.component.clickElement(this.createIssueGlobalButton);
        await this.component.waitForDisplayed(this.createIssueTitle);
    }

    public async selectIssueTypeOption(issue_type: string) {
        const issueTypeOption = By.xpath(this.issueTypeOptionSelector.replace("{issue_type}", issue_type));
        await this.component.clickElement(this.issueTypeCombobox);
        await this.component.waitForDisplayed(this.issueTypeMenu);
        await this.component.clickElement(issueTypeOption);
    }

    public async inputIssueSummary(value: string) {
        await this.component.waitForDisplayed(this.popupContent);
        await this.component.clickElement(this.summaryTextBox);
        await this.component.setText(this.summaryTextBox, value);
    }

    public async submitIssue() {
        await this.component.clickElement(this.createButton);
    }

    public async viewIssueDetail() {
        await this.component.clickElement(this.viewIssueButton);
    }    
    
    public async deleteIssue() {
        await this.component.clickElement(this.actionsButton);
        await this.component.clickElement(this.deleteOption);
        await this.component.clickElement(this.deleteButtonOnPopup);
    }
}