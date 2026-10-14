import { test, expect } from '@playwright/test';

test.describe("Verify Scroll", async () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("https://app.thetestingacademy.com/playwright/widgets/scroll", { waitUntil: "load" });


    })

    test("Scroll Test", async ({ page }) => {

        // First Way - scroll function 
        await page.getByTestId("deep-anchor").scrollIntoViewIfNeeded();
        await page.getByTestId("deep-anchor").click();

        //Second Way - JS execution
        await page.evaluate(() => window.scrollBy(0, 1000));

        //third way - scroll to bottom of the page
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        //fourth way - scroll to top of the page
        await page.evaluate(() => window.scrollTo(0, 0));

    })

})