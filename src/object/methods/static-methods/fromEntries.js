/*
 * The Object.fromEntries() static method transforms a
 * list of key-value pairs into an object.
 *
 * [] -> {}
 *
 * Object.fromEntries(iterable)
 *
 * iterable -> An iterable such as Array or Map
 *             containing a list of objects. Each object
 *             should have two properties:
 *             - 0 key (string or symbol)
 *             - 1 value
 * synbol
 * string
 * [key,  value]
 */

// convert map to object
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);

console.log(Object.fromEntries(entries));
// Expected output: Object { foo: "bar", baz: 42 }

// convert array to object
console.log(
  Object.fromEntries([
    ['a', 'b'],
    ['c', 'd'],
  ])
);
// { a: 'b', c: 'd' }

//
// TypeError: Iterator value a is not an entry object
// console.log(Object.fromEntries(['a', 'b', 'c', 'd']));
/*
 * "entry" is an array where the first element is the
 * key and the second element is the value.
 */

// ------------------------------

// Object transformations

const object1 = { a: 1, b: 2, c: 3 };

const object2 = Object.fromEntries(
  Object.entries(object1).map(([key, val]) => [key, val * 2]),
);

console.log(object2);
// { a: 2, b: 4, c: 6 }