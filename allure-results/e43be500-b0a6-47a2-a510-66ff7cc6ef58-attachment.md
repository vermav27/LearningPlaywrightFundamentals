# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 15_FileUpload_Download/47_download.spec.ts >> Testing Download
- Location: tests/15_FileUpload_Download/47_download.spec.ts:3:5

# Error details

```
Error: page.waitForEvent: Target page, context or browser has been closed
=========================== logs ===========================
waiting for event "download"
============================================================
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test("Testing Download", async ({ page }) => {
  4  | 
  5  |     await page.goto("https://app.thetestingacademy.com/playwright/widgets/upload-download", { waitUntil: "load" });
  6  | 
  7  |     await page.getByTestId("download-text").click();
> 8  |     const downloadPromise = await page.waitForEvent("download");
     |                                        ^ Error: page.waitForEvent: Target page, context or browser has been closed
  9  | 
  10 |     const download = await downloadPromise;
  11 |     await download.saveAs("/Users/vineetverma/Desktop/Projects/LearningPlaywrightFundamentals/tests/15_FileUpload_Download/DummyFiles/Test.txt");
  12 | 
  13 | 
  14 | })
```