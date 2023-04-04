import { By, Key, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";

export class UpdateIssuePage {
    private driver: WebDriver;
    private component: Component;

    private yourWorkDroplist = By.xpath('//button/span[text()="Your work"]');
    private goToYourWorkOption = By.xpath('//span[text()="Go to Your Work page"]');
    public readonly summaryTitle = By.css('[data-testid*="summary.heading"]');
    private summaryTextBox = By.xpath('//h1[contains(@data-test-id,"summary")]//textarea');
    private confirmSummaryButton = By.xpath('//span[@aria-label="Confirm Summary"]');
    private attachButton = By.css('[data-test-id*="add-attachment"] button');
    private linkIssueButton = By.css('button[aria-label="Link issue"]');
    private searchForIssuesTextbox = By.css('#issue-link-search');
    private linkTypeTitle = By.css('[data-test-id*="issue-links.add.select"]');
    private linkTypeTextbox = By.css('#react-select-2-input');
    private linkButton = By.css('[data-test-id*="link-button"]');
    private issueItemSelector = '//small/span[text()="{issue_key}"]';
    public readonly issueKeyTitleSelector = '//div[@id="jira-issue-header"]//span[text()="{issue_key}"]';
    public readonly attachedfileSelector = '[data-test-media-name*="{file_name}"]';
    public readonly linkTypeGroupLabelSelector = '//div[contains(@data-test-id,"links.group-container")]//span[text()="{link_type}"]';
    public readonly linkedIssueKeyInGroupSelector = '//span[text()="{link_type}"]/../..//a[text()="{linked_issue_key}"]'

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async clickGoToYourWorkOption() {
        await this.component.waitForDisplay(this.yourWorkDroplist);
        await this.component.clickElement(this.yourWorkDroplist);
        await this.component.waitForDisplay(this.goToYourWorkOption);
        await this.component.clickElement(this.goToYourWorkOption);
    }

    public async clickIssueItem(issueKey: string) {
        let issueItem = By.xpath(this.issueItemSelector.replace("{issue_key}", issueKey));
        await this.component.waitForDisplay(issueItem);
        // await this.driver.executeScript("arguments[0].scrollIntoView(true);", this.driver.findElement(issueItem));
        await this.component.clickElement(issueItem);
    }

    public async replaceSummary(new_summary: string) {
        await this.component.waitForDisplay(this.summaryTitle);
        await this.component.clickElement(this.summaryTitle);
        await this.component.waitForDisplay(this.summaryTextBox);
        await this.driver.actions().keyDown(Key.CONTROL).sendKeys("a").keyUp(Key.CONTROL).perform();
        await this.driver.actions().sendKeys(Key.DELETE).perform();
        await this.component.setText(this.summaryTextBox , new_summary);
        await this.component.clickElement(this.confirmSummaryButton);
        await this.component.waitForDisplay(this.summaryTitle);
    }

    // public async attachFile(file_name: string) {
    //     await this.component.waitDisplay(this.attachButton);
    //     await this.component.clickElement(this.attachButton);
    //     await this.driver.findElement(this.attachButton).sendKeys(file_name);
    //     await this.driver.actions().sendKeys(Key.ENTER).perform();
    // }

    public async clickLinkIssueButton() {
        await this.component.waitForDisplay(this.linkIssueButton);
        await this.component.clickElement(this.linkIssueButton);
    }

    public async searchForIssueToLink(linked_issue_key: string) {
        await this.component.waitForDisplay(this.searchForIssuesTextbox);
        await this.component.scrollIntoElement(this.searchForIssuesTextbox);
        await this.component.setText(this.searchForIssuesTextbox, linked_issue_key);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async selectLinkTypeOption(link_type: string) {
        await this.component.waitForDisplay(this.linkTypeTitle);
        await this.component.clickElement(this.linkTypeTitle);
        await this.component.waitForDisplay(this.linkTypeTextbox);
        await this.component.setText(this.linkTypeTextbox , link_type);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async clickLinkButton() {
        await this.component.waitForDisplay(this.linkButton);
        await this.component.clickElement(this.linkButton);
    }
}