/*
 * Object.prototype.hasOwnProperty()
 *
 * Returns true when the object has the key as its own property.
 * Inherited properties do not count.
 *
 * Modern code usually prefers Object.hasOwn(object, key), but
 * hasOwnProperty() is still common in older code and worth understanding.
 */

const profile = {
  name: 'Asha',
};

console.log('1. Own property:', profile.hasOwnProperty('name'));
// Expected output: true

console.log('2. Missing property:', profile.hasOwnProperty('role'));
// Expected output: false

console.log('3. Inherited toString:', profile.hasOwnProperty('toString'));
// Expected output: false

console.log('4. "toString" in profile:', 'toString' in profile);
// Expected output: true

/*
 * hasOwnProperty() checks property existence, not value truthiness.
 */
const settings = {
  theme: undefined,
  notifications: false,
  timezone: null,
};

console.log('5. Existing undefined value:', settings.hasOwnProperty('theme'));
// Expected output: true

console.log(
  '6. Existing false value:',
  settings.hasOwnProperty('notifications')
);
// Expected output: true

console.log('7. Existing null value:', settings.hasOwnProperty('timezone'));
// Expected output: true

/*
 * Non-enumerable own properties still count.
 * Enumerable controls listing tools like Object.keys(), not ownership.
 */
Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(
  '8. Non-enumerable own property:',
  settings.hasOwnProperty('internalId')
);
// Expected output: true

console.log('9. Object.keys(settings):', Object.keys(settings));
// Expected output: [ 'theme', 'notifications', 'timezone' ]

/*
 * Symbol keys can be checked too.
 */
const privateId = Symbol('privateId');
const account = {
  username: 'learner',
  [privateId]: 101,
};

console.log('10. Symbol own property:', account.hasOwnProperty(privateId));
// Expected output: true

/*
 * Array indexes are object property keys.
 * Empty slots are missing properties.
 */
const scores = [10, , 30];

console.log('11. Existing array index:', scores.hasOwnProperty(0));
// Expected output: true

console.log('12. Empty array slot:', scores.hasOwnProperty(1));
// Expected output: false

/*
 * Direct calls can be unsafe because an object can shadow hasOwnProperty.
 */
const report = {
  title: 'Weekly progress',
  hasOwnProperty() {
    return false;
  },
};

console.log('13. Shadowed direct call:', report.hasOwnProperty('title'));
// Expected output: false

console.log(
  '14. Borrowed hasOwnProperty.call:',
  Object.prototype.hasOwnProperty.call(report, 'title')
);
// Expected output: true

console.log('15. Modern Object.hasOwn():', Object.hasOwn(report, 'title'));
// Expected output: true

/*
 * Null-prototype objects do not inherit Object.prototype.hasOwnProperty.
 * Borrowing the method still works, because the method comes from
 * Object.prototype and we provide the object as `this`.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('16. Null-prototype method:', typeof dictionary.hasOwnProperty);
// Expected output: undefined

console.log(
  '17. Borrowed call on null-prototype object:',
  Object.prototype.hasOwnProperty.call(dictionary, 'topic')
);
// Expected output: true

console.log(
  '18. Object.hasOwn on null-prototype object:',
  Object.hasOwn(dictionary, 'topic')
);
// Expected output: true

/*
 * Older code often used hasOwnProperty() inside for...in loops to ignore
 * inherited enumerable properties.
 */
const defaults = {
  plan: 'pro',
};

const userSettings = Object.create(defaults);
userSettings.theme = 'dark';

for (const key in userSettings) {
  if (Object.prototype.hasOwnProperty.call(userSettings, key)) {
    console.log('19. Own key from for...in:', key);
    // Expected output: theme
  }
}
