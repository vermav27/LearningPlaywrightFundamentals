import { expect, Page } from '@playwright/test';
import { flipkartLocators } from './26_FlipkartLocators';

async function Openflipkart(page: Page) {

    await page.goto("https://www.flipkart.com/", { waitUntil: "domcontentloaded" });
    await page.locator(flipkartLocators.crossButton).click();

}

async function searchForCamera(page: Page) {

    await page.locator(flipkartLocators.searchBox).fill("DSLR Camera");
    await page.locator(flipkartLocators.search).click();
    await page.waitForLoadState("domcontentloaded");

}

async function listOutNikonCameraAndTheirPrice(page: Page) {

    let visibility = true;

    do {

        await page.locator(flipkartLocators.countLabels).first().waitFor({ state: "visible" });
        let ProductListing = await page.locator(flipkartLocators.countLabels).all();
        let numberOfProductsOnaPage = ProductListing.length;

        for (let i = 2; i <= numberOfProductsOnaPage; i++) {

            await page.waitForLoadState("domcontentloaded");

            let productLocator = flipkartLocators.getLabels(i);
            let productName = await page.locator(productLocator).innerText();
            let lowerProduct = productName.toLowerCase();

            //let priceLocator = flipkartLocators.getPrice(i);
            //let price = await page.locator(priceLocator).innerText({ "timeout": 20000 });

            if (lowerProduct.includes("nikon")) {
                console.log(productName);
            }

        }

        if (await page.locator(flipkartLocators.nextButton).isVisible()) {
            visibility = true;
        } else {
            visibility = false;
        }

        if (!visibility) {
            break;
        }

        await page.locator(flipkartLocators.nextButton).click();
        await page.reload({ waitUntil: "domcontentloaded" });
    }

    while (
        visibility
    )
}

export {
    Openflipkart,
    searchForCamera,
    listOutNikonCameraAndTheirPrice

}