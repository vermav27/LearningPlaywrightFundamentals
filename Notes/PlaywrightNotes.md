# Playwright Notes

> Update rule: Whenever this file is updated because new `.ts` files are added under the `tests` folder, update both sections: **Notes** and **Interview Questions**. Keep the concepts, examples, and questions aligned with the latest test files so this remains interview-ready.

Source files currently covered:

- `tests/01_Basics/01_example.spec.ts`
- `tests/01_Basics/02_tta-check.spec.ts`
- `tests/01_Basics/03_sciensus.spec.ts`
- `tests/01_Basics/04_BCP.spec.ts`
- `tests/01_Basics/05_Basics.spec.ts`
- `tests/01_Basics/06_TestOptions.spec.ts`
- `tests/02_TestAnnotations/07_TestAnnotations.spec.ts`
- `tests/02_TestAnnotations/08_TestDescribe.spec.ts`
- `tests/03_LocatorCommands/09_LocatorCommand.spec.ts`
- `tests/03_LocatorCommands/10_BasicTest.spec.ts`
- `tests/03_LocatorCommands/11_hw_Login_validation.spec.ts`
- `tests/03_LocatorCommands/12_hw_errorValidation.spec.ts`
- `tests/04_SessionStorage/13_SessionStorage.ts`
- `tests/04_SessionStorage/14_TestOrange.spec.ts`
- `tests/05_Reporter/15_TestOrange_CustomReport.spec.ts`
- `tests/05_Reporter/16_TestOrange_AllureReport.spec.ts`
- `tests/06_MultipleElements/17_MultipleElements.spec.ts`
- `tests/07_WebTable/20_WebTable.spec.ts`
- `tests/07_WebTable/21_commonFunction.ts`
- `tests/07_WebTable/22_ChecktheRecord.spec.ts`
- `tests/07_WebTable/23_ClickUsingfilter.spec.ts`
- `tests/07_WebTable/24_Pagination.spec.ts`
- `tests/07_WebTable/25_CommonFile.ts`
- `tests/07_WebTable/25_DataProvider.ts`
- `tests/07_WebTable/25_Locators.ts`
- `tests/07_WebTable/25_OrangeTable.spec.ts`
- `tests/07_WebTable/26_Flipkart.spec.ts`
- `tests/07_WebTable/26_FlipkartCommonFile.ts`
- `tests/07_WebTable/26_FlipkartLocators.ts`
- `tests/08_dropdowns/27_simpleDropdown.spec.ts`
- `tests/08_dropdowns/28_customDropdown.spec.ts`
- `tests/08_dropdowns/29_AdvanceDropdown.spec.ts`
- `tests/08_dropdowns/30_TASK_qaForm.spec.ts`
- `tests/09_Frames_iFrames/31_SingleiFrame.spec.ts`
- `tests/09_Frames_iFrames/32_MultiFrameSet.spec.ts`
- `tests/09_Frames_iFrames/33_NestediFrames.spec.ts`
- `tests/10_KeyboardEvents/34_KeyboardEvenets.spec.ts`
- `tests/11_Hover_Drag_Drop/35_Hover_TestCase.spec.ts`
- `tests/11_Hover_Drag_Drop/36_Drag_and_Drop.spec.ts`
- `tests/11_Hover_Drag_Drop/37_Advance_Drag_And_Drop.spec.ts`
- `tests/11_Hover_Drag_Drop/38_ContextClick.spec.ts`
- `tests/12_Alerts/39_JS_Alerts.spec.ts`
- `tests/13_svg/40_svg.spec.ts`
- `tests/13_svg/41_svg_example.spec.ts`
- `tests/13_svg/42_Real_svg_concept.spec.ts`
- `tests/13_svg/43_Task_AppliTools.spec.ts`
- `tests/13_svg/43_Task_Utility.ts`
- `utils/CustomReporter.ts`

## Notes

### 1. Playwright Test Runner vs Playwright Library

Playwright can be used in two common ways.

The first way is through `@playwright/test`, which gives a full test runner with `test`, `expect`, fixtures, retries, traces, reports, annotations, projects, and parallel execution.

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

The second way is through the lower-level `playwright` package, where you manually launch a browser, create a browser context, create a page, and close everything yourself.

```ts
import { chromium, Browser, BrowserContext, Page } from 'playwright';

async function run() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  await page.close();
  await context.close();
  await browser.close();
}

run();
```

For automation frameworks, `@playwright/test` is normally preferred because it gives test execution, fixtures, assertions, reporting, tracing, screenshots, and configuration. The lower-level API is useful for scripts, tooling, custom browser automation, or learning the browser-context-page model.

### 2. TypeScript Concepts Used With Playwright

The test files use TypeScript imports and Playwright types.

```ts
import { chromium, Browser, BrowserContext, Page } from 'playwright';
```

Important TypeScript points:

- `Browser`, `BrowserContext`, and `Page` are type annotations.
- Type annotations improve readability and catch mistakes during development.
- `async` marks a function that returns a promise.
- `await` pauses execution until the promise resolves.
- Almost every Playwright action is asynchronous, so `await` is required.

Example:

```ts
let browser: Browser = await chromium.launch({ headless: false });
let context: BrowserContext = await browser.newContext();
let page: Page = await context.newPage();
```

Interview point: In Playwright, missing `await` is a common cause of flaky tests because the next step may execute before the current browser action is complete.

#### JavaScript vs TypeScript Interview Angle

Playwright supports both JavaScript and TypeScript. The API is almost the same, but TypeScript adds static typing, better editor suggestions, safer refactoring, and clearer framework contracts.

JavaScript example:

```js
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

TypeScript example:

```ts
import { test, expect, Page } from '@playwright/test';

async function openHomePage(page: Page) {
  await page.goto('https://playwright.dev/');
}
```

For interview answers, explain that TypeScript is preferred in larger automation frameworks because page objects, fixtures, helpers, test data models, and API clients become easier to maintain when contracts are typed.

### 3. Basic Test Structure With `test()`

A Playwright test usually has a test title and an async test function.

```ts
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

Key parts:

- `test(...)` defines a test case.
- The first argument is the test name.
- The second argument is an async callback.
- `{ page }` is a Playwright fixture.
- Test steps usually follow arrange, act, assert style:
  - Arrange: open page or prepare state.
  - Act: perform user actions.
  - Assert: verify expected result.

Good test names should describe behavior, not implementation. For example, `should show Installation heading after clicking Get started` is more meaningful than `test`.

### 4. Playwright Fixtures: `page` and `browser`

Playwright fixtures provide ready-to-use objects to tests.

The `page` fixture gives a fresh browser page for a test:

```ts
test('Navigating to TTA website', async ({ page }) => {
  await page.goto('https://www.sciensus.com');
});
```

The `browser` fixture gives access to the browser instance. It is useful when a test needs custom contexts, multiple isolated users, different device settings, permissions, locale, or geolocation.

```ts
test('BCP implementation', async ({ browser }) => {
  const adminContext = await browser.newContext();
  const userContext = await browser.newContext();

  const adminPage = await adminContext.newPage();
  const userPage = await userContext.newPage();

  await adminPage.goto('https://www.yahoo.com');
  await userPage.goto('https://www.google.com');

  await adminPage.close();
  await userPage.close();
  await adminContext.close();
  await userContext.close();
});
```

Best practice: Close contexts and pages that you create manually. When using the built-in `browser` fixture from `@playwright/test`, Playwright manages the browser lifecycle, so tests usually should not call `browser.close()` themselves.

### 5. Browser, BrowserContext, and Page Model

Playwright uses a three-level model.

`Browser` represents the browser process, such as Chromium, Firefox, or WebKit.

`BrowserContext` represents an isolated browser session. Each context has its own cookies, local storage, session storage, permissions, locale, viewport, geolocation, and user agent. It is similar to an incognito profile.

`Page` represents a tab inside a browser context.

Example:

```ts
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
```

Cleanup should usually happen in reverse order:

```ts
await page.close();
await context.close();
await browser.close();
```

Interview point: Browser contexts are one of Playwright's strongest features because they allow fast, isolated, parallel, multi-user tests without launching a new browser for every user.

### 6. Launching Chromium

The file `04_BCP.spec.ts` launches Chromium manually.

```ts
const browser = await chromium.launch({ headless: false });
```

Important options:

- `headless: true`: runs without visible browser UI. This is common in CI.
- `headless: false`: opens the browser UI. This is useful for learning and debugging.

When using `@playwright/test`, browser launch is normally controlled by `playwright.config.ts` or CLI options, not directly inside tests.

### 7. Navigation With `page.goto()`

`page.goto()` navigates to a URL.

```ts
await page.goto('https://playwright.dev/');
```

It can also accept options:

```ts
await page.goto('https://app.vwo.com', {
  timeout: 5000,
  referer: 'https://www.google.com',
  waitUntil: 'domcontentloaded',
});
```

Options used in the tests:

- `timeout`: maximum time Playwright waits for navigation.
- `referer`: sets the HTTP referer header for the navigation.
- `waitUntil: 'load'`: waits for the load event.
- `waitUntil: 'domcontentloaded'`: waits until the initial HTML document is loaded and parsed.

Common `waitUntil` values:

- `domcontentloaded`: fast and often enough for modern apps.
- `load`: waits for page load event including dependent resources.
- `networkidle`: waits for network to be quiet, but it can be unreliable for apps with polling, analytics, or long-running network calls.

Interview point: Prefer asserting on a reliable page element after navigation instead of relying only on a navigation event.

### 8. Context Options

`browser.newContext()` can simulate different environments.

```ts
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  locale: 'fr-FR',
  timezoneId: 'Europe/Paris',
  geolocation: { latitude: 48.8566, longitude: 2.3522 },
  permissions: ['geolocation'],
});
```

Concepts:

- `viewport` controls browser window size for the page.
- `locale` changes browser locale, useful for localization testing.
- `timezoneId` changes timezone behavior.
- `geolocation` mocks latitude and longitude.
- `permissions` grants browser permissions such as `geolocation`.

For geolocation tests, setting only coordinates is not enough. The context must also grant geolocation permission.

### 9. Mobile Emulation

The tests manually create a mobile-like context.

```ts
const iPhone = {
  viewport: { width: 375, height: 667 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};

const context = await browser.newContext(iPhone);
const page = await context.newPage();
```

Important mobile properties:

- `viewport`: mobile screen size.
- `userAgent`: browser/device identity sent to the server.
- `deviceScaleFactor`: pixel density.
- `isMobile`: enables mobile viewport behavior.
- `hasTouch`: enables touch support.

In production frameworks, prefer Playwright's built-in device descriptors when possible:

```ts
import { devices } from '@playwright/test';

const context = await browser.newContext(devices['iPhone 13']);
```

Interview point: Mobile emulation is not the same as testing on a real device. It is valuable for responsive and browser-level behavior, but real-device testing may still be needed for device-specific issues.

### 10. Locator Strategy Overview

Locators are Playwright's way to find elements. They are lazy and auto-waiting, meaning Playwright resolves them when an action or assertion is performed.

The tests use:

- Role locators: `getByRole(...)`
- Test id locators: `getByTestId(...)`
- CSS locators: `locator(...)`
- XPath locators: `locator('//...')`
- Text locators: `getByText(...)`
- Chained locators
- Positional locators with `nth(...)`

Good locator strategy, from most user-focused to more technical:

- Use `getByRole()` when the element has a meaningful accessible role and name.
- Use `getByLabel()`, `getByPlaceholder()`, or `getByText()` when appropriate.
- Use `getByTestId()` for stable automation hooks.
- Use CSS selectors when no better user-facing locator is available.
- Avoid XPath and brittle positional selectors unless there is a specific reason.

For a full reference covering every locator type, `filter()`, `and()`/`or()`, iframes, and strictness, see `tests/03_LocatorCommands/PlaywrightLocators.md`.

### 11. Role Locators With `getByRole()`

Role locators identify elements the way assistive technologies understand the page.

```ts
await page.getByRole('link', { name: 'Get started' }).click();
await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
```

More examples from the tests:

```ts
await page.getByRole('button', { name: 'Allow all' }).click();
await page.getByRole('textbox', { name: 'Email Address' }).fill('Vineet');
await expect(page.getByRole('link', { name: 'English' })).toBeVisible();
```

Why this is strong:

- It matches how users interact with the page.
- It encourages accessible UI.
- It is usually more stable than CSS classes.
- It makes test intent readable.

Interview point: `name` in `getByRole()` is the accessible name, not always the visible text. It can come from text content, `aria-label`, `aria-labelledby`, `alt`, associated labels, and other accessibility rules.

#### Name Matching Rules

By default, `name` matching is case-insensitive and matches a substring. In `12_hw_errorValidation.spec.ts`, both of these rely on that:

```ts
await page.getByRole("textbox", { name: "email" }).fill("admin");                // matches a textbox named "Email"
await page.getByRole("checkbox", { name: "I agree to Wingify's" }).check();       // matches a longer checkbox label
```

Use `exact: true` for a case-sensitive, full-string match, or a regular expression for pattern matching:

```ts
page.getByRole('button', { name: 'Create a Free Trial Account', exact: true });
page.getByRole('button', { name: /free trial/i });
```

Substring matching is convenient, but a short name like `email` can match more than one element. When a locator matches several elements, Playwright's strict mode throws on actions instead of picking one. Fix it by using a more specific name, `exact: true`, or a scoped locator.

### 12. Scoped and Chained Locators

Scoped locators search inside a specific parent area.

```ts
await expect(
  page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Contact us' })
).toBeVisible();
```

This is better than searching the full page when the same link may exist in the header, footer, sidebar, or menu.

Benefits:

- Reduces ambiguity.
- Improves readability.
- Makes tests more stable.
- Verifies that the element appears in the correct section.

### 13. Positional Locators With `nth()`

The tests use:

```ts
await expect(page.getByRole('link').nth(3)).toBeVisible();
```

`nth(3)` means the fourth matching element because indexing starts at zero.

Use `nth()` carefully. It is useful when testing a known list or table order, but it can be brittle if the page structure changes. Prefer a named, scoped, or filtered locator when possible.

Better example:

```ts
await expect(page.getByRole('link', { name: 'Contact us' })).toBeVisible();
```

### 14. Test ID Locators

The tests use:

```ts
await page.getByTestId('login-button').click();
```

By default, `getByTestId()` looks for `data-testid`.

Example HTML:

```html
<button data-testid="login-button">Login</button>
```

Test IDs are useful when:

