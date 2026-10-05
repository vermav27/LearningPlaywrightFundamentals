import { test, expect } from '@playwright/test';

test("Verify hover", async ({ page }) => {

    await page.goto("https://www.tftus.com/", { waitUntil: "domcontentloaded" });
    await page.locator("//a[text()='Services']").first().hover();
    await page.pause();

})

test("Verify hover - 2", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/hover-menu", { waitUntil: "domcontentloaded" });
    await page.getByTestId("nav-add-ons").hover();
    await page.getByTestId("test-id-Hotel").click();
    await page.pause();

})