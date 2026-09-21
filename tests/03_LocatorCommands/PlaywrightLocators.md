# Playwright Locators

This guide uses TypeScript examples with `@playwright/test`.

```ts
import { test, expect } from '@playwright/test';

test('locator example', async ({ page }) => {
  await page.goto('https://example.com');
  await page.getByRole('button', { name: 'Submit' }).click();
});
```

## What Is A Locator?

A locator is Playwright's way to find one or more elements on the page.

```ts
const submitButton = page.getByRole('button', { name: 'Submit' });
await submitButton.click();
```

Important ideas:

- Locators auto-wait before actions like `click`, `fill`, `check`, and assertions.
- Locators are re-checked every time you use them, so they work well with pages that re-render.
- Actions like `click()` expect the locator to match exactly one element. If it matches many, Playwright throws a strictness error.

## Best Locator Priority

Use locators in this order most of the time:

| Priority | Locator | Best For |
| --- | --- | --- |
| 1 | `getByRole()` | Buttons, links, headings, checkboxes, textboxes, tabs, dialogs |
| 2 | `getByLabel()` | Form fields with labels |
| 3 | `getByPlaceholder()` | Inputs that only have placeholder text |
| 4 | `getByText()` | Non-interactive visible text like messages, labels, cards |
| 5 | `getByAltText()` | Images and areas with `alt` text |
| 6 | `getByTitle()` | Elements with a `title` attribute |
| 7 | `getByTestId()` | Stable test hooks like `data-testid` |
| 8 | `locator()` | CSS, XPath, or advanced selectors when the above are not enough |

## Quick Cheat Sheet

| Method | Simple Example |
| --- | --- |
| `page.getByRole()` | `page.getByRole('button', { name: 'Login' })` |
| `page.getByLabel()` | `page.getByLabel('Email')` |
| `page.getByPlaceholder()` | `page.getByPlaceholder('name@example.com')` |
| `page.getByText()` | `page.getByText('Welcome')` |
| `page.getByAltText()` | `page.getByAltText('Company logo')` |
| `page.getByTitle()` | `page.getByTitle('Close')` |
| `page.getByTestId()` | `page.getByTestId('login-button')` |
| `page.locator()` | `page.locator('#username')` |
| `page.frameLocator()` | `page.frameLocator('#payment-frame')` |

The same `getBy...` methods can also be used after another locator:

```ts
const dialog = page.getByRole('dialog', { name: 'Settings' });
await dialog.getByRole('button', { name: 'Save' }).click();
```

## `getByRole()`

Use this for elements the user understands by purpose: button, link, textbox, checkbox, heading, tab, dialog, row, list item, and many more.

```ts
await page.getByRole('button', { name: 'Sign in' }).click();
await page.getByRole('link', { name: 'Contact us' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('v@example.com');
await page.getByRole('checkbox', { name: 'Subscribe' }).check();
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
```

Common role examples:

| UI Element | Locator |
| --- | --- |
| `<button>Save</button>` | `page.getByRole('button', { name: 'Save' })` |
| `<a>Home</a>` | `page.getByRole('link', { name: 'Home' })` |
| `<input aria-label="Email">` | `page.getByRole('textbox', { name: 'Email' })` |
| `<input type="checkbox"> Remember me` | `page.getByRole('checkbox', { name: 'Remember me' })` |
| `<h1>Reports</h1>` | `page.getByRole('heading', { name: 'Reports' })` |

Useful `getByRole()` options:

```ts
page.getByRole('button', { name: 'Submit' });
page.getByRole('button', { name: /submit/i });
page.getByRole('heading', { name: 'Login', level: 1 });
page.getByRole('checkbox', { name: 'Accept', checked: false });
page.getByRole('button', { name: 'Menu', expanded: true });
page.getByRole('tab', { name: 'Details', selected: true });
page.getByRole('button', { name: 'Delete', disabled: true });
page.getByRole('button', { name: 'Save', exact: true });
page.getByRole('button', { name: 'Save', includeHidden: true });
page.getByRole('button', { name: 'Save', description: 'Saves the form' });
```