- The element has no stable accessible name.
- Text changes because of localization.
- The selector should be independent from styling.
- The UI is dynamic and CSS classes are generated.

Best practice: Test IDs should represent user intent or business meaning, not implementation details.

Good:

```html
<button data-testid="login-button">Login</button>
```

Avoid:

```html
<button data-testid="blue-button-div-3">Login</button>
```

### 15. CSS Locators

The tests use CSS locators:

```ts
const userNameField = page.locator('#login-username');
const passwordField = page.locator('#login-password');
const signInBtn = page.locator('#js-login-btn');
const errorMsgBox = page.locator('.notification-box-description');
```

Common CSS selectors:

- `#id`: selects by ID.
- `.className`: selects by class.
- `[name="value"]`: selects by attribute.
- `tag`: selects by tag name, for example `h1`.

Examples:

```ts
page.locator('#login-username');
page.locator('.notification-box-description');
page.locator('[name="email"]');
page.locator('h1');
```

CSS locators are powerful, but they can become brittle when tied to styling classes or generated class names. Prefer role, label, text, or test id locators when they express user behavior more clearly.

### 16. Storing Locators in Variables

The tests store locators before using them:

```ts
const userNameField = page.locator('#login-username');
const passwordField = page.locator('#login-password');
const signInBtn = page.locator('#js-login-btn');
const errorMsgBox = page.locator('.notification-box-description');

await userNameField.fill('admin');
await passwordField.fill('password');
await signInBtn.click();
await expect(errorMsgBox).toContainText('Your email, password, IP address or location did not match');
```

This improves readability and avoids duplication. A locator is not a direct element reference. It is a query plan that Playwright resolves later when an action or assertion is executed.

Interview point: Because locators are lazy, they are more reliable than storing `ElementHandle`s for most UI testing. Locators re-query and auto-wait.

### 17. User Actions: `click()` and `fill()`

The tests use basic user actions.

```ts
await page.getByRole('textbox', { name: 'Email Address' }).click();
await page.getByRole('textbox', { name: 'Email Address' }).fill('Vineet');
await page.getByRole('textbox', { name: 'Password' }).fill('123');
await page.getByTestId('login-button').click();
```

`click()` performs an actionability check before clicking. Playwright waits for the element to be visible, stable, enabled, and able to receive events.

`fill()` sets the value of an input, textarea, or contenteditable element. It usually focuses and replaces the existing value, so a separate `click()` before `fill()` is often not required unless the application needs a focus-triggered behavior.

### 18. Assertions With `expect`

The tests use Playwright assertions.

```ts
await expect(page).toHaveTitle(/Playwright/);
await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
await expect(page.locator('h1')).toContainText('Connecting patients with life-changing therapies at home');
await expect(errorMsgBox).toContainText('Your email, password, IP address or location did not match');
```

Important assertion types:

- `toHaveTitle(...)`: validates the page title.
- `toBeVisible()`: validates that a locator resolves to a visible element.
- `toContainText(...)`: validates partial text content.
- `toBeGreaterThan(...)`: validates numeric comparison.
- `not.toBe(...)`: validates that a plain value is different from another value.
- `toContain(...)`: validates that a plain string contains a substring, or an array contains an item.

The last three are generic assertions on plain values and do not retry. See section 30 for how they differ from web-first assertions.

Playwright web-first assertions auto-wait until the condition passes or times out. This reduces the need for manual waits.

Example:

```ts
await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
```

This assertion repeatedly checks visibility until the heading appears or the assertion timeout is reached.

### 19. Regex Assertions

The tests use a regular expression with `toHaveTitle`.

```ts
await expect(page).toHaveTitle(/Playwright/);
```

`/Playwright/` means the title should contain text matching the regular expression. Regex is useful when the full title may include dynamic or additional text.

Examples:

```ts
await expect(page).toHaveTitle(/Login/);
await expect(page).toHaveURL(/dashboard/);
```

Use exact strings when the expected value is stable. Use regex when the value has acceptable variation.

### 20. Waiting Strategy

The tests use:

```ts
await page.waitForTimeout(5000);
```

`waitForTimeout()` pauses execution for a fixed time. It is useful for debugging or demonstration, but it is not recommended for stable automation because it makes tests slower and flaky.

Better alternatives:

```ts
await expect(page.getByTestId('login-button')).toBeVisible();
await expect(page.locator('.notification-box-description')).toContainText('Invalid');
await page.waitForURL(/dashboard/);
await page.waitForLoadState('domcontentloaded');
```

Interview point: Strong Playwright tests wait for conditions, not time. The best wait is usually an assertion on the UI state the user actually cares about.

### 21. Cookie Consent and First-Visit UI

One test handles a cookie banner:

```ts
await page.getByRole('button', { name: 'Allow all' }).click();
```

Cookie banners, popups, onboarding screens, and modals are common sources of flaky tests. Handle them explicitly when they are part of the user flow.

Good practices:

- Use a stable role or test id locator for the consent button.
- Consider setting storage state if the banner should not appear in every test.
- Keep consent handling in a reusable helper if many tests need it.

### 22. Grouping Tests With `test.describe()`

`test.describe()` groups related tests.

```ts
test.describe('Login Page Tests', async () => {
  test('Login to app', async ({ page }) => {
    console.log('This is test 1');
  });

  test('Logout from app', async ({ page }) => {
    console.log('This is test 2');
  });
});
```

Benefits:

- Keeps related tests together.
- Improves test report readability.
- Helps organize by feature, page, component, or workflow.
- Makes it easier to run a subset of tests by title.

Command example:

```bash
npx playwright test -g "Login Page Tests"
```

Best practice: Keep the `test.describe()` callback synchronous. The current sample uses `async () =>`, but real async setup should normally go inside a test, `beforeEach`, `beforeAll`, or a fixture. Test declaration should stay predictable when the test file is loaded.

Interview point: For large automation frameworks, `test.describe()` is useful, but folder structure, tags, projects, and clear naming are also important.

### 23. Test Annotations

The tests use Playwright annotations.

#### `test.skip()`

Skips a test.

```ts
test.skip('Verify the heading', async ({ page }) => {
  console.log('This test is going to be skipped.');
});
```

Use when a test should not run temporarily, for example unsupported browser, unfinished feature, or blocked environment.

#### `test.only()`

Runs only the marked test.

```ts
test.only('Verify the description.', async ({ page }) => {
  console.log('Only this will be executed.');
});
```

Use for local debugging only. Remove before committing because it prevents the rest of the suite from running.

#### `test.fail()`

Marks a test as expected to fail.

```ts
test.fail('Verify that the test case should be failed', async ({ page }) => {
  expect(100).toBeGreaterThan(500);
});
```

If the test fails, Playwright treats it as expected. If the test passes, Playwright reports it as unexpected because the known issue may have been fixed.

#### `test.fixme()`

Marks a test as needing a fix and does not run it.

```ts
test.fixme('Verify the login flow', async ({ page }) => {
  console.log('Need Fix.');
});
```

Use for incomplete or broken tests that should be tracked but not executed.

#### `test.slow()`

Marks a test as slow and increases its timeout.

```ts
test('Verify the checkout process', async ({ page }) => {
  test.slow();
  console.log('This is the checkout flow.');
});
```

Use for valid long-running workflows such as checkout, payment, file upload, or complex navigation.

### 24. Multi-User and Multi-Context Testing

The tests create separate contexts and pages for admin and user.

```ts
const adminContext = await browser.newContext();
const userContext = await browser.newContext();

const adminPage = await adminContext.newPage();
const userPage = await userContext.newPage();
```

This pattern is used for:

- Admin and customer workflows.
- Buyer and seller workflows.
- Maker and checker approval flows.
- Chat or collaboration features.
- Testing isolated sessions in the same test.

Each context has independent cookies and storage, so logging in as two users does not mix sessions.

Interview point: Do not use two pages in the same context for two different users if session isolation is required. Use two contexts.

### 25. Error Message Validation

One test validates a login error message.

```ts
await userNameField.fill('admin');
await passwordField.fill('password');
await signInBtn.click();

await expect(errorMsgBox).toContainText(
  'Your email, password, IP address or location did not match'
);
```

This is a negative login test. It verifies that invalid credentials show the correct error.

Good negative test checks:

- The error message is visible.
- The error text is correct.
- The user remains on the login page.
- Sensitive details are not exposed.
- The login button or form state behaves correctly.

### 26. XPath Locators

`11_hw_Login_validation.spec.ts` uses XPath:

```ts
await page.locator("//input[@id='email']").fill("admin@admin.com");
await page.locator("//input[@id='password']").fill("admin");
await page.locator("//button[@class='login-btn']").click();
```

Playwright treats a selector that starts with `//` or `..` as XPath automatically. The `xpath=` prefix makes it explicit:

```ts
page.locator("xpath=//input[@id='email']");
```

Common XPath patterns:

- `//tag[@attr='value']`: element whose attribute equals the value exactly.
- `//tag[contains(@attr, 'part')]`: attribute contains a substring.
- `//tag[text()='Login']`: element whose own text is exactly `Login`.
- `//tag[contains(text(), 'Log')]`: element text contains a substring.
- `//div[@id='form']//input`: any `input` inside the form container.
- `//input[@id='email']/..` or `/parent::*`: the parent element.
- `//label[text()='Email']/following-sibling::input`: the next sibling `input` after a label.

Relative XPath (`//input[@id='email']`) searches from anywhere in the document. Absolute XPath (`/html/body/div[2]/form/input[1]`) starts from the root and breaks when any wrapper element changes, so avoid it.

`@class='login-btn'` compares the whole `class` attribute string. If the button later becomes `class="login-btn primary"`, the locator stops matching. `contains(@class, 'login-btn')` or the CSS form `.login-btn` handles multiple classes.

The same elements with simpler locators:

```ts
page.locator('#email');
page.locator('#password');
page.locator('.login-btn');
// or, if the inputs have labels and the button has visible text:
page.getByRole('textbox', { name: 'Email' });
page.getByRole('button', { name: 'Login' });
```

Limits of XPath in Playwright:

- XPath does not pierce shadow DOM. CSS and `getBy*` locators do pierce open shadow roots.
- XPath is tied to DOM structure and attribute names, not to what the user sees.
- Long XPath expressions are hard to read and review.

XPath is still reasonable for legacy apps without accessible roles or test IDs, for moving to a parent, ancestor, or sibling, and for conditions that are awkward in CSS.

### 27. Checkbox Actions With `check()`

`12_hw_errorValidation.spec.ts` ticks two consent checkboxes:

```ts
await page.getByRole("checkbox", { name: "Yes, I agree to receive communications from Wingify. I can opt-out at any time." }).check();
await page.getByRole("checkbox", { name: "I agree to Wingify's" }).check();
```

What `check()` does:

- If the checkbox is already checked, it returns immediately without clicking.
- Otherwise it waits for actionability, clicks, and then verifies the checkbox is now checked. If it is not, it throws.

`click()` toggles. Clicking an already-checked box unchecks it, so a test that uses `click()` can end up in the wrong state if the page remembers a previous choice. `check()` states the intended final state.

Related methods and assertions:

```ts
const consent = page.getByRole('checkbox', { name: "I agree to Wingify's" });

await consent.uncheck();
await consent.setChecked(true);        // useful when the desired state comes from test data
await expect(consent).toBeChecked();
await expect(consent).not.toBeChecked();
```

`check()` also works for radio buttons.

### 28. Text Locators and Reading Text From the Page

`12_hw_errorValidation.spec.ts` finds an error by its text and reads the text out:

```ts
let errormsg = await page.getByText("The email address you entered is incorrect.").textContent();
```

`getByText()`:

- Finds elements by their text content.
- By default, matching is case-insensitive, matches a substring, and normalizes whitespace.
- `exact: true` makes it a case-sensitive, full-string match. A regex also works.
- Best for non-interactive content such as messages, paragraphs, and labels. For buttons and links, prefer `getByRole()`.

```ts
page.getByText('The email address you entered is incorrect.');
page.getByText('The email address you entered is incorrect.', { exact: true });
page.getByText(/email address .* incorrect/i);
```

Methods that read text or values from an element:

- `textContent()`: returns `Promise<string | null>`. It is the raw DOM `textContent`, so it includes text from hidden child elements and keeps original whitespace.
- `innerText()`: returns the rendered text, which respects CSS such as hidden elements and line breaks.
- `inputValue()`: returns the current value of an `input`, `textarea`, or `select`. Use this for form fields, not `textContent()`.
- `allTextContents()` / `allInnerTexts()`: return an array of text for every matching element.

These methods wait for the element to be attached, but they read the value once. They do not check visibility and do not retry until the text is correct. Use them when you need the value for something else, such as logging, comparing with another value, or calculations. For verification, use a web-first assertion such as `toHaveText()` or `toBeVisible()`.

### 29. Reading and Verifying the Current URL

`11_hw_Login_validation.spec.ts` checks that the URL changes after login:

```ts
let initialURL: string = "https://app.thetestingacademy.com/playwright/multiple_element_filter";

await page.goto(initialURL);
// ... fill email and password, click login ...
let changedURL: string = await page.url();

await expect(changedURL).not.toBe(initialURL);
```

Points to know:

- `page.url()` is synchronous and returns a `string`. The `await` is harmless but unnecessary.
- Reading the URL once right after `click()` can capture it before the app has finished navigating. This is common when login calls an API and then redirects on the client side. The result then depends on timing.
- `not.toBe(initialURL)` passes for any different URL, including an error page. Asserting the expected destination is stronger.

Better approach:

```ts
await page.locator("//button[@class='login-btn']").click();

await expect(page).not.toHaveURL(initialURL);   // retries until the URL changes
await expect(page).toHaveURL(/dashboard/);       // stronger, if the destination is known
```

`page.waitForURL(/dashboard/)` also waits for the URL, but it is a wait, not an assertion. Use `expect(page).toHaveURL()` when the URL is the thing being verified.

TypeScript note: `initialURL` and `changedURL` are never reassigned, so `const` is a better fit than `let`. `const` signals that the value will not change and prevents accidental reassignment.

### 30. Generic Assertions vs Web-First Assertions

Both new tests call `expect()` on plain values instead of on `page` or a locator:

```ts
await expect(changedURL).not.toBe(initialURL);   // 11_hw_Login_validation.spec.ts
expect(actualMsg).toContain(errormsg);           // 12_hw_errorValidation.spec.ts
```

Playwright has two kinds of assertions:

