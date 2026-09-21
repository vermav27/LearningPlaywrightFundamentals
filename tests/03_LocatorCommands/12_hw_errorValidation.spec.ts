import { test, expect } from '@playwright/test';

test("Verify the error validation.", async ({ page }) => {

    await page.goto("https://wingify.com/free-trial/");
    await page.getByRole("textbox", { name: "email" }).fill("admin");
    await page.getByRole("checkbox", { name: "Yes, I agree to receive communications from Wingify. I can opt-out at any time." }).check();
    await page.getByRole("checkbox", { name: "I agree to Wingify's" }).check();
    await page.getByRole("button", { name: "Create a Free Trial Account" }).click();
    let errormsg = await page.getByText("The email address you entered is incorrect.").textContent();
    let actualMsg = "The email address you entered is incorrect.";
    expect(actualMsg).toContain(errormsg);
})