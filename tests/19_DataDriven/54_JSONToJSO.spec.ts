import { test, expect } from '@playwright/test';
import loginData from './02_TestingUsingJSON/data.json'
import path from 'path';
import fs from 'fs';



test("Consoling the JSON", async ({ page }) => {

    console.log(loginData);

})

test("Consoling the JSON using filesystem", async ({ page }) => {

    const filePath = path.join(__dirname, "/02_TestingUsingJSON/data.json");
    console.log(filePath);

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const userDataJSObject = JSON.parse(fileData);
    console.log(userDataJSObject);

})