| | Generic assertions | Web-first assertions |
|---|---|---|
| Called on | a plain value: string, number, array, object | `page` or a locator |
| Examples | `toBe`, `toEqual`, `toContain`, `toBeGreaterThan`, `toBeTruthy` | `toBeVisible`, `toHaveText`, `toContainText`, `toHaveURL`, `toHaveTitle`, `toBeChecked` |
| Waiting | checks once | retries until the condition passes or the expect timeout (5 seconds by default) is reached |
| `await` | not needed, they are synchronous | required |

Common generic matchers:

- `toBe(value)`: strict equality using `Object.is`. Use for strings, numbers, and booleans.
- `toEqual(value)`: deep equality. Use for objects and arrays.
- `toContain(item)`: a string contains a substring, or an array contains an item.
- `.not`: inverts any matcher, generic or web-first.

#### Argument Order

The pattern is `expect(actual).matcher(expected)`. In `12_hw_errorValidation.spec.ts`, the arguments are reversed:

```ts
let errormsg = await page.getByText("The email address you entered is incorrect.").textContent();  // actual, read from the page
let actualMsg = "The email address you entered is incorrect.";                                      // expected, hard-coded
expect(actualMsg).toContain(errormsg);
```

This asks whether the hard-coded string contains the text read from the page. If the element's `textContent` includes extra whitespace or extra text, for example `"\n  The email address you entered is incorrect.\n"`, the hard-coded string does not contain it and the test fails even though the correct error is shown. The variable names are also swapped: `actualMsg` holds the expected value.

The correct order would be:

```ts
expect(errormsg).toContain(expectedMsg);
```

The test also has two weaker points:

- It finds the element by the same text it then checks, so the assertion adds little. If the text were missing, `textContent()` would already fail by timing out.
- `textContent()` does not check visibility, so an error element that is present in the DOM but hidden would still pass.

A web-first version is shorter and checks what the user actually sees:

```ts
await expect(page.getByText('The email address you entered is incorrect.')).toBeVisible();
```

Or, if the error has a stable container (the selector below is illustrative):

```ts
await expect(page.locator('.error-message')).toHaveText('The email address you entered is incorrect.');
```

Rule of thumb: when the value lives on the page, assert on the page or locator, not on a value you read out of it.

### 31. Senior QA Automation Mindset for These Topics

For a 10-year testing profile and 5-year Playwright automation profile, interviewers usually expect more than syntax. They look for judgment.

Strong answers should mention:

- Prefer user-facing locators such as role, label, and text.
- Use test IDs when UI text is unstable or localized.
- Prefer role and CSS locators over XPath. Use XPath for legacy DOM or parent and sibling traversal, and never use absolute XPath.
- Avoid hard waits like `waitForTimeout()` in committed tests.
- Assert on `page` and locators with web-first assertions instead of reading values out with `textContent()` or `page.url()` and checking them once.
- Keep the `expect(actual).matcher(expected)` order.
- Use `check()` and `uncheck()` for checkboxes instead of `click()`.
- Use browser contexts for isolation and multi-user scenarios.
- Keep tests independent and parallel-safe.
- Remove `test.only()` before pushing code.
- Use `test.skip()`, `test.fixme()`, and `test.fail()` with clear reasons.
- Use context options for locale, timezone, geolocation, viewport, and permissions.
- Validate behavior with web-first assertions.
- Keep setup and cleanup reliable.
- Avoid closing Playwright-managed fixtures unless there is a deliberate reason.
- Use meaningful test names and grouping.
- Prefer reusable helpers or page objects as the framework grows.

### 32. Session Storage and Reusing Login State

The files `13_SessionStorage.ts` and `14_TestOrange.spec.ts` demonstrate saving an authenticated OrangeHRM browser state and reusing it in tests.

`13_SessionStorage.ts` uses the lower-level Playwright API to launch Chromium, log in, wait for the dashboard, and save the browser context state to `user-session.json`.

```ts
await browserContext.storageState({ path: './user-session.json' });
```

`14_TestOrange.spec.ts` imports `saveSession()` and uses the saved state:

```ts
import { saveSession } from './13_SessionStorage';

test.beforeAll(async ({}, testInfo) => {
  testInfo.setTimeout(90000);
  await saveSession();
});

test.use({
  storageState: './user-session.json',
});
```

Important points:

- `storageState` lets tests start as an already logged-in user.
- The session must be created before tests that depend on it.
- If `saveSession()` is called at the top level without `await`, tests may start before `user-session.json` is ready.
- A `beforeAll` hook can prepare state before tests in the file run.
- `dotenv.config({ override: true })` ensures `.env` values are used even when the shell already has variables like `USERNAME`.
- For larger frameworks, Playwright's setup-project dependency pattern is usually cleaner than generating login state inside every spec.

### 33. Custom Reporter and Artifacts

The file `utils/CustomReporter.ts` implements a custom Playwright reporter using the reporter API from `@playwright/test/reporter`.

The reporter listens to lifecycle events such as:

- `onBegin`: test run starts.
- `onTestBegin`: a test starts.
- `onStepBegin` and `onStepEnd`: a `test.step()` starts or ends.
- `onTestEnd`: a test finishes and attachments can be collected.
- `onEnd`: the full run finishes and the final HTML report is written.

The project config currently uses:

```ts
reporter: [['line'], ['allure-playwright'], ['./utils/CustomReporter.ts']],
```

The custom report is generated in `custom-report/`. It copies screenshots, videos, and traces from Playwright attachments into report folders when those artifacts are available.

Artifact settings are controlled from config:

```ts
use: {
  screenshot: 'on',
  video: 'on',
  trace: 'on',
}
```

For everyday execution, `trace: 'on-first-retry'` is lighter. For demo reporting or debugging, `trace: 'on'`, `screenshot: 'on'`, and `video: 'on'` capture more evidence.

The custom report also demonstrates practical HTML/CSS report concerns:

- A dark-blue header for `Custom Automation Report`.
- A light-orange base page background.
- A horizontally scrollable test results table.
- Visible custom scrollbar styling.
- Links to screenshots, videos, and trace files.

### 34. Allure Reporter

`16_TestOrange_AllureReport.spec.ts` uses the same OrangeHRM dashboard validation scenario but is intended for Allure reporting.

Allure has two stages:

1. Playwright writes raw results into `allure-results/`.
2. `allure-commandline` generates an HTML report from those results.

Useful commands:

```bash
npx playwright test tests/05_Reporter/16_TestOrange_AllureReport.spec.ts --workers=1
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

Allure is useful when teams want trend reports, categories, suites, labels, attachments, and CI-friendly report publishing.

### 35. Handling Multiple Matching Elements

`17_MultipleElements.spec.ts` shows how to work with lists of elements.

`allInnerTexts()` returns an array of rendered text values:

```ts
const labels = await page.locator("//div[@class='list-group']/a").allInnerTexts();
```

`all()` returns an array of `Locator` objects:

```ts
const links = await page.locator("//div[@class='list-group']/a").all();

for (const link of links) {
  const href = await link.getAttribute('href');
  console.log(href);
}
```

Important distinction:

- Use `allInnerTexts()` when you need text values.
- Use `all()` when you need to perform actions or read attributes from each matching element.
- Use `count()` plus `nth(i)` when the list may change while the test is running.
- Avoid hard waits such as `waitForTimeout()` in real framework code; prefer assertions or page state waits.

### 36. Text Reading Methods

The markdown notes in `tests/06_MultipleElements` compare common text methods.

Common choices:

- `innerText()`: rendered visible text for one locator.
- `textContent()`: raw DOM text, can include hidden text and returns `string | null`.
- `allInnerTexts()`: rendered text from all matching elements.
- `allTextContents()`: raw DOM text from all matching elements.

For assertions, prefer web-first assertions:

```ts
await expect(page.locator('.message')).toHaveText('Saved successfully');
```

This retries automatically and is usually more stable than reading text into a string and asserting once.

### 37. Web Tables and Reusable Helper Functions

The web-table files demonstrate finding a row by employee name and then reading related data from another cell.

`21_commonFunction.ts` contains reusable functions:

- `verifyIfNameIsPresentAndItsRole(page, name)`
- `verifyIfNameIsPresentAndItsRoleAndCheck(page, name)`

The helper builds XPath locators dynamically:

```ts
const nameValue = await page.locator(
  "//tbody[@id='employee-body']/tr[" + i + "]/td[3]//strong"
).innerText();
```

Then it finds a related role cell with XPath axes:

```ts
"//ancestor::td//following-sibling::td[1]"
```

This teaches useful table concepts:

- Locate all rows.
- Loop through rows.
- Read a specific cell from each row.
- When a match is found, read a related cell from the same row.
- Click and verify a row checkbox.
- Move repeated row logic into helper functions.

For production-quality code, prefer clearer locator composition when possible and type the helper parameter as `Page` instead of `any`.

### 38. Narrowing Locators With `filter()`

`23_ClickUsingfilter.spec.ts` picks one link out of a list by its text:

```ts
await page.locator("//div[@class='list-group']/a").filter({ hasText: "Downloads" }).click();
expect(page.url()).toContain("downloads");
```

`filter()` options:

| Option | Filters by | Example |
| --- | --- | --- |
| `hasText` | Element contains the text (string or regex) | `filter({ hasText: 'Downloads' })` |
| `hasNotText` | Element does not contain the text | `filter({ hasNotText: 'Archived' })` |
| `has` | Element contains a matching child locator | `filter({ has: page.getByRole('button', { name: 'Delete' }) })` |
| `hasNot` | Element does not contain the child locator | `filter({ hasNot: page.locator('.disabled') })` |
| `visible` | Only visible elements | `filter({ visible: true })` |

`filter()` is usually more stable than `nth()` because it selects by content instead of position. It is especially useful for table rows:

```ts
const row = page.locator('tbody tr').filter({ hasText: 'Luca Greco' });
await expect(row.locator("td[data-col='role']")).toHaveText('Engineer');
```

Note: `page.url()` is synchronous, so `await` is not needed. A retrying alternative is `await expect(page).toHaveURL(/downloads/)`.

### 39. Pagination With `do...while`

`24_Pagination.spec.ts` searches a paginated table for an employee and clicks **Next** until the record is found:

```ts
let foundName = false;

do {
  for (let i = 1; i <= numberOfRows; i++) {
    const myName = await page.locator(p1_nameLocator + i + p2_nameLocator).innerText();
    if (myName === "Luca Greco") {
      foundName = true;
      break;
    }
  }

  if (!foundName) {
    await nextButton.click();
  }
} while (!foundName);
```

Key ideas:

- `do...while` runs the page scan at least once, then repeats while the condition is true.
- `break` exits the inner `for` loop as soon as the row is found.
- Related cells in the same row are read with column-specific XPath such as `td[@data-col='role']` and `td[@data-col='country']`.

Things to watch for in real frameworks:

- Always add an exit condition for the last page (for example, stop when the Next button is disabled or hidden). Otherwise a missing record causes an infinite loop until the test timeout.
- Re-count rows on every page; the last page often has fewer rows.
- After clicking Next, wait for the table to update (for example, assert the page number or the first row changed) before reading rows.

### 40. Page-Object-Style Separation: Locators, Test Data, and Helpers

`25_OrangeTable.spec.ts` splits one end-to-end flow into several files:

| File | Responsibility |
| --- | --- |
| `25_Locators.ts` | Exports an `orangeHRM` object holding all XPath strings |
| `25_DataProvider.ts` | Generates random test data with `@faker-js/faker` |
| `25_CommonFile.ts` | Reusable business actions: login, create employee, find and delete employee |
| `25_OrangeTable.spec.ts` | The short, readable test that calls the helpers |

The spec reads like a test case:

```ts
import * as CommonFile from './25_CommonFile.ts';

test("Verify add user and delete user", async ({ page }) => {
  await CommonFile.LoginOrangeHRM(page);
  const { FullName, LastName } = await CommonFile.CreatePIMRecordAndVerifyItsCreated(page);
  await CommonFile.FindRecordAndDeleteTheRecordFromTable(page, FullName, LastName);
});
```

Concepts used:

- **Centralized locators**: when the UI changes, only `25_Locators.ts` needs updating.
- **Typed return values**: `CreatePIMRecordAndVerifyItsCreated()` returns `Promise<employeeName>`, where `type employeeName = { FullName: string, LastName: string }`.
- **Named exports and namespace imports**: `export { LoginOrangeHRM, ... }` and `import * as CommonFile from ...`.
- **Credentials from `.env`**: `process.env.USERNAME ?? ""` with `dotenv.config({ override: true })`.
- **`waitForLoadState("networkidle")`** after login and navigation.
- **Row-level actions**: once the matching row index `i` is found, the checkbox and trash icon are located inside that same row with template literals:

```ts
const del = page.locator(`//div[@class='oxd-table-body']/div[${i}]//i[contains(@class,'trash')]`);
```

- **Confirmation dialog**: assert the dialog is visible, verify the button text is `Yes, Delete`, click it, and assert the success toast.
- **Test cleanup inside the test**: the record created by the test is also deleted by the test, keeping the shared demo environment clean.

This is a lightweight step towards the Page Object Model. A full POM would wrap these in a class such as `PimPage` with locators as `Locator` properties built from `page`.

### 41. Dynamic Test Data With Faker

`25_DataProvider.ts` uses `@faker-js/faker` to generate unique data for each run:

```ts
import { faker } from '@faker-js/faker';

