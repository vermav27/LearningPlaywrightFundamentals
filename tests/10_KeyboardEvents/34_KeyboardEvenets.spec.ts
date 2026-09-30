import { test, expect } from '@playwright/test';

test("Keyboard Events", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/keyboard-form", { waitUntil: "domcontentloaded" });
    await page.getByTestId("firstname").click();
    await page.keyboard.type("Vineet");
    await page.keyboard.press('Tab');
    await page.keyboard.type("Verma");
    await page.keyboard.press('Tab');
    await page.keyboard.type("hello@mail.com");
    await page.keyboard.press('Tab');
    await page.keyboard.type("8089789678");
    await page.keyboard.press('Tab');
    await page.keyboard.type("Admin");
    await page.keyboard.press('Tab');
    await page.keyboard.type("Admin");
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.pause();
})

