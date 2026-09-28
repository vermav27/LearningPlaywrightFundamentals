import process from 'node:process';
import dotenv from 'dotenv'
dotenv.config({ override: true });
import { orangeHRM } from './25_Locators.ts';
import { expect, Page } from '@playwright/test';
import { data } from './25_DataProvider.ts';

type employeeName = { FullName: string, LastName: string }

async function LoginOrangeHRM(page: Page) {
    //Get Username from envFile
    const USER = process.env.USERNAME ?? "";
    const PASS = process.env.PASSWORD ?? "";

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "domcontentloaded" });
    await page.locator(orangeHRM.userName).fill(USER);
    await page.locator(orangeHRM.password).fill(PASS);
    await page.locator(orangeHRM.button).click();
    await page.waitForLoadState("networkidle");
}

async function CreatePIMRecordAndVerifyItsCreated(page: Page): Promise<employeeName> {

    let newURL = await page.url();
    await expect(newURL).toBe("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.waitForLoadState("networkidle");
    await page.locator(orangeHRM.PIMlink).click();
    await expect(await page.locator(orangeHRM.PIMPageHeading).innerText()).toBe("PIM");
    await expect(await page.locator(orangeHRM.AddButton)).toBeVisible();
    await page.locator(orangeHRM.AddButton).click();
    await expect(await page.locator(orangeHRM.AddEmployeeHeading)).toBeVisible();
    await page.locator(orangeHRM.firstName).fill(data.fake_firstName);
    await page.locator(orangeHRM.middleName).fill(data.fake_middleName);
    await page.locator(orangeHRM.lastName).fill(data.fake_lastName);
    await page.locator(orangeHRM.employeeId).fill(data.fake_id);
    await page.locator(orangeHRM.saveEmployee).click();
    await expect(page.locator(orangeHRM.toastMessage)).toBeVisible();
    await page.locator(orangeHRM.PIMlink).click();
    await page.waitForLoadState("networkidle");
    await expect(await page.locator(orangeHRM.PIMPageHeading).innerText()).toBe("PIM");
    await page.waitForLoadState("networkidle");
    let ourUserFullName = data.fake_firstName + " " + data.fake_middleName;
    let ourLastName = data.fake_lastName;
    return { FullName: ourUserFullName, LastName: ourLastName }

}

async function FindRecordAndDeleteTheRecordFromTable(page: Page, fullName: string, lastName: string) {


    let rowCount = await page.locator(orangeHRM.row).all();
    let numberOfRows = rowCount.length;
    //let ourUserFullName = data.fake_firstName + " " + data.fake_middleName;
    let navigatorButton = page.locator("//button[contains(@class,'pagination')]/i[contains(@class,'right')] ");
    let nameFound = false;

    do {

        for (let i = 1; i <= numberOfRows; i++) {

            let p1_name = "//div[@class='oxd-table-body']/div[";
            let p2_name = "]/div/div[3]/div";
            let p4_name = "]/div/div[4]/div";

            let getFullName = await page.locator(p1_name + i + p2_name).innerText();
            let getLastName = await page.locator(p1_name + i + p4_name).innerText();

            if (getFullName === fullName) {
                console.log("First & Middle Name Matched.");
                if (getLastName === data.fake_lastName) {
                    console.log("Last Name Matched.")
                    nameFound = true;

                    let checkbox = page.locator(`//div[@class='oxd-table-body']/div[${i}]//i[contains(@class,'checkbox')]`);
                    let del = page.locator(`//div[@class='oxd-table-body']/div[${i}]//i[contains(@class,'trash')]`);
                    await checkbox.click();
                    await del.click();
                    await expect(page.locator(orangeHRM.dialogueBox)).toBeVisible();

                    let deleteButtonText = (await page.locator(orangeHRM.deleteButton).innerText()).trim();
                    expect(deleteButtonText).toBe("Yes, Delete");
                    await page.locator(orangeHRM.deleteButton).click();
                    await expect(page.locator(orangeHRM.toastMessage)).toBeVisible();
                    console.log("Entry Deleted");

                    break;

                } else {
                    console.log("Not Matching Lastname at location --> " + i);
                }
            } else {
                console.log("Not Matching Full Name at location --> " + i);
            }

        }

        if (!nameFound) {
            await navigatorButton.click();
        }

    }
    while (
        !nameFound
    );

}

export {
    LoginOrangeHRM,
    CreatePIMRecordAndVerifyItsCreated,
    FindRecordAndDeleteTheRecordFromTable
}