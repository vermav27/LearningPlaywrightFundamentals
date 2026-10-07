import { test, expect } from '@playwright/test';

test("Selector Hub Task", async ({ page }) => {

    await page.addInitScript(() => {
        const originalAttachShadow = Element.prototype.attachShadow;

        Element.prototype.attachShadow = function (init) {
            return originalAttachShadow.call(this, { ...init, mode: 'open' });
        };
    });

    await page.goto("https://selectorshub.com/xpath-practice-page/", { waitUntil: "load" });

    await page.locator("#kils").fill("Test User");
    await page.locator("#pizza").fill("Farmhouse");
    await page.locator("#training").fill("Shadow");
    await page.locator("#pwd").fill("PAssword");

})