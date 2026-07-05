/*
 * Object.getOwnPropertyNames(object)
 *
 * Returns an array of own string-keyed property names.
 *
 * Included:
 * - own enumerable string properties
 * - own non-enumerable string properties
 *
 * Skipped:
 * - inherited properties
 * - symbol-keyed properties
 */

const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log('1. Basic own property names:', Object.getOwnPropertyNames(profile));
// Expected output: [ 'name', 'role' ]

/*
 * Non-enumerable own properties are included.
 */
const settings = {
  theme: 'dark',
};

Object.defineProperty(settings, 'internalId', {
  value: 101,
  enumerable: false,
});

console.log('2. Object.keys skips hidden:', Object.keys(settings));
// Expected output: [ 'theme' ]

console.log(
  '3. getOwnPropertyNames includes hidden:',
  Object.getOwnPropertyNames(settings),
);
// Expected output: [ 'theme', 'internalId' ]

/*
 * This makes it useful for finding non-enumerable names.
 */
const enumerableNames = new Set(Object.keys(settings));
const nonEnumerableNames = Object.getOwnPropertyNames(settings).filter(
  (name) => !enumerableNames.has(name),
);

console.log('4. Non-enumerable names only:', nonEnumerableNames);
// Expected output: [ 'internalId' ]

/*
 * Symbol-keyed properties are skipped.
 */
const secretKey = Symbol('secretKey');

const account = {
  username: 'learner',
  [secretKey]: 'token-123',
};

console.log('5. String names only:', Object.getOwnPropertyNames(account));
// Expected output: [ 'username' ]

console.log('6. Symbol keys:', Object.getOwnPropertySymbols(account));
// Expected output: [ Symbol(secretKey) ]

console.log('7. All own keys with Reflect.ownKeys:', Reflect.ownKeys(account));
// Expected output: [ 'username', Symbol(secretKey) ]

/*
 * Inherited properties are skipped.
 */
const sharedFields = {
  inheritedRole: 'member',
};

const user = Object.create(sharedFields);
user.name = 'Mina';

console.log('8. Own names:', Object.getOwnPropertyNames(user));
// Expected output: [ 'name' ]

console.log('9. Inherited property exists:', 'inheritedRole' in user);
// Expected output: true

/*
 * Arrays are objects.
 * Array indexes are string property names.
 * The length property is non-enumerable, but it is still included.
 */
const scores = [10, 20, 30];

console.log('10. Array names:', Object.getOwnPropertyNames(scores));
// Expected output: [ '0', '1', '2', 'length' ]

/*
 * Sparse array empty slots are missing properties, so they are skipped.
 */
const sparseScores = [10, , 30];

console.log(
  '11. Sparse array names:',
  Object.getOwnPropertyNames(sparseScores),
);
// Expected output: [ '0', '2', 'length' ]

/*
 * Property order:
 * - integer-like string keys first in ascending numeric order
 * - other string keys in insertion order
 */
const orderedNames = {
  100: 'one hundred',
  2: 'two',
  name: 'Asha',
};

Object.defineProperty(orderedNames, 'hidden', {
  value: 'secret',
  enumerable: false,
});

orderedNames[7] = 'seven';

console.log(
  '12. Property name order:',
  Object.getOwnPropertyNames(orderedNames),
);
// Expected output: [ '2', '7', '100', 'name', 'hidden' ]

/*
 * Primitive values are converted to objects, except null and undefined.
 */
console.log('13. String primitive names:', Object.getOwnPropertyNames('ab'));
// Expected output: [ '0', '1', 'length' ]

console.log('14. Number primitive names:', Object.getOwnPropertyNames(42));
// Expected output: []

try {
  Object.getOwnPropertyNames(null);
} catch (error) {
  console.log('15. Null error:', error.name);
  // Expected output: TypeError
}

/*
 * Object.getOwnPropertyNames() returns names only.
 * Use Object.getOwnPropertyDescriptors() when descriptor details are needed.
 */
const hiddenDescriptor = Object.getOwnPropertyDescriptor(
  settings,
  'internalId',
);

console.log('16. Hidden descriptor enumerable:', hiddenDescriptor.enumerable);
// Expected output: false
