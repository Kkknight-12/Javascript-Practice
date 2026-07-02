# Object.prototype.toLocaleString()

## What Problem Does It Solve?

Different countries and languages display values differently.

The same number can be shown in different formats:

```js
const price = 1234567.89;

console.log(price.toLocaleString('en-US')); // 1,234,567.89
console.log(price.toLocaleString('en-IN')); // 12,34,567.89
console.log(price.toLocaleString('de-DE')); // 1.234.567,89
```

Same value. Different display format.

That is the big idea:

```text
toLocaleString() converts a value into a human-readable display string,
usually using a language/country format.
```

A locale is a language-region format:

```js
'en-US'; // English - United States
'en-IN'; // English - India
'hi-IN'; // Hindi - India
'de-DE'; // German - Germany
'ja-JP'; // Japanese - Japan
```

The important beginner detail is this:

- Plain objects use the basic `Object.prototype.toLocaleString()` behavior.
- Numbers, dates, arrays, bigints, and typed arrays usually have their own more
  useful `toLocaleString()` behavior.

## Where The Method Lives

The base method lives on `Object.prototype`:

```js
Object.prototype.toLocaleString;
```

Most of the time, you do not call it from `Object.prototype` directly.

You call it through a value:

```js
someValue.toLocaleString();
```

Normal objects can do that because they inherit methods from
`Object.prototype`.

```js
const user = {
  name: 'Asha',
};

console.log(user.toLocaleString === Object.prototype.toLocaleString); // true
```

`Object` itself is the constructor function. The instance-style method is on
`Object.prototype`, and normal object values reach it through the prototype
chain.

## Quick Definition

For a normal plain object:

```js
object.toLocaleString();
```

roughly means:

```js
object.toString();
```

The base `Object.prototype.toLocaleString()` method simply calls
`this.toString()` and returns that result.

For built-in objects like numbers and dates, the method is more powerful because
those objects override `toLocaleString()`.

## Beginner Mental Model

Think like this:

```text
toString()       -> convert to a string
toLocaleString() -> convert to a display string using locale formatting
```

But the exact behavior depends on the object.

```js
const object = { a: 1 };
console.log(object.toLocaleString()); // [object Object]

const number = 1234567;
console.log(number.toLocaleString('en-IN')); // 12,34,567

const date = new Date('2026-07-02T10:30:00Z');
console.log(date.toLocaleString('en-IN', { timeZone: 'UTC' }));
// exact date/time text can vary by runtime
```

So the real power is not in plain objects. The real power is in objects that
override `toLocaleString()`.

## What Override Means

A normal object gets the basic method from `Object.prototype`:

```text
Object.prototype.toLocaleString() -> basic fallback version
```

Some built-in objects provide their own special versions:

```text
Number.prototype.toLocaleString() -> number formatting
Date.prototype.toLocaleString()   -> date/time formatting
Array.prototype.toLocaleString()  -> formats each element, then joins
BigInt.prototype.toLocaleString() -> big integer formatting
```

So this:

```js
const amount = 50000;

console.log(amount.toLocaleString('en-IN'));
```

does not use `Object.prototype.toLocaleString()`.

It uses:

```js
Number.prototype.toLocaleString();
```

That is why the number can be formatted with Indian grouping.

## Syntax

For the base Object method:

```js
object.toLocaleString();
Object.prototype.toLocaleString.call(object);
```

The base Object version does not use locale/options parameters.

For built-in overrides:

```js
value.toLocaleString(locales, options);
```

Examples:

```js
number.toLocaleString('en-IN');
number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
array.toLocaleString('en-IN');
```

## Parameters

For `Object.prototype.toLocaleString()`:

- No meaningful parameters are used.

For common built-in overrides:

- `locales`: A locale string or list of locale strings, such as `'en-US'`,
  `'en-IN'`, or `'de-DE'`.
- `options`: Formatting options understood by that object's own
  `toLocaleString()` method.

## Return Value

`toLocaleString()` returns a string for normal use.

For the base Object version, that string is the result of calling
`this.toString()`.

## Plain Object Example

```js
const product = {
  name: 'Laptop',
  price: 55000,
};

console.log(product.toLocaleString()); // [object Object]
console.log(product.toString()); // [object Object]
```

What happened:

- `product` does not have its own `toLocaleString()` method.
- JavaScript finds `Object.prototype.toLocaleString()`.
- The base method calls `product.toString()`.
- A plain object's default `toString()` returns `[object Object]`.

For plain objects, `toLocaleString()` is not very useful unless you customize
the object.

## Custom `toLocaleString()` In Your Own Object

You can define your own version:

