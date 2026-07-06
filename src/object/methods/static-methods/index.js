/*
 * Object static methods are helper methods called from Object itself.
 *
 * They usually receive the target object as an argument:
 * Object.keys(object)
 * Object.hasOwn(object, key)
 * Object.getPrototypeOf(object)
 *
 * They are different from Object.prototype instance methods, which are called
 * from an object value:
 * object.toString()
 * object.valueOf()
 */

const learner = {
  name: 'Asha',
  topic: 'objects',
};

console.log('1. Static method call:', Object.keys(learner));
// Expected output: [ 'name', 'topic' ]

console.log('2. There is no learner.keys method:', typeof learner.keys);
// Expected output: undefined

/*
 * Static Object methods are safer with null-prototype objects because
 * the method is called from Object, not from the object being checked.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('3. Null-prototype keys:', Object.keys(dictionary));
// Expected output: [ 'topic' ]

console.log('4. Object.hasOwn works:', Object.hasOwn(dictionary, 'topic'));
// Expected output: true

console.log('5. No inherited hasOwnProperty:', typeof dictionary.hasOwnProperty);
// Expected output: undefined

/*
 * Different static methods answer different property-visibility questions.
 */
const hiddenId = Symbol('hiddenId');
const inheritedData = {
  inheritedRole: 'member',
};

const account = Object.create(inheritedData);
account.name = 'Mina';
account[hiddenId] = 'symbol-value';

Object.defineProperty(account, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log('6. Object.keys:', Object.keys(account));
// Expected output: [ 'name' ]

console.log(
  '7. Object.getOwnPropertyNames:',
  Object.getOwnPropertyNames(account),
);
// Expected output: [ 'name', 'internalId' ]

console.log(
  '8. Object.getOwnPropertySymbols:',
  Object.getOwnPropertySymbols(account),
);
// Expected output: [ Symbol(hiddenId) ]

console.log('9. Reflect.ownKeys:', Reflect.ownKeys(account));
// Expected output: [ 'name', 'internalId', Symbol(hiddenId) ]

console.log(
  '10. Inherited property skipped:',
  Object.keys(account).includes('inheritedRole'),
);
// Expected output: false

/*
 * Descriptor methods inspect or define property settings.
 */
const settings = {};

Object.defineProperty(settings, 'mode', {
  value: 'dark',
  enumerable: true,
  writable: false,
  configurable: false,
});

const modeDescriptor = Object.getOwnPropertyDescriptor(settings, 'mode');

console.log('11. Descriptor value:', modeDescriptor.value);
// Expected output: dark

console.log('12. Descriptor writable:', modeDescriptor.writable);
// Expected output: false

console.log(
  '13. Descriptor keys:',
  Object.keys(Object.getOwnPropertyDescriptors(settings)),
);
// Expected output: [ 'mode' ]

/*
 * Creation and conversion methods create or copy object shapes.
 */
const sharedBehavior = {
  describe() {
    return `${this.name} studies ${this.topic}`;
  },
};

const student = Object.create(sharedBehavior);
student.name = 'Nia';
student.topic = 'static methods';

console.log(
  '14. Object.create prototype:',
  Object.getPrototypeOf(student) === sharedBehavior,
);
// Expected output: true

console.log('15. Inherited behavior:', student.describe());
// Expected output: Nia studies static methods

const mergedProfile = Object.assign(
  {},
  { role: 'reader' },
  { topic: 'objects' },
);

console.log('16. Object.assign result:', mergedProfile);
// Expected output: { role: 'reader', topic: 'objects' }

const rebuiltProfile = Object.fromEntries(Object.entries(mergedProfile));

console.log('17. Object.fromEntries result:', rebuiltProfile);
// Expected output: { role: 'reader', topic: 'objects' }

/*
 * Object.groupBy() groups iterable values into arrays on a null-prototype
 * result object.
 */
const tasks = [
  { title: 'Read', status: 'todo' },
  { title: 'Practice', status: 'doing' },
  { title: 'Review', status: 'todo' },
];

const tasksByStatus = Object.groupBy(tasks, ({ status }) => status);

console.log(
  '18. Grouped todo tasks:',
  tasksByStatus.todo.map(({ title }) => title),
);
// Expected output: [ 'Read', 'Review' ]

console.log(
  '19. Group result null prototype:',
  Object.getPrototypeOf(tasksByStatus) === null,
);
// Expected output: true

/*
 * Integrity methods control whether an object can be extended or changed.
 */
const frozenConfig = Object.freeze({
  level: 1,
});

frozenConfig.level = 2;

console.log('20. Object.isFrozen:', Object.isFrozen(frozenConfig));
// Expected output: true

console.log('21. Frozen value unchanged:', frozenConfig.level);
// Expected output: 1

const lockedUser = Object.preventExtensions({
  name: 'Asha',
});

lockedUser.topic = 'objects';

console.log('22. Object.isExtensible:', Object.isExtensible(lockedUser));
// Expected output: false

console.log('23. New property was not added:', Object.hasOwn(lockedUser, 'topic'));
// Expected output: false

/*
 * Object.is() is a static comparison helper.
 */
console.log('24. Object.is(NaN, NaN):', Object.is(NaN, NaN));
// Expected output: true

console.log('25. Object.is(0, -0):', Object.is(0, -0));
// Expected output: false
