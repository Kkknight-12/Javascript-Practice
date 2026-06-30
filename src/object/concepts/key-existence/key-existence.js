/*
 * Checking whether a key exists in an object.
 *
 * First decide what "exists" means:
 * 1. Should inherited properties count? Use the `in` operator.
 * 2. Should only direct properties count? Use Object.hasOwn().
 */

const user = {
  name: 'Asha',
  role: 'developer',
  email: undefined,
};

console.log('1. "name" in user:', 'name' in user);
// Expected output: true

console.log('2. Object.hasOwn(user, "name"):', Object.hasOwn(user, 'name'));
// Expected output: true

console.log(
  '3. Object.keys(user).includes("name"):',
  Object.keys(user).includes('name')
);
// Expected output: true

/*
 * Do not use `object.key !== undefined` as a general key-existence check.
 * A key can exist even when its value is actually undefined.
 */
console.log('4. "email" in user:', 'email' in user);
// Expected output: true

console.log('5. user.email !== undefined:', user.email !== undefined);
// Expected output: false

/*
 * The `in` operator checks both:
 * - own properties on the object itself
 * - inherited properties from the prototype chain
 */
const sharedAccountFields = {
  plan: 'pro',
};

const account = Object.create(sharedAccountFields);
account.username = 'knight';

console.log('6. "plan" in account:', 'plan' in account);
// Expected output: true

console.log(
  '7. Object.hasOwn(account, "plan"):',
  Object.hasOwn(account, 'plan')
);
// Expected output: false

console.log(
  '8. Object.hasOwn(account, "username"):',
  Object.hasOwn(account, 'username')
);
// Expected output: true

/*
 * Object.keys(object).includes(key) checks only own enumerable string keys.
 * That is useful when you already need the key list, but it is not the
 * strongest general-purpose existence check.
 */
const lesson = {
  title: 'Objects',
};

Object.defineProperty(lesson, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(
  '9. Object.hasOwn(lesson, "internalId"):',
  Object.hasOwn(lesson, 'internalId')
);
// Expected output: true

console.log('10. Object.keys(lesson):', Object.keys(lesson));
// Expected output: [ 'title' ]

console.log(
  '11. Object.keys(lesson).includes("internalId"):',
  Object.keys(lesson).includes('internalId')
);
// Expected output: false

/*
 * Symbol keys also exist on objects, but Object.keys() does not list them.
 * Use `in` or Object.hasOwn() when the key may be a symbol.
 */
const lessonId = Symbol('lessonId');
const lessonWithSymbol = {
  title: 'Objects',
  [lessonId]: 101,
};

console.log(
  '12. Object.hasOwn(lessonWithSymbol, lessonId):',
  Object.hasOwn(lessonWithSymbol, lessonId)
);
// Expected output: true

console.log('13. lessonId in lessonWithSymbol:', lessonId in lessonWithSymbol);
// Expected output: true

console.log('14. Object.keys(lessonWithSymbol):', Object.keys(lessonWithSymbol));
// Expected output: [ 'title' ]

/*
 * Object.hasOwn() is the modern direct-property check.
 * Object.prototype.hasOwnProperty.call() is the older safe pattern and is
 * still useful when reading legacy code.
 *
 * Avoid calling object.hasOwnProperty(key) directly. The object might replace
 * that method with its own property or method.
 */
const report = {
  title: 'Progress',
  hasOwnProperty() {
    return false;
  },
};

console.log(
  '15. Direct hasOwnProperty can be shadowed:',
  report.hasOwnProperty('title')
);
// Expected output: false

console.log(
  '16. Safe hasOwnProperty.call ignores shadowing:',
  Object.prototype.hasOwnProperty.call(report, 'title')
);
// Expected output: true

const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(
  '17. Object.hasOwn(dictionary, "topic"):',
  Object.hasOwn(dictionary, 'topic')
);
// Expected output: true

console.log(
  '18. Object.prototype.hasOwnProperty.call(dictionary, "topic"):',
  Object.prototype.hasOwnProperty.call(dictionary, 'topic')
);
// Expected output: true
