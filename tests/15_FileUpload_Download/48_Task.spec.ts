import { test, expect } from '@playwright/test';

test("Task count the occurance of the letter", async ({ page }) => {

    let str = "my name is vineet verma.";

    let count: any = {};

    for (let char of str) {
        if (count[char]) {

            count[char]++;

        } else {
            count[char] = 1;
        }
    }

    console.log(count);

})