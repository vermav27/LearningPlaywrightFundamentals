import { test, expect } from '@playwright/test';
test.setTimeout(60000);

test("Verify Drag And Drop", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/drag_and_drop", { waitUntil: "domcontentloaded" });
    let cola = page.locator("//div[@id='column-a']");
    let colb = page.locator("//div[@id='column-b']");
    await cola.dragTo(colb);
    await page.pause();

});