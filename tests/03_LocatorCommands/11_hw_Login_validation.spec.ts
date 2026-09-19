import { test, expect } from '@playwright/test'

test("Verify url after submitting is not same as before.", async ({ page }) => {

    let initialURL: string = "https://app.thetestingacademy.com/playwright/multiple_element_filter";

    await page.goto(initialURL);
    await page.locator("//input[@id='email']").fill("admin@admin.com");
    await page.locator("//input[@id='password']").fill("admin");
    await page.locator("//button[@class='login-btn']").click();
    let changedURL: string = await page.url();

    await expect(changedURL).not.toBe(initialURL);

})