import { test, expect } from '@playwright/test';
import loginData from "./data.json";

test.describe("Verify login functionality", () => {

    test.beforeEach("Open login page", async ({ page }) => {

        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "load" });

    })

    test("Login with valid credentials", async ({ page }) => {

        let userNameLocator = await page.locator("//input[@name='username']");
        let passwordLocator = await page.locator("//input[@name='password']");
        let submitButton = await page.locator("//button[@type='submit']");
        let successLogin = await page.locator("//h6[text()='Dashboard']");
        await userNameLocator.fill(loginData.validData.username);
        await passwordLocator.fill(loginData.validData.password);
        await submitButton.click();
        await page.waitForLoadState("load");
        await expect(successLogin).toBeVisible();


    })

    test("Login with Invalid credentials", async ({ page }) => {

        let userNameLocator = await page.locator("//input[@name='username']");
        let passwordLocator = await page.locator("//input[@name='password']");
        let submitButton = await page.locator("//button[@type='submit']");
        let ErrorLogin = await page.locator("//p[contains(@class,'alert-content-text')]");
        await userNameLocator.fill(loginData.invalidData.username);
        await passwordLocator.fill(loginData.invalidData.password);
        await submitButton.click();
        await page.waitForLoadState("load");
        await expect(ErrorLogin).toBeVisible();


    })

})