import { test, expect, FrameLocator } from '@playwright/test';

test("Nested Frameset", async ({ page }) => {

    await page.goto("https://selectorshub.com/iframe-scenario/", { waitUntil: "domcontentloaded" });

    // The page has two iframes with id='pact1', so pick the first to avoid a strict mode violation
    let topFrame: FrameLocator = page.locator("//iframe[@id='pact1']").first().contentFrame();
    let middleFrame: FrameLocator = topFrame.locator("//iframe[@id='pact2']").first().contentFrame();
    let lowerFrame: FrameLocator = middleFrame.locator("//iframe[@id='pact3']").first().contentFrame();


    await topFrame.locator("//input[@id='inp_val']").first().fill("Selenium");
    await topFrame.locator("//button[@id='lost']").click();


    await middleFrame.locator("//input[@id='jex']").first().fill("Playwright");
    await middleFrame.locator("//button[@id='connect']").click();


    await lowerFrame.locator("//input[@id='glaf']").first().fill("Company");
    await lowerFrame.locator("//button[@id='close']").click();

})