Tip: For buttons, links, inputs, and other interactive elements, try `getByRole()` first.

## `getByLabel()`

Use this for form controls connected to a label, `aria-label`, or `aria-labelledby`.

```html
<label>Email <input type="email"></label>
```

```ts
await page.getByLabel('Email').fill('test@example.com');
```

More examples:

```ts
await page.getByLabel('Username').fill('john');
await page.getByLabel('Password').fill('secret');
await page.getByLabel(/email/i).fill('test@example.com');
await page.getByLabel('Email', { exact: true }).fill('test@example.com');
```

Best use: textboxes, password fields, textareas, selects, checkboxes, radio buttons, and file inputs that have labels.

## `getByPlaceholder()`

Use this for inputs that have placeholder text.

```html
<input type="email" placeholder="name@example.com">
```

```ts
await page.getByPlaceholder('name@example.com').fill('test@example.com');
await page.getByPlaceholder(/email/i).fill('test@example.com');
await page.getByPlaceholder('Search', { exact: true }).fill('playwright');
```

Best use: search boxes or simple inputs where there is no better label.

Tip: Prefer `getByLabel()` if the input has a real label.

## `getByText()`

Use this for visible text on the page.

```html
<div>Welcome, John</div>
```

```ts
await expect(page.getByText('Welcome, John')).toBeVisible();
await expect(page.getByText('Welcome', { exact: true })).toBeVisible();
await expect(page.getByText(/welcome, john/i)).toBeVisible();
```

Text matching normalizes whitespace. Multiple spaces, line breaks, and leading or trailing spaces are treated like normal readable text.

Best use:

- Toast messages
- Error messages
- Card titles
- Paragraph text
- List item text

For interactive elements, prefer `getByRole()`:

```ts
// Better
await page.getByRole('button', { name: 'Submit' }).click();

// Works, but less descriptive for a button
await page.getByText('Submit').click();
```

## `getByAltText()`

Use this for images or areas with `alt` text.

```html
<img alt="Playwright logo" src="/logo.svg">
```

```ts
await page.getByAltText('Playwright logo').click();
await expect(page.getByAltText(/logo/i)).toBeVisible();
await page.getByAltText('Playwright logo', { exact: true }).click();
```

Best use: images that users or assistive technology identify by alternative text.

## `getByTitle()`

Use this for elements with a `title` attribute.

```html
<button title="Close">x</button>
```

```ts
await page.getByTitle('Close').click();
await expect(page.getByTitle('Issues count')).toHaveText('25 issues');
await page.getByTitle(/close/i).click();
await page.getByTitle('Close', { exact: true }).click();
```

Best use: icon buttons or elements that expose helpful `title` text.

## `getByTestId()`

Use this when the application has stable test attributes.

```html
<button data-testid="login-button">Sign in</button>
```

```ts
await page.getByTestId('login-button').click();
await page.getByTestId(/login/).click();
```

By default Playwright uses `data-testid`.

You can configure a different test id attribute in `playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-pw',
  },
});
```

Then this works:

```html
<button data-pw="login-button">Sign in</button>
```

```ts
await page.getByTestId('login-button').click();
```

Best use: stable automation hooks agreed between developers and testers.

## `locator()`

Use `locator()` when the recommended `getBy...` locators are not enough.

### CSS Locators

```ts
await page.locator('button').click();
await page.locator('css=button').click();
await page.locator('#username').fill('john');
await page.locator('.submit-button').click();
await page.locator('[name="email"]').fill('test@example.com');
await page.locator('[data-test="submit"]').click();
```

CSS is powerful, but it can break if class names or DOM structure change. Prefer role, label, text, or test id locators when possible.

### XPath Locators

```ts
await page.locator('xpath=//button').click();
await page.locator('//button[text()="Submit"]').click();
await page.locator('//button | //a').first().click();
```

XPath is supported, but usually less readable and more fragile. Use it only when a cleaner locator is not possible.

Any selector that starts with `//` or `..` is treated as XPath.

### Legacy Text Selector

