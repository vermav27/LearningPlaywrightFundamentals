# Playwright Assertions Cheat Sheet

This cheat sheet covers the built-in assertions available in `@playwright/test` 1.63.0. The grouping is based on typical UI automation usage; exact usage frequency can vary by project.

```ts
import { test, expect } from '@playwright/test';
```

> Locator and page assertions automatically retry until they pass or reach the assertion timeout. Always use `await` with them.

## Mostly Used

### Locator Assertions

| Assertion | What it checks | Example |
| --- | --- | --- |
| `toBeVisible()` | Element is visible | `await expect(page.getByRole('heading')).toBeVisible();` |
| `toBeHidden()` | Element is hidden or absent | `await expect(page.getByText('Loading...')).toBeHidden();` |
| `toBeEnabled()` | Control is enabled | `await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();` |
| `toBeDisabled()` | Control is disabled | `await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();` |
| `toBeChecked()` | Checkbox or radio is checked | `await expect(page.getByLabel('Remember me')).toBeChecked();` |
| `toBeEditable()` | Input is editable | `await expect(page.getByLabel('Email')).toBeEditable();` |
| `toHaveText()` | Element has exact text or matching text | `await expect(page.locator('.status')).toHaveText('Completed');` |
| `toContainText()` | Element contains text | `await expect(page.locator('.message')).toContainText('Welcome');` |
| `toHaveValue()` | Input has a value | `await expect(page.getByLabel('Email')).toHaveValue('user@example.com');` |
| `toHaveValues()` | Multi-select has selected values | `await expect(page.locator('select[multiple]')).toHaveValues(['red', 'blue']);` |
| `toHaveCount()` | Locator resolves to a specific number of elements | `await expect(page.locator('.product')).toHaveCount(10);` |
| `toHaveAttribute()` | Element has an attribute, optionally with a value | `await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');` |
| `toHaveClass()` | Element has the expected complete class value | `await expect(page.locator('.alert')).toHaveClass(/success/);` |
| `toHaveCSS()` | Element has a computed CSS property | `await expect(page.locator('.alert')).toHaveCSS('display', 'block');` |

### Page Assertions

| Assertion | What it checks | Example |
| --- | --- | --- |
| `toHaveURL()` | Page URL matches a string, regular expression, or predicate | `await expect(page).toHaveURL(/\/dashboard$/);` |
| `toHaveTitle()` | Page title matches text or a regular expression | `await expect(page).toHaveTitle(/Dashboard/);` |

### Generic Value Assertions

Generic assertions check values immediately and do not auto-retry.

| Assertion | What it checks | Example |
| --- | --- | --- |
| `toBe()` | Primitive value or object reference is exactly equal | `expect(statusCode).toBe(200);` |
| `toEqual()` | Objects or arrays are deeply equal | `expect(user).toEqual({ id: 1, name: 'Vineet' });` |
| `toBeTruthy()` | Value is truthy | `expect(isLoggedIn).toBeTruthy();` |
| `toBeFalsy()` | Value is falsy | `expect(hasError).toBeFalsy();` |
| `toBeDefined()` | Value is not `undefined` | `expect(result).toBeDefined();` |
| `toBeUndefined()` | Value is `undefined` | `expect(optionalValue).toBeUndefined();` |
| `toBeNull()` | Value is `null` | `expect(selectedItem).toBeNull();` |
| `toContain()` | String contains text or array contains an item | `expect(['admin', 'editor']).toContain('admin');` |
| `toMatch()` | String matches text or a regular expression | `expect(message).toMatch(/success/i);` |
| `toHaveLength()` | String, array, or array-like value has a length | `expect(items).toHaveLength(3);` |
| `toHaveProperty()` | Object has a property, optionally with a value | `expect(user).toHaveProperty('profile.name', 'Vineet');` |
| `toBeGreaterThan()` | Number is greater than the expected value | `expect(itemCount).toBeGreaterThan(0);` |
| `toBeGreaterThanOrEqual()` | Number is greater than or equal to the expected value | `expect(score).toBeGreaterThanOrEqual(50);` |
| `toBeLessThan()` | Number is less than the expected value | `expect(responseTime).toBeLessThan(1000);` |
| `toBeLessThanOrEqual()` | Number is less than or equal to the expected value | `expect(retryCount).toBeLessThanOrEqual(3);` |

