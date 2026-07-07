/*
 * Object.keys(object)
 *
 * Returns an array of the object's own enumerable string-keyed property names.
 *
 * It returns names only. Use Object.values() for values and Object.entries()
 * for [key, value] pairs.
 */

const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log('1. Basic keys:', Object.keys(profile));
// Expected output: [ 'name', 'role' ]

/*
 * The result is a normal array, and each key in the result is a string.
 */
const scores = [10, 20, 30];

console.log('2. Array keys:', Object.keys(scores));
// Expected output: [ '0', '1', '2' ]

console.log('3. First array key type:', typeof Object.keys(scores)[0]);
// Expected output: string

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
learner.topic = 'objects';
learner[privateId] = 101;

Object.defineProperty(learner, 'internalId', {
  value: 500,
  enumerable: false,
});

console.log('4. Own enumerable string keys:', Object.keys(learner));
// Expected output: [ 'name', 'topic' ]

console.log('5. Inherited property exists:', 'inheritedRole' in learner);
// Expected output: true

console.log(
  '6. Non-enumerable property exists:',
  Object.hasOwn(learner, 'internalId')
);
// Expected output: true

console.log('7. Symbol property exists:', Object.hasOwn(learner, privateId));
// Expected output: true

/*
 * Compare Object.keys() with methods that read other property groups.
 */
console.log('8. Own string property names:', Object.getOwnPropertyNames(learner));
// Expected output: [ 'name', 'topic', 'internalId' ]

console.log('9. Own symbol keys:', Object.getOwnPropertySymbols(learner));
// Expected output: [ Symbol(privateId) ]

console.log('10. All own keys:', Reflect.ownKeys(learner));
// Expected output: [ 'name', 'topic', 'internalId', Symbol(privateId) ]

/*
 * Object.keys() reads property names, not property values.
 * Because of that, getters are not called.
 */
let getterRunCount = 0;

const report = {
  title: 'Weekly progress',
  get summary() {
    getterRunCount += 1;
    return `${this.title} ready`;
  },
};

console.log('11. Getter keys:', Object.keys(report));
// Expected output: [ 'title', 'summary' ]

console.log('12. Getter run count after Object.keys():', getterRunCount);
// Expected output: 0

console.log('13. Reading getter value:', report.summary);
// Expected output: Weekly progress ready

console.log('14. Getter run count after direct read:', getterRunCount);
// Expected output: 1

/*
 * Sparse array empty slots are missing properties, so they are skipped.
 */
const sparseScores = [10, , 30];

console.log('15. Sparse array keys:', Object.keys(sparseScores));
// Expected output: [ '0', '2' ]

/*
 * Numeric index keys come first in ascending numeric order.
 * Other string keys keep insertion order.
 */
const orderedKeys = {
  100: 'one hundred',
  2: 'two',
  name: 'Asha',
  7: 'seven',
};

console.log('16. Key order:', Object.keys(orderedKeys));
// Expected output: [ '2', '7', '100', 'name' ]

/*
 * Object.keys() also works with null-prototype objects.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';
dictionary.level = 'beginner';

console.log('17. Null-prototype object keys:', Object.keys(dictionary));
// Expected output: [ 'topic', 'level' ]

/*
 * Strings are boxed into String objects.
 * String indexes are enumerable own properties.
 */
console.log('18. String primitive keys:', Object.keys('abc'));
// Expected output: [ '0', '1', '2' ]

/*
 * Other primitive values usually have no own enumerable properties.
 */
console.log('19. Number primitive keys:', Object.keys(42));
// Expected output: []

console.log('20. Boolean primitive keys:', Object.keys(true));
// Expected output: []

/*
 * null and undefined cannot be converted to objects.
 */
try {
  Object.keys(null);
} catch (error) {
  console.log('21. Null error:', error.name);
  // Expected output: TypeError
}

/*
 * Object.keys() can help loop over an object's visible own string keys.
 */
for (const key of Object.keys(profile)) {
  console.log(`22. ${key}:`, profile[key]);
}
// Expected output:
// 22. name: Asha
// 22. role: developer

/*
 * Object.keys().includes() is only an enumerable own string-key check.
 */
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(
  '23. keys().includes() with non-enumerable:',
  Object.keys(settings).includes('internalId')
);
// Expected output: false

console.log('24. Object.hasOwn() with non-enumerable:', Object.hasOwn(settings, 'internalId'));
// Expected output: true
