# Learning Playwright Fundamentals

This repository contains beginner-friendly Playwright tests written with `@playwright/test`.

## 1. What is Playwright?

Playwright is an end-to-end testing framework for web applications. It lets you automate browsers such as Chromium, Firefox, and WebKit so you can test real user flows like opening pages, clicking buttons, filling forms, and checking page content.

## 2. Why Playwright is mostly used?

Playwright is widely used because it is fast, reliable, and supports modern browser automation features.

- It supports Chromium, Firefox, and WebKit.
- It works with headed and headless browser modes.
- It has auto-waiting, so tests are less flaky.
- It supports screenshots, videos, traces, and HTML reports.
- It can run tests in parallel.
- It provides Codegen to generate test code by recording browser actions.

## 3. Playwright Setup

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

If you are starting a new Playwright project from scratch, you can use:

```bash
npm init playwright@latest
```

## 4. How to run Playwright tests?

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/sciensus.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report after a test run:

```bash
npx playwright show-report
```

## 5. How to use codegen command `playwright codegen <url>`?

Playwright Codegen records your browser actions and generates test code.

Use this command:

```bash
npx playwright codegen <url>
```

Example:

```bash
npx playwright codegen https://www.sciensus.com/
```

After running the command, a browser window opens. Perform the actions you want to test, and Playwright will generate locator-based test code that you can copy into a spec file.
