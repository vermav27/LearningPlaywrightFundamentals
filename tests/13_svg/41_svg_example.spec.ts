// Playwright way of handling SVG

import { test, expect, Locator } from '@playwright/test';

test.describe("SVG", () => {

    test.beforeEach("Open URL", async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/widgets/svg", { waitUntil: "domcontentloaded" });

    })

    test("SVG Test", async ({ page }) => {

        await page.locator("#circle-blue").click();
        const output: string = await page.locator("#shapes-output").innerText();
        expect(output).toContain("Blue");

    })

    test("SVG Bar", async ({ page }) => {

        await page.getByRole("button", { name: /Q3 bar/ }).click();  // Regex pattern - / It means contains 
        const output: string = await page.locator("#bars-output").innerText();
        expect(output).toContain("Q3");
        await page.getByRole("radio", { name: /4/ }).click();
        let rating: string = await page.locator("//span[@id='stars-readout']/b").innerText();
        expect(rating).toBe("4");


    })

    test("SVG Bar Value", async ({ page }) => {

        const allBars = await page.locator(".bar").all();
        for (let bar of allBars) {
            let barLabel = await bar.getAttribute('data-quarter');
            let barValue = await bar.getAttribute('data-value');

            console.log(barLabel + " ===> " + barValue);
        }

    })

})