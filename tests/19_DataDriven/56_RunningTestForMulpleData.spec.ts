import { test, expect } from '@playwright/test';
import loginData from "./data2.json";

test.describe("Verify login functionality", () => {

    test.beforeEach("Open login page", async ({ page }) => {

        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "load" });

    })

    test("Login with multiple logins", async ({ page }) => {

        for (let data of loginData) {

            let userNameLocator = await page.locator("//input[@name='username']");
            let passwordLocator = await page.locator("//input[@name='password']");
            let submitButton = await page.locator("//button[@type='submit']");
            let successLogin = await page.locator("//h6[text()='Dashboard']");
            await userNameLocator.fill(data.username);
            await passwordLocator.fill(data.password);
            await submitButton.click();
            await page.waitForLoadState("load");
            await expect(successLogin).toBeVisible();

        }

    })

})