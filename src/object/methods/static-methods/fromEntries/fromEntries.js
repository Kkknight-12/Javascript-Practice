/*
 * Object.fromEntries(iterable)
 *
 * Creates a new object from an iterable of key-value entries.
 *
 * Each entry is usually a two-item array:
 * [key, value]
 *
 * The key becomes the property name.
 * The value becomes the property value.
 */

const entries = [
  ['name', 'Asha'],
  ['role', 'developer'],
];

const profile = Object.fromEntries(entries);

console.log('1. Basic object:', profile);
// Expected output: { name: 'Asha', role: 'developer' }

/*
 * Map objects already produce key-value pairs.
 */
const profileMap = new Map([
  ['name', 'Mina'],
  ['topic', 'objects'],
]);

const profileFromMap = Object.fromEntries(profileMap);

console.log('2. Map to object:', profileFromMap);
// Expected output: { name: 'Mina', topic: 'objects' }

console.log('3. Original value is still a Map:', profileMap instanceof Map);
// Expected output: true

/*
 * Object.entries() and Object.fromEntries() work well together.
 */
const stockCounts = {
  books: 10,
  pens: 2,
  bags: 25,
};

const restockedCounts = Object.fromEntries(
  Object.entries(stockCounts).map(([item, count]) => [item, count * 2]),
);

console.log('4. Transformed object:', restockedCounts);
// Expected output: { books: 20, pens: 4, bags: 50 }

/*
 * Duplicate keys are allowed.
 * The later entry overwrites the earlier value.
 */
const themeSettings = Object.fromEntries([
  ['theme', 'light'],
  ['theme', 'dark'],
]);

console.log('5. Duplicate key keeps last value:', themeSettings);
// Expected output: { theme: 'dark' }

/*
 * Object.fromEntries() can create symbol-keyed properties.
 */
const privateId = Symbol('privateId');

const learner = Object.fromEntries([
  ['name', 'Nina'],
  [privateId, 101],
]);

console.log('6. Symbol key value:', learner[privateId]);
// Expected output: 101

console.log(
  '7. Symbol key count:',
  Object.getOwnPropertySymbols(learner).length,
);
// Expected output: 1

/*
 * Non-symbol keys are converted to property keys.
 */
const convertedKeys = Object.fromEntries([
  [1, 'one'],
  [true, 'yes'],
  [{}, 'object key'],
]);

console.log('8. Converted keys:', convertedKeys);
// Expected output:
// { '1': 'one', true: 'yes', '[object Object]': 'object key' }

console.log('9. Converted key names:', Object.keys(convertedKeys));
// Expected output: [ '1', 'true', '[object Object]' ]

/*
 * Object keys do not stay as object keys.
 * Use Map when object identity must be preserved as a key.
 */
const firstObjectKey = {};
const secondObjectKey = {};

const objectKeyResult = Object.fromEntries([
  [firstObjectKey, 'first'],
  [secondObjectKey, 'second'],
]);

console.log('10. Object key collision:', objectKeyResult);
// Expected output: { '[object Object]': 'second' }

/*
 * Each entry does not have to be an array.
 * It only needs properties at 0 and 1.
 */
const arrayLikeEntry = {
  0: 'level',
  1: 'beginner',
};

console.log(
  '11. Array-like entry object:',
  Object.fromEntries([arrayLikeEntry]),
);
// Expected output: { level: 'beginner' }

/*
 * Missing value becomes undefined.
 * Extra values are ignored.
 */
console.log('12. Missing value:', Object.fromEntries([['enabled']]));
// Expected output: { enabled: undefined }

console.log(
  '13. Extra value ignored:',
  Object.fromEntries([['name', 'Asha', 99]]),
);
// Expected output: { name: 'Asha' }

/*
 * The outer argument must be iterable.
 */
try {
  Object.fromEntries({
    name: 'Asha',
  });
} catch (error) {
  console.log('14. Non-iterable input error:', error.name);
  // Expected output: TypeError
}

/*
 * Each produced entry must be an object.
 */
try {
  Object.fromEntries(['ab']);
} catch (error) {
  console.log('15. String entry error:', error.name);
  // Expected output: TypeError
}

/*
 * A Set is iterable, but a Set item is not read as an inner iterable.
 * Object.fromEntries() reads entry[0] and entry[1].
 */
const setEntry = new Set(['status', 'active']);

console.log('16. Set used as one entry:', Object.fromEntries([setEntry]));
// Expected output: { undefined: undefined }

/*
 * URLSearchParams also produces key-value pairs.
 */
const params = new URLSearchParams('topic=objects&level=beginner');

console.log('17. URLSearchParams to object:', Object.fromEntries(params));
// Expected output: { topic: 'objects', level: 'beginner' }

/*
 * The created properties are ordinary data properties.
 */
const descriptorTarget = Object.fromEntries([['topic', 'objects']]);
const descriptor = Object.getOwnPropertyDescriptor(descriptorTarget, 'topic');

console.log('18. Descriptor writable:', descriptor.writable);
// Expected output: true

console.log('19. Descriptor enumerable:', descriptor.enumerable);
// Expected output: true

console.log('20. Descriptor configurable:', descriptor.configurable);
// Expected output: true

/*
 * Object.fromEntries() always creates an ordinary object.
 * Borrowing it with .call() does not create an instance of another constructor.
 */
function CustomObject() {}

const borrowedResult = Object.fromEntries.call(CustomObject, [
  ['topic', 'objects'],
]);

console.log(
  '21. Borrowed result is custom instance:',
  borrowedResult instanceof CustomObject,
);
// Expected output: false

console.log(
  '22. Borrowed result has Object.prototype:',
  Object.getPrototypeOf(borrowedResult) === Object.prototype,
);
// Expected output: true
