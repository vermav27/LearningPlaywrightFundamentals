import { chromium } from 'playwright';
import dotenv from "dotenv";
import { expect } from '@playwright/test';
dotenv.config({ override: true });

const username: string = process.env.USERNAME ?? "";
const password: string = process.env.PASSWORD ?? "";

async function saveSession() {

    console.log("Saving OrangeHRM session...");
    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByRole("textbox", { name: "Username" }).fill(username);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("//h6[(text()='Dashboard')]")).toBeVisible();
    await browserContext.storageState({ path: './user-session.json' });
    await browser.close();
    console.log("Saved OrangeHRM session.");

}

saveSession();
