import { test, expect } from '@playwright/test';

test("tc#1 - Verify the app.vwo.com login.", async ({ page }) => {

    await page.goto("https://app.vwo.com", {
        timeout: 5000,
        referer: "https://www.google.com",
        waitUntil: "domcontentloaded"
    });

    // CSS Selectors : 
    // id -> #
    // Class -> .
    // name -> [name="value"]
    // Tag -> [Tag]

    let userNameField = page.locator("#login-username");
    let passwordField = page.locator("#login-password");
    let signInBtn = page.locator("#js-login-btn");
    let errorMsgBox = page.locator(".notification-box-description");

    await userNameField.fill("admin");
    await passwordField.fill("password");
    await signInBtn.click();

    await expect(errorMsgBox).toContainText("Your email, password, IP address or location did not match");

});