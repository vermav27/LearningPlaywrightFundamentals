import { test, expect } from '@playwright/test';

test("Advance Dropdown", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/select-boxes", { waitUntil: "domcontentloaded" });


    await page.getByTestId("rs-single-input").click();
    await page.getByText("Cypress", { exact: true }).click();

    await page.getByTestId("rs-multi-input").click();
    await page.getByText("Pytest", { exact: true }).click();
    await page.getByText("Mocha", { exact: true }).click();
    await page.getByLabel('Remove Mocha').click();
    await page.keyboard.press('Escape');

    await page.getByTestId("rs-creatable-input").click();
    await page.getByTestId("rs-creatable-input").fill("Security Testing");
    await page.keyboard.press('Enter');
    await page.getByTestId("rs-creatable-input").fill("ETL Testing");
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');


    await page.getByText("Pick a deployment target…").click();
    await page.getByText("Azure", { exact: true }).click();

    //Custom Search Dropdown
    await page.getByText("Type to search cities…").click();
    await page.getByRole("textbox", { name: "Search cities" }).fill("Hyder");
    await expect(await page.getByText("Hyderabad")).toBeVisible();
    await page.getByText("Hyderabad").click();

})