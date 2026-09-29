import { test, expect, FrameLocator } from '@playwright/test';

test("Multi Frameset", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/frames/multi-frames", { waitUntil: "domcontentloaded" });

    let sideFrame: FrameLocator = await page.frameLocator("//frame[@name='side']");
    console.log(await sideFrame.getByTestId("side-link-registration").click());
    await sideFrame.getByText("Overview").click();


    let mainFrame: FrameLocator = await page.frameLocator("//frame[@name='main']");
    console.log(await mainFrame.getByText("You're inside the ").innerText());

    let footerFrame: FrameLocator = await page.frameLocator("//frame[@name='footer']");
    console.log(await footerFrame.getByText("The Testing Academy").innerText());


})

