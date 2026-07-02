/*
 * Object.prototype.toLocaleString()
 *
 * The base Object version returns the result of calling this.toString().
 *
 * It is a generic fallback method. Many built-in objects override it with
 * real locale-aware behavior.
 */

const plainObject = {
  topic: 'objects',
};

console.log('1. Plain object locale string:', plainObject.toLocaleString());
// Expected output: [object Object]

console.log(
  '2. Same result as plainObject.toString():',
  plainObject.toLocaleString() === plainObject.toString()
);
// Expected output: true

/*
 * Object.prototype.toLocaleString() looks up this.toString() and calls it.
 */
const lesson = {
  toString() {
    return 'Object lesson';
  },
};

console.log('3. Custom toString through toLocaleString:', lesson.toLocaleString());
// Expected output: Object lesson

/*
 * The base Object version does not pass locale/options arguments to toString().
 */
const argumentCounter = {
  toString(...args) {
    return `toString arguments received: ${args.length}`;
  },
};

console.log(
  '4. Base Object version ignores locale/options arguments:',
  argumentCounter.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
);
// Expected output: toString arguments received: 0

/*
 * Number, Date, Array, BigInt, and TypedArray provide their own
 * toLocaleString() methods. Those overrides can use locale/options arguments.
 */
const amount = 123456.789;

console.log(
  '5. Number locale override:',
  amount.toLocaleString('en-US', { maximumFractionDigits: 2 })
);
// Expected output: 123,456.79

const date = new Date('2026-06-30T00:00:00Z');

console.log(
  '6. Date locale override:',
  date.toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'medium' })
);
// Expected output: Jun 30, 2026

const prices = [4, 7, 10];

console.log(
  '7. Array locale override:',
  prices.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
);
// Expected output: $4.00,$7.00,$10.00

/*
 * Null-prototype objects do not inherit toLocaleString().
 * You can borrow Object.prototype.toLocaleString(), but the object still needs
 * a callable toString property because the base method calls this.toString().
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';
dictionary.toString = function toString() {
  return `dictionary topic: ${this.topic}`;
};

console.log('8. null-prototype method:', typeof dictionary.toLocaleString);
// Expected output: undefined

console.log(
  '9. borrowed toLocaleString on null-prototype object:',
  Object.prototype.toLocaleString.call(dictionary)
);
// Expected output: dictionary topic: objects

/*
 * Calling the base method on an object whose toString is not callable throws.
 */
const brokenObject = {
  toString: 'not a function',
};

try {
  Object.prototype.toLocaleString.call(brokenObject);
} catch (error) {
  console.log('10. non-callable toString error:', error.name);
  // Expected output: TypeError
}
