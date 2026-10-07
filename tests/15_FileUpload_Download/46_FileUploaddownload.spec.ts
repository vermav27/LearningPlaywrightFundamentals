import { test, expect } from '@playwright/test';
import * as path from 'path';

test("Testing Upload - Single File", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/upload-download", { waitUntil: "load" });
    const filePath = path.join(__dirname, "DummyFiles", "dummy.txt");

    await page.getByTestId("single-upload").setInputFiles(filePath);
    await expect(page.getByTestId("single-preview")).toContainText("dummy.txt");

})


test("Testing Upload - Multiple File", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/upload-download", { waitUntil: "load" });
    const filePath1 = path.join(__dirname, "DummyFiles", "dummy.txt");
    const filePath2 = path.join(__dirname, "DummyFiles", "MultiFile.txt");

    await page.getByTestId("multi-upload").setInputFiles([filePath1, filePath2]); // for Multiple files you can provide the path in array format
    await expect(page.getByTestId("multi-preview")).toContainText("dummy.txt");

})
