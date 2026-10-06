// Real handling of SVG

import { test, expect } from '@playwright/test';

test.describe("Simple Maps", () => {

    test.beforeEach("Open URL", async ({ page }) => {
        await page.goto("https://simplemaps.com/svg/country/in", { waitUntil: "domcontentloaded" });

    })

    test("Get all Map-State Labels", async ({ page }) => {

        await page.waitForLoadState("load");
        const statePaths = await page.locator("//div[@id='admin1_map_inner']//*[name()='path']").all(); //


        for (const names of statePaths) {
            const classState = await names.getAttribute('class');
            const stateCode = ((classState?.substring(18))?.trim());
            let constructedStateLabel = `sm_label sm_label_${stateCode}`;

            const stateLocator = `//div[@id='admin1_map_inner']//*[name()='text' and contains(@class,'${constructedStateLabel}')]//*[name()='tspan']`;

            const State = await page.locator(stateLocator).textContent();
            console.log(classState + " ----> " + State);

        }

    })

})
