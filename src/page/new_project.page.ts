import { By, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";

export class NewProjectPage {
    private driver: WebDriver;
    private component: Component;

    private projectDropdownList = By.xpath('//span[text()="Projects"]');
    private creatProjectOption = By.xpath('//span[text()="Create project"]');
    public softwareDevelopmentTitle = By.xpath('//h3[text()="Software development"]');
    private scrumButton = By.css('button[aria-label="Scrum"]');
    public scrumTitle = By.xpath('//h1[text()="Scrum"]');
    private useTemplateButton = By.xpath('//button[@class="css-ryxqcb"]');
    public projectTypeTitle = By.xpath('//div[text()="Choose a project type"]');
    private selectTeamButton = By.css('[data-testid*="team"]');
    public projectDetailsTitle = By.xpath('//h2[text()="Add project details"]');
    private nameTextBox = By.css('input[id*="name"]');
    private keyTextBox = By.css('input[id*="key"]');
    private nextButton = By.xpath('//span[text()="Next"]');
    public successMessage = By.xpath('//span[text()="Jira project successfully created"]');
    public nameWarningMessage = By.css('[class="km7ygq-3 jejLoQ"]');
    public keyWarningMessage = By.css('[class="sc-1ao3zfo-13 hdAFoT"]');
    //span[text()="Go to project"]

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async newProject() {
        await this.component.clickElement(this.projectDropdownList);
        await this.component.clickElement(this.creatProjectOption);
        await this.component.waitDisplay(this.softwareDevelopmentTitle);

    }

    public async newScrumProject1() {
        await this.component.clickElement(this.scrumButton);
        await this.component.waitDisplay(this.scrumTitle);
    }

    public async newScrumProject2() {
        await this.component.clickElement(this.useTemplateButton);
        await this.component.waitDisplay(this.projectTypeTitle);
    }

    public async newScrumProject3() {
        await this.component.clickElement(this.selectTeamButton);
        await this.component.waitDisplay(this.projectDetailsTitle);
    }

    public async newScrumProject4(value: string) {
        await this.component.setText(this.nameTextBox, value);
        await this.driver.sleep(2000); // wait for key textbox generate
        await this.component.clickElement(this.nextButton);
        await this.component.waitDisplay(this.successMessage);
    }

    public async emptyProject() {
        await this.component.clickElement(this.nextButton);
        await this.component.waitDisplay(this.nameWarningMessage);
        await this.component.waitDisplay(this.keyWarningMessage);
    }
}