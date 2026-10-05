import { test, expect, Locator } from '@playwright/test';

test.describe("Flipkart Test", () => {

    test.beforeEach("Open URL", async ({ page }) => {
        await page.goto("https://www.flipkart.com/", { waitUntil: "domcontentloaded" });
        await page.locator("//span[text()='✕']").click();
    })

    test("Search Mac Mini and give list and price", async ({ page }) => {

        await page.getByPlaceholder("Search for Products, Brands and More").first().fill("Macmini");
        const svgElements = page.locator("svg");
        await svgElements.nth(2).click();
        const nameOfProduct: Locator = await page.locator("//div[contains(@data-id,'MPC') or contains(@data-id,'COM') or contains(@data-id,'CPU')]//a[2]");
        const priceOfProduct: Locator = await page.locator("//div[contains(@class,'hZ3P6w')]");
        await page.waitForLoadState("networkidle");

        let productCount = await nameOfProduct.count();
        console.log(productCount);

        for (let i = 0; i < productCount; i++) {
            console.log(await nameOfProduct.nth(i).textContent() + " -------> " + await priceOfProduct.nth(i).textContent());
        }

    })

})