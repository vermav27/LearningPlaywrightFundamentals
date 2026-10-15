# Test Hooks in Playwright

Hooks let you run code at specific moments around your tests, so you can set up
suite resources, prepare each test, and clean up afterwards.

## Quick Reference

| Hook | When it runs | Scope | Can be async |
| --- | --- | --- | --- |
| `test.beforeAll` | Once per worker before tests in its scope | File or `describe` block | Yes |
| `test.afterAll` | Once per worker after tests in its scope | File or `describe` block | Yes |
| `test.beforeEach` | Before every test in its scope | File or `describe` block | Yes |
| `test.afterEach` | After every test in its scope | File or `describe` block | Yes |

## The Hooks

### `test.beforeAll`

Runs **once per worker process** before the first test in its scope. Use it for
suite-level setup that does not need a test-scoped fixture, such as seeding data
or opening a shared connection.

```ts
test.beforeAll("Start suite", async () => {
    console.log("Starting the test suite.");
});
```

It can run more than once when a worker is restarted after a failure or when
tests run in parallel. Setup should therefore be safe to repeat.

### `test.afterAll`

Runs **once per worker process** after the last test in its scope. Use it to
tear down what `beforeAll` created, such as closing connections or deleting
seeded data.

```ts
test.afterAll("End suite", async () => {
    console.log("Ending the test suite.");
});
```

### `test.beforeEach`

Runs **before every test** in its scope. Use it to put the app into a known
state, for example navigating to the page under test.

```ts
test.beforeEach(async ({ page }) => {
    await page.goto("https://example.com/login", { waitUntil: "load" });
});
```

### `test.afterEach`

Runs **after every test** in its scope. Use it to reset state, clean up files,
or capture diagnostics.

```ts
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        await testInfo.attach("failure-screenshot", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    }
});
```

### `test.step`

`test.step` is **not a hook**. It is a related reporting helper that groups a
block of actions inside one test so the report shows named, readable steps
instead of a flat list of actions.

```ts
test("Verify the visibility of username", async ({ page }) => {
    await test.step("Locating the username is editable", async () => {
        const userName = page.locator("//input[@name='username']");
        await expect(userName).toBeEditable();
    });
});
```

## Execution Order

For a file with a `describe` block containing two tests, the order is:

```
beforeAll
  beforeEach
    test 1
  afterEach
  beforeEach
    test 2
  afterEach
afterAll
```

`beforeEach` / `afterEach` wrap **each** test; `beforeAll` / `afterAll` wrap the
**whole** group once per worker process.

When more than one hook of the same type applies, Playwright runs them in
registration order. It continues running other applicable hooks even if one
hook fails, so every hook should have one clear responsibility.

## Scope

- Hooks declared **outside** any `describe` apply to every test **in that file**.
- Hooks declared **inside** a `describe` apply only to tests in **that block**.
- Nested `describe` blocks run outer hooks first (outer `beforeEach` -> inner
  `beforeEach`), and teardown runs in reverse (inner `afterEach` -> outer
  `afterEach`).

## Hook Arguments and Names

Every hook can have an optional title. A useful title makes the HTML report and
trace easier to understand. Hooks can also receive fixtures and `testInfo`.

```ts
test.beforeEach("Open the login page", async ({ page }, testInfo) => {
    console.log(`Starting: ${testInfo.title}`);
    await page.goto("https://example.com/login");
});
```

Useful `testInfo` properties and methods include:

- `title` - current test title.
- `retry` - current retry number; the first attempt is `0`.
- `status` and `expectedStatus` - useful in `afterEach` for failure handling.
- `outputPath()` - creates a safe path in the test's output directory.
- `attach()` - adds screenshots, logs, or other evidence to the report.

## Workers, Retries, and Execution Modes

By default, tests in one file run in order. Playwright can restart the worker
after a failure, so `beforeAll` and `afterAll` may run again during retries.
Never depend on them running exactly once for the entire test command.

In parallel mode, do not assume that tests share memory or `beforeAll` state.
Each test must remain independently runnable.

`test.describe.serial` forces tests in a block to run in order and skips the
remaining tests when one fails. On retry, the whole serial group starts again.
Use serial mode only for truly dependent tests; isolated tests are more reliable
and easier to run in parallel.

```ts
test.describe.serial("Login Page", () => {
    // tests here run one after another, in declaration order
});
```

The newer configuration form is also available:

```ts
test.describe("Login Page", () => {
    test.describe.configure({ mode: "serial" });
});
```

## Hook Timeouts

- `beforeEach` setup time is part of the test timeout.
- `afterEach` and test teardown receive a separate timeout of the same length.
- `beforeAll` and `afterAll` each receive their own timeout.
- Use `test.setTimeout()` inside a hook when that hook genuinely needs longer.

```ts
test.beforeAll(async () => {
    test.setTimeout(60_000);
    // Slow suite setup.
});
```

## Hooks or Fixtures?

Use hooks for simple setup local to a file or `describe` block. Use custom
fixtures with `test.extend()` when setup is reused across files, depends on
other fixtures, or needs reliable automatic teardown. Fixtures also make the
scope explicit: test-scoped for isolated state or worker-scoped for shared
state.

## Rules to Remember

- `beforeAll` / `afterAll` **cannot** use test-scoped fixtures such as `page` or
  `context`. Use worker-scoped fixtures such as `browser`, or create and dispose
  a resource manually.
- `beforeEach` / `afterEach` **can** use `page` and other test fixtures.
- Playwright waits for the promise returned by a hook. Declare the hook `async`
  and `await` every asynchronous operation inside it.
- A failed `beforeEach` skips its test but **not** `afterEach`; a failed
  `beforeAll` skips the whole group.
- Keep cleanup idempotent because teardown can run after partial setup or a
  failed test.
- Avoid sharing mutable test data through outer variables; it breaks test
  isolation and becomes unreliable with parallel workers and retries.