### Common Modifiers

| Statement | What it does | Example |
| --- | --- | --- |
| `.not` | Reverses an assertion | `await expect(page.getByText('Error')).not.toBeVisible();` |
| Custom message | Adds context to a failure | `await expect(page.getByRole('button'), 'Submit button should appear').toBeVisible();` |
| Per-assertion timeout | Changes the retry timeout for one web assertion | `await expect(page.locator('.result')).toBeVisible({ timeout: 15_000 });` |

## Less Used

### Specialized Locator Assertions

| Assertion | What it checks | Example |
| --- | --- | --- |
| `toBeAttached()` | Element is connected to the DOM or a shadow root | `await expect(page.locator('#toast')).toBeAttached();` |
| `toBeEmpty()` | Input has no value or container has no text | `await expect(page.getByLabel('Search')).toBeEmpty();` |
| `toBeFocused()` | Element currently has focus | `await expect(page.getByLabel('Email')).toBeFocused();` |
| `toBeInViewport()` | Element intersects the viewport | `await expect(page.getByText('Footer')).toBeInViewport();` |
| `toContainClass()` | Element contains the specified class names | `await expect(page.locator('.alert')).toContainClass('active visible');` |
| `toHaveId()` | Element has the expected `id` | `await expect(page.getByRole('main')).toHaveId('content');` |
| `toHaveJSProperty()` | DOM element has a JavaScript property value | `await expect(page.locator('input')).toHaveJSProperty('value', 'hello');` |
| `toHaveRole()` | Element has an ARIA role | `await expect(page.locator('#save')).toHaveRole('button');` |
| `toHaveAccessibleName()` | Element has an accessible name | `await expect(page.getByRole('button')).toHaveAccessibleName('Save');` |
| `toHaveAccessibleDescription()` | Element has an accessible description | `await expect(page.getByLabel('Password')).toHaveAccessibleDescription(/8 characters/);` |
| `toHaveAccessibleErrorMessage()` | Element has an accessible error message | `await expect(page.getByLabel('Email')).toHaveAccessibleErrorMessage('Enter a valid email');` |
| `toHaveScreenshot()` on a locator | Element matches its stored screenshot | `await expect(page.locator('.chart')).toHaveScreenshot('chart.png');` |
| `toMatchAriaSnapshot()` on a locator | Element's accessibility tree matches a snapshot | `await expect(page.getByRole('navigation')).toMatchAriaSnapshot();` |

### Specialized Page, API, and Snapshot Assertions

| Assertion | What it checks | Example |
| --- | --- | --- |
| `toHaveScreenshot()` on a page | Page matches its stored screenshot | `await expect(page).toHaveScreenshot('home-page.png');` |
| `toMatchAriaSnapshot()` on a page | Page accessibility tree matches a snapshot | `await expect(page).toMatchAriaSnapshot();` |
| `toBeOK()` | API response status is from 200 through 299 | `const response = await request.get('/api/users'); await expect(response).toBeOK();` |
| `toMatchSnapshot()` | String or buffer matches a stored snapshot | `expect(await page.screenshot()).toMatchSnapshot('home.png');` |

### Specialized Generic Assertions

