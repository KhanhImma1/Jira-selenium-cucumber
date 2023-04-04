import { WebDriver, By } from "selenium-webdriver";
import { Component } from "../common/component";

export class LoginPage {
    private driver: WebDriver;
    private component: Component;

    private emailTxtbox = By.css("#username");
    private loginBtn = By.css("#login-submit");
    private passwordTxtbox = By.css("#password");
    public readonly homepage = By.css('[data-testid="nav__profile-menu-trigger"]');
    public readonly passwordWarningMessage = By.css('[class="css-atlcf7"]');

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public async login(email: string, password: string) {
        await this.component.setText(this.emailTxtbox, email);
        await this.component.clickElement(this.loginBtn);
        await this.component.waitForDisplayed(this.passwordTxtbox);
        await this.component.setText(this.passwordTxtbox, password);
        await this.component.clickElement(this.loginBtn);
        await this.driver.sleep(5000);
    }
}