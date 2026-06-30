/*
 * Different ways to create objects in JavaScript.
 *
 * This file is a decision map. It shows the common creation styles and keeps
 * the deep details for the dedicated method or class pages.
 */

console.log('--- Object literal ---');

/*
 * Use an object literal when you already know the properties.
 * This is the clearest everyday way to create a plain object.
 */
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log('1. Object literal:', profile);
// Expected output: { name: 'Asha', role: 'developer' }

console.log(
  '2. Literal prototype is Object.prototype:',
  Object.getPrototypeOf(profile) === Object.prototype
);
// Expected output: true

console.log('--- Object constructor ---');

/*
 * Object() and new Object() can create an ordinary object.
 * In normal code, {} is usually clearer.
 */
const fromConstructor = new Object();
fromConstructor.topic = 'objects';

console.log('3. new Object():', fromConstructor);
// Expected output: { topic: 'objects' }

console.log('--- Object.create() with a prototype ---');

/*
 * Object.create(prototype) creates an object whose prototype is the object you
 * pass in. The new object can access properties from that prototype.
 */
const sharedUserBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedUserBehavior);
learner.name = 'Knight';
learner.topic = 'objects';

console.log('4. Object.create() own keys:', Object.keys(learner));
// Expected output: [ 'name', 'topic' ]

console.log('5. Inherited method:', learner.describe());
// Expected output: Knight is learning objects

console.log(
  '6. Prototype is sharedUserBehavior:',
  Object.getPrototypeOf(learner) === sharedUserBehavior
);
// Expected output: true

console.log('--- Null-prototype object ---');

/*
 * Object.create(null) creates an object with no Object.prototype in its chain.
 * This is useful for dictionary-like objects where keys are just data.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('7. Null prototype:', Object.getPrototypeOf(dictionary));
// Expected output: null

console.log(
  '8. Object.hasOwn(dictionary, "topic"):',
  Object.hasOwn(dictionary, 'topic')
);
// Expected output: true

console.log('--- Constructor function with new ---');

/*
 * Constructor functions are an older pattern for creating many similar
 * objects. The new operator creates an object and binds it to `this`.
 */
function Course(title, level) {
  this.title = title;
  this.level = level;
}

Course.prototype.label = function label() {
  return `${this.title} (${this.level})`;
};

const objectCourse = new Course('Objects', 'beginner');

console.log('9. Constructor function object:', objectCourse);
// Expected output: Course { title: 'Objects', level: 'beginner' }

console.log('10. Constructor prototype method:', objectCourse.label());
// Expected output: Objects (beginner)

console.log('--- Class with new ---');

/*
 * Classes are the modern syntax for constructor-style objects.
 */
class Lesson {
  constructor(title) {
    this.title = title;
  }

  label() {
    return `Lesson: ${this.title}`;
  }
}

const classLesson = new Lesson('Object creation');

console.log('11. Class instance:', classLesson);
// Expected output: Lesson { title: 'Object creation' }

console.log('12. Class method:', classLesson.label());
// Expected output: Lesson: Object creation

console.log('--- Object.fromEntries() ---');

/*
 * Object.fromEntries() creates an object from key-value pairs.
 * It is useful after transforming entries with array methods.
 */
const entries = [
  ['name', 'Asha'],
  ['role', 'developer'],
];

const fromEntries = Object.fromEntries(entries);

console.log('13. Object.fromEntries():', fromEntries);
// Expected output: { name: 'Asha', role: 'developer' }

console.log('--- Spread and Object.assign() ---');

/*
 * Object spread and Object.assign() are common ways to create a shallow copy or
 * merge object properties into a fresh object.
 */
const defaults = {
  theme: 'light',
  notifications: true,
};

const userSettings = {
  theme: 'dark',
};

const spreadCopy = {
  ...defaults,
  ...userSettings,
};

const assignCopy = Object.assign({}, defaults, userSettings);

console.log('14. Spread copy:', spreadCopy);
// Expected output: { theme: 'dark', notifications: true }

console.log('15. Object.assign copy:', assignCopy);
// Expected output: { theme: 'dark', notifications: true }

console.log('16. Copies are shallow:', spreadCopy !== defaults);
// Expected output: true
