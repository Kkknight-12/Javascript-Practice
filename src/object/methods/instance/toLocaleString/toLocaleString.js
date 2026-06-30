/*
 * Object.prototype.toLocaleString()
 *
 * The default Object version calls this.toString().
 * Many built-in objects override it with locale-aware behavior.
 */

const plainObject = {
  topic: 'objects',
};

console.log(
  '1. Plain object locale string:',
  Object.prototype.toLocaleString.call(plainObject)
);
// Expected output: [object Object]

const lesson = {
  toString() {
    return 'Object lesson';
  },
};

console.log('2. Custom toString through toLocaleString:', lesson.toLocaleString());
// Expected output: Object lesson

/*
 * Built-in objects like Date and Number provide their own locale behavior.
 */
const amount = 123456.789;

console.log(
  '3. Number locale example:',
  amount.toLocaleString('en-US', { maximumFractionDigits: 2 })
);
// Expected output: 123,456.79

const date = new Date('2026-06-30T00:00:00Z');

console.log(
  '4. Date locale example:',
  date.toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'medium' })
);
// Expected output: Jun 30, 2026
