import { test, expect } from '@playwright/test';

test("Advance Drag And Drop", async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/dnd", { waitUntil: "domcontentloaded" });

    let source = page.locator("//article[@id='card-review-pr-21']");
    let sBox = (await source.boundingBox())!;

    let destination = page.getByTestId("col-in-progress");
    let dBox = (await destination.boundingBox())!;

    await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(dBox.x + dBox.width / 2, dBox.y + dBox.height / 2);
    await page.mouse.up();

    await page.pause();

})

/*
Line-by-line explanation of the above test:


let source = page.locator("//article[@id='card-review-pr-21']");
- Finds the card that we want to drag.
- This locator uses XPath and targets the article element with id card-review-pr-21.

let sBox = (await source.boundingBox())!;
- Gets the source card's position and size on the screen.
- sBox contains x, y, width, and height.
- The ! tells TypeScript that the value will not be null.

let destination = page.getByTestId("col-in-progress");
- Finds the destination column where the card should be dropped.
- It uses the element's test id: col-in-progress.

let dBox = (await destination.boundingBox())!;
- Gets the destination column's position and size on the screen.
- dBox contains x, y, width, and height.
- The ! tells TypeScript that the value will not be null.

await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2);
- Moves the mouse to the center of the source card.
- sBox.x + sBox.width / 2 calculates the horizontal center.
- sBox.y + sBox.height / 2 calculates the vertical center.

await page.mouse.down();
- Presses and holds the mouse button, like starting a drag manually.

await page.mouse.move(dBox.x + dBox.width / 2, dBox.y + dBox.height / 2);
- Moves the mouse to the center of the destination column while still holding the mouse button.

await page.mouse.up();
- Releases the mouse button, which drops the card in the destination column.

await page.pause();
- Pauses the test and opens Playwright Inspector so you can debug or watch what happened.

})
- Ends the test block.
*/
