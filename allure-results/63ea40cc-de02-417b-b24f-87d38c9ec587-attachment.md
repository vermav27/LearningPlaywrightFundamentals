# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 19_DataDriven/56_RunningTestForMulpleData.spec.ts >> Verify login functionality >> Login with multiple logins
- Location: tests/19_DataDriven/56_RunningTestForMulpleData.spec.ts:12:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('//h6[text()=\'Dashboard\']')
Expected: visible
Received: undefined
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" locator('//h6[text()=\'Dashboard\']') with timeout 5000ms
  - waiting for locator('//h6[text()=\'Dashboard\']')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import loginData from "./data2.json";
  3  | 
  4  | test.describe("Verify login functionality", () => {
  5  | 
  6  |     test.beforeEach("Open login page", async ({ page }) => {
  7  | 
  8  |         await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "load" });
  9  | 
  10 |     })
  11 | 
  12 |     test("Login with multiple logins", async ({ page }) => {
  13 | 
  14 |         for (let data of loginData) {
  15 | 
  16 |             let userNameLocator = await page.locator("//input[@name='username']");
  17 |             let passwordLocator = await page.locator("//input[@name='password']");
  18 |             let submitButton = await page.locator("//button[@type='submit']");
  19 |             let successLogin = await page.locator("//h6[text()='Dashboard']");
  20 |             await userNameLocator.fill(data.username);
  21 |             await passwordLocator.fill(data.password);
  22 |             await submitButton.click();
  23 |             await page.waitForLoadState("load");
> 24 |             await expect(successLogin).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  25 | 
  26 |         }
  27 | 
  28 | 
  29 | 
  30 |     })
  31 | 
  32 | })
```