/*
 * Object.getOwnPropertyDescriptor(object, propertyKey)
 *
 * Returns the descriptor for one own property.
 *
 * A descriptor tells you how a property is configured:
 * - value / writable for data properties
 * - get / set for accessor properties
 * - enumerable / configurable for both kinds
 */

const profile = {
  name: 'Asha',
};

const nameDescriptor = Object.getOwnPropertyDescriptor(profile, 'name');

console.log('1. Normal assignment descriptor:', nameDescriptor);
// Expected output:
// { value: 'Asha', writable: true, enumerable: true, configurable: true }

/*
 * Object.defineProperty() can create descriptor settings that assignment hides.
 */
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 101,
  enumerable: false,
  writable: false,
  configurable: false,
});

const internalIdDescriptor = Object.getOwnPropertyDescriptor(
  settings,
  'internalId',
);

console.log('2. Defined property value:', internalIdDescriptor.value);
// Expected output: 101

console.log('3. Defined property writable:', internalIdDescriptor.writable);
// Expected output: false

console.log('4. Defined property enumerable:', internalIdDescriptor.enumerable);
// Expected output: false

console.log(
  '5. Defined property configurable:',
  internalIdDescriptor.configurable,
);
// Expected output: false

/*
 * Only own properties are checked.
 * Inherited properties return undefined.
 */
const sharedUserFields = {
  role: 'member',
};

const user = Object.create(sharedUserFields);
user.name = 'Mina';

console.log(
  '6. Own property descriptor exists:',
  Object.getOwnPropertyDescriptor(user, 'name') !== undefined,
);
// Expected output: true

console.log(
  '7. Inherited property descriptor:',
  Object.getOwnPropertyDescriptor(user, 'role'),
);
// Expected output: undefined

/*
 * Missing properties also return undefined.
 */
console.log(
  '8. Missing property descriptor:',
  Object.getOwnPropertyDescriptor(user, 'email'),
);
// Expected output: undefined

/*
 * Accessor properties return get and set fields instead of value and writable.
 * Reading the descriptor does not run the getter.
 */
let getterRunCount = 0;

const counter = {
  get value() {
    getterRunCount += 1;
    return 42;
  },
};

const valueDescriptor = Object.getOwnPropertyDescriptor(counter, 'value');

console.log('9. Accessor descriptor has getter:', typeof valueDescriptor.get);
// Expected output: function

console.log('10. Accessor descriptor value field:', valueDescriptor.value);
// Expected output: undefined

console.log('11. Getter run count after descriptor read:', getterRunCount);
// Expected output: 0

console.log('12. Getter value:', counter.value);
// Expected output: 42

console.log('13. Getter run count after value read:', getterRunCount);
// Expected output: 1

/*
 * Symbol property keys work too.
 */
const secretKey = Symbol('secretKey');

const account = {
  [secretKey]: 'token-123',
};

const symbolDescriptor = Object.getOwnPropertyDescriptor(account, secretKey);

console.log('14. Symbol descriptor value:', symbolDescriptor.value);
// Expected output: token-123

/*
 * The property key is converted to a property key.
 */
const keyObject = {
  toString() {
    return 'name';
  },
};

console.log(
  '15. Object key converted:',
  Object.getOwnPropertyDescriptor(profile, keyObject).value,
);
// Expected output: Asha

/*
 * Primitive values are converted to objects, except null and undefined.
 */
const stringDescriptor = Object.getOwnPropertyDescriptor('abc', 0);

console.log('16. String index descriptor value:', stringDescriptor.value);
// Expected output: a

console.log(
  '17. Number primitive descriptor:',
  Object.getOwnPropertyDescriptor(42, 'x'),
);
// Expected output: undefined

try {
  Object.getOwnPropertyDescriptor(null, 'x');
} catch (error) {
  console.log('18. Null error:', error.name);
  // Expected output: TypeError
}

/*
 * The returned descriptor object is a copy.
 * Mutating it does not change the original property.
 */
const copiedDescriptor = Object.getOwnPropertyDescriptor(profile, 'name');
copiedDescriptor.value = 'Changed only on descriptor copy';
copiedDescriptor.writable = false;

console.log('19. Original value unchanged:', profile.name);
// Expected output: Asha

console.log(
  '20. Original descriptor still writable:',
  Object.getOwnPropertyDescriptor(profile, 'name').writable,
);
// Expected output: true

/*
 * Optional chaining is useful when the descriptor might be missing.
 */
const maybeDescriptor = Object.getOwnPropertyDescriptor(profile, 'missing');

console.log(
  '21. Safe missing enumerable check:',
  maybeDescriptor?.enumerable ?? false,
);
// Expected output: false

/*
 * Object.getOwnPropertyDescriptor() reads one property.
 * Object.getOwnPropertyDescriptors() reads all own property descriptors.
 */
const allDescriptors = Object.getOwnPropertyDescriptors(settings);

console.log('22. All descriptor keys:', Object.keys(allDescriptors));
// Expected output: [ 'internalId' ]

console.log(
  '23. All descriptors internalId enumerable:',
  allDescriptors.internalId.enumerable,
);
// Expected output: false
