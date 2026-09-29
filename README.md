# Learning Playwright Fundamentals

This repository contains beginner-friendly Playwright automation examples written with TypeScript. It covers Playwright basics, browser-context-page handling, test options, annotations, `test.describe()`, locator commands, assertions, and interview-focused notes.

## Repository Contents

```text
.
├── Notes/
│   └── PlaywrightNotes.md
├── tests/
│   ├── 01_Basics/
│   ├── 02_TestAnnotations/
│   ├── 03_LocatorCommands/
│   ├── 04_SessionStorage/
│   ├── 05_Reporter/
│   ├── 06_MultipleElements/
│   └── 07_WebTable/
├── utils/
│   └── CustomReporter.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Latest Additions

- Added [Notes/PlaywrightNotes.md](Notes/PlaywrightNotes.md), a detailed interview preparation document.
- Added session storage examples for OrangeHRM login reuse.
- Added a custom HTML reporter in [utils/CustomReporter.ts](utils/CustomReporter.ts).
- Added reporting examples for custom reports and Allure reports.
- Added multiple-element handling examples using `allInnerTexts()`, `all()`, loops, and attributes.
- Added web-table examples with reusable helper functions.
- Added `locator.filter()` example for selecting an element by text.
- Added pagination examples that search table records across pages with `do...while` loops.
- Added an OrangeHRM add-and-delete employee flow split into locators, Faker test data, and helper files (a step towards Page Object Model).
- Added a Flipkart search example that lists Nikon cameras across all result pages.
- The notes file has two main sections:
  - **Notes**: Playwright concepts used in the current `.ts` files with explanations and examples.
  - **Interview Questions**: Playwright with JavaScript/TypeScript interview questions and answers.
- The notes file also includes an update reminder at the top so future additions to `tests/` should be reflected in both notes and interview questions.

## Topics Covered

The current test files cover:

- Playwright Test Runner basics using `@playwright/test`
- `test`, `expect`, `page`, and `browser` fixtures
- Browser, browser context, and page model
- Manual browser launch using `chromium`
- Navigation with `page.goto()`
- Navigation options like `timeout`, `referer`, `waitUntil: "load"`, and `waitUntil: "domcontentloaded"`
- Context options such as viewport, locale, timezone, geolocation, and permissions
- Mobile context simulation
- Role locators with `getByRole()`
- Test id locators with `getByTestId()`
- CSS locators using IDs, classes, attributes, and tags
- Chained and scoped locators
- Positional locators using `nth()`
- User actions such as `click()` and `fill()`
- Assertions such as `toHaveTitle()`, `toBeVisible()`, and `toContainText()`
- Regex-based assertions
- Hard waits with `waitForTimeout()` and better waiting strategies
- Cookie consent handling
- Test grouping with `test.describe()`
- Test annotations: `test.skip()`, `test.only()`, `test.fail()`, `test.fixme()`, and `test.slow()`
- Multi-user and multi-context testing patterns
- Session storage with `browserContext.storageState()`
- Reusing login state with `test.use({ storageState })`
- Environment variables with `dotenv`
- Custom reporter implementation using Playwright's reporter API
- Screenshots, videos, traces, and generated HTML reports
- Allure reporting with `allure-playwright`
- Handling multiple matching elements with `allInnerTexts()` and `all()`
- Reading element attributes with `getAttribute()`
- Web-table row traversal and reusable helper functions
- Narrowing locators with `filter({ hasText })`
- Pagination handling with `do...while` loops and Next-button checks
- Separating locators, test data, and helpers into their own files
- Dynamic test data with `@faker-js/faker`
- Typed helper return values and dynamic locator functions
- Confirmation dialogs, toast messages, and cleaning up created records
- `isVisible()`, `locator.waitFor()`, and `test.setTimeout()`

## Test Files

### Basics

- `tests/01_Basics/01_example.spec.ts`
- `tests/01_Basics/02_tta-check.spec.ts`
- `tests/01_Basics/03_sciensus.spec.ts`
- `tests/01_Basics/04_BCP.spec.ts`
- `tests/01_Basics/05_Basics.spec.ts`
- `tests/01_Basics/06_TestOptions.spec.ts`

### Test Annotations

- `tests/02_TestAnnotations/07_TestAnnotations.spec.ts`
- `tests/02_TestAnnotations/08_TestDescribe.spec.ts`

### Locator Commands

- `tests/03_LocatorCommands/09_LocatorCommand.spec.ts`
- `tests/03_LocatorCommands/10_BasicTest.spec.ts`
- `tests/03_LocatorCommands/11_hw_Login_validation.spec.ts`
- `tests/03_LocatorCommands/12_hw_errorValidation.spec.ts`
- `tests/03_LocatorCommands/PlaywrightLocators.md`

### Session Storage

- `tests/04_SessionStorage/13_SessionStorage.ts`
- `tests/04_SessionStorage/14_TestOrange.spec.ts`

### Reporter

- `tests/05_Reporter/15_TestOrange_CustomReport.spec.ts`
- `tests/05_Reporter/16_TestOrange_AllureReport.spec.ts`
- `utils/CustomReporter.ts`

### Multiple Elements

- `tests/06_MultipleElements/17_MultipleElements.spec.ts`
- `tests/06_MultipleElements/18_Diff_all_allInnerText_allTextContents.md`
- `tests/06_MultipleElements/19_Diff_textContent_innerText.md`

### Web Table

- `tests/07_WebTable/20_WebTable.spec.ts`
- `tests/07_WebTable/21_commonFunction.ts`
- `tests/07_WebTable/22_ChecktheRecord.spec.ts`
- `tests/07_WebTable/23_ClickUsingfilter.spec.ts`
- `tests/07_WebTable/24_Pagination.spec.ts`
- `tests/07_WebTable/25_OrangeTable.spec.ts`
  - `25_Locators.ts`: OrangeHRM locators
  - `25_DataProvider.ts`: Faker-generated employee data
  - `25_CommonFile.ts`: login, create employee, find and delete employee helpers
- `tests/07_WebTable/26_Flipkart.spec.ts`
  - `26_FlipkartLocators.ts`: static and index-based locators
  - `26_FlipkartCommonFile.ts`: open site, search, and list products across pages

## Playwright Notes

Read [Notes/PlaywrightNotes.md](Notes/PlaywrightNotes.md) before interview preparation or revision. It is designed for Playwright with JavaScript/TypeScript interview preparation for a QA automation profile with strong testing experience.

Whenever new `.ts` files are added under `tests/`, update:

- The relevant topic explanation in the **Notes** section.
- The related questions and answers in the **Interview Questions** section.
- This README if new folders, files, or major concepts are added.

## Setup

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

If starting a new Playwright project from scratch, use:

```bash
npm init playwright@latest
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/01_Basics/03_sciensus.spec.ts
```

Run the OrangeHRM session-storage test:

```bash
npx playwright test tests/04_SessionStorage/14_TestOrange.spec.ts --workers=1
```

`14_TestOrange.spec.ts` imports `saveSession()` from `13_SessionStorage.ts`, creates `user-session.json`, and then uses that saved state with `test.use({ storageState: "./user-session.json" })`.

Run the custom reporter example:

```bash
npx playwright test tests/05_Reporter/15_TestOrange_CustomReport.spec.ts --workers=1
```

The custom report is generated under `custom-report/`.

Run the Allure reporter example:

```bash
npx playwright test tests/05_Reporter/16_TestOrange_AllureReport.spec.ts --workers=1
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

