import { test, expect } from '@playwright/test';

test("Testing Download", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/upload-download", { waitUntil: "load" });

    const downloadPromise = page.waitForEvent("download"); // Wait until a download event happens
    await page.getByTestId("download-text").click(); // Click download button

    const download = await downloadPromise; // receive the downloaded file
    await download.saveAs("/Users/vineetverma/Desktop/Projects/LearningPlaywrightFundamentals/tests/15_FileUpload_Download/DummyFiles/Test.txt"); // save file as using saveAs().


})