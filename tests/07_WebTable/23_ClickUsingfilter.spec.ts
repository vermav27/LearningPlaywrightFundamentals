import { test, expect } from '@playwright/test';

test("Action using filter.", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
    await page.locator("//div[@class='list-group']/a").filter({ hasText: "Downloads" }).click();

    //filter allows us to find out specific locator based on string ---> "has text", "hasNotText"
    //       allows us to find out specific locator based on locator ---> "has?" , "hasNot?"

    const currentURL = await page.url();
    await expect(currentURL).toContain("downloads");

})