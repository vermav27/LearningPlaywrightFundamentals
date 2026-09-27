import { test, expect, Locator } from '@playwright/test';

// Run 13_SessionStorage.ts before running the test.
// Command to run : npx tsx tests/04_SessionStorage/13_SessionStorage.ts

test.use({
    storageState: "./user-session.json",
});


test.describe("Login Tests", async () => {

    test("Verify user is on the dashboard page", async ({ page }) => {

        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
        let value = await page.locator("//h6[(text()='Dashboard')]").innerText();
        await expect(value).toBe("Dashboard");

    })

    test("Verify the list of side menu", async ({ page }) => {

        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
        const elements = page.locator("//ul[@class='oxd-main-menu']//span");
        await expect(elements.first()).toBeVisible();
        let sideMenuCounts = await elements.count();

        let menu: string[] = [];
        for (let i = 0; i < sideMenuCounts; i++) {
            await menu.push(await elements.nth(i).innerText());
        }

        const expectedLabels: string[] = ["Admin", "PIM", "Leave", "Time", "Recruitment", "My Info", "Performance", "Dashboard", "Directory", "Maintenance", "Claim", "Buzz"];
        let expectedLabelsCounts = expectedLabels.length;
        let menuCounts = menu.length;

        if (expectedLabelsCounts === menuCounts) {

            for (let j = 0; j < sideMenuCounts; j++) {

                await expect(expectedLabels[j] === menu[j]).toBe(true);

            }

        }

    })
})
