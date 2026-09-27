# Difference: `textContent()` vs `innerText()`

Both return the text of a **single element** as a string. The difference is *which* text: the raw DOM text or the text the user actually sees.

## Quick comparison

| Feature | `textContent()` | `innerText()` |
|---|---|---|
| Returns | `Promise<string \| null>` | `Promise<string>` |
| DOM property used | `element.textContent` | `element.innerText` |
| What you get | Raw text of the node and all its children | Rendered text, as it appears on screen |
| Hidden text (`display:none`, `visibility:hidden`) | ✅ Included | ❌ Excluded |
| Text in `<script>` / `<style>` | ✅ Included | ❌ Excluded |
| Whitespace | Kept exactly as in the HTML source | Collapsed/normalized like the browser renders it |
| `<br>` and block elements | Ignored (no line breaks added) | Become newlines (`\n`) |
| CSS `text-transform` (e.g. `uppercase`) | ❌ Ignored – original text | ✅ Applied – transformed text |
| Speed | Faster (no layout calculation) | Slower (browser computes styles/layout) |
| Auto-waits for element? | ✅ Yes | ✅ Yes |
| Strict mode (must match 1 element) | ✅ Yes – throws if the locator matches more than one | ✅ Yes – throws if the locator matches more than one |

## Example

```html
<div id="msg" style="text-transform: uppercase">
    Hello
    <span style="display:none">Secret</span>
    <br>World
</div>
```

```ts
const msg = page.locator('#msg');

await msg.textContent();  // '\n    Hello\n    Secret\n    World\n'
await msg.innerText();    // 'HELLO\nWORLD'
```

- `textContent()` includes the hidden `Secret`, keeps the extra spaces/newlines, and ignores `uppercase`.
- `innerText()` drops `Secret`, applies `uppercase`, and turns `<br>` into a newline.

## Usage in tests

```ts
const heading = page.locator('h1');

const raw = await heading.textContent();
console.log(raw?.trim());          // trim() because whitespace is kept (and it can be null)

const visible = await heading.innerText();
console.log(visible);
```

> Tip: for assertions prefer `await expect(locator).toHaveText('...')` – it auto-retries and normalizes whitespace. (`toHaveText` checks `textContent` by default; pass `{ useInnerText: true }` to compare against `innerText`.)

## Relation to the multi-element methods

| Single element | Multiple elements |
|---|---|
| `textContent()` | `allTextContents()` |
| `innerText()` | `allInnerTexts()` |

## When to use which

- **`innerText()`** → you want to validate what the user actually sees (most UI checks).
- **`textContent()`** → you need the raw DOM text, including hidden content, or a faster read.
