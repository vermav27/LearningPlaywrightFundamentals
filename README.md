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
│   └── 03_LocatorCommands/
├── playwright.config.ts
├── package.json
└── README.md
```

## Latest Additions

- Added [Notes/PlaywrightNotes.md](Notes/PlaywrightNotes.md), a detailed interview preparation document.
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
- Reporter: HTML report
- Trace: `on-first-retry`
- Browser project: Chromium with `Desktop Chrome`
- Current config runs with `headless: false`

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
5. Revise the **Interview Questions** section before Playwright interviews.
