/*
 * Object.prototype.hasOwnProperty()
 *
 * Legacy own-property check.
 * Modern code usually prefers Object.hasOwn(object, key).
 */

const profile = {
  name: 'Asha',
};

console.log('1. Direct own property:', profile.hasOwnProperty('name'));
// Expected output: true

console.log('2. Missing property:', profile.hasOwnProperty('role'));
// Expected output: false

console.log('3. Inherited toString:', profile.hasOwnProperty('toString'));
// Expected output: false

/*
 * Direct calls can be unsafe because objects can shadow hasOwnProperty.
 */
const report = {
  title: 'Weekly progress',
  hasOwnProperty() {
    return false;
  },
};

console.log('4. Shadowed direct call:', report.hasOwnProperty('title'));
// Expected output: false

console.log(
  '5. Safe legacy call:',
  Object.prototype.hasOwnProperty.call(report, 'title')
);
// Expected output: true

console.log('6. Modern Object.hasOwn():', Object.hasOwn(report, 'title'));
// Expected output: true

/*
 * Null-prototype objects do not inherit hasOwnProperty.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('7. Null-prototype method:', typeof dictionary.hasOwnProperty);
// Expected output: undefined

console.log(
  '8. Safe call works:',
  Object.prototype.hasOwnProperty.call(dictionary, 'topic')
);
// Expected output: true
