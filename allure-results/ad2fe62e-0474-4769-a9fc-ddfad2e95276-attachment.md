# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 14_ShadowDOM/45_shadowDOM_Task.spec.ts >> Selector Hub Task
- Location: tests/14_ShadowDOM/45_shadowDOM_Task.spec.ts:3:5

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('#concepts').locator('#training')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test("Selector Hub Task", async ({ page }) => {
  4  | 
  5  |     await page.goto("https://selectorshub.com/xpath-practice-page/", { waitUntil: "load" });
  6  |     await page.locator("#kils").fill("Test User");
  7  |     await page.locator("#pizza").fill("Farmhouse");
  8  |     let pass = await page.locator("#concepts");
> 9  |     await pass.locator("#training").fill("Testing");
     |                                     ^ Error: locator.fill: Target page, context or browser has been closed
  10 |     await page.pause();
  11 | 
  12 | })
```