/*
 * Object.entries(object)
 *
 * Returns an array of the object's own enumerable string-keyed property
 * key-value pairs.
 *
 * Each entry is a two-item array: [key, value].
 */

const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log('1. Basic entries:', Object.entries(profile));
// Expected output: [ [ 'name', 'Asha' ], [ 'role', 'developer' ] ]

/*
 * Object.entries() is useful with for...of and array destructuring.
 */
for (const [key, value] of Object.entries(profile)) {
  console.log(`2. ${key}:`, value);
}
// Expected output:
// 2. name: Asha
// 2. role: developer

/*
 * Only own enumerable string-keyed properties are included.
 * Inherited properties, non-enumerable properties, and symbol keys are skipped.
 */
const sharedFields = {
  inheritedRole: 'member',
};

const privateId = Symbol('privateId');
const learner = Object.create(sharedFields);

learner.name = 'Mina';
learner[privateId] = 101;

Object.defineProperty(learner, 'internalId', {
  value: 500,
  enumerable: false,
});

console.log('3. Own enumerable string entries:', Object.entries(learner));
// Expected output: [ [ 'name', 'Mina' ] ]

console.log('4. Inherited property exists:', 'inheritedRole' in learner);
// Expected output: true

console.log('5. Symbol property exists:', Object.hasOwn(learner, privateId));
// Expected output: true

/*
 * Array indexes are string keys.
 */
const scores = [10, 20, 30];

console.log('6. Array entries:', Object.entries(scores));
// Expected output: [ [ '0', 10 ], [ '1', 20 ], [ '2', 30 ] ]

/*
 * Sparse array empty slots are missing properties, so they are skipped.
 */
const sparseScores = [10, , 30];

console.log('7. Sparse array entries:', Object.entries(sparseScores));
// Expected output: [ [ '0', 10 ], [ '2', 30 ] ]

/*
 * Integer-like keys come first in ascending numeric order.
 * Other string keys keep insertion order.
 */
const orderedKeys = {
  100: 'one hundred',
  2: 'two',
  name: 'Asha',
  7: 'seven',
};

console.log('8. Key order:', Object.entries(orderedKeys));
// Expected output:
// [
//   [ '2', 'two' ],
//   [ '7', 'seven' ],
//   [ '100', 'one hundred' ],
//   [ 'name', 'Asha' ]
// ]

/*
 * Strings are boxed into String objects.
 * String indexes are enumerable own properties.
 */
console.log('9. String primitive entries:', Object.entries('abc'));
// Expected output: [ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ] ]

/*
 * Other primitive values usually have no own enumerable properties.
 */
console.log('10. Number primitive entries:', Object.entries(42));
// Expected output: []

console.log('11. Boolean primitive entries:', Object.entries(true));
// Expected output: []

/*
 * null and undefined cannot be converted to objects.
 */
try {
  Object.entries(null);
} catch (error) {
  console.log('12. Null error:', error.name);
  // Expected output: TypeError
}

/*
 * Getters run because Object.entries() reads the property values.
 */
const report = {
  title: 'Weekly progress',
  get summary() {
    return `${this.title} ready`;
  },
};

console.log('13. Getter value entry:', Object.entries(report));
// Expected output:
// [ [ 'title', 'Weekly progress' ], [ 'summary', 'Weekly progress ready' ] ]

/*
 * Object.entries() pairs naturally with Object.fromEntries().
 */
const upperCaseEntries = Object.entries(profile).map(([key, value]) => [
  key,
  value.toUpperCase(),
]);

const upperCaseProfile = Object.fromEntries(upperCaseEntries);

console.log('14. Transform entries:', upperCaseProfile);
// Expected output: { name: 'ASHA', role: 'DEVELOPER' }

/*
 * Map accepts key-value pairs, so Object.entries() can convert a plain object
 * into a Map.
 */
const profileMap = new Map(Object.entries(profile));

console.log('15. Convert object to Map:', profileMap.get('name'));
// Expected output: Asha