Playwright supports old text selector syntax:

```ts
await page.locator('text=Log in').click();
await page.locator('text="Log in"').click();
await page.locator('text=/log\\s*in/i').click();
```

Prefer the modern locators:

```ts
await page.getByRole('button', { name: 'Log in' }).click();
await page.getByText('Log in').click();
```

### ID And Data Attribute Selector Engines

Playwright also supports these selector engines:

```ts
await page.locator('id=username').fill('john');
await page.locator('data-testid=submit').click();
await page.locator('data-test-id=submit').click();
await page.locator('data-test=submit').click();
```

Prefer:

```ts
await page.getByTestId('submit').click();
await page.locator('#username').fill('john');
```

### Useful Playwright CSS Extensions

Playwright adds extra CSS features:

```ts
await page.locator('button:visible').click();
await page.locator('article:has-text("Playwright")').click();
await page.locator('#nav-bar :text("Home")').click();
await page.locator('#nav-bar :text-is("Home")').click();
await page.locator('#nav-bar :text-matches("log\\\\s*in", "i")').click();
await page.locator('article:has(div.promo)').click();
await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click();
await page.locator(':nth-match(:text("Buy"), 3)').click();
```

Prefer `locator.visible()` over `button:visible` when you already have a locator:

```ts
await page.locator('button').visible().click();
```

Layout CSS pseudo-classes also exist, but are deprecated and can be fragile:

```ts
await page.locator('input:right-of(:text("Username"))').fill('john');
await page.locator('button:near(.promo-card)').click();
```

Avoid layout selectors unless there is no stable alternative.

### N-th Element Selector

Playwright also has an `nth=` selector engine.

```ts
await page.locator('button').locator('nth=0').click();  // first button
await page.locator('button').locator('nth=-1').click(); // last button
```

Prefer the clearer locator methods:

```ts
await page.locator('button').first().click();
await page.locator('button').last().click();
await page.locator('button').nth(2).click();
```

Note: `locator.nth(2)` is zero-based and means the third match. CSS `:nth-match(..., 3)` is one-based and means the third match.

### Parent Element Locator

If you need a parent element, prefer filtering the parent by a child locator:

```ts
const child = page.getByText('Hello');
const parent = page.getByRole('listitem').filter({ has: child });
await parent.click();
```

If there is no good parent locator, XPath parent lookup also works:

```ts
const parent = page.getByText('Hello').locator('xpath=..');
await parent.click();
```

Prefer `filter({ has })` because `xpath=..` depends on the DOM structure.

### Label To Form Control Retargeting

Some actions on a label are automatically retargeted to the associated form control.

```html
<label for="password">Password</label>
<input id="password" type="password">
```

```ts
await page.getByText('Password').fill('secret');
```

This works, but the clearer locator is:

```ts
await page.getByLabel('Password').fill('secret');
```

### Chained Selector Syntax

Older selector syntax can chain selector engines with `>>`.

```ts
await page.locator('css=article >> css=.content >> text=Read more').click();
```

Prefer modern locator chaining:

```ts
await page
  .locator('article')
  .locator('.content')
  .getByText('Read more')
  .click();
```

You can capture an intermediate selector by prefixing it with `*`, but prefer `filter({ has })`:

```ts
await page.locator('*css=article >> text=Hello').click();

await page.locator('article', { has: page.getByText('Hello') }).click();
```

### Shadow DOM Note

Most Playwright locators pierce open Shadow DOM automatically.

```ts
await page.getByText('Inside shadow root').click();
await page.locator('custom-element button').click();
```

Exceptions:

- XPath does not pierce shadow roots.
- Closed Shadow DOM is not supported by locators.

## `locator(selector, options)`

`locator()` can also narrow matches with options.

```ts
await page
  .locator('article', { hasText: 'Playwright' })
  .getByRole('button', { name: 'Read more' })
  .click();
```

Available options:

```ts
page.locator('article', { hasText: 'Product 2' });
page.locator('article', { hasNotText: 'Out of stock' });
page.locator('article', { has: page.getByRole('heading', { name: 'Product 2' }) });
page.locator('article', { hasNot: page.getByText('Deprecated') });
```

