/*
 * Object.setPrototypeOf(object, prototype)
 *
 * Changes an object's immediate prototype and returns the same object.
 *
 * The prototype argument must be an object or null.
 *
 * Prefer Object.create(prototype) when you can choose the prototype while
 * creating the object. Changing prototypes after creation can make code harder
 * to reason about and can hurt performance.
 */

const profile = {
  name: 'Asha',
};

const sharedBehavior = {
  describe() {
    return `${this.name} can use shared behavior`;
  },
};

console.log('1. Before prototype change:', profile.describe);
// Expected output: undefined

const returnedProfile = Object.setPrototypeOf(profile, sharedBehavior);

console.log('2. Returned same object:', returnedProfile === profile);
// Expected output: true

console.log('3. Prototype was changed:', Object.getPrototypeOf(profile) === sharedBehavior);
// Expected output: true

console.log('4. Inherited method works:', profile.describe());
// Expected output: Asha can use shared behavior

/*
 * Object.setPrototypeOf() changes only the immediate prototype.
 */
const grandParent = {
  category: 'learner',
};

const parent = Object.create(grandParent);
parent.role = 'member';

const account = {
  name: 'Mina',
};

Object.setPrototypeOf(account, parent);

console.log('5. Immediate prototype:', Object.getPrototypeOf(account) === parent);
// Expected output: true

console.log('6. Inherited from parent:', account.role);
// Expected output: member

console.log('7. Inherited through chain:', account.category);
// Expected output: learner

/*
 * Setting the prototype to null removes the prototype link.
 */
const dictionary = {
  topic: 'objects',
};

Object.setPrototypeOf(dictionary, null);

console.log('8. Null prototype:', Object.getPrototypeOf(dictionary));
// Expected output: null

console.log('9. No inherited toString:', typeof dictionary.toString);
// Expected output: undefined

/*
 * The new prototype must be an object or null.
 */
try {
  Object.setPrototypeOf({}, 'not an object');
} catch (error) {
  console.log('10. Invalid prototype error:', error.name);
  // Expected output: TypeError
}

/*
 * null and undefined cannot be used as the object argument.
 */
try {
  Object.setPrototypeOf(null, {});
} catch (error) {
  console.log('11. Null object error:', error.name);
  // Expected output: TypeError
}

try {
  Object.setPrototypeOf(undefined, {});
} catch (error) {
  console.log('12. Undefined object error:', error.name);
  // Expected output: TypeError
}

/*
 * Other primitive object arguments are returned as-is when the prototype
 * argument is valid.
 */
console.log('13. Primitive object argument:', Object.setPrototypeOf(42, {}));
// Expected output: 42

/*
 * The prototype argument is still checked before returning a primitive object
 * argument.
 */
try {
  Object.setPrototypeOf(42, 'not an object');
} catch (error) {
  console.log('14. Invalid prototype with primitive object:', error.name);
  // Expected output: TypeError
}

/*
 * Non-extensible objects cannot be changed to a different prototype.
 */
const lockedAccount = {};
const lockedPrototype = {
  plan: 'free',
};

Object.setPrototypeOf(lockedAccount, lockedPrototype);
Object.preventExtensions(lockedAccount);

try {
  Object.setPrototypeOf(lockedAccount, { plan: 'pro' });
} catch (error) {
  console.log('15. Non-extensible prototype change:', error.name);
  // Expected output: TypeError
}

console.log(
  '16. Non-extensible prototype stayed the same:',
  Object.getPrototypeOf(lockedAccount) === lockedPrototype
);
// Expected output: true

/*
 * Setting the same prototype again is allowed.
 */
const samePrototypeResult = Object.setPrototypeOf(lockedAccount, lockedPrototype);

console.log('17. Same prototype on non-extensible object:', samePrototypeResult === lockedAccount);
// Expected output: true

/*
 * Object.prototype has an immutable prototype.
 * It already points to null, so setting it to null is fine.
 * Setting it to a different object throws.
 */
console.log('18. Object.prototype prototype:', Object.getPrototypeOf(Object.prototype));
// Expected output: null

console.log(
  '19. Set Object.prototype to same prototype:',
  Object.setPrototypeOf(Object.prototype, null) === Object.prototype
);
// Expected output: true

try {
  Object.setPrototypeOf(Object.prototype, {});
} catch (error) {
  console.log('20. Immutable prototype error:', error.name);
  // Expected output: TypeError
}

/*
 * Object.create() is usually better when you can choose the prototype while
 * creating the object.
 */
const createdWithPrototype = Object.create(sharedBehavior);
createdWithPrototype.name = 'Knight';

console.log('21. Object.create prototype:', Object.getPrototypeOf(createdWithPrototype) === sharedBehavior);
// Expected output: true

console.log('22. Object.create inherited method:', createdWithPrototype.describe());
// Expected output: Knight can use shared behavior

/*
 * Constructor-function prototype chains can be connected with setPrototypeOf().
 * In modern code, class extends is usually clearer.
 */
function Human(name) {
  this.name = name;
}

Human.prototype.speak = function speak() {
  return `${this.name} says hello.`;
};

function SuperHero(name) {
  Human.call(this, name);
}

SuperHero.prototype.fly = function fly() {
  return `${this.name} is flying.`;
};

Object.setPrototypeOf(SuperHero.prototype, Human.prototype);

const superHero = new SuperHero('Mina');

console.log('23. Own prototype method:', superHero.fly());
// Expected output: Mina is flying.

console.log('24. Inherited prototype method:', superHero.speak());
// Expected output: Mina says hello.

console.log(
  '25. SuperHero.prototype inherits from Human.prototype:',
  Object.getPrototypeOf(SuperHero.prototype) === Human.prototype
);
// Expected output: true

/*
 * To inherit static methods too, connect the constructor functions themselves.
 */
Human.describeType = function describeType() {
  return 'human type';
};

Object.setPrototypeOf(SuperHero, Human);

console.log('26. Static method inherited by constructor:', SuperHero.describeType());
// Expected output: human type

/*
 * Reflect.setPrototypeOf() returns a boolean instead of the object.
 */
const reflectTarget = {};
const reflectParent = {
  shared: true,
};

const reflectResult = Reflect.setPrototypeOf(reflectTarget, reflectParent);

console.log('27. Reflect.setPrototypeOf result:', reflectResult);
// Expected output: true

console.log('28. Reflect prototype changed:', reflectTarget.shared);
// Expected output: true
