import { WebDriver, By } from "selenium-webdriver";
import { Component } from "./component";

export class LoginPage {
    private driver: WebDriver;
    public component: Component;

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.component = new Component(this.driver);
    }

    public emailTxtbox = By.css("#username");
    public loginBtn = By.css("#login-submit");
    public passwordTxtbox = By.css("#password");

    public async login(email: string, password: string) {
        await this.component.setText(this.emailTxtbox, email);
        await this.component.clickElement(this.loginBtn);
        await this.component.isDisplayed(this.passwordTxtbox);
        await this.component.setText(this.passwordTxtbox, password);
        await this.component.clickElement(this.loginBtn);
        await this.driver.sleep(5000); // wait for page to load
    }
}