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
