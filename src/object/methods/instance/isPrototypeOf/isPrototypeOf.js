/*
 * Object.prototype.isPrototypeOf()
 *
 * Checks whether one object appears anywhere in another object's prototype
 * chain.
 *
 * candidatePrototype.isPrototypeOf(objectToCheck)
 */

const sharedUserBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedUserBehavior);
learner.name = 'Asha';
learner.topic = 'objects';

/*
 * sharedUserBehavior is already the prototype object.
 * It is not a constructor or class, so there is no need to use
 * sharedUserBehavior.prototype here.
 */
console.log(
  '1. sharedUserBehavior is in learner chain:',
  sharedUserBehavior.isPrototypeOf(learner)
);
// Expected output: true

console.log(
  '2. Object.prototype is in learner chain:',
  Object.prototype.isPrototypeOf(learner)
);
// Expected output: true

console.log(
  '3. learner is not in sharedUserBehavior chain:',
  learner.isPrototypeOf(sharedUserBehavior)
);
// Expected output: false

/*
 * isPrototypeOf() checks the whole prototype chain, not only the immediate
 * prototype.
 */
class Animal {}
class Dog extends Animal {}
class Beagle extends Dog {}

const snoopy = new Beagle();

/*
 * Class instances are linked to ClassName.prototype.
 * That is why the possible prototypes below use `.prototype`.
 */
console.log(
  '4. Beagle.prototype in snoopy chain:',
  Beagle.prototype.isPrototypeOf(snoopy)
);
// Expected output: true

console.log(
  '5. Dog.prototype in snoopy chain:',
  Dog.prototype.isPrototypeOf(snoopy)
);
// Expected output: true

console.log(
  '6. Animal.prototype in snoopy chain:',
  Animal.prototype.isPrototypeOf(snoopy)
);
// Expected output: true

console.log(
  '7. Object.prototype in snoopy chain:',
  Object.prototype.isPrototypeOf(snoopy)
);
// Expected output: true

/*
 * Object.getPrototypeOf(object) checks only one step.
 * isPrototypeOf() can find a prototype deeper in the chain.
 */
console.log(
  '8. Immediate prototype is Beagle.prototype:',
  Object.getPrototypeOf(snoopy) === Beagle.prototype
);
// Expected output: true

console.log(
  '9. Immediate prototype is Animal.prototype:',
  Object.getPrototypeOf(snoopy) === Animal.prototype
);
// Expected output: false

/*
 * instanceof compares an object against Constructor.prototype.
 * isPrototypeOf() compares directly against the prototype object you call it on.
 * Dog.prototype can be in snoopy's chain; the Dog function object itself is not.
 */
console.log('10. snoopy instanceof Dog:', snoopy instanceof Dog);
// Expected output: true

console.log(
  '11. Dog.prototype.isPrototypeOf(snoopy):',
  Dog.prototype.isPrototypeOf(snoopy)
);
// Expected output: true

console.log(
  '12. Dog.isPrototypeOf(snoopy):',
  Dog.isPrototypeOf(snoopy)
);
// Expected output: false

/*
 * Passing a primitive as the object to check returns false.
 */
console.log(
  '13. Object.prototype.isPrototypeOf(42):',
  Object.prototype.isPrototypeOf(42)
);
// Expected output: false

/*
 * Null-prototype objects do not have Object.prototype in their chain.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(
  '14. Object.prototype in dictionary chain:',
  Object.prototype.isPrototypeOf(dictionary)
);
// Expected output: false

/*
 * You can borrow isPrototypeOf() when you need to call it from a value that
 * may not inherit Object.prototype.
 */
console.log(
  '15. Borrowed isPrototypeOf call:',
  Object.prototype.isPrototypeOf.call(sharedUserBehavior, learner)
);
// Expected output: true

/*
 * Calling with null or undefined as `this` throws a TypeError.
 */
try {
  Object.prototype.isPrototypeOf.call(null, learner);
} catch (error) {
  console.log('16. Null this error:', error.name);
  // Expected output: TypeError
}

/*
 * Prototype-chain membership is not the same as private-field branding.
 */
class SecretBox {
  #value = 'secret';

  static hasSecretBrand(value) {
    return #value in value;
  }
}

const fakeBox = Object.create(SecretBox.prototype);

console.log(
  '17. SecretBox.prototype in fakeBox chain:',
  SecretBox.prototype.isPrototypeOf(fakeBox)
);
// Expected output: true

console.log(
  '18. fakeBox has SecretBox private brand:',
  SecretBox.hasSecretBrand(fakeBox)
);
// Expected output: false
