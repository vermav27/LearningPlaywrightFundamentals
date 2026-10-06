import { test, expect, Locator } from '@playwright/test';
import * as utility from './43_Task_Utility';


test.describe("Applitools.com", () => {

    test.beforeEach("Open URL", async ({ page }) => {

        await utility.loginToApplitools(page);

    })

    test("Calculate the spent / earned / total from the table.", async ({ page }) => {

        await utility.verifyTheURL(page);
        let getValues = await utility.calculateSpentEarnedTotal(page);
        let totalAmountSpentThisMonth = getValues.totalSpent;
        console.log(totalAmountSpentThisMonth);
        await utility.VerifyTheTotalAmount(getValues.totalValue);

    })

})
