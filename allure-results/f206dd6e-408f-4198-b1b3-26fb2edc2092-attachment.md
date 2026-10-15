# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 19_DataDriven/54_JSONToJSO.spec.ts >> testing data
- Location: tests/19_DataDriven/54_JSONToJSO.spec.ts:4:5

# Error details

```
SyntaxError: "[object Object]" is not valid JSON
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | import loginData from './02_TestingUsingJSON/data.json'
  3 | 
  4 | test("testing data", async ({ page }) => {
> 5 |     const convertedData = JSON.parse(loginData);
    |                                ^ SyntaxError: "[object Object]" is not valid JSON
  6 |     console.log(convertedData);
  7 | })
  8 | 
```