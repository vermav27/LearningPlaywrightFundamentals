import { test, expect } from '@playwright/test';

test("QA Form", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/practice#page", { waitUntil: "domcontentloaded" });
    await page.locator("//input[@id='first-name']").fill("Vineet");
    await page.locator("//input[@id='last-name']").fill("Verma");
    await page.getByTestId("gender-male").click();
    await page.locator("//select[@id='years-experience']").click();
    await page.selectOption("//select[@id='years-experience']", "7");
    //await page.getByTestId("profile-date").fill("26/11/2026");
    await page.getByTestId("profession-automation").click();
    await page.getByTestId("tool-uft").click();
    await page.getByTestId("tool-selenium").click();
    await page.getByText("Asia", { exact: false }).first().click()
    await page.getByText("Switch Commands").click();
    await page.getByTestId("upload-image").setInputFiles("/Users/vineetverma/Downloads/Play2.png");
    await page.getByTestId("download-file").click();
    await page.getByTestId("profile-submit").click();

})