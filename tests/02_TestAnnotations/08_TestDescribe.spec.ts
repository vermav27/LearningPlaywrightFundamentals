import { test, expect } from '@playwright/test';

test.describe("Login Page Tests", async () => {

    test("Login to app", async ({ page }) => {
        console.log("This is test 1");
    });

    test("Logout from app", async ({ page }) => {
        console.log("This is test 2");
    });

})

/*
==================== COMMENT SECTION ====================

Topic: test.describe()

Usage in this file:

test.describe("Login Page Tests", async () => {

    test("Login to app", async ({ page }) => {
        console.log("This is test 1");
    });

    test("Logout from app", async ({ page }) => {
        console.log("This is test 2");
    });

})

Brief explanation:
test.describe() is used to group related test cases together.
In this file, both tests are related to the login page, so they are kept inside
one group named "Login Page Tests".

Why test.describe() is used:
1. It makes the test file easier to read.
2. It keeps related tests together in one logical group.
3. It improves the Playwright test report because tests appear under the group name.
4. It helps when you want to run a specific group of tests.

Example:

test.describe("Login Page Tests", async () => {

    test("Valid login", async ({ page }) => {
        // Write valid login test steps here.
    });

    test("Invalid login", async ({ page }) => {
        // Write invalid login test steps here.
    });

})

How to run this group from terminal:

npx playwright test -g "Login Page Tests"

Summary:
Use test.describe() when multiple tests belong to the same page, feature,
module, or functionality. It helps organize tests and makes them easier to
understand and maintain.

=========================================================
*/
