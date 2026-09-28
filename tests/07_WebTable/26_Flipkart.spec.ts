import { test } from '@playwright/test';
import * as common from './26_FlipkartCommonFile';
test.setTimeout(60000);

test("Extract out Camera After Search", async ({ page }) => {

    await common.Openflipkart(page);
    await common.searchForCamera(page);
    await common.listOutNikonCameraAndTheirPrice(page);

})