export let data = {
  fake_firstName: faker.person.firstName(),
  fake_middleName: faker.person.middleName(),
  fake_lastName: faker.person.lastName(),
  fake_id: faker.number.int({ min: 1000, max: 9999 }).toString(),
};
```

Why use generated data:

- Avoids clashes with records left by earlier runs or other users of a shared environment.
- Makes the test repeatable without manual data setup.

Keep in mind:

- Values are generated once when the module is imported, so every test in the same worker shares them. Use a function such as `createEmployee()` if each test needs fresh data.
- Log the generated values (or use `faker.seed(123)`) so failures can be reproduced.
- Random IDs can still collide; a 4-digit range is small. Prefer larger ranges or timestamps when uniqueness matters.

### 42. Scraping Search Results Across Pages (Flipkart Example)

`26_Flipkart.spec.ts` searches Flipkart for "DSLR Camera" and prints every product whose name contains "nikon", across all result pages.

Structure:

- `26_FlipkartLocators.ts`: static locators plus **locator functions** that take an index:

```ts
getLabels(x: number) {
  return `//div[@id='container']/div/div[3]/div/div[2]/div[${x}]/div/div/div/a/div[2]/div[1]/div[1]`;
},
```

- `26_FlipkartCommonFile.ts`: `Openflipkart()`, `searchForCamera()`, and `listOutNikonCameraAndTheirPrice()`.
- `26_Flipkart.spec.ts`: calls the helpers and raises the timeout with `test.setTimeout(60000)`.

Concepts used:

- Closing a login popup on first visit (`crossButton`).
- `locator.first().waitFor({ state: "visible" })` to wait for results before counting them.
- Case-insensitive matching with `productName.toLowerCase().includes("nikon")`.
- Stopping pagination when the Next button is no longer visible:

```ts
if (!(await page.locator(flipkartLocators.nextButton).isVisible())) {
  break;
}
await page.locator(flipkartLocators.nextButton).click();
```

- `test.setTimeout()` for long multi-page flows.

Caveats of testing real e-commerce sites:

- Long absolute XPaths such as `div[3]/div/div[2]/div[${x}]` break whenever the layout changes. Prefer anchoring on stable attributes or text.
- `isVisible()` does not wait; it returns the current state immediately. That is fine for a "does Next exist?" check, but assertions should use `expect(...).toBeVisible()`.
- Live sites may show bot checks, A/B layouts, or different results by region, so these tests are good for practice but flaky for CI.

### 43. Native `<select>` Dropdowns With `selectOption()`

`27_simpleDropdown.spec.ts` handles a real HTML `<select>` element on the-internet.herokuapp.com:

```ts
await page.selectOption("//select[@id='dropdown']", "Option 2");
```

Key points:

- `selectOption()` works only on native `<select>` elements. It sets the value directly and fires the `input` and `change` events, so there is no need to click the dropdown first.
- The option can be picked by value, label, or index:

```ts
const dropdown = page.locator('#dropdown');
await dropdown.selectOption('2');                    // by value (or label if no value matches)
await dropdown.selectOption({ label: 'Option 2' });  // by visible text
await dropdown.selectOption({ index: 2 });           // by position
await dropdown.selectOption(['a', 'b']);             // multi-select <select multiple>
```

- Assert the selection with `toHaveValue()`:

```ts
await expect(dropdown).toHaveValue('2');
```

- The locator form `page.locator(...).selectOption()` is preferred over `page.selectOption(selector, ...)`, which is an older selector-based API.
- `page.pause()` opens the Playwright Inspector and stops execution. It is useful while learning or debugging, but remove it before committing, otherwise CI runs will hang until timeout (in headless mode it is ignored).

### 44. Custom (Non-Native) Dropdowns

`28_customDropdown.spec.ts` handles dropdowns built from `div`, `button`, and `li` elements. `selectOption()` does not work here because there is no `<select>`. The pattern is always **open the trigger, then click the option**:

```ts
await page.getByTestId("lang-trigger").click();
await page.getByRole("option", { name: "TypeScript" }).click();

await page.getByRole("button", { name: "Web framework" }).click();
await page.getByText("Next.js", { exact: true }).first().click();

await page.getByLabel("Experience level").click();
await page.getByText("Principal (10+ years)").first().click();
```

Concepts used:

- Different ways to find the trigger: `getByTestId()`, `getByRole("button")`, and `getByLabel()`.
- Well-built custom dropdowns expose ARIA roles such as `listbox` and `option`, so `getByRole("option", { name })` is the most reliable way to pick an item.
- `getByText(..., { exact: true })` avoids matching "Next.js" inside longer text.
- `.first()` resolves a strict mode violation when the same text appears more than once (for example, the selected value shown in the trigger and in the open list). A better long-term fix is to scope the search to the open list: `page.getByRole('listbox').getByText('Next.js')`.

### 45. Advanced Dropdowns: Multi-Select, Creatable, and Searchable

`29_AdvanceDropdown.spec.ts` automates react-select style components:

| Dropdown type | Technique |
| --- | --- |
| Single select | Click the input, click the option text |
| Multi select | Click several options; remove a chip with `getByLabel('Remove Mocha')` |
| Creatable | `fill()` a new value and press `Enter` to create it |
| Placeholder trigger | Open with `getByText("Pick a deployment target…")` |
| Searchable | Type part of the text, assert the match is visible, then click it |

```ts
// Creatable: type a new value and confirm it with Enter
await page.getByTestId("rs-creatable-input").fill("Security Testing");
await page.keyboard.press('Enter');

// Close any open menu
await page.keyboard.press('Escape');

// Searchable dropdown
await page.getByRole("textbox", { name: "Search cities" }).fill("Hyder");
await expect(page.getByText("Hyderabad")).toBeVisible();
await page.getByText("Hyderabad").click();
```

Concepts used:

- `page.keyboard.press()` for keys such as `Enter` and `Escape`. `locator.press('Enter')` does the same on a specific element.
- Remove buttons on chips usually have an `aria-label`, so `getByLabel()` finds them.
- `Escape` closes an open menu so it does not cover the next control.
- Note: `expect(await page.getByText(...))` does not need the inner `await`, because building a locator is synchronous. Write `await expect(page.getByText(...)).toBeVisible()`.

### 46. Practice Form: Radios, Checkboxes, Selects, File Upload, and Download

`30_TASK_qaForm.spec.ts` fills a full QA practice form on the Testing Academy site:

```ts
await page.locator("//input[@id='first-name']").fill("Vineet");
await page.getByTestId("gender-male").click();
await page.selectOption("//select[@id='years-experience']", "7");
await page.getByTestId("tool-selenium").click();
await page.getByTestId("upload-image").setInputFiles("/Users/vineetverma/Downloads/Play2.png");
await page.getByTestId("download-file").click();
await page.getByTestId("profile-submit").click();
```

Concepts used:

- Radio buttons and checkboxes clicked by test id. `check()` is safer for checkboxes because it is idempotent and verifies the result.
- Native select handled with `selectOption()`.
- **File upload** with `setInputFiles()` on an `<input type="file">`. It accepts one path, an array of paths, or an empty array to clear the selection.
- **File download**: clicking a download link alone does not verify anything. Wait for the download event:

```ts
const downloadPromise = page.waitForEvent('download');
await page.getByTestId('download-file').click();
const download = await downloadPromise;
await download.saveAs('downloads/' + download.suggestedFilename());
```

- Date inputs (`type="date"`) expect the value in `YYYY-MM-DD` format with `fill()`, so `"26/11/2026"` fails; use `"2026-11-26"`.

Improvements to keep in mind:

- Use a path inside the project, for example `path.join(__dirname, 'testdata', 'Play2.png')`, instead of an absolute path from one machine, otherwise the test fails on CI or on another laptop.
- Add assertions at the end (for example, a success message) so the test proves the submit worked.

### 47. Frames and iFrames

An `<iframe>` (or a `<frame>` inside a `<frameset>`) loads a separate document. Locators on `page` do not see inside it, so you first get a `FrameLocator` and then locate elements through it.

#### Single iFrame (`31_SingleiFrame.spec.ts`)

```ts
const vehicleFrame: FrameLocator = page.frameLocator("//iframe[@id='frame-one']");
await vehicleFrame.locator("//input[@id='RESULT_TextField-1']").fill("Gypsy");
```

#### Frameset With Multiple Frames (`32_MultiFrameSet.spec.ts`)

Old-style pages use `<frameset>` with `<frame name="...">`. The same `frameLocator()` works, one per frame:

```ts
const sideFrame = page.frameLocator("//frame[@name='side']");
await sideFrame.getByTestId("side-link-registration").click();

const mainFrame = page.frameLocator("//frame[@name='main']");
console.log(await mainFrame.getByText("You're inside the ").innerText());

const footerFrame = page.frameLocator("//frame[@name='footer']");
```

#### Nested iFrames (`33_NestediFrames.spec.ts`)

For frames inside frames, chain from the parent frame. This file uses `locator().contentFrame()`, which converts an iframe `Locator` into a `FrameLocator`:

```ts
// The page has two iframes with id='pact1', so pick the first to avoid a strict mode violation
const topFrame = page.locator("//iframe[@id='pact1']").first().contentFrame();
const middleFrame = topFrame.locator("//iframe[@id='pact2']").first().contentFrame();
const lowerFrame = middleFrame.locator("//iframe[@id='pact3']").first().contentFrame();

await topFrame.locator("//input[@id='inp_val']").first().fill("Selenium");
await middleFrame.locator("//input[@id='jex']").first().fill("Playwright");
await lowerFrame.locator("//input[@id='glaf']").first().fill("Company");
```

Key points:

- `page.frameLocator(selector)` and `page.locator(selector).contentFrame()` both return a `FrameLocator`. `contentFrame()` is useful when you need `first()`, `nth()`, or `filter()` on the iframe element before entering it.
- `FrameLocator` is lazy and synchronous, like `Locator`, so `await page.frameLocator(...)` is not needed.
- Strict mode also applies to iframes: if the selector matches two iframes, use `.first()` or a more specific selector.
- Unlike Selenium, there is no `switchTo().frame()` and no switching back to the default content. The `page` object always refers to the main document, and each `FrameLocator` refers to its own frame.
- There is also the `Frame` API: `page.frame({ name: 'main' })` or `page.frame({ url: /regex/ })` returns a `Frame` object (or `null`), and `page.frames()` lists all frames. `FrameLocator` is preferred because it auto-waits and re-resolves the frame.
- `console.log(await locator.click())` prints `undefined`, because `click()` returns nothing. Log text with `innerText()` or `textContent()` instead.

### 48. Keyboard Events With `page.keyboard`

`34_KeyboardEvenets.spec.ts` fills a whole form using only the keyboard. It clicks the first field once to give it focus, then types into each field and moves to the next one with `Tab`, the same way a keyboard-only user would:

```ts
await page.getByTestId("firstname").click();   // give focus to the first field
await page.keyboard.type("Vineet");
await page.keyboard.press('Tab');               // move focus to the next field
await page.keyboard.type("Verma");
await page.keyboard.press('Tab');
await page.keyboard.type("hello@mail.com");
// ... phone, username, password
await page.keyboard.press('Tab');
await page.keyboard.press('ArrowLeft');         // change the selected option in a radio group
await page.keyboard.press('Tab');
await page.keyboard.press('Space');             // toggle a checkbox
```

Main `page.keyboard` methods:

| Method | What it does |
| --- | --- |
| `keyboard.type(text)` | Sends `keydown`, `keypress`/`input`, and `keyup` for every character into the focused element. |
| `keyboard.press(key)` | Presses and releases one key or a combination, such as `'Tab'`, `'Enter'`, `'ArrowLeft'`, `'Space'`, `'Control+A'`. |
| `keyboard.down(key)` / `keyboard.up(key)` | Holds and releases a key, for example holding `Shift` while pressing other keys. |
| `keyboard.insertText(text)` | Inserts text with a single `input` event and no key events. |

Common key names: `Tab`, `Enter`, `Escape`, `Backspace`, `Delete`, `Space`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`, `PageUp`, `PageDown`, `F1`–`F12`, `Shift`, `Control`, `Alt`, `Meta`, and `ControlOrMeta` (Control on Windows/Linux, Command on macOS).

Keyboard behaviour inside forms:

- `Tab` moves focus forward, `Shift+Tab` moves it back.
- In a radio group, the arrow keys move the selection between options (focus and checked state move together).
- `Space` toggles a focused checkbox or selects a focused radio button; `Enter` submits a form or activates a focused button or link.

Key points:

- `page.keyboard` always acts on whichever element has focus, so the test depends on the tab order of the page. If a field is added or the order changes, the text lands in the wrong field. `locator.press()` and `locator.pressSequentially()` focus a specific element first and are less fragile.
- `fill()` sets the value in one step and is the normal choice for text inputs. Use `keyboard.type()` or `locator.pressSequentially()` when the page reacts to each key press (autocomplete, input masks, character counters).
- Key combinations use `+`: `await page.keyboard.press('ControlOrMeta+A')` then `await page.keyboard.press('Backspace')` clears a field.
- A keyboard-only flow is also a quick accessibility check: it proves the form can be completed without a mouse and the tab order is sensible.

Improvements to keep in mind:

- The test has no assertions. Add checks such as `await expect(page.getByTestId("firstname")).toHaveValue("Vineet")`, `toBeChecked()` for the radio and checkbox, or a success message after submit.
- Remove `page.pause()` before committing, as it stops the run in the Inspector.

### 49. Hover, Drag-and-Drop, and Context Click

The files under `tests/11_Hover_Drag_Drop` cover mouse interactions that go beyond normal left-clicks.

#### Hover Menus

`35_Hover_TestCase.spec.ts` uses `locator.hover()` to open menus that appear only when the mouse moves over a navigation item.

```ts
await page.locator("//a[text()='Services']").first().hover();
await page.getByTestId("nav-add-ons").hover();
await page.getByTestId("test-id-Hotel").click();
```

Key points:

- `hover()` moves the mouse to the element and waits until the element is actionable.
- Hover menus are often timing-sensitive, so prefer stable locators such as test ids when available.
- If text matches multiple elements, use a more specific locator or `.first()` only when you intentionally want the first match.

#### Simple Drag and Drop

`36_Drag_and_Drop.spec.ts` uses the high-level Playwright API:

```ts
let cola = page.locator("//div[@id='column-a']");
let colb = page.locator("//div[@id='column-b']");
await cola.dragTo(colb);
```

`dragTo()` is the first option to try because it expresses the user intent clearly: drag the source element to the target element.

#### Advanced Drag and Drop With Mouse Coordinates

Some custom drag-and-drop widgets need lower-level mouse control. `37_Advance_Drag_And_Drop.spec.ts` gets each element's screen position with `boundingBox()` and then moves the mouse manually:

```ts
let sBox = (await source.boundingBox())!;
let dBox = (await destination.boundingBox())!;

await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2);
await page.mouse.down();
await page.mouse.move(dBox.x + dBox.width / 2, dBox.y + dBox.height / 2);
await page.mouse.up();
```

The center of an element is calculated as:

```ts
x + width / 2
y + height / 2
```

In plain English: start from the top-left position of the element, then move halfway across and halfway down.

Key points:

- `boundingBox()` returns `{ x, y, width, height }` or `null` if the element is not visible.
- The `!` tells TypeScript that the value is not null, but it does not protect runtime execution. For production framework code, check the value and throw a clear error if it is missing.
- Manual mouse movement is useful when a library reacts to real pointer movement instead of simple HTML drag events.

#### Context Click

`38_ContextClick.spec.ts` right-clicks an element by passing the mouse button option:

