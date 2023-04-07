import { By, WebDriver, until } from "selenium-webdriver";
import { Component } from "../common/component";
import {UpdateProjectPage} from "../page/update_project.page"

export class NewProjectPage {
    private driver: WebDriver;
    private component: Component;
    private updateProjectPage: UpdateProjectPage;

    private projectDropdownList = By.xpath('//span[text()="Projects"]');
    private creatProjectOption = By.xpath('//span[text()="Create project"]');
    readonly softwareDevelopmentTitle = By.xpath('//button//*[text()="Software development"]');
    private kanbanButton = By.css('button[aria-label="Kanban"]');
    readonly kanbanPageTitle = By.xpath('//*[text()="Kanban"]');
    private scrumButton = By.css('button[aria-label="Scrum"]');
    readonly scrumTitle = By.xpath('//h1[text()="Scrum"]');
    private useTemplateButton = By.xpath('//button[contains(@data-testid,"template-button")]');
    readonly projectTypeTitle = By.xpath('//div[text()="Choose a project type"]');
    private selectTeamButton = By.css('[data-testid*="team"]');
    readonly projectDetailsTitle = By.xpath('//h2[text()="Add project details"]');
    private nameTextBox = By.css('input[id*="name"]');
    private keyTextBox = By.xpath('//input[contains(@id,"key") and string(@value)]');
    private nextButton = By.xpath('//span[text()="Next"]');
    readonly successMessage = By.xpath('//span[text()="Jira project successfully created"]');
    readonly nameWarningMessage = By.css('[class="km7ygq-3 jejLoQ"]');
    readonly keyWarningMessage = By.css('[class="sc-1ao3zfo-13 hdAFoT"]');
    private goToProjectButton = By.xpath('//button//span[text()="Go to project"]');
    private projectListActionsButtonSelector = '//span[text()="{project_name}"]/../../../..//div[contains(@data-test-id,"dropdown-menu")]//button';
    private moveToTrashOption = By.xpath('//button//span[text()="Move to trash"]');
    private moveButtonOnPopup = By.xpath('//button//span[text()="Move"]');
    private goToTrashButtonOnPopup = By.xpath('//a//span[text()="Go to trash"]');
    private trashListActionsButtonSelector = '//span[text()="{project_name}"]/../../..//div[contains(@data-test-id,"trash")]//button';
    private deletePermanentlyOption = By.xpath('//span[text()="Delete permanently"]');
    private deletePermanentlyButtonOnPopup = By.xpath('//button//span[text()="Delete"]');

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
        this.updateProjectPage = new UpdateProjectPage(this.driver);
    }

    public async viewProjectDetail() {
        this.component.clickElement(this.goToProjectButton);
    }

    public async deleteProject(project_name: string) {
        const projectListActionsButton = By.xpath(this.projectListActionsButtonSelector.replace("{project_name}" , project_name));
        const trashListActionsButton = By.xpath(this.trashListActionsButtonSelector.replace("{project_name}" , project_name));
        await this.updateProjectPage.clickViewAllProjectsOption()
        await this.component.clickElement(projectListActionsButton);
        await this.component.clickElement(this.moveToTrashOption);
        await this.component.clickElement(this.moveButtonOnPopup);
        await this.component.clickElement(this.goToTrashButtonOnPopup);
        await this.component.clickElement(trashListActionsButton);
        await this.component.clickElement(this.deletePermanentlyOption);
        await this.component.clickElement(this.deletePermanentlyButtonOnPopup);
    }

    public async clickCreateProjectOption() {
        await this.component.clickElement(this.projectDropdownList);
        await this.component.clickElement(this.creatProjectOption);
        await this.component.waitForDisplayed(this.softwareDevelopmentTitle);
    }

    public async clickKanbanOption() {
        await this.component.clickElement(this.kanbanButton);
        await this.component.waitForDisplayed(this.kanbanPageTitle);
    }

    public async clickScrumButton() {
        await this.component.clickElement(this.scrumButton);
        await this.component.waitForDisplayed(this.scrumTitle);
    }

    public async clickUseTemplateButton() {
        await this.component.clickElement(this.useTemplateButton);
        await this.component.waitForDisplayed(this.projectTypeTitle);
    }

    public async clickTeamManagedButton() {
        await this.component.clickElement(this.selectTeamButton);
        await this.component.waitForDisplayed(this.projectDetailsTitle);
    }

    public async submitProject(value: string) {
        await this.component.setText(this.nameTextBox, value);
        await this.component.waitForDisplayed(this.keyTextBox);
        await this.component.clickElement(this.nextButton);
    }
}