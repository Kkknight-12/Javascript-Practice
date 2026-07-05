/*
 * Object.getOwnPropertyDescriptors(object)
 *
 * Returns an object containing descriptors for all own properties.
 *
 * The returned object is a descriptor map:
 * {
 *   propertyName: propertyDescriptor,
 * }
 */

const profile = {
  name: 'Asha',
  role: 'developer',
};

const profileDescriptors = Object.getOwnPropertyDescriptors(profile);

console.log('1. Descriptor keys:', Object.keys(profileDescriptors));
// Expected output: [ 'name', 'role' ]

console.log('2. Name descriptor value:', profileDescriptors.name.value);
// Expected output: Asha

console.log('3. Name descriptor writable:', profileDescriptors.name.writable);
// Expected output: true

/*
 * Non-enumerable own properties are included.
 */
const settings = {
  theme: 'dark',
};

Object.defineProperty(settings, 'internalId', {
  value: 101,
  enumerable: false,
  writable: false,
  configurable: false,
});

const settingsDescriptors = Object.getOwnPropertyDescriptors(settings);

console.log(
  '4. Non-enumerable descriptor exists:',
  'internalId' in settingsDescriptors,
);
// Expected output: true

console.log('5. Non-enumerable flag:', settingsDescriptors.internalId.enumerable);
// Expected output: false

/*
 * Symbol-keyed own properties are included.
 */
const secretKey = Symbol('secretKey');

const account = {
  username: 'learner',
  [secretKey]: 'token-123',
};

const accountDescriptors = Object.getOwnPropertyDescriptors(account);

console.log(
  '6. Symbol descriptor count:',
  Object.getOwnPropertySymbols(accountDescriptors).length,
);
// Expected output: 1

console.log('7. Symbol descriptor value:', accountDescriptors[secretKey].value);
// Expected output: token-123

/*
 * Inherited properties are not included.
 */
const sharedFields = {
  inheritedRole: 'member',
};

const user = Object.create(sharedFields);
user.name = 'Mina';

const userDescriptors = Object.getOwnPropertyDescriptors(user);

console.log('8. Own descriptor exists:', 'name' in userDescriptors);
// Expected output: true

console.log('9. Inherited descriptor skipped:', userDescriptors.inheritedRole);
// Expected output: undefined

/*
 * Accessor descriptors are returned without running getters.
 */
let getterRunCount = 0;

const counter = {
  get value() {
    getterRunCount += 1;
    return 42;
  },
};

const counterDescriptors = Object.getOwnPropertyDescriptors(counter);

console.log(
  '10. Accessor descriptor has getter:',
  typeof counterDescriptors.value.get,
);
// Expected output: function

console.log('11. Getter run count after descriptor read:', getterRunCount);
// Expected output: 0

console.log('12. Getter value:', counter.value);
// Expected output: 42

console.log('13. Getter run count after value read:', getterRunCount);
// Expected output: 1

/*
 * The returned descriptor map is a new object.
 * Mutating it does not change the original object.
 */
profileDescriptors.name.value = 'Changed only in descriptor map';
profileDescriptors.name.writable = false;

console.log('14. Original value unchanged:', profile.name);
// Expected output: Asha

console.log(
  '15. Original descriptor still writable:',
  Object.getOwnPropertyDescriptor(profile, 'name').writable,
);
// Expected output: true

/*
 * The returned descriptor map can be passed to Object.defineProperties().
 */
const copiedSettings = Object.defineProperties({}, settingsDescriptors);

console.log('16. Copied hidden value:', copiedSettings.internalId);
// Expected output: 101

console.log(
  '17. Copied hidden enumerable:',
  Object.getOwnPropertyDescriptor(copiedSettings, 'internalId').enumerable,
);
// Expected output: false

/*
 * Object.assign() copies values, not full descriptors.
 * It also reads getters.
 */
let assignGetterRunCount = 0;

const sourceWithGetter = {
  get score() {
    assignGetterRunCount += 1;
    return 10;
  },
};

const assignedCopy = Object.assign({}, sourceWithGetter);

console.log('18. assign getter run count:', assignGetterRunCount);
// Expected output: 1

console.log(
  '19. assign copied score descriptor has getter:',
  Object.getOwnPropertyDescriptor(assignedCopy, 'score').get,
);
// Expected output: undefined

/*
 * Descriptor copy preserves the accessor without running the getter.
 */
assignGetterRunCount = 0;

const descriptorCopy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(sourceWithGetter),
);

console.log('20. descriptor copy getter run count:', assignGetterRunCount);
// Expected output: 0

console.log(
  '21. descriptor copy has getter:',
  typeof Object.getOwnPropertyDescriptor(descriptorCopy, 'score').get,
);
// Expected output: function

/*
 * You can preserve the source object's prototype while copying descriptors.
 */
const sharedBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedBehavior);
learner.name = 'Nina';
learner.topic = 'descriptors';

const learnerClone = Object.create(
  Object.getPrototypeOf(learner),
  Object.getOwnPropertyDescriptors(learner),
);

console.log('22. Prototype-preserving copy:', learnerClone.describe());
// Expected output: Nina is learning descriptors

console.log(
  '23. Clone prototype preserved:',
  Object.getPrototypeOf(learnerClone) === sharedBehavior,
);
// Expected output: true

/*
 * Primitive values are converted to objects, except null and undefined.
 */
const stringDescriptors = Object.getOwnPropertyDescriptors('ab');

console.log('24. String descriptor keys:', Object.keys(stringDescriptors));
// Expected output: [ '0', '1', 'length' ]

console.log('25. String length descriptor:', stringDescriptors.length);
// Expected output:
// { value: 2, writable: false, enumerable: false, configurable: false }

try {
  Object.getOwnPropertyDescriptors(null);
} catch (error) {
  console.log('26. Null error:', error.name);
  // Expected output: TypeError
}
