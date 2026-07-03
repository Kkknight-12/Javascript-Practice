/*
 * Object.defineProperty(object, propertyKey, descriptor)
 *
 * Defines a new own property or modifies an existing own property using a
 * property descriptor.
 *
 * It returns the same object after modifying it.
 */

const profile = {};

const returnedProfile = Object.defineProperty(profile, 'username', {
  value: 'learner',
  enumerable: true,
  writable: true,
  configurable: true,
});

console.log('1. Defined property:', profile.username);
// Expected output: learner

console.log('2. Returned value is target:', returnedProfile === profile);
// Expected output: true

/*
 * Descriptor flags default to false.
 */
Object.defineProperty(profile, 'internalId', {
  value: 101,
});

const internalIdDescriptor = Object.getOwnPropertyDescriptor(
  profile,
  'internalId'
);

console.log('3. Hidden property exists:', Object.hasOwn(profile, 'internalId'));
// Expected output: true

console.log('4. Default enumerable:', internalIdDescriptor.enumerable);
// Expected output: false

console.log('5. Default writable:', internalIdDescriptor.writable);
// Expected output: false

console.log('6. Default configurable:', internalIdDescriptor.configurable);
// Expected output: false

/*
 * writable controls whether assignment can change a data property's value.
 */
const score = {};

Object.defineProperty(score, 'points', {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: true,
});

score.points = 100;

console.log('7. Non-writable assignment ignored:', score.points);
// Expected output: 42

try {
  (function updateInStrictMode() {
    'use strict';
    score.points = 100;
  })();
} catch (error) {
  console.log('8. Non-writable strict-mode error:', error.name);
  // Expected output: TypeError
}

/*
 * enumerable controls whether the property appears in Object.keys(),
 * for...in, Object.assign(), and object spread.
 */
const settings = {};

Object.defineProperty(settings, 'theme', {
  value: 'dark',
  enumerable: true,
});

Object.defineProperty(settings, 'internalToken', {
  value: 'abc123',
  enumerable: false,
});

console.log('9. Enumerable keys:', Object.keys(settings));
// Expected output: [ 'theme' ]

console.log('10. Non-enumerable value still readable:', settings.internalToken);
// Expected output: abc123

/*
 * configurable controls whether the property can be deleted or reconfigured.
 */
const lockedSettings = {};

Object.defineProperty(lockedSettings, 'version', {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false,
});

const deleteResult = delete lockedSettings.version;

console.log('11. Delete non-configurable property:', deleteResult);
// Expected output: false

try {
  Object.defineProperty(lockedSettings, 'version', {
    enumerable: false,
  });
} catch (error) {
  console.log('12. Reconfigure non-configurable error:', error.name);
  // Expected output: TypeError
}

/*
 * A configurable property can be modified more freely.
 */
Object.defineProperty(profile, 'username', {
  value: 'Asha',
  writable: false,
  enumerable: true,
  configurable: true,
});

const usernameDescriptor = Object.getOwnPropertyDescriptor(profile, 'username');

console.log('13. Modified configurable value:', profile.username);
// Expected output: Asha

console.log('14. Modified writable flag:', usernameDescriptor.writable);
// Expected output: false

/*
 * Accessor descriptors use get and/or set instead of value and writable.
 */
const account = {
  firstName: 'Asha',
  lastName: 'Rao',
};

Object.defineProperty(account, 'fullName', {
  enumerable: true,
  configurable: true,
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  },
});

console.log('15. Accessor getter:', account.fullName);
// Expected output: Asha Rao

account.fullName = 'Mina Shah';

console.log('16. Accessor setter first name:', account.firstName);
// Expected output: Mina

console.log('17. Accessor setter last name:', account.lastName);
// Expected output: Shah

/*
 * A descriptor cannot mix data fields with accessor fields.
 */
try {
  Object.defineProperty({}, 'broken', {
    value: 1,
    get() {
      return 1;
    },
  });
} catch (error) {
  console.log('18. Mixed descriptor error:', error.name);
  // Expected output: TypeError
}

/*
 * The descriptor itself must be an object.
 */
try {
  Object.defineProperty({}, 'name', 'Asha');
} catch (error) {
  console.log('19. Non-object descriptor error:', error.name);
  // Expected output: TypeError
}

/*
 * Property keys can be strings or symbols.
 */
const secretKey = Symbol('secretKey');
const vault = {};

Object.defineProperty(vault, secretKey, {
  value: 'hidden-value',
  enumerable: true,
});

console.log('20. Symbol property value:', vault[secretKey]);
// Expected output: hidden-value

/*
 * Object.defineProperty() defines an own property directly.
 * It does not call an inherited setter while defining the property.
 */
const parent = {
  set status(value) {
    this.setterWasCalled = true;
  },
};

const child = Object.create(parent);

Object.defineProperty(child, 'status', {
  value: 'ready',
  enumerable: true,
});

console.log('21. Own property defined:', Object.hasOwn(child, 'status'));
// Expected output: true

console.log('22. Inherited setter not called:', child.setterWasCalled);
// Expected output: undefined

/*
 * null and undefined cannot be used as the target.
 */
try {
  Object.defineProperty(null, 'name', {
    value: 'Asha',
  });
} catch (error) {
  console.log('23. Null target error:', error.name);
  // Expected output: TypeError
}

/*
 * An empty descriptor still defines a property with default attributes.
 */
const emptyDescriptorTarget = {};

Object.defineProperty(emptyDescriptorTarget, 'empty', {});

const emptyDescriptor = Object.getOwnPropertyDescriptor(
  emptyDescriptorTarget,
  'empty'
);

console.log('24. Empty descriptor value:', emptyDescriptor.value);
// Expected output: undefined

console.log('25. Empty descriptor enumerable:', emptyDescriptor.enumerable);
// Expected output: false
