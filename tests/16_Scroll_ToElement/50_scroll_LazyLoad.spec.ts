import { test, expect } from '@playwright/test';

test.describe("Verify Scroll", async () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("https://app.thetestingacademy.com/playwright/widgets/scroll", { waitUntil: "load" });


    })

    test("Scroll Test", async ({ page }) => {

        // fourth way
        // when you reach last element then next data get load

        // Move to the lazy-load section first so the list starts loading.
        const lazySection = page.getByTestId("section-lazy");
        await lazySection.scrollIntoViewIfNeeded();

        // Locate all list items inside the lazy-loaded list.
        const list = page.getByTestId("lazy-list").locator('li');

        // Track the item count until it stops increasing.
        let previousCount = 0;
        let stableAttempts = 0;
        const maxAttempts = 10;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            // Bring the lazy section back into view to trigger the next load batch.
            await lazySection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(700);

            const currentCount = await list.count();

            // If count did not change, count it as a stable attempt.
            if (currentCount === previousCount) {
                stableAttempts++;
            } else {
                stableAttempts = 0;
                previousCount = currentCount;
            }

            // Stop once repeated scrolls no longer load new items.
            if (stableAttempts >= 2) {
                break;
            }

            // Scroll away from the lazy section so coming back can trigger lazy loading again.
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.waitForTimeout(300);
        }

        const finalCount = await list.count();
        expect(finalCount).toBeGreaterThan(0);

        // Verify every loaded list item is visible on the page.
        for (let i = 0; i < finalCount; i++) {
            await expect(list.nth(i)).toBeVisible();
        }

        console.log(`Total loaded items: ${finalCount}`);

    })

})

/*
Original code:

import { test, expect } from '@playwright/test';

test.describe("Verify Scroll", async () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("https://app.thetestingacademy.com/playwright/widgets/scroll", { waitUntil: "load" });


    })

    test("Scroll Test", async ({ page }) => {

        // fourth way
        // when you reach last element then next data get load

        await page.getByTestId("section-lazy").scrollIntoViewIfNeeded();
        await page.getByTestId("lazy-title").scrollIntoViewIfNeeded();

        const list = page.getByTestId("lazy-list").locator('li');

        const initialCount = await list.count();

        await list.last().scrollIntoViewIfNeeded();

        await expect.poll(async () => list.count(), {
            message: "expected_items > 10",
            timeout: 10000
        }).toBeGreaterThan(initialCount);

        const finalCount = await list.count();
        console.log(finalCount);


    })

})
*/
