import { test, expect } from '@playwright/test';

test.describe.serial("Login Page", () => {

    test.beforeAll("Ping Test", () => {

        console.log("Starting the test suite.")

    })

    test.afterAll("Test Closure", () => {

        console.log("Ending the test suite.")

    })

    test.beforeEach("Verify user is on login page - beforetest", async ({ page }) => {

        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "load" });
        let heading = await page.locator("//h5[contains(@class,'orangehrm-login-title')]").innerText();
        expect(heading).toBe("Login");
        console.log("Executed before Each");

    })

    test.afterEach("Verify user is on login page - aftertest", async ({ page }) => {

        let heading = await page.locator("//h5[contains(@class,'orangehrm-login-title')]").innerText();
        expect(heading).toBe("Login");
        console.log("Executed after Each");

    })

    test("Verify the visibility of username", async ({ page }) => {

        test.step("Locating the username is editable", async () => {

            let userNameLocator = await page.locator("//input[@name='username']");
            await expect(userNameLocator).toBeEditable();

        })

        test.step("Verifying the attribute", async () => {

            let userNameLocator = await page.locator("//input[@name='username']");
            await expect(userNameLocator).toHaveAttribute("placeholder", "Username");

        })

    })

    test("Verify the visibility of password", async ({ page }) => {

        test.step("Locating the password is editable", async () => {

            let passwordLocator = await page.locator("//input[@name='password']");
            await expect(passwordLocator).toBeEditable();

        })

        test.step("Verifying the attribute", async () => {

            let passwordLocator = await page.locator("//input[@name='password']");
            await expect(passwordLocator).toHaveAttribute("placeholder", "Password");

        })

    })

})