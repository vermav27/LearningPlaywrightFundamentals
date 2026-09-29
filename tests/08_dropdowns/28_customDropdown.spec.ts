import { test, expect } from '@playwright/test';

test("Custom Dropdown", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/dropdowns", { waitUntil: "domcontentloaded" });

    await page.getByTestId("lang-trigger").click();
    await page.getByRole("option", { name: "TypeScript" }).click();

    await page.getByRole("button", { "name": "Web framework" }).click();
    await page.getByText("Next.js", { "exact": true }).first().click();

    await page.getByLabel("Experience level").click();
    await page.getByText("Principal (10+ years)").first().click();

    await page.pause();

})