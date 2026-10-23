import { expect, Locator, Page } from '@playwright/test';
import { dashBoard } from './DashboardPage';

export class LoginPage extends dashBoard {

    // Locators
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBTN: Locator;
    readonly loginLabel: Locator;

    // Page Actions
    constructor(page: Page) {

        super(page);
        this.page = page;
        this.loginLabel = page.locator("//h5[text()='Login']");
        this.userName = page.locator("//input[@name='username']");
        this.password = page.locator("//input[@name='password']");
        this.loginBTN = page.locator("//button[@type='submit']");


    }

    async goto() {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await expect(this.loginLabel).toBeVisible();
    }

    async loginToApp() {

        await this.userName.fill("Admin");
        await this.password.fill("admin123");
        await this.loginBTN.click();
        await this.page.waitForLoadState("load");

    }

    async verifyUserSuccessfullyLoggedIn() {

        await expect(this.dashboardLabel).toBeVisible();

    }

}