import { By, Key, WebDriver, WebElement } from "selenium-webdriver";
import { Component } from "../common/component";

export class UpdateProjectPage {
    private driver: WebDriver;
    private component: Component;

    private projectDetailContent = By.css('#ak-main-content>[data-test-id*="software-board.board"]');
    private projectDropdownList = By.xpath('//nav//button//span[text()="Projects"]');
    private viewAllProjectsOption = By.xpath('//span[text()="View all projects"]');
    private backLogButton = By.css('[data-testid*="backlog-link"]');
    private createSprintButton = By.css('[data-testid*="create-sprint-button"]');
    private backlogContent = By.css('[data-test-id*="backlog-content"]');
    readonly startSprintPopupTitle = By.xpath('//span[text()="Start Sprint"]');
    private sprintNameTextbox = By.css('input[name="sprintName"]');
    private durationTextboxClick = By.css('[data-test-id*="sprint-duration"]');
    private durationTextboxInput = By.css('input[aria-labelledby*="sprintDuration"]');
    private startDateTextboxClick = By.css('div[data-testid*="startDate--datepicker"]');
    private startDateTextboxInput = By.css('[data-testid*="startDate"] input[id*="select-startDate"]');
    private startTimeTextboxInput = By.css('[data-testid*="startDate--timepicker"] input[id*="input"]');
    private startButton = By.css('[data-testid*="ui.start-sprint-button"]');
    readonly sprintStartedMessage = By.xpath('//span[text()="Sprint started"]');
    readonly sprintNameTitleOnBoard = By.css('[data-testid="software-board.header.title.container"] h1');
    private backlogTagsList = By.xpath('//div[contains(@data-test-id,"backlog-content")]/div');
    private projectNameItemSelector = '//span[text()="{project_name}"]';
    readonly projectPageTitleSelector = '//nav[@aria-label="Breadcrumbs"]//span[text()="{project_name}"]';
    private createIssueButtonOfNewSprintSelector = '//div[contains(@data-test-id,"backlog-content")]/div[{backloglist_size}-2]//div[text()="Create issue"]';
    private issueSummaryTextboxOfNewSprintSelector = '//div[contains(@data-test-id,"backlog-content")]/div[{backloglist_size}-2]//textarea';
    private startSprintButtonOfNewSprintSelector = '//div[contains(@data-test-id,"backlog-content")]/div[{backloglist_size}-2]//span[text()="Start sprint"]';

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async clickViewAllProjectsOption() {
        await this.component.waitForDisplayed(this.projectDetailContent);
        await this.component.clickElement(this.projectDropdownList);
        await this.component.clickElement(this.viewAllProjectsOption);
    }

    public async clickProjectNameItem(project_name: string) {
        const projectNameItem = By.xpath(this.projectNameItemSelector.replace("{project_name}", project_name));
        await this.component.clickElement(projectNameItem);
    }

    public async clickBacklogButton() {
        await this.component.clickElement(this.backLogButton);
    }

    public async clickCreateSprintButton() {
        await this.component.waitForDisplayed(this.createSprintButton);
        await this.component.scrollIntoElementByJavaScript(this.createSprintButton);
        await this.component.clickElement(this.createSprintButton);
        await this.component.waitForDisplayed(this.backlogContent);
    }

    public async createNewIssueOnNewSprint(issue_summary: string) {
        const backlogTagsArray: Array<WebElement> = await this.driver.findElements(this.backlogTagsList);
        const backlogTagsArray_size: any = (backlogTagsArray.length);
        const createIssueButtonOfNewSprint = By.xpath(this.createIssueButtonOfNewSprintSelector.replace("{backloglist_size}", backlogTagsArray_size));
        const issueSummaryTextboxOfNewSprint = By.xpath(this.issueSummaryTextboxOfNewSprintSelector.replace("{backloglist_size}", backlogTagsArray_size));
        const startSprintButtonOfNewSprint = By.xpath(this.startSprintButtonOfNewSprintSelector.replace("{backloglist_size}", backlogTagsArray_size));
        await this.component.clickElement(createIssueButtonOfNewSprint);
        await this.component.waitForDisplayed(issueSummaryTextboxOfNewSprint);
        await this.component.setText(issueSummaryTextboxOfNewSprint, issue_summary);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
        await this.component.clickElement(startSprintButtonOfNewSprint);
    }

    public async replaceNewSprintName(sprint_name: string) {
        await this.component.waitForDisplayed(this.sprintNameTextbox);
        await this.driver.actions().keyDown(Key.CONTROL).sendKeys("a").keyUp(Key.CONTROL).perform();
        await this.driver.actions().sendKeys(Key.DELETE).perform();
        await this.component.setText(this.sprintNameTextbox, sprint_name);
    }

    public async selectDurationOption(duration: string) {
        await this.component.clickElement(this.durationTextboxClick);
        await this.component.setText(this.durationTextboxInput, duration);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async selectStartDateTimeOption(start_date: string, start_time: string) {
        await this.component.clickElement(this.startDateTextboxClick);
        await this.component.setText(this.startDateTextboxInput, start_date);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
        await this.driver.actions().sendKeys(Key.TAB).perform();
        await this.component.setText(this.startTimeTextboxInput, start_time);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async clickStartButton() {
        await this.component.clickElement(this.startButton);
    }
}