```js
const product = {
  name: 'Laptop',
  price: 55000,

  toLocaleString(locale = 'en-IN') {
    const formattedPrice = this.price.toLocaleString(locale, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });

    return `${this.name} - ${formattedPrice}`;
  },
};

console.log(product.toLocaleString('en-IN'));
```

What happened:

- `product` has its own `toLocaleString()` method.
- JavaScript uses that method instead of `Object.prototype.toLocaleString()`.
- Inside the custom method, `this.price` is a number.
- The number's own `toLocaleString()` formats the price for the selected locale.

This is a useful pattern when an object knows how it should be displayed.

## Number `toLocaleString()`

Number formatting is one of the most common uses.

```js
const number = 1234567.89;

console.log(number.toLocaleString('en-US')); // 1,234,567.89
console.log(number.toLocaleString('en-IN')); // 12,34,567.89
console.log(number.toLocaleString('de-DE')); // 1.234.567,89
```

What happened:

- `'en-US'` uses US-style grouping.
- `'en-IN'` uses Indian grouping after the first thousand group.
- `'de-DE'` uses period for thousands and comma for decimals.

### Currency Formatting

```js
const price = 55000;

console.log(
  price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
); // $55,000.00
```

For Indian currency:

```js
const price = 55000;

console.log(
  price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })
);
// Indian currency display for 55000
```

The `options` object controls details like currency, fraction digits,
percentages, and compact notation.

### Percentage Formatting

```js
const discount = 0.15;

console.log(
  discount.toLocaleString('en-IN', {
    style: 'percent',
  })
); // 15%
```

Important:

```text
0.15 means 15% when style is "percent".
```

### Compact Notation

```js
const views = 1250000;

console.log(
  views.toLocaleString('en-IN', {
    notation: 'compact',
  })
);
// compact display, exact output can vary
```

This is useful for dashboards, analytics cards, and social media counts.

## Date `toLocaleString()`

Dates are also displayed differently in different locales.

```js
const date = new Date('2026-07-02T10:30:00Z');

console.log(date.toLocaleString('en-US', { timeZone: 'UTC' }));
console.log(date.toLocaleString('en-IN', { timeZone: 'UTC' }));
```

The exact output can vary by browser, Node version, operating system, locale
data, and formatting options.

That is why `toLocaleString()` is great for display, but risky for strict string
comparison in tests.

### Custom Date Formatting

```js
const date = new Date('2026-07-02T10:30:00Z');

console.log(
  date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
);
```

Common date options include:

```js
{
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Asia/Kolkata',
}
```

## Array `toLocaleString()`

Arrays also have their own version.

```js
const values = [1000, 2000, 3000];

console.log(values.toLocaleString('en-IN'));
// 1,000,2,000,3,000
```

`Array.prototype.toLocaleString()` works roughly like this:

```text
call toLocaleString() on each element
join the results
```

Example with numbers:

```js
const prices = [500, 1200, 99999];

console.log(
  prices.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })
);
```

What happened:

- The array passes `locales` and `options` to each element.
- Each number formats itself with `Number.prototype.toLocaleString()`.
- The array joins the formatted results.

The separator between array items is not controlled by the number-formatting
options. If you need a proper human-readable localized list, use
`Intl.ListFormat`.

## `null`, `undefined`, And Sparse Arrays

Array `toLocaleString()` treats `null`, `undefined`, and empty slots as empty
strings.

```js
const values = [1, null, undefined, 4];

console.log(values.toLocaleString()); // 1,,,4
```

Sparse array example:

```js
console.log([1, , 3].toLocaleString()); // 1,,3
```

This behavior belongs to `Array.prototype.toLocaleString()`, not to the base
Object method.

## How JavaScript Finds The Method

When you write:

```js
const user = {
  name: 'Asha',
};

user.toLocaleString();
```

JavaScript looks for the method like this:

```text
1. Does user have its own toLocaleString property?
2. If not, look at user's prototype.
3. Continue up the prototype chain.
4. For normal objects, find Object.prototype.toLocaleString.
```

Example:

```js
const user = {
  name: 'Asha',
};

console.log(Object.hasOwn(user, 'toLocaleString')); // false
console.log(user.toLocaleString === Object.prototype.toLocaleString); // true
```

Now compare an object with its own method:

```js
const user = {
  name: 'Asha',

  toLocaleString() {
    return `User: ${this.name}`;
  },
};

console.log(Object.hasOwn(user, 'toLocaleString')); // true
console.log(user.toLocaleString()); // User: Asha
```

## Borrowed Call Pattern

Because the base method uses `this`, you can call it with a specific object:

```js
const user = {
  name: 'Asha',
};

console.log(Object.prototype.toLocaleString.call(user)); // [object Object]
```

Read it like this:

```text
Run Object.prototype.toLocaleString,
but use user as this.
```

This helps explain how prototype methods work.

## Null-Prototype Objects