| Assertion | What it checks | Example |
| --- | --- | --- |
| `toBeCloseTo()` | Floating-point numbers are approximately equal | `expect(0.1 + 0.2).toBeCloseTo(0.3, 5);` |
| `toBeInstanceOf()` | Value was created by a class or constructor | `expect(error).toBeInstanceOf(Error);` |
| `toBeNaN()` | Value is `NaN` | `expect(Number('invalid')).toBeNaN();` |
| `toContainEqual()` | Array contains a deeply equal item | `expect(users).toContainEqual({ id: 1, name: 'Vineet' });` |
| `toMatchObject()` | Object contains the expected property subset | `expect(user).toMatchObject({ name: 'Vineet' });` |
| `toStrictEqual()` | Values are deeply equal, including object types and undefined properties | `expect(result).toStrictEqual({ value: undefined });` |
| `toThrow()` | Function throws an expected error | `expect(() => JSON.parse('{')).toThrow(SyntaxError);` |
| `toThrowError()` | Alias of `toThrow()` | `expect(() => JSON.parse('{')).toThrowError(/JSON/);` |
| `toPass()` | Callback eventually runs without throwing | `await expect(async () => { expect(await getStatus()).toBe('ready'); }).toPass();` |

### Promise, Polling, and Soft Assertions

| Statement | What it does | Example |
| --- | --- | --- |
| `.resolves` | Unwraps a fulfilled promise before matching | `await expect(Promise.resolve('ready')).resolves.toBe('ready');` |
| `.rejects` | Unwraps a rejected promise before matching | `await expect(Promise.reject(new Error('failed'))).rejects.toThrow('failed');` |
| `expect.poll()` | Repeatedly calls a function until its value matches | `await expect.poll(() => getOrderStatus()).toBe('completed');` |
| `expect.soft()` | Records a failure and continues the test | `await expect.soft(page.locator('.status')).toHaveText('Passed');` |
| `expect.configure()` | Creates a configured `expect` function | `const slowExpect = expect.configure({ timeout: 15_000 });` |

```ts
const slowExpect = expect.configure({ timeout: 15_000, soft: true });
await slowExpect(page.locator('.report')).toBeVisible();
```

### Asymmetric Matchers

Use asymmetric matchers inside `toEqual()`, `toStrictEqual()`, or `toMatchObject()` when only part of a value must follow a pattern.

| Matcher | What it matches | Example |
| --- | --- | --- |
| `expect.any()` | Any value created by the specified constructor | `expect(user).toEqual({ id: expect.any(Number), name: expect.any(String) });` |
| `expect.anything()` | Any value except `null` or `undefined` | `expect(user.id).toEqual(expect.anything());` |
| `expect.arrayContaining()` | Array containing all expected items in any order | `expect(roles).toEqual(expect.arrayContaining(['admin', 'editor']));` |
| `expect.arrayOf()` | Array whose items use the specified constructor | `expect(names).toEqual(expect.arrayOf(String));` |
| `expect.closeTo()` | Approximately equal nested number | `expect(result).toEqual({ total: expect.closeTo(0.3, 5) });` |
| `expect.objectContaining()` | Object containing the expected property subset | `expect(user).toEqual(expect.objectContaining({ name: 'Vineet' }));` |
| `expect.stringContaining()` | String containing the expected substring | `expect(message).toEqual(expect.stringContaining('success'));` |
| `expect.stringMatching()` | String matching text or a regular expression | `expect(orderId).toEqual(expect.stringMatching(/^ORD-\d+$/));` |
| `expect.not.*` | Negated asymmetric matcher | `expect(user).toEqual(expect.not.objectContaining({ role: 'guest' }));` |

### Custom Matchers

Use `expect.extend()` when a project needs a reusable assertion that Playwright does not provide.

```ts
const customExpect = expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () => `Expected ${received} to be within ${floor} and ${ceiling}`,
    };
  },
});

customExpect(50).toBeWithinRange(1, 100);
```

### Quick Guidance

- Prefer auto-retrying locator assertions such as `await expect(locator).toBeVisible()` over immediate checks such as `expect(await locator.isVisible()).toBe(true)`.
- Use exact locator assertions when possible because their failure messages include the expected value, actual value, locator, and retry history.
- Use `expect.soft()` only when later checks can still produce useful results.
- Keep visual and ARIA snapshots in source control so unexpected changes are reviewed.
