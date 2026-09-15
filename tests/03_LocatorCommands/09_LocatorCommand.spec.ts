import { test, expect } from '@playwright/test';

test.describe("Login Testing", async () => {

    test("Verify x", async ({ page }) => {
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    })

    test("verify y", async ({ page }) => {
        test.slow();
        await page.goto("https://www.yahoo.com", {
            timeout: 10000,
            waitUntil: "load",
            referer: "https://www.google.com"
        })
    })

})