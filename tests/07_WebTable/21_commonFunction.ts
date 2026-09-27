import { expect, Locator } from "@playwright/test";

async function verifyIfNameIsPresentAndItsRole(page: any, name: string) {

    await page.goto("https://app.thetestingacademy.com/playwright/webtable", { waitUntil: "domcontentloaded" });

    //LLocator to get number of rows. -->  //tbody[@id='employee-body']/tr[1]/td[1]
    let rows = await page.locator("//tbody[@id='employee-body']/tr").all();
    let numberOfRows = rows.length;

    // name of employee : //tbody[@id='employee-body']/tr[i]/td[3]//strong
    // user Role : //tbody[@id='employee-body']/tr[i]/td[3]//strong//ancestor::td//following-sibling::td[j]

    for (let i = 1; i <= numberOfRows; i++) {

        let p1_Locator = "//tbody[@id='employee-body']/tr[";
        let p2_Locator = "]/td[3]//strong";
        let p3_Locator = "//ancestor::td//following-sibling::td[1]";

        let nameValue = await page.locator(p1_Locator + i + p2_Locator).innerText();

        if (nameValue === name) {

            let role = await page.locator(p1_Locator + i + p2_Locator + p3_Locator).innerText();
            console.log(name + " -----> " + role + " at place " + i);

        }
    }

}

async function verifyIfNameIsPresentAndItsRoleAndCheck(page: any, name: string) {

    await page.goto("https://app.thetestingacademy.com/playwright/webtable", { waitUntil: "domcontentloaded" });

    //LLocator to get number of rows. -->  //tbody[@id='employee-body']/tr[1]/td[1]
    let rows = await page.locator("//tbody[@id='employee-body']/tr").all();
    let numberOfRows = rows.length;

    // name of employee : //tbody[@id='employee-body']/tr[i]/td[3]//strong
    // user Role : //tbody[@id='employee-body']/tr[i]/td[3]//strong//ancestor::td//following-sibling::td[j]

    for (let i = 1; i <= numberOfRows; i++) {

        let p1_Locator = "//tbody[@id='employee-body']/tr[";
        let p2_Locator = "]/td[3]//strong";
        let p3_Locator = "//ancestor::td//following-sibling::td[1]";

        let nameValue = await page.locator(p1_Locator + i + p2_Locator).innerText();

        if (nameValue === name) {

            let p1_checkbox = "//tbody[@id='employee-body']/tr[";
            let p2_checkbox = "]/td/input";
            let role = await page.locator(p1_Locator + i + p2_Locator + p3_Locator).innerText();
            console.log(name + " -----> " + role + " at place " + i);
            let checkboxLocator = await page.locator(p1_checkbox + i + p2_checkbox);
            await checkboxLocator.click();
            await expect(checkboxLocator).toBeChecked();

        }

    }

}


export {
    verifyIfNameIsPresentAndItsRole,
    verifyIfNameIsPresentAndItsRoleAndCheck
    // ...add just the name here for each new function
}