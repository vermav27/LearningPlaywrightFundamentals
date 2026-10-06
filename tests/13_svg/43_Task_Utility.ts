import { test, expect, Page } from '@playwright/test'

type calculatedValues = { totalSpent: number, totalEarned: number, totalValue: number }

async function loginToApplitools(page: Page) {

    const username: string = process.env.AppliTool_Username ?? "";
    const password: string = process.env.AppliTool_Password ?? "";

    await page.goto("https://demo.applitools.com/", { waitUntil: "domcontentloaded" });
    await page.locator("#username").fill(username);
    await page.locator("#password").fill(password);
    await page.locator("#log-in").click();

}

async function verifyTheURL(page: Page) {

    let expectedURL = "https://demo.applitools.com/app.html";
    await expect(page).toHaveURL(expectedURL);

}

async function calculateSpentEarnedTotal(page: Page): Promise<calculatedValues> {


    const allValues = await page.locator("//tbody/tr//span[@class='text-success' or  @class='text-danger']").all();
    const numberOfValues = allValues.length;
    let finalValues: number[] = [];

    for (let i = 0; i < numberOfValues; i++) {

        const loc = await allValues[i].innerText();
        let spaceRemovingLocation = loc.lastIndexOf(" ");
        let trimmedValue = loc.slice(0, spaceRemovingLocation);
        let newValueRemovingSpace = trimmedValue.replace(" ", "");
        let newValueRemovingComma = newValueRemovingSpace.replace(",", "");
        finalValues.push(Number(newValueRemovingComma));

    }

    let totalSpent = 0;
    let totalEarned = 0;
    for (let i = 0; i < numberOfValues; i++) {

        if (finalValues[i] > 0) {
            totalSpent = totalSpent + finalValues[i];
        } else if (finalValues[i] < 0) {
            totalEarned = totalEarned + finalValues[i];
        }

    }

    let TotalValue = Number((totalEarned + totalSpent).toFixed(2));

    return { totalSpent: totalSpent, totalEarned: totalEarned, totalValue: TotalValue }

}

async function VerifyTheTotalAmount(valueToBeVerified: number) {

    expect(valueToBeVerified).toEqual(1996.22);

}

export {
    loginToApplitools,
    verifyTheURL,
    calculateSpentEarnedTotal,
    VerifyTheTotalAmount,
}
