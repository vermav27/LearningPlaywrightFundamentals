import { test, expect } from '@playwright/test';
import { verifyIfNameIsPresentAndItsRoleAndCheck } from './21_commonFunction';

test("Verify if the given name is in the web table and checked", async ({ page }) => {

    let nameToSearch = "Kabir Khan";
    await verifyIfNameIsPresentAndItsRoleAndCheck(page, nameToSearch);

})