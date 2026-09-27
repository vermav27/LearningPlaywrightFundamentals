import { test, expect, Locator } from '@playwright/test'

test.describe("Multi Elements", async () => {

    test("Verify the multiple elements.", async ({ page }) => {

        await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter", { "waitUntil": "domcontentloaded" });
        let accountNavigationList: string[] = await page.locator("//div[@class='list-group']/a").allInnerTexts(); //allInnerTexts returns innertext
        console.log(accountNavigationList);

        // Print List using console.log
        for (let value of accountNavigationList) {
            console.log(value);
        }

        // Click a particular element
        for (let value of accountNavigationList) {
            if (value === "Wish List") {
                await page.getByText(value).first().click(); // first selects the first matching element
            }
        }
        await page.waitForTimeout(5000);

    })

    test("Getting the attributeas of multiple elements.", async ({ page }) => {

        await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter", { "waitUntil": "domcontentloaded" });
        let accountNavigationListLocator: Locator[] = await page.locator("//div[@class='list-group']/a").all(); // all returns locator
        console.log(accountNavigationListLocator);

        // Print List using console.log
        for (let attributes of accountNavigationListLocator) {
            let valueOfHref = await attributes.getAttribute('href');
            console.log("Value of href ------> ", valueOfHref);
        }
        await page.waitForTimeout(5000);

    })

})