Run the OrangeHRM add-and-delete employee flow (needs `USERNAME` and `PASSWORD` in `.env`):

```bash
npx playwright test tests/07_WebTable/25_OrangeTable.spec.ts --workers=1
```

Run the Flipkart search example:

```bash
npx playwright test tests/07_WebTable/26_Flipkart.spec.ts
```

This runs against the live Flipkart site, so results and layout can change and the test may be flaky.

Run tests from a specific folder:

```bash
npx playwright test tests/03_LocatorCommands
```

Run tests matching a title or describe block:

```bash
npx playwright test -g "Login Page Tests"
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Current Playwright Configuration

The project uses [playwright.config.ts](playwright.config.ts) with these key settings:

- Test directory: `./tests`
- Parallel execution: enabled with `fullyParallel: true`
- CI safety: `forbidOnly` is enabled on CI
- CI retries: `2`
- Reporters: `line`, `allure-playwright`, and `./utils/CustomReporter.ts`
- Trace: `on-first-retry`
- Browser project: Chromium with `Desktop Chrome`
- Current config runs with `headless: false`

## Reports and Artifacts

The project can generate several report/artifact types:

- Playwright output artifacts under `test-results/`
- Custom HTML reports under `custom-report/`
- Allure raw results under `allure-results/`
- Allure HTML report under `allure-report/` after generation

For screenshots, videos, and traces on every run, configure these in `playwright.config.ts`:

```ts
use: {
  screenshot: 'on',
  video: 'on',
  trace: 'on',
}
```

For normal debugging, `trace: 'on-first-retry'` is a lighter default.

## Codegen

Playwright Codegen records browser actions and generates test code.

```bash
npx playwright codegen <url>
```

Example:

```bash
npx playwright codegen https://www.sciensus.com/
```

After running the command, a browser window opens. Perform the actions you want to test, and Playwright generates locator-based test code that can be used in a spec file.

## Recommended Learning Flow

1. Start with files under `tests/01_Basics`.
2. Read `Notes/PlaywrightNotes.md` alongside the test examples.
3. Practice annotations from `tests/02_TestAnnotations`.
4. Practice locator strategies from `tests/03_LocatorCommands`.
5. Learn session reuse from `tests/04_SessionStorage`.
6. Review custom and Allure reports from `tests/05_Reporter`.
7. Practice list handling from `tests/06_MultipleElements`.
8. Practice web-table handling, filters, and pagination from `tests/07_WebTable` (files 20–24).
9. Study the locator/data/helper file split in the OrangeHRM (25) and Flipkart (26) examples.
10. Revise the **Interview Questions** section before Playwright interviews.
