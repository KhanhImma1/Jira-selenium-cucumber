import { By, Key, WebDriver, WebElement } from "selenium-webdriver";
import { Component } from "../common/component";

export class UpdateProjectPage {
    private driver: WebDriver;
    private component: Component;

    private projectDropdownList = By.xpath('//span[text()="Projects"]');
    private viewAllProjectsOption = By.xpath('//span[text()="View all projects"]');
    private backLogButton = By.css('[data-testid*="backlog-link"]');
    private createSprintButton = By.css('[data-testid*="create-sprint-button"]');
    public readonly startSprintPopupTitle = By.xpath('//span[text()="Start Sprint"]');
    private sprintNameTextbox = By.css('input[name="sprintName"]');
    private durationTextboxClick = By.css('[data-test-id*="sprint-duration"]');
    private durationTextboxInput = By.css('input[aria-labelledby*="sprintDuration"]');
    private startDateTextboxClick = By.css('div[data-testid*="startDate--datepicker"]');
    private startDateTextboxInput = By.css('[data-testid*="startDate"] input[id*="select-startDate"]');
    private startTimeTextboxInput = By.css('[data-testid*="startDate--timepicker"] input[id*="input"]');
    private startButton = By.css('[data-testid*="ui.start-sprint-button"]');
    public readonly sprintStartedMessage = By.xpath('//span[text()="Sprint started"]');
    public readonly sprintNameTitleOnBoard = By.css('[data-testid="software-board.header.title.container"] h1');
    private backlogTagsList = By.xpath('//div[contains(@data-test-id,"backlog-content")]/div');
    private projectNameItemSelector = '//span[text()="{project_name}"]';
    public readonly projectPageTitleSelector = '//nav[@aria-label="Breadcrumbs"]//span[text()="{project_name}"]';
    private createIssueButtonOfNewSprintSelector = '//div[contains(@data-test-id,"backlog-content")]/div[{backloglist_size}-2]//div[text()="Create issue"]';
    private issueSummaryTextboxOfNewSprintSelector = '//div[contains(@data-test-id,"backlog-content")]/div[{backloglist_size}-2]//textarea';
    private startSprintButtonOfNewSprintSelector = '//div[contains(@data-test-id,"backlog-content")]/div[{backloglist_size}-2]//span[text()="Start sprint"]';

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async clickViewAllProjectsOption() {
        await this.component.waitForDisplayed(this.projectDropdownList);
        await this.component.clickElement(this.projectDropdownList);
        await this.component.waitForDisplayed(this.viewAllProjectsOption);
        await this.component.clickElement(this.viewAllProjectsOption);
    }

    public async clickProjectNameItem(project_name: string) {
        let projectNameItem = By.xpath(this.projectNameItemSelector.replace("{project_name}" , project_name));
        await this.component.waitForDisplayed(projectNameItem);
        await this.component.clickElement(projectNameItem);
    }

    public async clickBacklogButton() {
        await this.component.waitForDisplayed(this.backLogButton);
        await this.component.clickElement(this.backLogButton);
    }

    public async clickCreateSprintButton() {
        await this.component.waitForDisplayed(this.createSprintButton);
        await this.component.scrollIntoElementByJavaScript(this.createSprintButton);
        await this.component.clickElement(this.createSprintButton);
        await this.driver.sleep(2000); // wait for new sprint tag generated
    }

    public async createNewIssueOnNewSprint(issue_summary: string) {
        let backlogTagsArray: Array<WebElement> = await this.driver.findElements(this.backlogTagsList);
        let backlogTagsArray_size: any = (backlogTagsArray.length);
        let createIssueButtonOfNewSprint = By.xpath(this.createIssueButtonOfNewSprintSelector.replace("{backloglist_size}" , backlogTagsArray_size));
        let issueSummaryTextboxOfNewSprint = By.xpath(this.issueSummaryTextboxOfNewSprintSelector.replace("{backloglist_size}" , backlogTagsArray_size));
        let startSprintButtonOfNewSprint = By.xpath(this.startSprintButtonOfNewSprintSelector.replace("{backloglist_size}" , backlogTagsArray_size));
        await this.component.waitForDisplayed(createIssueButtonOfNewSprint);
        await this.component.clickElement(createIssueButtonOfNewSprint);
        await this.component.waitForDisplayed(issueSummaryTextboxOfNewSprint);
        await this.component.setText(issueSummaryTextboxOfNewSprint , issue_summary);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
        await this.component.waitForDisplayed(startSprintButtonOfNewSprint);
        await this.component.clickElement(startSprintButtonOfNewSprint);
    }

    public async replaceNewSprintName(sprint_name: string) {
        await this.component.waitForDisplayed(this.sprintNameTextbox);
        await this.driver.actions().keyDown(Key.CONTROL).sendKeys("a").keyUp(Key.CONTROL).perform();
        await this.driver.actions().sendKeys(Key.DELETE).perform();
        await this.component.setText(this.sprintNameTextbox, sprint_name);
    }

    public async selectDurationOption(duration: string) {
        await this.component.waitForDisplayed(this.durationTextboxClick);
        await this.component.clickElement(this.durationTextboxClick);
        await this.component.setText(this.durationTextboxInput , duration);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async selectStartDateTimeOption(start_date: string , start_time: string) {
        await this.component.waitForDisplayed(this.startDateTextboxClick);
        await this.component.clickElement(this.startDateTextboxClick);
        await this.component.setText(this.startDateTextboxInput , start_date);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
        await this.driver.actions().sendKeys(Key.TAB).perform();
        await this.component.setText(this.startTimeTextboxInput , start_time);
        await this.driver.actions().sendKeys(Key.ENTER).perform();
    }

    public async clickStartButton() {
        await this.component.waitForDisplayed(this.startButton);
        await this.component.clickElement(this.startButton);
    }
}