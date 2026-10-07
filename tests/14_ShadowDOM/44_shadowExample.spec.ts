import { test, expect } from '@playwright/test';

test.describe("Shadow Dom", () => {

    // No special Treatment needed for shadow DOM here

    test("Shadow DOM handling", async ({ page }) => {

        await page.goto("https://app.thetestingacademy.com/playwright/widgets/shadow-dom", { waitUntil: "load" });
        await page.getByTestId("card-account-email").fill("hello@gmail.com");
        await page.getByTestId("card-account-password").fill("hello@gmail.com");
        await page.getByRole("button", { name: "Submit" }).first().click();

    })

})