```ts
await page.getByTestId("ctx-target").click({ button: "right" });
let allOptions = await page.locator("//ul[@data-testid='ctx-menu']/li//span[1]").allInnerTexts();
```

Use this pattern for custom context menus. After the right-click, assert the menu is visible or read its options.

### 50. JavaScript Alerts, Confirms, and Prompts

`39_JS_Alerts.spec.ts` handles browser dialogs with the `dialog` event.

```ts
page.on('dialog', async dialog => {
  await dialog.accept();
});

await page.locator("//button[text()='Click for JS Alert']").click();
```

For a prompt, pass text to `accept()`:

```ts
page.on('dialog', async dialog => {
  await dialog.accept("Vineet");
});
```

Key points:

- Register `page.on('dialog', ...)` before clicking the button that opens the alert.
- Use `dialog.accept()` for alert and confirm OK.
- Use `dialog.dismiss()` for confirm Cancel.
- Use `dialog.accept("text")` for prompt input.
- After handling the dialog, assert the page result text so the test proves the dialog action worked.

### 51. SVG Automation

The files under `tests/13_svg` cover SVG elements in real and practice pages.

#### Clicking SVG Elements

`41_svg_example.spec.ts` shows that SVG elements can often be clicked with normal CSS or role locators:

```ts
await page.locator("#circle-blue").click();
await page.getByRole("button", { name: /Q3 bar/ }).click();
```

Use role locators when the SVG element exposes an accessible name. Use CSS ids or classes when the page provides stable SVG attributes.

#### Reading SVG Attributes

SVG charts often store useful data in attributes:

```ts
const allBars = await page.locator(".bar").all();

for (let bar of allBars) {
  let barLabel = await bar.getAttribute('data-quarter');
  let barValue = await bar.getAttribute('data-value');
  console.log(barLabel + " ===> " + barValue);
}
```

Important point: `all()` returns an array immediately. It does not wait for future matching elements to appear. If SVG content is rendered later, wait first:

```ts
const bars = page.locator(".bar");
await bars.first().waitFor({ state: "attached" });
const allBars = await bars.all();
```

#### SVG XPath With `name()`

SVG tags live in an XML namespace, so XPath like `//path` can be unreliable. `42_Real_svg_concept.spec.ts` uses `name()`:

```ts
const statePaths = await page.locator("//div[@id='admin1_map_inner']//*[name()='path']").all();
```

For SVG text labels:

```ts
const stateLocator = `//div[@id='admin1_map_inner']//*[name()='text' and contains(@class,'${constructedStateLabel}')]//*[name()='tspan']`;
const State = await page.locator(stateLocator).textContent();
```

Key points:

- Use `//*[name()='path']`, `//*[name()='text']`, and `//*[name()='tspan']` for namespace-safe SVG XPath.
- `getAttribute('class')` reads SVG class names such as `sm_state sm_state_INMP`.
- String parsing can convert a state path class into the matching label class.
- Prefer explicit waits for dynamic SVG pages before calling `all()`.

#### SVG Search Icon Example

`40_svg.spec.ts` clicks an SVG search icon on Flipkart:

```ts
const svgElements = page.locator("svg");
await svgElements.nth(2).click();
```

This works for learning, but index-based SVG locators are fragile. If the page adds another SVG before the search icon, `nth(2)` may click the wrong element. Prefer a role, label, button locator, or a scoped locator near the search input when available.

### 52. Reusable Utility Functions and Table Calculations

`43_Task_AppliTools.spec.ts` keeps the test readable by moving repeated logic into `43_Task_Utility.ts`.

```ts
await utility.loginToApplitools(page);
await utility.verifyTheURL(page);
let getValues = await utility.calculateSpentEarnedTotal(page);
await utility.VerifyTheTotalAmount(getValues.totalValue);
```

The helper file imports the `Page` type and uses it in function parameters:

```ts
import { expect, Page } from '@playwright/test';

async function loginToApplitools(page: Page) {
  await page.goto("https://demo.applitools.com/", { waitUntil: "domcontentloaded" });
}
```

URL verification uses a web-first assertion:

```ts
await expect(page).toHaveURL("https://demo.applitools.com/app.html");
```

This is better than immediately reading `page.url()` because `toHaveURL()` waits until the page reaches the expected URL or times out.

The calculation helper returns a typed object:

```ts
type calculatedValues = { totalSpent: number, totalEarned: number, totalValue: number };

async function calculateSpentEarnedTotal(page: Page): Promise<calculatedValues> {
  // calculate totals
  return { totalSpent: totalSpent, totalEarned: totalEarned, totalValue: TotalValue };
}
```

Key points:

- Always `await` async helper functions. Missing `await` can make the test continue before login, navigation, or validation is finished.
- A helper that reads the page should accept `page: Page`.
- A helper that calculates data should return a clear typed value instead of relying only on `console.log()`.
- `expect(page).toHaveURL(...)` is preferred for navigation assertions.
- For amount parsing, remove currency symbols, spaces, and commas before calling `Number(...)`.

## Interview Questions

### Playwright Fundamentals

#### 1. What is Playwright?

Playwright is an end-to-end automation framework for web applications. It supports Chromium, Firefox, and WebKit, and provides reliable browser automation through auto-waiting, web-first assertions, browser contexts, tracing, screenshots, videos, parallel execution, and test fixtures.

#### 2. What is the difference between `playwright` and `@playwright/test`?

`playwright` is the core browser automation library. It lets you launch browsers and control pages manually.

`@playwright/test` is the test runner. It provides `test`, `expect`, fixtures, configuration, retries, reports, traces, projects, and parallel execution. For test automation frameworks, `@playwright/test` is usually the standard choice.

#### 3. What are the main objects in Playwright's architecture?

The main objects are `Browser`, `BrowserContext`, and `Page`.

`Browser` is the browser process. `BrowserContext` is an isolated session with separate cookies and storage. `Page` is a tab inside a context.

#### 4. What is a browser context?

A browser context is an isolated browser session. It has its own cookies, local storage, session storage, permissions, locale, viewport, geolocation, and user agent. It is similar to an incognito browser profile.

#### 5. Why are browser contexts important?

They provide fast isolation. Instead of launching a new browser for every test or user, Playwright can create multiple contexts inside one browser. This makes tests faster and supports multi-user workflows.

#### 6. What is a page in Playwright?

A `Page` represents a browser tab. It is used to navigate, interact with elements, listen to events, and perform assertions.

#### 7. What is the usual cleanup order for Playwright objects?

Close in reverse order of creation: page, context, then browser.

```ts
await page.close();
await context.close();
await browser.close();
```

#### 8. When would you use the `browser` fixture instead of the `page` fixture?

Use `page` for normal single-user tests. Use `browser` when you need to create custom contexts, multiple users, different permissions, geolocation, locale, viewport, timezone, or mobile emulation.

#### 9. Should you close the `browser` fixture inside a Playwright test?

Usually no. The `browser` fixture is managed by Playwright Test. You should close contexts and pages that you create manually, but Playwright normally handles the browser lifecycle.

#### 10. What is the difference between headless and headed mode?

Headless mode runs the browser without a visible UI, which is common in CI. Headed mode opens the browser UI, which is useful for local debugging and learning.

### TypeScript and Async Handling

#### 11. Why do Playwright tests use `async` and `await`?

Browser operations are asynchronous. `async` allows a function to use `await`, and `await` ensures each Playwright step completes before the next step starts.

#### 12. What happens if you forget `await` before a Playwright action?

The test may continue before the action is complete. This can cause race conditions, flaky behavior, false positives, or unhandled promise issues.

#### 13. Why use TypeScript types such as `Browser`, `BrowserContext`, and `Page`?

They improve code readability, editor suggestions, and compile-time validation. They help prevent incorrect API usage and make framework code easier to maintain.

#### 14. What does this syntax mean: `async ({ page }) => {}`?

It is an async function that destructures the `page` fixture from Playwright's test fixtures. Playwright injects the fixture when the test runs.

#### 15. What is the difference between using Playwright with JavaScript and TypeScript?

The Playwright API is mostly the same in both. JavaScript runs without compile-time types. TypeScript adds type safety, better autocomplete, safer refactoring, and clearer contracts for page objects, fixtures, helpers, and test data.

#### 16. Why is TypeScript useful in a large Playwright framework?

TypeScript helps catch mistakes early, documents expected object shapes, improves maintainability, and makes framework-level code such as custom fixtures, page objects, and API clients easier to scale.

### Test Structure and Fixtures

#### 17. What is the basic structure of a Playwright test?

A Playwright test has a title and an async function.

```ts
test('test name', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

#### 18. What are fixtures in Playwright?

Fixtures are objects or setup resources provided to tests. Examples include `page`, `browser`, `context`, `request`, and custom fixtures.

#### 19. What is the `page` fixture?

The `page` fixture provides a new page for a test. It is isolated and ready to use, so the test can navigate and interact with the browser immediately.

#### 20. What is the `browser` fixture?

The `browser` fixture provides access to the browser instance. It is commonly used to create custom browser contexts or multiple isolated sessions inside a test.

#### 21. How do you test two users in the same Playwright test?

Create two separate browser contexts and one page per context.

```ts
const adminContext = await browser.newContext();
const userContext = await browser.newContext();

const adminPage = await adminContext.newPage();
const userPage = await userContext.newPage();
```

#### 22. Why not use two pages in the same context for two different users?

Two pages in the same context share cookies and storage. If two users need separate login sessions, they should use separate contexts.

### Navigation

#### 23. What does `page.goto()` do?

`page.goto()` navigates the page to a URL and waits for the selected navigation lifecycle event.

#### 24. How do you pass navigation options to `page.goto()`?

```ts
await page.goto('https://app.vwo.com', {
  timeout: 5000,
  referer: 'https://www.google.com',
  waitUntil: 'domcontentloaded',
});
```

#### 25. What is the difference between `waitUntil: 'load'` and `waitUntil: 'domcontentloaded'`?

`domcontentloaded` waits until the HTML is parsed. It is usually faster. `load` waits for the load event, which includes dependent resources like images and stylesheets.

#### 26. When would you use `referer` in `page.goto()`?

Use `referer` when the application behavior depends on the referring page, analytics, redirects, security rules, or campaign tracking.

#### 27. Is `networkidle` always a good navigation wait strategy?

No. It can be unreliable for modern apps that keep network connections open or continuously call APIs. A better strategy is often to wait for a specific UI assertion.

#### 28. How do you handle navigation timeouts?

Set a reasonable timeout for the action or globally in config, and then assert that the expected page state appears.

```ts
await page.goto(url, { timeout: 10000 });
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
```

### Context Options, Geolocation, Locale, and Mobile

#### 29. How do you set viewport in Playwright?

```ts
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
});
```

#### 30. How do you test geolocation?

Create a context with `geolocation` and grant geolocation permission.

```ts
const context = await browser.newContext({
  geolocation: { latitude: 48.8566, longitude: 2.3522 },
  permissions: ['geolocation'],
});
```

#### 31. Why is `permissions: ['geolocation']` needed?

Browsers block geolocation by default unless permission is granted. Setting coordinates alone does not allow the page to access geolocation.

#### 32. How do you test localization with Playwright?

Create a browser context with a specific locale and then verify localized UI behavior.

```ts
const context = await browser.newContext({
  locale: 'fr-FR',
});
```

#### 33. How do you test timezone-specific behavior?

Create a context with `timezoneId`.

```ts
const context = await browser.newContext({
  timezoneId: 'Europe/Paris',
});
```

#### 34. How do you emulate a mobile browser?

Set mobile context options such as viewport, user agent, device scale factor, `isMobile`, and `hasTouch`, or use Playwright's built-in device descriptors.

```ts
const context = await browser.newContext({
  viewport: { width: 375, height: 667 },
  isMobile: true,
  hasTouch: true,
});
```

#### 35. What is the difference between mobile emulation and real-device testing?

Mobile emulation simulates browser-level mobile behavior, viewport, user agent, and touch. Real-device testing validates actual device hardware, OS behavior, browser implementation differences, performance, and device-specific bugs.

### Locators

#### 36. What is a locator in Playwright?

A locator is a way to find elements on the page. It is lazy, auto-waiting, and re-evaluated when an action or assertion is performed.

#### 37. Why are locators preferred over element handles?

Locators auto-wait and re-query the DOM, making them more reliable for dynamic applications. Element handles can become stale when the DOM changes.

#### 38. What is the recommended locator strategy?

Prefer user-facing locators first: role, label, placeholder, text, and test id. Use CSS only when needed. Avoid brittle positional or styling-based selectors.

#### 39. Why is `getByRole()` recommended?

It reflects how users and assistive technologies interact with the page. It also encourages accessible UI and creates readable tests.

#### 40. What is accessible name in `getByRole()`?

Accessible name is the name exposed to assistive technologies. It may come from visible text, associated labels, `aria-label`, `aria-labelledby`, `alt`, or other accessibility attributes.

#### 41. Give an example of using `getByRole()`.

```ts
await page.getByRole('link', { name: 'Get started' }).click();
await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
```

#### 42. How do you locate a textbox by its label?

```ts
await page.getByRole('textbox', { name: 'Email Address' }).fill('user@example.com');
```

#### 43. How do you click a button by accessible name?

```ts
await page.getByRole('button', { name: 'Allow all' }).click();
```

#### 44. What is `getByTestId()`?

`getByTestId()` locates elements by a test id attribute. By default, it uses `data-testid`.

```ts
await page.getByTestId('login-button').click();
```

#### 45. When should you use test IDs?

Use test IDs when accessible locators are not stable or suitable, such as dynamic text, localization, icon-only controls, or generated CSS classes.

#### 46. What are CSS locators in Playwright?

CSS locators use CSS selector syntax.

```ts
page.locator('#login-username');
page.locator('.notification-box-description');
page.locator('[name="email"]');
page.locator('h1');
```

#### 47. What does `#login-username` mean?

It selects an element with the ID `login-username`.

#### 48. What does `.notification-box-description` mean?

It selects elements with the class `notification-box-description`.

#### 49. What does `[name="email"]` mean?

It selects elements whose `name` attribute has the value `email`.

#### 50. What does `page.locator('h1')` select?

It selects `h1` heading elements.

#### 51. What is locator chaining?

Locator chaining scopes a search within another locator.

```ts
page
  .getByRole('navigation', { name: 'Main navigation' })
  .getByRole('link', { name: 'Contact us' });
```

This finds the `Contact us` link inside the main navigation only.

#### 52. Why is scoped locator usage useful?

