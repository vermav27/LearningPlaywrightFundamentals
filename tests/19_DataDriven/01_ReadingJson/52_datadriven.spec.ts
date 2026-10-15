import { test, expect } from '@playwright/test';
import userData from './detail.json';

test("Consoling the data", async ({ page }) => {

    console.log(userData.family[0].name);
    console.log(userData.assets[3]);

})