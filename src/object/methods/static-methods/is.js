/*
 * Object.is(value1, value2)
 * Object.is() static method determines whether two values are the same value.
 *
 * Object.is() is not equivalent to the == operator.
 *
 * Object.is() is also not equivalent to the === operator.
 * The only difference between Object.is() and === is in
 * their treatment of signed zeros and NaN values.
 */
// two values are the same value.

console.log(Object.is('1', 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

const obj = {};
console.log(Object.is(obj, {}));
// Expected output: false

// Case 1: Evaluation result is the same as using ===
Object.is('foo', 'bar'); // false
console.log(Object.is('[] [] ', [], [])); // false
console.log('{}, {} ', Object.is({}, {})); // false

Object.is(25, 25); // true
Object.is('foo', 'foo'); // true
Object.is(null, null); // true
Object.is(undefined, undefined); // true
// Object.is(window, window); // true

const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, bar); // false
console.log('foo.a, bar.a', Object.is(foo.a, bar.a)); // true
Object.is(foo, foo); // true
Object.is(foo, sameFoo); // true

// Case 2: Signed zero
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// Case 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true

console.log('{}, {}', Object.is({ a: 'aa' }, { a: 'aa' })); // false