The inner locator in `has` and `hasNot` is searched inside the outer locator.

## `filter()`

Use `filter()` after you already have a group of possible matches.

```ts
const product = page
  .getByRole('listitem')
  .filter({ hasText: 'Product 2' });

await product.getByRole('button', { name: 'Add to cart' }).click();
```

All filter options:

```ts
page.getByRole('listitem').filter({ hasText: 'Product 2' });
page.getByRole('listitem').filter({ hasNotText: 'Out of stock' });
page.getByRole('listitem').filter({
  has: page.getByRole('heading', { name: 'Product 2' }),
});
page.getByRole('listitem').filter({
  hasNot: page.getByText('Discontinued'),
});
page.getByRole('button').filter({ visible: true });
page.getByRole('button').filter({ visible: false });
```

Prefer `visible()` when you only need visible elements:

```ts
await page.getByRole('button').visible().click();
```

## Chaining Locators

Chaining means you first find a larger area, then find something inside it.

```ts
const row = page.getByRole('row', { name: /Vineet/ });
await row.getByRole('button', { name: 'Edit' }).click();
```

Another example:

```ts
const settingsDialog = page.getByRole('dialog', { name: 'Settings' });

await settingsDialog.getByLabel('Display name').fill('Vineet');
await settingsDialog.getByRole('button', { name: 'Save' }).click();
```

You can chain any of these:

```ts
locator.getByRole('button', { name: 'Save' });
locator.getByLabel('Email');
locator.getByPlaceholder('Search');
locator.getByText('Welcome');
locator.getByAltText('Logo');
locator.getByTitle('Close');
locator.getByTestId('save-button');
locator.locator('.child');
```

## Combining Locators

### `and()`

Use `and()` when the same element must match two locator rules.

```ts
const subscribeButton = page
  .getByRole('button')
  .and(page.getByTitle('Subscribe'));

await subscribeButton.click();
```

### `or()`

Use `or()` when either locator is acceptable.

```ts
const newEmail = page.getByRole('button', { name: 'New email' });
const securityDialog = page.getByText('Confirm security settings');

await expect(newEmail.or(securityDialog).first()).toBeVisible();

if (await securityDialog.isVisible()) {
  await page.getByRole('button', { name: 'Dismiss' }).click();
}

await newEmail.click();
```

Use `.first()` with `or()` if both locators could appear at the same time.

## Picking One Match

Use these when a locator matches multiple elements.

```ts
await page.getByRole('listitem').first().click();
await page.getByRole('listitem').last().click();
await page.getByRole('listitem').nth(2).click(); // zero-based index
```

Warning: Use `first()`, `last()`, and `nth()` only when order is stable. A better unique locator is usually safer.

## Visible And Invisible Elements

Use `visible()` to keep only visible matches.

```ts
await page.locator('button').visible().click();
```

Use `filter({ visible: false })` for invisible matches.

```ts
await expect(page.locator('.spinner').filter({ visible: false })).toHaveCount(1);
```

## Iframe Locators

Use `frameLocator()` to work inside an iframe.

```html
<iframe id="payment-frame"></iframe>
```

```ts
const paymentFrame = page.frameLocator('#payment-frame');

await paymentFrame.getByLabel('Card number').fill('4111111111111111');
await paymentFrame.getByRole('button', { name: 'Pay' }).click();
```

You can also start from an iframe locator and enter its frame:

```ts
const frame = page.locator('iframe[name="embedded"]').contentFrame();
await frame.getByRole('button', { name: 'Submit' }).click();
```

Use `owner()` when you need the iframe element itself:

```ts
const frame = page.locator('iframe[name="embedded"]').contentFrame();
await expect(frame.owner()).toBeVisible();
```

Frame locators support the same locator methods:

```ts
frameLocator.getByRole('button', { name: 'Save' });
frameLocator.getByLabel('Email');
frameLocator.getByPlaceholder('Search');
frameLocator.getByText('Welcome');
frameLocator.getByAltText('Logo');
frameLocator.getByTitle('Close');
frameLocator.getByTestId('save-button');
frameLocator.locator('.child');
frameLocator.frameLocator('#nested-frame');
```

