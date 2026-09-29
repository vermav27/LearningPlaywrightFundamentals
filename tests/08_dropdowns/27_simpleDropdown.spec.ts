import { test, expect } from '@playwright/test';

test("Normal Simple Dropdown", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/dropdown", { waitUntil: "domcontentloaded" });
    await page.locator("//select[@id='dropdown']").click();
    await page.selectOption("//select[@id='dropdown']", "Option 2");
    await page.pause();

})