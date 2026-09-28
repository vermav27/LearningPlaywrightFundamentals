import { test, expect } from '@playwright/test';
import * as CommonFile from './25_CommonFile.ts';


test("Verify add user and delete user", async ({ page }) => {

    await CommonFile.LoginOrangeHRM(page);
    let objectOfName = await CommonFile.CreatePIMRecordAndVerifyItsCreated(page);
    let fullName = objectOfName.FullName;
    let lastName = objectOfName.LastName
    await CommonFile.FindRecordAndDeleteTheRecordFromTable(page, fullName, lastName);

})