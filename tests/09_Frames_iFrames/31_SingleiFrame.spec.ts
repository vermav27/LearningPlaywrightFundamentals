import { test, expect, FrameLocator } from '@playwright/test';

test("Single iFrames", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/frames/", { waitUntil: "domcontentloaded" });
    let vehicleFrame: FrameLocator = await page.frameLocator("//iframe[@id='frame-one']");
    await vehicleFrame.locator("//input[@id='RESULT_TextField-1']").fill("Gypsy");


})