import { test, expect } from "@playwright/test";

// async is a callback function
// async applies to functions
// await applies to the statements

test("Navigating to TTA website", async ({ page }) => {

    await page.goto("https://www.sciensus.com");

})

test("BCP implementation", async ({ browser }) => {

    let adminContext = await browser.newContext();
    let userContext = await browser.newContext();

    let adminPage = await adminContext.newPage();
    let userPage = await userContext.newPage();

    await adminPage.goto("https://www.yahoo.com");
    await userPage.goto("https://www.google.com");

    await adminPage.close();
    await userPage.close();

    await adminContext.close();
    await userContext.close();

    await browser.close();

});