It reduces ambiguity when the same text or element appears in multiple areas, such as header, footer, menus, and content sections.

#### 53. What does `nth(3)` mean?

It selects the fourth matching element because indexes start from zero.

```ts
page.getByRole('link').nth(3);
```

#### 54. Why can `nth()` be brittle?

It depends on element order. If another matching element is added before it, the test may interact with the wrong element.

#### 55. How can you avoid using `nth()`?

Use a more specific role, name, test id, text, filter, or scoped locator.

```ts
page.getByRole('link', { name: 'Contact us' });
```

### Actions and Assertions

#### 56. What does `click()` do in Playwright?

`click()` performs actionability checks and then clicks the element. Playwright waits for the element to be visible, stable, enabled, and ready to receive events.

#### 57. What does `fill()` do?

`fill()` sets the value of an input, textarea, or contenteditable element. It usually clears the existing value and enters the new value.

#### 58. Is `click()` required before `fill()`?

Usually no. `fill()` focuses the element and sets the value. A separate `click()` is needed only when the application has focus-specific behavior that must be triggered.

#### 59. What is a web-first assertion?

A web-first assertion is a Playwright assertion that automatically waits for the expected condition. Examples include `toBeVisible()`, `toHaveTitle()`, and `toContainText()`.

#### 60. What does `toHaveTitle(/Playwright/)` verify?

It verifies that the page title matches the regular expression `/Playwright/`.

#### 61. What does `toBeVisible()` verify?

It verifies that the locator resolves to an element that is visible to the user.

#### 62. What does `toContainText()` verify?

It verifies that the locator contains the expected text. It can match partial text.

#### 63. When should you use exact text versus partial text?

Use exact text when the full expected value is stable. Use partial text when the UI includes dynamic or additional content around the important message.

#### 64. What is the benefit of regex in assertions?

Regex allows flexible matching when values contain dynamic prefixes, suffixes, IDs, dates, or environment-specific text.

#### 65. How do you validate an error message after invalid login?

```ts
await page.locator('#login-username').fill('admin');
await page.locator('#login-password').fill('password');
await page.locator('#js-login-btn').click();

await expect(page.locator('.notification-box-description')).toContainText(
  'Your email, password, IP address or location did not match'
);
```

### Waiting and Flakiness

#### 66. What is auto-waiting in Playwright?

Auto-waiting means Playwright waits for elements to be actionable before performing actions and waits for assertion conditions before failing.

#### 67. Why should `waitForTimeout()` be avoided?

It waits for a fixed time regardless of application state. This makes tests slower and can still be flaky if the application takes longer than expected.

#### 68. When is `waitForTimeout()` acceptable?

It is acceptable for debugging, demos, or temporary investigation. It should generally not remain in committed automation tests.

#### 69. What should you use instead of `waitForTimeout()`?

Use condition-based waits such as locator assertions, `waitForURL()`, `waitForLoadState()`, response waits, or visible UI state checks.

```ts
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
```

#### 70. How do you reduce flaky Playwright tests?

Use stable locators, avoid hard waits, keep tests isolated, use web-first assertions, avoid shared test data conflicts, use proper setup and cleanup, and make tests parallel-safe.

### Test Organization

#### 71. What is `test.describe()`?

`test.describe()` groups related tests under a common title.

```ts
test.describe('Login Page Tests', () => {
  test('Login to app', async ({ page }) => {});
  test('Logout from app', async ({ page }) => {});
});
```

#### 72. Why use `test.describe()`?

It improves readability, organizes tests by feature or workflow, and makes reports easier to understand.

#### 73. Should `test.describe()` callbacks be async?

Usually no. `test.describe()` is for declaring tests synchronously when the file loads. Async setup should be placed inside tests, hooks, or fixtures.

#### 74. How do you run tests matching a title or describe block?

Use `-g`.

```bash
npx playwright test -g "Login Page Tests"
```

#### 75. How should tests be named?

Test names should describe expected behavior. A good name explains what is being verified, such as `should show error message for invalid login`.

### Test Annotations

#### 76. What is `test.skip()`?

`test.skip()` marks a test as skipped. It does not execute.

#### 77. When would you use `test.skip()`?

Use it for temporarily disabled tests, unsupported browsers, unavailable environments, or features not ready for testing.

#### 78. What is `test.only()`?

`test.only()` tells Playwright to run only that test or group. It is useful during local debugging.

#### 79. Why is `test.only()` dangerous in committed code?

It prevents the full suite from running, which can hide regressions. Teams often use linting or CI checks to block committed `test.only()`.

#### 80. What is `test.fail()`?

`test.fail()` marks a test as expected to fail. If it fails, the result is expected. If it passes, Playwright reports it as unexpected.

#### 81. When would you use `test.fail()`?

Use it to track a known bug while keeping the test in the suite. It helps identify when the bug is fixed because the test will unexpectedly pass.

#### 82. What is `test.fixme()`?

`test.fixme()` marks a test as needing work and skips its execution.

#### 83. What is the difference between `test.skip()` and `test.fixme()`?

Both skip execution. `skip` means do not run this test for a reason such as environment or temporary condition. `fixme` communicates that the test or feature is broken or incomplete and needs fixing.

#### 84. What is `test.slow()`?

`test.slow()` marks a test as slow and increases its timeout. It is used inside tests or at a group level for valid long-running flows.

#### 85. When should you use `test.slow()`?

Use it for workflows that are genuinely long, such as checkout, payment, upload, report generation, or complex navigation. Do not use it to hide unnecessary slowness.

### Scenario-Based Interview Questions

#### 86. How would you automate a login page using Playwright?

I would navigate to the login page, locate username and password fields using role, label, or test id locators, fill credentials, click the login button, and assert either successful navigation or an error message.

```ts
await page.goto('https://app.vwo.com');
await page.locator('#login-username').fill('admin');
await page.locator('#login-password').fill('password');
await page.locator('#js-login-btn').click();
await expect(page.locator('.notification-box-description')).toContainText('did not match');
```

#### 87. How would you automate a page with cookie consent?

I would handle the cookie banner at the start of the test or in a reusable helper. I would use a role-based locator if the button has an accessible name.

```ts
await page.getByRole('button', { name: 'Allow all' }).click();
```

For a large suite, I may store authenticated or consented browser state so the banner does not appear repeatedly.

#### 88. How would you test a website in a French locale and Paris timezone?

I would create a browser context with locale and timezone options.

```ts
const context = await browser.newContext({
  locale: 'fr-FR',
  timezoneId: 'Europe/Paris',
});
```

Then I would verify date, time, currency, labels, and translated content.

#### 89. How would you test a location-based feature?

I would create a context with geolocation coordinates and grant geolocation permission.

```ts
const context = await browser.newContext({
  geolocation: { latitude: 48.8566, longitude: 2.3522 },
  permissions: ['geolocation'],
});
```

Then I would verify that the application displays location-specific behavior.

#### 90. How would you design a multi-role test, such as admin and user?

I would create one context per role to isolate sessions.

```ts
const adminContext = await browser.newContext();
const userContext = await browser.newContext();

const adminPage = await adminContext.newPage();
const userPage = await userContext.newPage();
```

Then I would perform admin actions on `adminPage` and user validations on `userPage`.

#### 91. What would you improve in a test that uses `page.waitForTimeout(5000)`?

I would replace the fixed wait with a condition-based wait. For example, wait for a success message, error message, URL change, network response, or visible element.

```ts
await expect(page.getByTestId('login-button')).toBeVisible();
```

#### 92. What would you improve in a test that uses `page.getByRole('link').nth(3)`?

I would replace it with a specific locator based on accessible name, test id, text, or scoped parent.

```ts
await expect(page.getByRole('link', { name: 'Contact us' })).toBeVisible();
```

#### 93. How would you decide between CSS locator and role locator?

I would use a role locator when the element has a meaningful role and accessible name because it represents user behavior. I would use CSS when no stable user-facing locator exists or when targeting a technical element that is not exposed semantically.

#### 94. How would you handle dynamic text in assertions?

I would use partial text, regex, or a more stable assertion around the important part of the message.

```ts
await expect(page).toHaveTitle(/Playwright/);
```

#### 95. How do you make Playwright tests suitable for CI?

Run tests headlessly, avoid hard waits, keep tests isolated, use retries carefully, capture traces/screenshots/videos on failure, avoid `test.only()`, use stable test data, and ensure tests can run in parallel.

#### 96. How do you explain Playwright auto-waiting in an interview?

Playwright automatically waits for elements to be actionable before actions and waits for conditions in web-first assertions. This reduces explicit waits and improves reliability.

#### 97. What are actionability checks?

Before actions such as `click()`, Playwright checks that the element is attached, visible, stable, enabled, and able to receive events.

#### 98. How would you organize tests for a login feature?

I would group them with `test.describe('Login Page Tests', ...)`, use meaningful names, keep positive and negative cases separate, reuse login helpers or page objects, and ensure each test has independent setup.

#### 99. How do you handle invalid login validation?

Submit invalid credentials and assert the expected error message and page state.

```ts
await expect(errorMsgBox).toContainText('Your email, password, IP address or location did not match');
```

#### 100. What is the difference between `toContainText()` and `toHaveText()`?

`toContainText()` checks that the element contains the expected text as part of its content. `toHaveText()` is stricter and usually expects the element text to match the expected value more exactly.

#### 101. Why is accessibility important for Playwright automation?

Accessible UI enables strong role-based locators. If elements have correct roles and names, tests become more readable, stable, and closer to real user behavior.

#### 102. How do you prevent accidental `test.only()` commits?

Use code review, lint rules, pre-commit hooks, or CI checks that fail when `test.only()` is present.

#### 103. How would you answer: "Why Playwright over Selenium?"

Playwright has built-in auto-waiting, modern locators, isolated browser contexts, strong network support, built-in tracing, video and screenshot support, fast parallel execution, and first-class test runner features. Selenium is still widely used, but Playwright often requires less waiting code and provides stronger debugging tools out of the box.

#### 104. How would you explain your Playwright framework approach for 5 years of relevant experience?

I would describe a framework with Playwright Test, TypeScript, page objects or screen objects where useful, reusable fixtures, test data management, environment config, authentication storage state, API helpers, traces/screenshots/videos on failure, CI integration, tags or projects for browsers/devices, and reliable locator strategy based on roles and test IDs.

#### 105. What makes a Playwright test maintainable?

Clear test names, stable locators, small reusable helpers, minimal duplication, independent setup, no hard waits, meaningful assertions, readable data, proper cleanup, and alignment with business workflows.

#### 106. What is your strategy for debugging failing Playwright tests?

Check the failure message, inspect trace viewer, review screenshots and videos, run the test headed, use `--debug` or UI mode, verify locators, check network calls, and confirm test data and environment stability.

#### 107. What is your strategy for flaky tests?

Identify whether the cause is locator instability, timing, data dependency, environment issue, animation, network delay, or shared state. Then fix the root cause using better locators, web-first assertions, isolated data, proper waits, or improved setup.

### XPath Locators

#### 108. How do you use XPath in Playwright?

Pass the XPath expression to `page.locator()`.

```ts
await page.locator("//input[@id='email']").fill("admin@admin.com");
await page.locator("//button[@class='login-btn']").click();
```

#### 109. How does Playwright know a selector is XPath and not CSS?

Selectors that start with `//` or `..` are treated as XPath automatically. You can also make it explicit with the `xpath=` prefix, for example `page.locator("xpath=//input[@id='email']")`.

#### 110. What is the difference between absolute and relative XPath?

Absolute XPath starts from the document root, such as `/html/body/div[2]/form/input[1]`. It breaks when any element in that path changes. Relative XPath starts with `//` and searches anywhere, such as `//input[@id='email']`. Always prefer relative XPath.

#### 111. Why is `//button[@class='login-btn']` fragile?

`@class='login-btn'` must match the entire `class` attribute. If another class is added, such as `class="login-btn primary"`, the locator no longer matches. Use `//button[contains(@class, 'login-btn')]`, the CSS locator `.login-btn`, or better, `getByRole('button', { name: 'Login' })`.

#### 112. Do you prefer XPath or CSS locators? Why?

CSS, and user-facing locators above both. CSS is shorter, easier to read, and pierces open shadow DOM in Playwright. XPath is useful when I need to move to a parent, ancestor, or sibling, or match on conditions that CSS cannot express easily.

#### 113. Does XPath work inside shadow DOM in Playwright?

No. XPath does not pierce shadow roots. CSS and `getBy*` locators pierce open shadow roots by default.

#### 114. Write an XPath to find an input that follows a label with the text "Email".

```ts
page.locator("//label[text()='Email']/following-sibling::input");
```

Other useful axes are `parent::`, `ancestor::`, `preceding-sibling::`, and `descendant::`.

#### 115. What is the difference between `text()='Login'` and `contains(text(), 'Log')` in XPath?

`text()='Login'` matches when the element's own text is exactly `Login`. `contains(text(), 'Log')` matches when the text contains `Log` anywhere. The contains form tolerates extra text or whitespace, but it can match more elements.

### Checkboxes and Form Controls

#### 116. How do you select a checkbox in Playwright?

Use `check()`.

```ts
await page.getByRole("checkbox", { name: "I agree to Wingify's" }).check();
```

#### 117. What is the difference between `check()` and `click()` on a checkbox?

`click()` toggles the checkbox, so clicking one that is already checked unchecks it. `check()` does nothing if the box is already checked. Otherwise it clicks and then verifies the box is checked, throwing if it is not.

#### 118. How do you assert that a checkbox is checked or unchecked?

```ts
await expect(checkbox).toBeChecked();
await expect(checkbox).not.toBeChecked();
```

#### 119. How do you set a checkbox based on test data?

Use `setChecked()`, which accepts a boolean.

```ts
await checkbox.setChecked(user.acceptsMarketing);
```

### Role Name Matching and Text Locators

#### 120. Is the `name` option in `getByRole()` an exact match?

No. By default it is case-insensitive and matches a substring, so `{ name: "email" }` matches a textbox named `Email`. Use `exact: true` for an exact, case-sensitive match, or pass a regular expression.

#### 121. What happens if a locator matches more than one element?

Playwright's strict mode throws an error on actions such as `click()` and `fill()` and on single-element assertions such as `toBeVisible()`. Fix it with a more specific name, `exact: true`, a scoped locator, `filter()`, or a test ID. Use `first()` or `nth()` only when order is actually meaningful.

#### 122. What does `getByText()` do, and when should you use it?

