import { test, expect } from '@playwright/test';
import { verifyIfNameIsPresentAndItsRole } from './21_commonFunction';

test("Verify if given name is in the web table", async ({ page }) => {

    let nameToSearch = "Kabir Khan";
    await verifyIfNameIsPresentAndItsRole(page, nameToSearch);

})