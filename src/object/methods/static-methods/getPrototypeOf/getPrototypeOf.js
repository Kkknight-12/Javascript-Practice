/*
 * Object.getPrototypeOf(object)
 *
 * Returns the immediate prototype of an object.
 *
 * The result can be:
 * - another object
 * - null
 */

const sharedUserBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedUserBehavior);
learner.name = 'Asha';
learner.topic = 'prototypes';

console.log(
  '1. Object.create prototype:',
  Object.getPrototypeOf(learner) === sharedUserBehavior,
);
// Expected output: true

console.log('2. Inherited method works:', learner.describe());
// Expected output: Asha is learning prototypes

/*
 * A normal object literal has Object.prototype as its prototype.
 */
const plainObject = {};

console.log(
  '3. Plain object prototype:',
  Object.getPrototypeOf(plainObject) === Object.prototype,
);
// Expected output: true

/*
 * Object.prototype is the top ordinary object prototype.
 * Its own prototype is null.
 */
console.log(
  '4. Object.prototype prototype:',
  Object.getPrototypeOf(Object.prototype),
);
// Expected output: null

/*
 * Object.create(null) creates an object with no prototype.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('5. Null-prototype object:', Object.getPrototypeOf(dictionary));
// Expected output: null

console.log(
  '6. Null-prototype own property:',
  Object.hasOwn(dictionary, 'topic'),
);
// Expected output: true

/*
 * Object.getPrototypeOf() returns only the immediate prototype.
 */
class Animal {}
class Dog extends Animal {}
class Beagle extends Dog {}

const snoopy = new Beagle();

console.log(
  '7. Immediate prototype:',
  Object.getPrototypeOf(snoopy) === Beagle.prototype,
);
// Expected output: true

console.log(
  '8. Not higher prototype:',
  Object.getPrototypeOf(snoopy) === Animal.prototype,
);
// Expected output: false

console.log(
  '9. Higher prototype still in chain:',
  Animal.prototype.isPrototypeOf(snoopy),
);
// Expected output: true

/*
 * To walk the whole chain, call Object.getPrototypeOf() repeatedly.
 */
const firstPrototype = Object.getPrototypeOf(snoopy);
const secondPrototype = Object.getPrototypeOf(firstPrototype);
const thirdPrototype = Object.getPrototypeOf(secondPrototype);

console.log(
  '10. First prototype is Beagle.prototype:',
  firstPrototype === Beagle.prototype,
);
// Expected output: true

console.log(
  '11. Second prototype is Dog.prototype:',
  secondPrototype === Dog.prototype,
);
// Expected output: true

console.log(
  '12. Third prototype is Animal.prototype:',
  thirdPrototype === Animal.prototype,
);
// Expected output: true

/*
 * Constructor functions also connect instances to Constructor.prototype.
 */
function Course(title) {
  this.title = title;
}

Course.prototype.label = function label() {
  return `Course: ${this.title}`;
};

const course = new Course('Objects');

console.log(
  '13. Constructor prototype:',
  Object.getPrototypeOf(course) === Course.prototype,
);
// Expected output: true

/*
 * Object.setPrototypeOf() can change the immediate prototype.
 */
const base = {
  role: 'admin',
};

const account = {
  name: 'Mina',
};

Object.setPrototypeOf(account, base);

console.log(
  '14. Changed prototype:',
  Object.getPrototypeOf(account) === base,
);
// Expected output: true

console.log('15. Inherited after setPrototypeOf:', account.role);
// Expected output: admin

/*
 * Primitive values are converted to wrapper objects, except null and undefined.
 */
console.log(
  '16. String primitive prototype:',
  Object.getPrototypeOf('abc') === String.prototype,
);
// Expected output: true

console.log(
  '17. Number primitive prototype:',
  Object.getPrototypeOf(42) === Number.prototype,
);
// Expected output: true

try {
  Object.getPrototypeOf(null);
} catch (error) {
  console.log('18. Null error:', error.name);
  // Expected output: TypeError
}

/*
 * Reflect.getPrototypeOf() does not coerce primitives.
 */
try {
  Reflect.getPrototypeOf('abc');
} catch (error) {
  console.log('19. Reflect primitive error:', error.name);
  // Expected output: TypeError
}

/*
 * Proxy objects can intercept prototype reads with a getPrototypeOf trap.
 */
const proxyTarget = {};
const proxy = new Proxy(proxyTarget, {
  getPrototypeOf(target) {
    console.log('20. Proxy getPrototypeOf trap ran');
    return Reflect.getPrototypeOf(target);
  },
});

console.log(
  '21. Proxy prototype result:',
  Object.getPrototypeOf(proxy) === Object.prototype,
);
// Expected output:
// 20. Proxy getPrototypeOf trap ran
// 21. Proxy prototype result: true