It finds elements by text content. By default it is case-insensitive, matches a substring, and normalizes whitespace. Use it for non-interactive content such as messages and paragraphs. For buttons and links, `getByRole()` is better.

#### 123. What is the difference between `textContent()`, `innerText()`, and `inputValue()`?

`textContent()` returns the raw DOM text, including hidden child elements and original whitespace. Its TypeScript type is `Promise<string | null>`. `innerText()` returns the rendered text as the user sees it. `inputValue()` returns the current value of an input, textarea, or select.

#### 124. Why is reading `textContent()` and then asserting on it weaker than `toHaveText()`?

`textContent()` reads the value once and does not check visibility. If the text updates a moment later, or the element is hidden, the test can give the wrong result. `toHaveText()` and `toContainText()` retry until the text matches or the timeout is reached.

### URLs and Assertions

#### 125. How do you get the current page URL?

Use `page.url()`. It is synchronous and returns a `string`, so it does not need `await`.

```ts
const currentUrl = page.url();
```

#### 126. How do you verify that the URL changed after submitting a form?

Use a web-first URL assertion, which retries until the URL changes.

```ts
await expect(page).not.toHaveURL(initialURL);
await expect(page).toHaveURL(/dashboard/);   // stronger, if the destination is known
```

#### 127. Why can reading `page.url()` immediately after `click()` be flaky?

The app may not have finished navigating yet, especially when login calls an API and then redirects on the client side. `page.url()` returns whatever the URL is at that moment, so the test result depends on timing.

#### 128. What is the difference between `page.waitForURL()` and `expect(page).toHaveURL()`?

`waitForURL()` waits for the page to reach a URL and, by default, for the load event. It is a synchronization step. `toHaveURL()` is an assertion that retries and reports a clear assertion failure. Use `toHaveURL()` when the URL is the thing being verified.

#### 129. What is the difference between generic assertions and web-first assertions?

Generic assertions such as `toBe()`, `toEqual()`, and `toContain()` run on plain values and check once. Web-first assertions such as `toBeVisible()`, `toHaveText()`, and `toHaveURL()` run on `page` or a locator and retry until the condition passes or times out.

#### 130. Do you need `await` before `expect()`?

Only for web-first and other async assertions, such as `expect(locator).toBeVisible()`, `expect.poll()`, and `expect(...).toPass()`. Generic assertions on plain values are synchronous. `await expect(changedURL).not.toBe(initialURL)` works, but the `await` does nothing.

#### 131. What is the difference between `toBe()` and `toEqual()`?

`toBe()` checks strict equality using `Object.is`, which suits strings, numbers, and booleans. `toEqual()` checks deep equality and is used for objects and arrays. Two different objects with the same fields fail `toBe()` but pass `toEqual()`.

#### 132. What does `.not` do in an assertion?

It inverts the matcher. `expect(value).not.toBe(x)` passes when `value` is not `x`. It works with web-first assertions too, such as `expect(locator).not.toBeVisible()`, which retries until the element is hidden.

#### 133. What is wrong with `expect(actualMsg).toContain(errormsg)` when `actualMsg` is the hard-coded text and `errormsg` is read from the page?

The arguments are reversed. The pattern is `expect(actual).matcher(expected)`. As written, it checks whether the hard-coded string contains the page text, so extra whitespace or extra text on the page makes it fail even when the correct error is shown. It should be `expect(errormsg).toContain(expectedMsg)`, or better, a web-first assertion on the locator.

#### 134. What does `toContain()` check?

For a string, it checks that the string contains a substring. For an array, it checks that the array contains an item.

```ts
expect('Invalid email address').toContain('email');
expect(['admin', 'user']).toContain('admin');
```

### Scenario-Based Questions on Locators and Validation

#### 135. How would you automate a free-trial signup form that should reject an invalid email?

Enter an invalid email, tick the required consent checkboxes with `check()`, submit, and assert that the error message is visible.

```ts
await page.goto('https://wingify.com/free-trial/');
await page.getByRole('textbox', { name: 'email' }).fill('admin');
await page.getByRole('checkbox', { name: "I agree to Wingify's" }).check();
await page.getByRole('button', { name: 'Create a Free Trial Account' }).click();

await expect(page.getByText('The email address you entered is incorrect.')).toBeVisible();
```

I would also check that the user stays on the signup page and that no account is created.

#### 136. Review this test. What would you change?

```ts
let changedURL: string = await page.url();
await expect(changedURL).not.toBe(initialURL);
```

- Replace the one-time URL read with `await expect(page).not.toHaveURL(initialURL)` so it retries while navigation completes.
- Assert the expected destination with `toHaveURL()` instead of only "not the same URL", because an error page would also pass.
- Remove the unnecessary `await` on `page.url()` and on the generic assertion.
- Use `const` for values that are not reassigned.
- Replace `//button[@class='login-btn']` with a role or CSS locator that survives extra classes.

#### 137. What are the most important Playwright concepts from these tests?

The key concepts are test runner usage, fixtures, browser-context-page architecture, async/await, navigation options, context options, mobile emulation, role/test id/CSS/XPath/text locators, role name matching, chained locators, checkbox actions, reading text and URLs, generic vs web-first assertions, waits, test grouping, annotations, and multi-context testing.

### Session Storage, Reports, Multiple Elements, and Web Tables

#### 138. What is `storageState` in Playwright?

`storageState` is a saved browser context state. It can include cookies, local storage, and session storage. It is commonly used to save login state and reuse it in tests so every test does not have to perform UI login.

```ts
await context.storageState({ path: './user-session.json' });
```

#### 139. How do you use a saved login session in a test?

Use `test.use()` with the storage state file.

```ts
test.use({
  storageState: './user-session.json',
});
```

The file must exist before Playwright creates the test context.

#### 140. Why is calling an async session setup function without `await` risky?

Because the test can continue before the session file is created or updated. This can cause tests to use an old session file, an incomplete file, or no file at all. Put async setup inside an awaited hook or a setup project.

#### 141. When would you use `beforeAll` for login setup?

Use `beforeAll` when a group of tests in the same file can share setup work, such as generating a storage state file. For larger suites, a dedicated authentication setup project is usually better because dependencies are clearer and the login setup runs once before dependent projects.

#### 142. Why can `.env` variables behave unexpectedly with `USERNAME`?

Some operating systems or shells already define `USERNAME`. By default, `dotenv.config()` does not override existing environment variables. Use `dotenv.config({ override: true })` or choose project-specific names such as `ORANGE_USERNAME`.

#### 143. What is a custom reporter in Playwright?

A custom reporter is a class that implements Playwright's `Reporter` interface. It can listen to test lifecycle events and generate custom output such as logs, dashboards, HTML reports, or integrations with external systems.

#### 144. Which reporter hooks are commonly useful?

Common hooks include `onBegin`, `onTestBegin`, `onStepBegin`, `onStepEnd`, `onTestEnd`, and `onEnd`. These hooks let the reporter track run metadata, test status, step data, errors, durations, and attachments.

#### 145. How do screenshots, videos, and traces reach a custom reporter?

Playwright exposes them as test result attachments when artifact collection is enabled. The reporter can inspect `result.attachments`, copy files from `attachment.path`, and link them in the generated report.

#### 146. What is the difference between Playwright HTML report and Allure report?

The Playwright HTML report is built into Playwright and is simple to use for local debugging. Allure is an external reporting ecosystem that is useful for richer test history, suites, categories, labels, attachments, and CI publishing.

#### 147. What is the difference between `all()`, `allInnerTexts()`, and `allTextContents()`?

`all()` returns an array of locators. `allInnerTexts()` returns rendered visible text from all matching elements. `allTextContents()` returns raw DOM text from all matching elements, including text that may not be visible.

#### 148. When should you use `count()` and `nth()` instead of `all()`?

Use `count()` and `nth()` when the list may change while the test is running or when you want Playwright's locator behavior to stay lazy. `all()` snapshots matching locators at that moment.

#### 149. How do you read an attribute from multiple links?

Get the locators and loop through them.

```ts
const links = await page.locator('a').all();

for (const link of links) {
  console.log(await link.getAttribute('href'));
}
```

#### 150. How do you validate data in a web table?

Locate the table rows, loop through them, read the target cell, and when the expected row is found, assert related cells or actions in the same row.

```ts
const rows = await page.locator('tbody tr').count();

for (let i = 0; i < rows; i++) {
  const row = page.locator('tbody tr').nth(i);
  await expect(row).toContainText('Kabir Khan');
}
```

#### 151. Why are reusable helper functions useful for web tables?

Web-table logic often repeats across tests. A helper function can hide row traversal details and let specs read more clearly, for example `verifyIfNameIsPresentAndItsRole(page, 'Kabir Khan')`.

#### 152. What would you improve in a helper that accepts `page: any`?

Use the Playwright `Page` type.

```ts
import { Page } from '@playwright/test';

async function verifyEmployee(page: Page, name: string) {
  // helper logic
}
```

This improves autocomplete, type checking, and maintainability.

#### 153. What is the risk of building XPath strings with row indexes?

Index-based XPath can break when the table layout changes, rows are sorted, or columns move. It is useful for learning, but in production I would prefer row locators, filtering by text, accessible roles, or stable test IDs when available.

### Filters, Pagination, Test Data, and Framework Structure

#### 154. What does `locator.filter()` do?

It narrows a locator that matches many elements down to the ones that meet a condition. Options are `hasText`, `hasNotText`, `has`, `hasNot`, and `visible`.

```ts
await page.locator('.list-group a').filter({ hasText: 'Downloads' }).click();
```

#### 155. What is the difference between `hasText` and `has` in `filter()`?

`hasText` matches elements containing a text or regex. `has` matches elements that contain a child matching another locator, for example a row that contains a Delete button.

```ts
page.locator('tr').filter({ has: page.getByRole('button', { name: 'Delete' }) });
```

#### 156. Why is `filter({ hasText })` often better than `nth()`?

It selects by content rather than position, so the test still works if items are reordered or new items are added.

#### 157. How do you find a record in a paginated table?

Scan the rows on the current page; if the record is not found, click Next and repeat. A `do...while` loop fits because the first page must always be scanned.

```ts
let found = false;
do {
  found = (await page.locator('tbody tr').filter({ hasText: 'Luca Greco' }).count()) > 0;
  if (!found) {
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
  }
} while (!found);
```

#### 158. What is the risk in a pagination loop like `while (!foundName)`?

If the record does not exist, the loop never ends and the test only stops at the timeout. Add an exit condition such as "Next is disabled or hidden", or a maximum page count, and fail with a clear message.

#### 159. What must you wait for after clicking Next in a paginated table?

The table content must actually change before reading rows again. Assert something that reflects the new page, such as the page number, a changed first row, or a finished network response, instead of reading immediately.

#### 160. Why separate locators, test data, and helper functions into different files?

- Locators change often; keeping them in one file means one place to update.
- Test data can be generated or swapped without touching test logic.
- Helpers hold business actions (login, create employee, delete employee) so specs stay short and readable.

This is the idea behind the Page Object Model.

#### 161. How would you convert `25_Locators.ts` and `25_CommonFile.ts` into a Page Object Model?

Create page classes that receive `page` and expose `Locator` properties and action methods:

```ts
import { Page, Locator } from '@playwright/test';

export class PimPage {
  readonly addButton: Locator;
  constructor(private page: Page) {
    this.addButton = page.getByRole('button', { name: 'Add' });
  }
  async addEmployee(first: string, last: string) {
    await this.addButton.click();
    await this.page.getByPlaceholder('First Name').fill(first);
    await this.page.getByPlaceholder('Last Name').fill(last);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}
```

#### 162. What is Faker and why use it in tests?

`@faker-js/faker` generates realistic random data such as names, emails, and numbers. It avoids duplicate-record failures on shared environments and removes manual data setup.

#### 163. What is a pitfall of exporting Faker values as constants from a module?

The values are generated once at import time, so all tests in that worker reuse the same data. Export a function that returns fresh data instead, and log the values (or set `faker.seed()`) so failures can be reproduced.

#### 164. Why should a test delete the data it creates?

It keeps shared environments clean, prevents later tests from finding stale records, and makes the test independent and repeatable. For more reliability, do cleanup in `afterEach` or via an API so it runs even if an assertion fails.

#### 165. How do you return multiple values from an async helper in TypeScript?

Return an object and type the promise:

```ts
type EmployeeName = { FullName: string; LastName: string };

async function createEmployee(page: Page): Promise<EmployeeName> {
  return { FullName: 'Ana Maria', LastName: 'Lopez' };
}

const { FullName, LastName } = await createEmployee(page);
```

#### 166. How do you build a locator for the Nth item dynamically?

Use a function that returns the selector for an index, or better, use `nth()` on a base locator:

```ts
getLabels(x: number) {
  return `//div[@id='results']/div[${x}]//a`;
}

