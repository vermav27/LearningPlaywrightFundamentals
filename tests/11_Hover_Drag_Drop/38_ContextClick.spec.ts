import { test, expect } from '@playwright/test';

test("Context click", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/context-menu", { waitUntil: "domcontentloaded" });
    await page.getByTestId("ctx-target").click({ button: "right" });
    let allOptions: string[] = await page.locator("//ul[@data-testid='ctx-menu']/li//span[1]").allInnerTexts();
    console.log(allOptions);
    await page.pause();

})