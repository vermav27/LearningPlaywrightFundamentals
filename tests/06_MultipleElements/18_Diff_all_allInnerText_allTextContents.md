# Difference: `all()` vs `allInnerTexts()` vs `allTextContents()`

All three work on a locator that matches **multiple elements**, but they return different things.

## Quick comparison

| Feature | `all()` | `allInnerTexts()` | `allTextContents()` |
|---|---|---|---|
| Returns | `Promise<Locator[]>` | `Promise<string[]>` | `Promise<string[]>` |
| What you get | One locator per matched element | Visible (rendered) text of each element | Raw text of each element from the DOM |
| DOM property used | — | `element.innerText` | `element.textContent` |
| Hidden text (`display:none`) | — | ❌ Excluded | ✅ Included |
| Text in `<script>` / `<style>` | — | ❌ Excluded | ✅ Included |
| Whitespace | — | Normalized like on screen (respects CSS, `<br>` → newline) | Kept exactly as in the HTML source |
| Waits for elements? | ❌ No | ❌ No | ❌ No |
| Can you act on the result? | ✅ Yes (`click()`, `getAttribute()`, `fill()`…) | ❌ No, just strings | ❌ No, just strings |
| Speed | Fast | Slower (browser must compute layout/CSS) | Fast (no layout needed) |

## 1. `all()`

Returns an **array of locators**, one for each matched element. Use it when you need to **interact** with each element or read something other than text (attributes, state, etc.).

```ts
const links: Locator[] = await page.locator("//div[@class='list-group']/a").all();

for (const link of links) {
    console.log(await link.getAttribute('href'));
    // await link.click();  // you can also act on it
}
```

## 2. `allInnerTexts()`

Returns an **array of strings** – the text **as a user sees it** on the page.

```ts
const names: string[] = await page.locator("//div[@class='list-group']/a").allInnerTexts();
console.log(names); // [ 'Login', 'Register', 'Wish List', ... ]
```

## 3. `allTextContents()`

Returns an **array of strings** – the **raw text** of each node, including hidden text and original whitespace.

```ts
const names: string[] = await page.locator("//div[@class='list-group']/a").allTextContents();
console.log(names); // [ '\n   Login  ', 'Register', ... ]  (whitespace as in the source)
```

## Example showing the difference

```html
<ul>
  <li>Apple <span style="display:none">(out of stock)</span></li>
  <li>   Banana   </li>
</ul>
```

```ts
const items = page.locator('li');

await items.all();              // [Locator, Locator]
await items.allInnerTexts();    // [ 'Apple', 'Banana' ]
await items.allTextContents();  // [ 'Apple (out of stock)', '   Banana   ' ]
```

## ⚠️ Important: none of them auto-wait

If the elements aren't on the page yet, these methods return an **empty array** instead of waiting. Wait first when the list loads dynamically:

```ts
const items = page.locator('li');
await items.first().waitFor();            // wait for at least one element
const texts = await items.allInnerTexts();

// or use a web-first assertion (auto-retries):
await expect(items).toHaveCount(5);
await expect(items).toHaveText(['Apple', 'Banana', /* ... */]);
```

## When to use which

- **`all()`** → you need to click, fill, or read attributes of each element.
- **`allInnerTexts()`** → you want the text exactly as the user sees it (most common for UI validation).
- **`allTextContents()`** → you want all text in the DOM, including hidden text, or need faster reads.
