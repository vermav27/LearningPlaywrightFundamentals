import { chromium, Browser, BrowserContext, Page } from "playwright";

async function run() {

    // Level 1
    let browser: Browser = await chromium.launch({ headless: false });
    console.log("Browser Launched", browser);

    // Level 2
    let context: BrowserContext = await browser.newContext();
    console.log("Context Created", context);

    // Level 3
    let page: Page = await context.newPage();
    console.log("Page Created", page);

    // Clean Up - Should always be in reverse order
    await page.close();
    await context.close();
    await browser.close();

}

run();