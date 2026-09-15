import { test, expect } from '@playwright/test';

test.skip("Verify the heading", async ({ page }) => {
    console.log("This test is going to be skipped.");
})

test.only("Verify the description.", async ({ page }) => {
    console.log("Only this will be executed.")
})

test.fail("Verify that the test case should be faiuled", ({ page }) => {
    expect(100).toBeGreaterThan(500);
})

test.fixme("Verify the login flow", async ({ page }) => {
    console.log("Need Fix.");
})

test("Veify the checkout process", async ({ page }) => {
    test.slow();
    console.log("This is the checkout flow.");
})

/*
Comment Section: Playwright Test Annotations Used In This File

1. test.skip()

Usage:
test.skip("Verify the heading", async ({ page }) => {
    console.log("This test is going to be skipped.");
})

Explanation:
test.skip() is used when you do not want Playwright to run a test.
Use it when a test is not ready, a feature is temporarily unavailable, or you want to ignore a test for some time.

Why it is used:
The test stays in the file for future use, but Playwright skips its execution.

2. test.only()

Usage:
test.only("Verify the description.", async ({ page }) => {
    console.log("Only this will be executed.")
})

Explanation:
test.only() is used when you want to run only one specific test from the file or test suite.
It is useful while debugging because it saves time and avoids running all tests.

Why it is used:
Only the test marked with test.only() will run. Other tests will be ignored during that test run.
Remove test.only() before committing code or running the complete test suite.

3. test.fail()

Usage:
test.fail("Verify that the test case should be failed", async ({ page }) => {
    expect(100).toBeGreaterThan(500);
})

Explanation:
test.fail() is used when you expect a test to fail.
If the test fails, Playwright marks it as expected. If the test unexpectedly passes, Playwright reports it.

Why it is used:
It is helpful when you know a feature has a bug and you want to keep the test in the suite until the bug is fixed.

4. test.fixme()

Usage:
test.fixme("Verify the login flow", async ({ page }) => {
    console.log("Need Fix.");
})

Explanation:
test.fixme() is used for tests that are broken or incomplete and need to be fixed later.
Playwright will not run this test.

Why it is used:
It clearly shows that the test or related functionality needs attention, but it avoids failing the test suite.

5. test.slow()

Usage:
test("Verify the checkout process", async ({ page }) => {
    test.slow();
    console.log("This is the checkout flow.");
})

Explanation:
test.slow() is used inside a test when that test is expected to take more time than usual.
Playwright increases the timeout for this test.

Why it is used:
It helps avoid timeout failures for valid long-running flows, such as checkout, payment, upload, or complex navigation scenarios.
*/
