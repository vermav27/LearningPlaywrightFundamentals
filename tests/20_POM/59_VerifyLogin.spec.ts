import { test } from '@playwright/test';
import { LoginPage } from './Pages/LoginPage';

test.describe("Login page test", () => {

    test("Verify if login page is opening", async ({ page }) => {

        const login = new LoginPage(page);
        await login.goto();

    })

    test("Verify user is successfully able to login", async ({ page }) => {

        const login = new LoginPage(page);
        await login.goto();
        await login.loginToApp();
        await login.verifyUserSuccessfullyLoggedIn();

    })

})
