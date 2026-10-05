import { test, expect } from '@playwright/test';
test.setTimeout(60000);

test.describe('Javascript Alert Test', () => {

    test.beforeEach("Visit JS Alert PAge", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts", { waitUntil: "domcontentloaded" });
    })

    test("JS Alert 1", async ({ page }) => {

        page.on('dialog', async dialog => {
            await dialog.accept();
        })

        await page.locator("//button[text()='Click for JS Alert']").click();
        let outputText: string = await page.locator("//p[@id='result']").innerText();
        expect(outputText).toBe("You successfully clicked an alert");

    })

    test("JS Alert Confirm", async ({ page }) => {

        page.on('dialog', async dialog => {
            await dialog.accept();
        })

        await page.locator("//button[text()='Click for JS Confirm']").click();
        let outputText: string = await page.locator("//p[@id='result']").innerText();
        expect(outputText).toBe("You clicked: Ok");

    })

    test("JS Alert 3", async ({ page }) => {

        page.on('dialog', async dialog => {
            await dialog.accept("Vineet");
        })

        await page.locator("//button[text()='Click for JS Prompt']").click();
        let outputText: string = await page.locator("//p[@id='result']").innerText();
        expect(outputText).toContain("Vineet");

    })

})