Not every object inherits from `Object.prototype`.

```js
const dictionary = Object.create(null);

console.log(dictionary.toLocaleString); // undefined
```

Why?

```text
dictionary -> null
```

There is no `Object.prototype` in the chain, so `dictionary` does not inherit
`toLocaleString()`.

You can borrow the base method, but the object still needs a callable
`toString()` because the base method calls `this.toString()`.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';
dictionary.toString = function toString() {
  return `dictionary topic: ${this.topic}`;
};

console.log(
  Object.prototype.toLocaleString.call(dictionary)
); // dictionary topic: objects
```

If a null-prototype object does not have a callable `toString()`, borrowing the
base method throws a `TypeError`.

## Difference Between `toString()` And `toLocaleString()`

### Plain Objects

```js
const object = { name: 'Asha' };

console.log(object.toString()); // [object Object]
console.log(object.toLocaleString()); // [object Object]
```

For plain objects, there is usually no real difference.

### Numbers

```js
const number = 1234567.89;

console.log(number.toString()); // 1234567.89
console.log(number.toLocaleString('en-IN')); // 12,34,567.89
```

For numbers, there is a big display difference.

### Dates

```js
const date = new Date('2026-07-02T10:30:00Z');

console.log(date.toString());
console.log(date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
```

For dates, `toLocaleString()` is useful for user-facing date/time display.

## Repeated Formatting

This is fine for one or two values:

```js
const price = 55000;

price.toLocaleString('en-IN', {
  style: 'currency',
  currency: 'INR',
});
```

When you format many numbers with the same locale/options, prefer reusing
`Intl.NumberFormat`:

```js
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const prices = [500, 1200, 99999, 450000];
const formattedPrices = prices.map((price) => formatter.format(price));

console.log(formattedPrices);
```

This avoids rebuilding the same formatter setup again and again.

## Practical Use Cases

Use `toLocaleString()` for display values:

```js
const price = 49999;

const formattedPrice = price.toLocaleString('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
```

```js
const users = 1250000;

const displayCount = users.toLocaleString('en-IN', {
  notation: 'compact',
});
```

```js
const orderDate = new Date('2026-07-02T10:30:00Z');

const displayDate = orderDate.toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});
```

## Important Notes

- `Object.prototype.toLocaleString()` is the base method.
- For plain objects, the base method calls `this.toString()`.
- Plain objects usually return `[object Object]`.
- Numbers, dates, arrays, bigints, and typed arrays override
  `toLocaleString()`.
- Locale strings like `'en-US'`, `'en-IN'`, and `'de-DE'` control display
  format.
- The `options` object controls details such as currency, percent, date parts,
  time zone, and compact notation.
- `toLocaleString()` output can vary by runtime and locale data.
- Use `toLocaleString()` for display, not for important logic comparison.
- Use `Intl.NumberFormat` when formatting many numbers with the same settings.

## Common Mistakes

### Mistake 1: Expecting A Plain Object To Show Its Data

```js
const user = {
  name: 'Asha',
};

console.log(user.toLocaleString()); // [object Object]
```

For plain objects, use `JSON.stringify(user)` or define your own
`toLocaleString()` method when you want a meaningful display string.

### Mistake 2: Using The Output For Strict Logic

```js
const value = 123456.789;

if (value.toLocaleString('en-IN') === '1,23,456.789') {
  // risky
}
```

Formatting output can vary. Use `toLocaleString()` for display, not for logic
that depends on one exact string.

### Mistake 3: Thinking Array Options Control The Separator

```js
const numbers = [1000, 2000];

console.log(
  numbers.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  })
);
```

The options are passed to each number. They do not give you full control over
the separator between array items.

Use `Intl.ListFormat` when you need a proper localized list sentence.

## Final Mental Model

```text
Object.prototype.toLocaleString()
  -> basic fallback
  -> calls this.toString()
  -> plain object usually gives [object Object]

Number.prototype.toLocaleString()
  -> formats numbers by locale
  -> useful for grouping, currency, percent, compact numbers

Date.prototype.toLocaleString()
  -> formats date/time by locale
  -> useful for user-facing dates and time zones

Array.prototype.toLocaleString()
  -> calls toLocaleString() on each element
  -> joins the results

Custom object toLocaleString()
  -> you define how your object should display itself
```

Beginner-friendly definition:

```text
toLocaleString() converts a value into a display-friendly string,
usually according to a selected language/country format.
```

For plain objects, it is basic. For numbers, dates, arrays, and custom objects,
it becomes useful.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/instance/toLocaleString/toLocaleString.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)
- MDN:
  [`Number.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
- MDN:
  [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
- MDN:
  [`Array.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
- ECMAScript spec:
  [`Object.prototype.toLocaleString`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.tolocalestring)
