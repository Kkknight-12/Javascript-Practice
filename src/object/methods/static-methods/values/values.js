/*
 * Object.values(object)
 *
 * Returns an array of the object's own enumerable string-keyed property values.
 *
 * It returns values only. Use Object.keys() for property names and
 * Object.entries() for [key, value] pairs.
 */

const profile = {
  name: 'Asha',
  role: 'developer',
  active: true,
};

console.log('1. Basic values:', Object.values(profile));
// Expected output: [ 'Asha', 'developer', true ]

/*
 * Object.values() returns a normal array.
 */
const profileValues = Object.values(profile);

console.log('2. Result is array:', Array.isArray(profileValues));
// Expected output: true

/*
 * Only own enumerable string-keyed properties are included.
 * Inherited properties, non-enumerable properties, and symbol-keyed properties
 * are skipped.
 */
const sharedFields = {
  inheritedRole: 'member',
};

const privateId = Symbol('privateId');
const learner = Object.create(sharedFields);

learner.name = 'Mina';
learner.topic = 'objects';
learner[privateId] = 101;

Object.defineProperty(learner, 'internalId', {
  value: 500,
  enumerable: false,
});

console.log('3. Own enumerable string values:', Object.values(learner));
// Expected output: [ 'Mina', 'objects' ]

console.log('4. Inherited property exists:', 'inheritedRole' in learner);
// Expected output: true

console.log('5. Non-enumerable property exists:', Object.hasOwn(learner, 'internalId'));
// Expected output: true

console.log('6. Symbol property exists:', Object.hasOwn(learner, privateId));
// Expected output: true

/*
 * Object.values() reads values, so getters run.
 */
let getterRunCount = 0;

const report = {
  title: 'Weekly progress',
  get summary() {
    getterRunCount += 1;
    return `${this.title} ready`;
  },
};

console.log('7. Getter values:', Object.values(report));
// Expected output: [ 'Weekly progress', 'Weekly progress ready' ]

console.log('8. Getter run count:', getterRunCount);
// Expected output: 1

/*
 * Arrays are objects. Object.values() reads their enumerable index values.
 */
const scores = [10, 20, 30];

console.log('9. Array values:', Object.values(scores));
// Expected output: [ 10, 20, 30 ]

/*
 * Sparse array empty slots are missing properties, so they are skipped.
 */
const sparseScores = [10, , 30];

console.log('10. Sparse array values:', Object.values(sparseScores));
// Expected output: [ 10, 30 ]

/*
 * An existing property with the value undefined is still included.
 */
const scoresWithUndefined = [10, undefined, 30];

console.log('11. Undefined value included:', Object.values(scoresWithUndefined));
// Expected output: [ 10, undefined, 30 ]

/*
 * Numeric index keys come first in ascending numeric order.
 * Object.values() returns values in that same key order.
 */
const orderedValues = {
  100: 'one hundred',
  2: 'two',
  name: 'Asha',
  7: 'seven',
};

console.log('12. Value order:', Object.values(orderedValues));
// Expected output: [ 'two', 'seven', 'one hundred', 'Asha' ]

/*
 * Object.values() also works with null-prototype objects.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';
dictionary.level = 'beginner';

console.log('13. Null-prototype object values:', Object.values(dictionary));
// Expected output: [ 'objects', 'beginner' ]

/*
 * Strings are boxed into String objects.
 * String indexes are enumerable own properties.
 */
console.log('14. String primitive values:', Object.values('abc'));
// Expected output: [ 'a', 'b', 'c' ]

/*
 * Other primitive values usually have no own enumerable properties.
 */
console.log('15. Number primitive values:', Object.values(42));
// Expected output: []

console.log('16. Boolean primitive values:', Object.values(true));
// Expected output: []

console.log('17. Symbol primitive values:', Object.values(Symbol('id')));
// Expected output: []

console.log('18. BigInt primitive values:', Object.values(10n));
// Expected output: []

/*
 * null and undefined cannot be converted to objects.
 */
try {
  Object.values(null);
} catch (error) {
  console.log('19. Null error:', error.name);
  // Expected output: TypeError
}

try {
  Object.values(undefined);
} catch (error) {
  console.log('20. Undefined error:', error.name);
  // Expected output: TypeError
}

/*
 * Object.values() is useful when only the values matter.
 */
const cart = {
  apple: 2,
  banana: 3,
  orange: 4,
};

const totalItems = Object.values(cart).reduce((total, count) => total + count, 0);

console.log('21. Sum object values:', totalItems);
// Expected output: 9

/*
 * Use Object.entries() when you need the key along with the value.
 */
for (const [item, count] of Object.entries(cart)) {
  console.log(`22. ${item}:`, count);
}
// Expected output:
// 22. apple: 2
// 22. banana: 3
// 22. orange: 4
