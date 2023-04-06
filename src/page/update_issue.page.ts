import { By, Key, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";

export class UpdateIssuePage {
    private driver: WebDriver;
    private component: Component;

    readonly yourWorkDroplist = By.xpath('//button/span[text()="Your work"]');
    private goToYourWorkOption = By.xpath('//span[text()="Go to Your Work page"]');
    readonly summaryTitle = By.css('[data-testid*="summary.heading"]');
    private summaryTextBox = By.xpath('//h1[contains(@data-test-id,"summary")]//textarea');
    private confirmSummaryButton = By.xpath('//span[@aria-label="Confirm Summary"]');
    private descriptionField = By.css('[data-component-selector*="jira-issue-view-rich-text"]');
    readonly descriptionTextTitle = By.css('[data-component-selector*="jira-issue-view-rich-text"] p');
    private descriptionTextarea = By.css('[aria-label*="Main content area"] p');
    private descriptionSaveButon = By.css('[data-testid="comment-save-button"]');
    private linkIssueButton = By.css('button[aria-label="Link issue"]');
    private searchForIssuesTextbox = By.css('#issue-link-search');
    private linkTypeTitle = By.css('[data-test-id*="issue-links.add.select"]');
    private linkTypeTextbox = By.css('#react-select-2-input');
    private linkButton = By.css('[data-test-id*="link-button"]');
    private dropdownIconButton = By.css('[data-testid*="link-dropdown-button"]');
    private addWebLinkButton = By.css('[data-testid*="add-item.link-web"]');
    private urlTextbox = By.css('input[data-testid*="fields.url"]');
    private linkDescriptionTextbox = By.css('input[data-testid*="fields.text"]');
    private linkWebButton = By.css('button[data-testid*="link.submit"]');
    readonly webLinkItemField = By.css('//div[contains(@data-testid,"web-links")]/div[2]');
    readonly webLinkItemTitleSelector = '//a[@data-testid="smart-element-link" and text()="{link_description}"]'
    private issueKeyItemSelector = '//small/span[text()="{issue_key}"]';
    readonly issueKeyTitleSelector = '//div[@id="jira-issue-header"]//span[text()="{issue_key}"]';
    readonly attachedfileSelector = '[data-test-media-name*="{file_name}"]';
    readonly linkTypeGroupLabelSelector = '//div[contains(@data-test-id,"links.group-container")]//span[text()="{link_type}"]';
    readonly linkedIssueKeyInGroupSelector = '//span[text()="{link_type}"]/../..//a[text()="{linked_issue_key}"]'

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async clickGoToYourWorkOption() {
        await this.component.clickElement(this.yourWorkDroplist);
        await this.component.clickElement(this.goToYourWorkOption);
    }

    public async clickIssueKeyItem(issueKey: string) {
        const issueKeyItem = By.xpath(this.issueKeyItemSelector.replace("{issue_key}", issueKey));
        await this.component.clickElement(issueKeyItem);
    }

    public async replaceIssueSummary(new_summary: string) {
        await this.component.clickElement(this.summaryTitle);
        await this.driver.actions().keyDown(Key.CONTROL).sendKeys("a").keyUp(Key.CONTROL).perform();
        await this.driver.actions().sendKeys(Key.DELETE).perform();
        await this.component.setText(this.summaryTextBox, new_summary);
        await this.component.clickElement(this.confirmSummaryButton);
        await this.component.waitForDisplayed(this.summaryTitle);
    }

    public async replaceDescription(new_description: string) {
        await this.component.clickElement(this.descriptionField);
        await this.driver.actions().keyDown(Key.CONTROL).sendKeys("a").keyUp(Key.CONTROL).perform();
        await this.driver.actions().sendKeys(Key.DELETE).perform();
        await this.component.setText(this.descriptionTextarea, new_description);
        await this.component.clickElement(this.descriptionSaveButon);
        await this.component.waitForDisplayed(this.descriptionTextTitle);
    }

    public async clickLinkIssueButton() {
        await this.component.clickElement(this.linkIssueButton);
    }

    public async searchForIssueToLink(linked_issue_key: string) {
        await this.component.waitForDisplayed(this.searchForIssuesTextbox);
        await this.component.scrollIntoElementByJavaScript(this.searchForIssuesTextbox);
        await this.component.setText(this.searchForIssuesTextbox, linked_issue_key);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async selectLinkTypeOption(link_type: string) {
        await this.component.clickElement(this.linkTypeTitle);
        await this.component.setText(this.linkTypeTextbox, link_type);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async clickLinkButton() {
        await this.component.clickElement(this.linkButton);
    }

    public async clickAddWebLink() {
        await this.component.clickElement(this.dropdownIconButton);
        await this.component.clickElement(this.addWebLinkButton);
    }

    public async setURL(URL: string) {
        await this.component.clickElement(this.urlTextbox);
        await this.component.setText(this.urlTextbox, URL);
    }

    public async setLinkDescription(link_description: string) {
        await this.component.clickElement(this.linkDescriptionTextbox);
        await this.component.setText(this.linkDescriptionTextbox, link_description);
    }

    public async clickLinkWebButton() {
        await this.component.clickElement(this.linkWebButton);
    }

    public async clickToOpenWebLink(link_description: string) {
        const webLinkItemTitle = By.xpath(this.webLinkItemTitleSelector.replace("{link_description}", link_description));
        const mainWindow = await this.driver.getWindowHandle();
        await this.component.clickElement(webLinkItemTitle);
        const windows = this.driver.getAllWindowHandles();
        (await windows).forEach(
            async (handle: string) => {
                if (handle !== mainWindow) { await this.driver.switchTo().window(handle); }
        });
    }
}