`frameLocator.first()`, `frameLocator.last()`, and `frameLocator.nth()` exist, but in newer Playwright versions they are deprecated. Prefer:

```ts
const firstFrame = page.locator('iframe.result').first().contentFrame();
await firstFrame.getByRole('button').click();
```

## Helper Methods That Return Locators

These are not usually your first locator choice, but they return or modify locators.

```ts
const button = page.getByRole('button', { name: 'Save' }).describe('Save profile button');
const description = button.description();
```

`describe()` gives the locator a readable description in reports and traces.

```ts
const normalized = await page.locator('button.submit').normalize();
await normalized.click();
```

`normalize()` returns a best-practice locator when Playwright can convert a lower-level selector into a better locator.

## Strictness Examples

This fails if there are multiple buttons:

```ts
await page.locator('button').click();
```

Better:

```ts
await page.getByRole('button', { name: 'Submit' }).click();
```

For lists, assert the count or narrow the item:

```ts
await expect(page.getByRole('listitem')).toHaveCount(3);

await page
  .getByRole('listitem')
  .filter({ hasText: 'Orange' })
  .click();
```

## Common Actions After Locating

Once you have a locator, you can act on it.

```ts
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email').fill('test@example.com');
await page.getByRole('checkbox', { name: 'Accept' }).check();
await page.getByRole('radio', { name: 'Yes' }).check();
await page.getByLabel('Country').selectOption('IN');
await page.getByRole('textbox', { name: 'Search' }).press('Enter');
await page.getByRole('link', { name: 'Docs' }).hover();
```

Use assertions with locators:

```ts
await expect(page.getByText('Saved successfully')).toBeVisible();
await expect(page.getByLabel('Email')).toHaveValue('test@example.com');
await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
await expect(page.getByRole('listitem')).toHaveCount(3);
```

## Easy Decision Guide

| Situation | Use |
| --- | --- |
| Button/link/input with visible name | `getByRole()` |
| Form field has a label | `getByLabel()` |
| Input only has placeholder text | `getByPlaceholder()` |
| Plain text, message, or card text | `getByText()` |
| Image with alt text | `getByAltText()` |
| Element has title tooltip | `getByTitle()` |
| App provides stable test id | `getByTestId()` |
| Need class, id, attribute, CSS, or XPath | `locator()` |
| Need element inside iframe | `frameLocator()` or `contentFrame()` |
| Many similar elements | `filter()`, `has`, `hasText`, `getByRole(..., { name })` |
| Need either of two possible elements | `or()` |
| Need element matching two rules | `and()` |
| Need first, last, or specific item | `first()`, `last()`, `nth()` |

## Common Mistakes

| Mistake | Better |
| --- | --- |
| `page.locator('button').click()` | `page.getByRole('button', { name: 'Submit' }).click()` |
| Long XPath | `getByRole()`, `getByLabel()`, or `getByTestId()` |
| CSS class from styling | Stable role, label, text, or test id |
| `getByText()` for buttons | `getByRole('button', { name: '...' })` |
| Too many `.nth()` locators | Create a unique locator with role/name/filter |
| Missing `await` | Always `await` actions and assertions |

## No `getById()` Or `getByClass()`

Playwright does not have `getById()` or `getByClass()`.

Use CSS inside `locator()`:

```ts
await page.locator('#login').click();
await page.locator('.primary-button').click();
```

But when possible, prefer:

```ts
await page.getByRole('button', { name: 'Login' }).click();
await page.getByTestId('login-button').click();
```

## Mini Practice Example

```ts
test('login form', async ({ page }) => {
  await page.goto('https://example.com/login');

  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('secret');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Welcome')).toBeVisible();
});
```

## Sources

- Playwright locator guide: https://playwright.dev/docs/locators
- Playwright other locators guide: https://playwright.dev/docs/other-locators
- Local project version checked: `@playwright/test@1.63.0`