const item = page.locator('#results > div').nth(x);
```

#### 167. What is the difference between `isVisible()` and `expect(locator).toBeVisible()`?

`isVisible()` returns the current state immediately without waiting or retrying. `toBeVisible()` retries until the element is visible or the timeout expires. Use `isVisible()` for branching logic (such as "is there a Next button?") and `toBeVisible()` for assertions.

#### 168. What does `locator.waitFor({ state: 'visible' })` do?

It waits until the element reaches the given state: `attached`, `detached`, `visible`, or `hidden`. It requires a single element, so use `first()` when the locator matches a list.

#### 169. How do you increase the timeout for a single long test?

Call `test.setTimeout(60000)` at file level or inside the test, or use `test.slow()` to triple the default timeout.

#### 170. What challenges do you face automating a live e-commerce site like Flipkart?

First-visit popups, dynamic and deeply nested markup, frequent layout changes, A/B tests, lazy loading, bot detection, and region-based results. I would close popups defensively, avoid absolute XPath, wait for results before counting, and keep such tests out of the main CI suite or run them against a controlled environment.

### Dropdowns and Forms

#### 171. How do you select a value from a native `<select>` dropdown?

Use `selectOption()` on the `<select>` locator. No click is needed first:

```ts
await page.locator('#dropdown').selectOption('Option 2');
await page.locator('#dropdown').selectOption({ label: 'Option 2' });
await page.locator('#dropdown').selectOption({ index: 2 });
```

#### 172. How do you assert the selected value of a dropdown?

Use `toHaveValue()` for the option value, or check the selected option text:

```ts
await expect(page.locator('#dropdown')).toHaveValue('2');
await expect(page.locator('#dropdown option:checked')).toHaveText('Option 2');
```

#### 173. Why does `selectOption()` fail on some dropdowns?

It only works on native `<select>` elements. Many modern UIs build dropdowns from `div`, `button`, and `li` elements (custom or react-select components). For those, click the trigger to open the list and then click the option.

#### 174. How do you automate a custom dropdown reliably?

Open the trigger with a stable locator (role, label, or test id), then pick the option with `getByRole('option', { name })` or scope the text search to the open list, such as `page.getByRole('listbox').getByText('TypeScript')`. Assert the trigger shows the selected value afterwards.

#### 175. How do you handle a multi-select dropdown?

For a native `<select multiple>`, pass an array: `selectOption(['a', 'b'])`. For a custom multi-select, open it and click each option, then close it with `Escape`. Remove a selected chip with its remove button, often found by `getByLabel('Remove Mocha')`.

#### 176. How do you handle a searchable or autocomplete dropdown?

Type part of the text with `fill()` (or `pressSequentially()` if the component needs key events), wait for the suggestion with `expect(...).toBeVisible()`, and click it. Avoid `waitForTimeout()`; wait for the suggestion itself.

#### 177. How do you create a new option in a creatable dropdown?

Fill the input with the new value and press `Enter`:

```ts
await page.getByTestId('rs-creatable-input').fill('Security Testing');
await page.keyboard.press('Enter');
```

#### 178. What is the difference between `page.keyboard.press()` and `locator.press()`?

`page.keyboard.press()` sends the key to whatever element currently has focus. `locator.press()` focuses the given element first and then presses the key, so it is more explicit and less dependent on earlier steps.

#### 179. How do you upload a file in Playwright?

Use `setInputFiles()` on the `<input type="file">`:

```ts
await page.getByTestId('upload-image').setInputFiles(path.join(__dirname, 'testdata', 'Play2.png'));
await page.getByTestId('upload-image').setInputFiles([]); // clear
```

If there is no visible input and a file chooser dialog opens, use `page.waitForEvent('filechooser')` and call `fileChooser.setFiles()`.

#### 180. Why should upload paths not be absolute paths like `/Users/<name>/Downloads/file.png`?

That path only exists on one machine. The test fails on CI and on teammates' laptops. Keep test files in the repository and build the path relative to the test file or project root.

#### 181. How do you verify a file download?

Start waiting for the `download` event before clicking, then check or save the file:

```ts
const downloadPromise = page.waitForEvent('download');
await page.getByTestId('download-file').click();
const download = await downloadPromise;
expect(download.suggestedFilename()).toContain('.pdf');
await download.saveAs('downloads/' + download.suggestedFilename());
```

#### 182. What does `page.pause()` do, and should it be committed?

It pauses execution and opens the Playwright Inspector so you can step through and try locators. It is a debugging aid; remove it before committing. Use `npx playwright test --debug` when you want to debug without changing code.

#### 183. How do you fill a date input?

For `<input type="date">`, use `fill()` with the ISO format `YYYY-MM-DD`, for example `fill('2026-11-26')`. Custom date pickers need to be handled like custom dropdowns: open the picker and click the day.

### Frames and iFrames

#### 184. Why can't a normal page locator find an element inside an iframe?

An iframe loads a separate document with its own DOM. Page locators search only the main document, so you need a `FrameLocator` to search inside the frame.

#### 185. How do you interact with an element inside an iframe?

```ts
const frame = page.frameLocator('#frame-one');
await frame.locator('#RESULT_TextField-1').fill('Gypsy');
```

#### 186. What is the difference between `page.frameLocator()` and `locator.contentFrame()`?

Both return a `FrameLocator`. `page.frameLocator(selector)` takes a selector directly. `locator.contentFrame()` converts an existing iframe `Locator`, so you can use `first()`, `nth()`, or `filter()` to choose the right iframe before entering it.

#### 187. How do you handle nested iframes?

Chain the frame locators from parent to child:

```ts
const top = page.frameLocator('#pact1');
const middle = top.frameLocator('#pact2');
const lower = middle.frameLocator('#pact3');
await lower.locator('#glaf').fill('Company');
```

#### 188. How do you handle a `<frameset>` with multiple `<frame>` elements?

Create one `FrameLocator` per frame, usually by the frame's `name`: `page.frameLocator("frame[name='side']")`, `page.frameLocator("frame[name='main']")`, and so on. Each one is independent, so you can act in the side frame and then read from the main frame without switching.

#### 189. What is the difference between `FrameLocator` and `Frame` in Playwright?

`FrameLocator` is lazy, auto-waits for the iframe, and re-resolves it if it reloads; it is the recommended approach. `Frame` is a handle to an existing frame, obtained with `page.frame({ name })`, `page.frame({ url })`, or `page.frames()`. It can be `null` if the frame has not loaded yet, and it is useful for frame-level operations such as reading `frame.url()`.

#### 190. How is Playwright's iframe handling different from Selenium's?

Selenium requires `driver.switchTo().frame(...)` and `switchTo().defaultContent()` to move in and out of frames, and forgetting to switch back is a common bug. Playwright has no switching: `page` always points to the main document and each `FrameLocator` points to its frame, so both can be used side by side.

#### 191. What happens if the iframe selector matches more than one iframe?

A strict mode violation is thrown when you act on an element inside it. Use a more specific selector, or pick one with `page.locator('iframe#pact1').first().contentFrame()`.

#### 192. Do you need `await` before `page.frameLocator()`?

No. Like `page.locator()`, it only builds a lazy reference and returns immediately. `await` is needed on the actions and assertions, such as `fill()`, `click()`, and `expect(...).toBeVisible()`.

#### 193. How do you assert text inside an iframe?

Use a web-first assertion through the frame locator:

```ts
await expect(page.frameLocator("frame[name='main']").getByText("You're inside the")).toBeVisible();
```

### Keyboard Events

#### 194. What is `page.keyboard` in Playwright?

It is the page's virtual keyboard. Methods such as `type()`, `press()`, `down()`, `up()`, and `insertText()` send real keyboard events to the element that currently has focus.

#### 195. What is the difference between `keyboard.type()` and `fill()`?

`fill()` focuses the element and sets its whole value in one step, firing a single `input` event. `keyboard.type()` sends key events for each character into whatever is focused. Use `fill()` for normal inputs; use key-by-key typing when the page reacts to each key, such as autocomplete or input masks.

#### 196. What is the difference between `keyboard.type()` and `locator.pressSequentially()`?

Both type one character at a time. `keyboard.type()` types into the currently focused element, while `locator.pressSequentially()` focuses the given locator first. `pressSequentially()` is more reliable because it does not depend on earlier focus. It also accepts a `delay` option to slow typing down.

#### 197. What is the difference between `keyboard.press()` and `keyboard.type()`?

`press()` handles one key or key combination by name, such as `'Tab'`, `'Enter'`, or `'Control+A'`. `type()` takes a text string and types each character. `type('Enter')` would type the letters E-n-t-e-r, not press the Enter key.

#### 198. How do you press a key combination like Ctrl+A or Shift+Tab?

Join the keys with `+`:

```ts
await page.keyboard.press('ControlOrMeta+A'); // Ctrl on Windows/Linux, Cmd on macOS
await page.keyboard.press('Shift+Tab');
```

For longer sequences, hold a modifier with `keyboard.down('Shift')`, press other keys, then release it with `keyboard.up('Shift')`.

#### 199. Why use `ControlOrMeta` instead of `Control`?

Shortcuts like select-all and copy use Control on Windows and Linux but Command (Meta) on macOS. `ControlOrMeta` picks the right one for the platform, so the same test works on a Mac laptop and a Linux CI runner.

#### 200. How do you fill a form using only the keyboard?

Focus the first field, then type and move with `Tab`:

```ts
await page.getByTestId('firstname').click();
await page.keyboard.type('Vineet');
await page.keyboard.press('Tab');
await page.keyboard.type('Verma');
```

Use the arrow keys to change a radio group selection, `Space` to toggle a checkbox, and `Enter` to submit.

#### 201. What is the risk of a test that relies only on `Tab` to move between fields?

It depends on the page's tab order. If a field is added, removed, or reordered, the text goes into the wrong field and the test may fail far from the real cause. For data entry, target fields directly with locators; keep `Tab` flows for tests whose purpose is to check keyboard navigation and accessibility.

#### 202. How do you verify keyboard navigation for accessibility?

Press `Tab` and assert which element has focus with `await expect(locator).toBeFocused()`. Also check that every control can be reached and used without a mouse (`Space` for checkboxes, arrows for radios, `Enter` for buttons) and that focus order matches the visual order.

#### 203. How do you clear a text field with the keyboard?

Focus it, select all, and delete:

```ts
await page.getByTestId('firstname').click();
await page.keyboard.press('ControlOrMeta+A');
await page.keyboard.press('Backspace');
```

`fill('')` or `clear()` does the same in one call and is simpler when key events do not matter.

#### 204. What assertions would you add after a keyboard-driven form fill?

Check each value and control state: `toHaveValue()` for text inputs, `toBeChecked()` for the selected radio and checkbox, and a success message or URL change after submit. Without assertions the test only proves that key presses did not throw an error.

### Hover, Drag-and-Drop, Context Click, and Alerts

#### 205. How do you hover over an element in Playwright?

Use `locator.hover()`:

```ts
await page.getByTestId('nav-add-ons').hover();
```

It moves the mouse over the element and waits for the element to be actionable. Hover is commonly used for menus that reveal submenus.

#### 206. How do you right-click an element?

Use `click()` with the right mouse button:

```ts
await page.getByTestId('ctx-target').click({ button: 'right' });
```

After that, assert the custom context menu or read the displayed options.

#### 207. What is the easiest way to do drag-and-drop in Playwright?

Use `locator.dragTo()`:

```ts
await source.dragTo(destination);
```

It is readable and should be the first choice for normal drag-and-drop interactions.

#### 208. When would you use `page.mouse` instead of `dragTo()`?

Use `page.mouse` when a custom widget reacts to low-level pointer movement and `dragTo()` does not trigger the required behavior. In that case, get element coordinates with `boundingBox()`, move to the source center, press down, move to the target center, and release.

#### 209. How do you calculate the center point of an element from `boundingBox()`?

Use:

```ts
const centerX = box.x + box.width / 2;
const centerY = box.y + box.height / 2;
```

`x` and `y` are the top-left position. Adding half the width and half the height moves the mouse to the middle of the element.

#### 210. What does `boundingBox()` return?

It returns the visible element's position and size:

```ts
{ x, y, width, height }
```

It can return `null` if the element is not visible, so production code should check it before using the values.

#### 211. How do you handle JavaScript alerts in Playwright?

Register a dialog handler before the action that opens the alert:

```ts
page.on('dialog', async dialog => {
  await dialog.accept();
});

await page.locator('button').click();
```

#### 212. How do you enter text into a JavaScript prompt?

Pass the prompt text to `dialog.accept()`:

```ts
page.on('dialog', async dialog => {
  await dialog.accept('Vineet');
});
```

Use `dialog.dismiss()` when you want to cancel a confirm or prompt.

### SVG Automation

#### 213. Can Playwright interact with SVG elements?

Yes. SVG elements can be clicked and asserted like normal DOM elements when they are visible and actionable. You can use CSS locators, role locators, or XPath depending on how the SVG is built.

#### 214. Why do SVG XPath locators often use `name()`?

SVG elements are in an XML namespace. XPath like `//path` may not always match SVG `path` elements reliably. This pattern is namespace-safe:

```ts
page.locator("//*[name()='path']");
```

The same idea works for `text`, `tspan`, `circle`, `rect`, and other SVG tags.

#### 215. How do you read data from SVG elements?

Use `getAttribute()` for SVG attributes:

```ts
const value = await bar.getAttribute('data-value');
const cssClass = await statePath.getAttribute('class');
```

SVG charts often store labels, values, state codes, and metadata in attributes.

#### 216. What is the risk of using `locator("svg").nth(2)`?

It is index-based and fragile. If the page adds or removes another SVG before the target, the index changes and the test clicks the wrong element. Prefer a role locator, accessible name, stable id/class, or a locator scoped near a related element.

#### 217. Does `locator.all()` wait for elements to appear?

No. `all()` immediately returns the elements that match at that moment. For dynamic SVG or table content, wait first:

```ts
const paths = page.locator("//*[name()='path']");
await paths.first().waitFor({ state: 'attached' });
const allPaths = await paths.all();
```

#### 218. How can you map an SVG path to its label?

Read a stable attribute from the path, parse the state code, build the matching label locator, and read the label text:

```ts
const classState = await path.getAttribute('class');
const stateCode = classState?.substring(18).trim();
const labelLocator = `//*[name()='text' and contains(@class,'sm_label sm_label_${stateCode}')]//*[name()='tspan']`;
const label = await page.locator(labelLocator).textContent();
```

### Utility Helpers and Table Calculations

#### 219. Why should helper functions receive `page: Page`?

The helper needs the same Playwright page that the test is using. Typing it as `Page` makes the function contract clear and gives TypeScript/editor support for Playwright methods.

#### 220. Why is missing `await` dangerous with Playwright helper functions?

Most Playwright actions return promises. If a helper is called without `await`, the test continues before that helper finishes. This can cause URL checks, locators, or assertions to run before login or navigation is complete.

#### 221. Why is `expect(page).toHaveURL()` better than `expect(page.url()).toBe()` after navigation?

`expect(page).toHaveURL()` is a web-first assertion. It waits for the URL to become the expected value. `page.url()` reads the current URL immediately, which can be too early if navigation is still happening.

#### 222. How do you return calculated values from a helper in TypeScript?

Define a return type and return an object:

```ts
type calculatedValues = { totalSpent: number, totalEarned: number, totalValue: number };

async function calculateSpentEarnedTotal(page: Page): Promise<calculatedValues> {
  return { totalSpent, totalEarned, totalValue };
}
```

This is cleaner than only printing values because the test can assert against returned data.

#### 223. How do you convert amount text from a table into a number?

Read the text, remove extra characters such as spaces and commas, then call `Number(...)`:

```ts
const text = await amountLocator.innerText();
const numberText = text.replace(' ', '').replace(',', '');
const amount = Number(numberText);
```

For a larger framework, prefer a reusable parsing helper that handles currency symbols, commas, spaces, and negative values consistently.

#### 224. What is the difference between `console.log()` and assertion in a test?

`console.log()` only prints information. It does not decide whether the test passes or fails. Assertions such as `expect(total).toEqual(1996.22)` validate behavior and fail the test when the result is wrong.
