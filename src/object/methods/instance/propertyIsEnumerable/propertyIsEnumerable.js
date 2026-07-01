/*
 * Object.prototype.propertyIsEnumerable()
 *
 * Returns true only when a property is both:
 * 1. an own property of the object
 * 2. enumerable
 *
 * Inherited properties, missing properties, and non-enumerable properties
 * return false.
 *
 * This method tests one property key at a time. It does not list properties.
 */

const lesson = {
  title: 'Objects',
};

Object.defineProperty(lesson, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(
  '1. title is own and enumerable:',
  lesson.propertyIsEnumerable('title')
);
// Expected output: true

console.log(
  '2. internalId is own but non-enumerable:',
  lesson.propertyIsEnumerable('internalId')
);
// Expected output: false

console.log(
  '3. missing property is enumerable:',
  lesson.propertyIsEnumerable('missing')
);
// Expected output: false

/*
 * Object.hasOwn() and propertyIsEnumerable() answer different questions.
 */
console.log(
  '4. Object.hasOwn(lesson, "internalId"):',
  Object.hasOwn(lesson, 'internalId')
);
// Expected output: true

console.log('5. Object.keys(lesson):', Object.keys(lesson));
// Expected output: [ 'title' ]

/*
 * Inherited properties do not count, even if they are enumerable.
 */
const parent = {
  category: 'javascript',
};

const child = Object.create(parent);
child.topic = 'objects';

console.log(
  '6. own enumerable property:',
  child.propertyIsEnumerable('topic')
);
// Expected output: true

console.log(
  '7. inherited enumerable property:',
  child.propertyIsEnumerable('category')
);
// Expected output: false

console.log('8. "category" in child:', 'category' in child);
// Expected output: true

/*
 * Symbol keys can be enumerable too.
 * Object.keys() ignores symbols, but propertyIsEnumerable() can test one
 * symbol key directly.
 */
const publicSymbol = Symbol('publicSymbol');
const privateSymbol = Symbol('privateSymbol');

const account = {
  username: 'learner',
  [publicSymbol]: 101,
};

Object.defineProperty(account, privateSymbol, {
  value: 'hidden',
  enumerable: false,
});

console.log(
  '9. enumerable symbol property:',
  account.propertyIsEnumerable(publicSymbol)
);
// Expected output: true

console.log(
  '10. non-enumerable symbol property:',
  account.propertyIsEnumerable(privateSymbol)
);
// Expected output: false

console.log('11. Object.keys(account):', Object.keys(account));
// Expected output: [ 'username' ]

/*
 * Arrays are objects too.
 * Array indexes are usually enumerable. The length property is not.
 */
const scores = [10, 20, 30];

console.log('12. array index is enumerable:', scores.propertyIsEnumerable(0));
// Expected output: true

console.log(
  '13. array length is enumerable:',
  scores.propertyIsEnumerable('length')
);
// Expected output: false

/*
 * Null-prototype objects do not inherit propertyIsEnumerable().
 * Borrow the method from Object.prototype when needed.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(
  '14. null-prototype method:',
  typeof dictionary.propertyIsEnumerable
);
// Expected output: undefined

console.log(
  '15. borrowed call on null-prototype object:',
  Object.prototype.propertyIsEnumerable.call(dictionary, 'topic')
);
// Expected output: true

/*
 * Object.getOwnPropertyDescriptor() can show the descriptor behind the answer.
 */
const descriptor = Object.getOwnPropertyDescriptor(lesson, 'internalId');

console.log('16. internalId descriptor enumerable:', descriptor.enumerable);
// Expected output: false

console.log(
  '17. descriptor-based check for missing property:',
  Object.getOwnPropertyDescriptor(lesson, 'missing')?.enumerable ?? false
);
// Expected output: false
