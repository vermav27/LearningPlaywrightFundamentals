import { test, expect } from '@playwright/test';
import loginData from './02_TestingUsingJSON/data.json'
import path from 'path';
import fs from 'fs';



test("Writting the JSON", async ({ page }) => {

    const myData = {
        name: "Vineet",
        age: 34
    }

    const jsonData = JSON.stringify(myData);

    fs.writeFileSync("output.json", jsonData);

})

