import { test, expect } from '@playwright/test';

test("Pagination", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable", { waitUntil: "domcontentloaded" });
    let nextButton = page.locator("//button[@id='next-page']");
    let rows = await page.locator("//tbody[@id='employees-tbody']/tr").all();
    let numberOfRows = rows.length;

    // //tbody[@id='employees-tbody']/tr[2]/td[2]/td[@data-col='role']
    let p1_nameLocator = "//tbody[@id='employees-tbody']/tr[";
    let p2_nameLocator = "]/td[2]";
    let p3_nameLocator = "]/td[@data-col='role']";
    let p4_nameLocator = "]/td[@data-col='country']";
    let foundName = false;

    do {
        for (let i = 1; i <= numberOfRows; i++) {
            let myName = await page.locator(p1_nameLocator + i + p2_nameLocator).innerText();
            let myRole = await page.locator(p1_nameLocator + i + p3_nameLocator).innerText();
            let myCountry = await page.locator(p1_nameLocator + i + p4_nameLocator).innerText();
            if (myName === "Luca Greco") {
                foundName = true;
                console.log(myName + " is " + myRole + " lives in " + myCountry);
                break;
            }
        }

        if (!foundName) {
            await nextButton.click();
        }
    }
    while (!foundName);

});