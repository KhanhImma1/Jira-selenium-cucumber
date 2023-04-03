import { By, WebDriver } from "selenium-webdriver";
import { Component } from "../common/component";

export class NewProjectPage {
    private driver: WebDriver;
    private component: Component;

    private projectDropdownList = By.xpath('//span[text()="Projects"]');
    private creatProjectOption = By.xpath('//span[text()="Create project"]');
    public readonly softwareDevelopmentTitle = By.xpath('//h3[text()="Software development"]');
    private scrumButton = By.css('button[aria-label="Scrum"]');
    public readonly scrumTitle = By.xpath('//h1[text()="Scrum"]');
    private useTemplateButton = By.xpath('//button[@class="css-ryxqcb"]');
    public readonly projectTypeTitle = By.xpath('//div[text()="Choose a project type"]');
    private selectTeamButton = By.css('[data-testid*="team"]');
    public readonly projectDetailsTitle = By.xpath('//h2[text()="Add project details"]');
    private nameTextBox = By.css('input[id*="name"]');
    private keyTextBox = By.css('input[id*="key"]');
    private nextButton = By.xpath('//span[text()="Next"]');
    public readonly successMessage = By.xpath('//span[text()="Jira project successfully created"]');
    public readonly nameWarningMessage = By.css('[class="km7ygq-3 jejLoQ"]');
    public readonly keyWarningMessage = By.css('[class="sc-1ao3zfo-13 hdAFoT"]');

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async clickCreateProjectOption() {
        await this.component.clickElement(this.projectDropdownList);
        await this.component.clickElement(this.creatProjectOption);
        await this.component.waitDisplay(this.softwareDevelopmentTitle);

    }

    public async clickScrumButton() {
        await this.component.clickElement(this.scrumButton);
        await this.component.waitDisplay(this.scrumTitle);
    }

    public async clickUseTemplateButton() {
        await this.component.clickElement(this.useTemplateButton);
        await this.component.waitDisplay(this.projectTypeTitle);
    }

    public async clickTeamManagedButton() {
        await this.component.clickElement(this.selectTeamButton);
        await this.component.waitDisplay(this.projectDetailsTitle);
    }

    public async submitProject(value: string) {
        await this.component.setText(this.nameTextBox, value);
        await this.driver.sleep(2000); // wait for key textbox generated
        await this.component.clickElement(this.nextButton);
    }
}