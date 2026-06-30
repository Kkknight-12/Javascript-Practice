/*
 * Object.hasOwn(object, key)
 *
 * Returns true when `key` is an own property of `object`.
 * Inherited properties do not count.
 */

const profile = {
  name: 'Asha',
};

console.log('1. Own property:', Object.hasOwn(profile, 'name'));
// Expected output: true

console.log('2. Missing property:', Object.hasOwn(profile, 'role'));
// Expected output: false

/*
 * Own properties count even when their values are null or undefined.
 * Object.hasOwn() checks property existence, not truthiness.
 */
const settings = {
  theme: undefined,
  timezone: null,
  notifications: false,
};

console.log('3. Existing undefined value:', Object.hasOwn(settings, 'theme'));
// Expected output: true

console.log('4. Existing null value:', Object.hasOwn(settings, 'timezone'));
// Expected output: true

console.log(
  '5. Existing false value:',
  Object.hasOwn(settings, 'notifications')
);
// Expected output: true

/*
 * Object.hasOwn() ignores inherited properties.
 * Use the `in` operator when inherited properties should count.
 */
const sharedUserFields = {
  role: 'admin',
};

const user = Object.create(sharedUserFields);
user.name = 'Knight';

console.log('6. Own property on user:', Object.hasOwn(user, 'name'));
// Expected output: true

console.log('7. Inherited property with hasOwn:', Object.hasOwn(user, 'role'));
// Expected output: false

console.log('8. Inherited property with in:', 'role' in user);
// Expected output: true

/*
 * Object.hasOwn() is safer than object.hasOwnProperty().
 * The object might replace hasOwnProperty with its own property or method.
 */
const report = {
  title: 'Weekly progress',
  hasOwnProperty() {
    return false;
  },
};

console.log(
  '9. Shadowed hasOwnProperty result:',
  report.hasOwnProperty('title')
);
// Expected output: false

console.log(
  '10. Object.hasOwn ignores shadowing:',
  Object.hasOwn(report, 'title')
);
// Expected output: true

/*
 * Object.hasOwn() also works with null-prototype objects.
 * These objects do not have dictionary.hasOwnProperty as a direct method,
 * but the older borrowed-call pattern still works.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('11. Null-prototype object:', Object.hasOwn(dictionary, 'topic'));
// Expected output: true

console.log(
  '12. dictionary.hasOwnProperty exists:',
  typeof dictionary.hasOwnProperty
);
// Expected output: undefined

console.log(
  '13. Borrowed hasOwnProperty.call:',
  Object.prototype.hasOwnProperty.call(dictionary, 'topic')
);
// Expected output: true

/*
 * Property keys can be strings or symbols.
 */
const privateId = Symbol('privateId');
const account = {
  username: 'learner',
  [privateId]: 101,
};

console.log('14. Symbol key exists:', Object.hasOwn(account, privateId));
// Expected output: true

/*
 * Array indexes are object keys too.
 * Empty slots are missing properties.
 */
const scores = [10, , 30];

console.log('15. Existing array index:', Object.hasOwn(scores, 0));
// Expected output: true

console.log('16. Empty array slot:', Object.hasOwn(scores, 1));
// Expected output: false

/*
 * null and undefined cannot be converted into objects.
 * Object.hasOwn(null, "x") and Object.hasOwn(undefined, "x") throw TypeError.
 */
try {
  Object.hasOwn(null, 'name');
} catch (error) {
  console.log('17. Null object error:', error.name);
  // Expected output: TypeError
}
