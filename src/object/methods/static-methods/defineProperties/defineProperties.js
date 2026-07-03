/*
 * Object.defineProperties(object, descriptors)
 *
 * Defines or changes multiple properties on one object.
 *
 * Each property is described with a property descriptor.
 */

const profile = {};

const returnedProfile = Object.defineProperties(profile, {
  username: {
    value: 'learner',
    enumerable: true,
    writable: true,
    configurable: true,
  },
  internalId: {
    value: 101,
  },
});

console.log('1. Defined visible property:', profile.username);
// Expected output: learner

console.log('2. Returned value is target:', returnedProfile === profile);
// Expected output: true

console.log('3. Enumerable keys:', Object.keys(profile));
// Expected output: [ 'username' ]

console.log(
  '4. Hidden property still exists:',
  Object.hasOwn(profile, 'internalId')
);
// Expected output: true

const internalIdDescriptor = Object.getOwnPropertyDescriptor(
  profile,
  'internalId'
);

console.log('5. Default enumerable:', internalIdDescriptor.enumerable);
// Expected output: false

console.log('6. Default writable:', internalIdDescriptor.writable);
// Expected output: false

console.log('7. Default configurable:', internalIdDescriptor.configurable);
// Expected output: false

/*
 * Existing properties can be modified when their descriptors allow it.
 */
Object.defineProperties(profile, {
  username: {
    value: 'Asha',
    enumerable: true,
    writable: false,
    configurable: true,
  },
});

const usernameDescriptor = Object.getOwnPropertyDescriptor(profile, 'username');

console.log('8. Modified existing property:', profile.username);
// Expected output: Asha

console.log('9. Updated writable flag:', usernameDescriptor.writable);
// Expected output: false

/*
 * Accessor descriptors use get and/or set instead of value and writable.
 */
const account = {
  firstName: 'Asha',
  lastName: 'Rao',
};

Object.defineProperties(account, {
  fullName: {
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
  },
});

console.log('10. Accessor getter:', account.fullName);
// Expected output: Asha Rao

account.fullName = 'Mina Shah';

console.log('11. Accessor setter first name:', account.firstName);
// Expected output: Mina

console.log('12. Accessor setter last name:', account.lastName);
// Expected output: Shah

/*
 * A descriptor cannot mix data-descriptor fields with accessor-descriptor
 * fields.
 */
try {
  Object.defineProperties({}, {
    broken: {
      value: 1,
      get() {
        return 1;
      },
    },
  });
} catch (error) {
  console.log('13. Mixed descriptor error:', error.name);
  // Expected output: TypeError
}

/*
 * Descriptor values must be descriptor objects.
 */
try {
  Object.defineProperties({}, {
    name: 'Asha',
  });
} catch (error) {
  console.log('14. Non-object descriptor error:', error.name);
  // Expected output: TypeError
}

/*
 * The descriptor map is read through its own enumerable keys.
 * Non-enumerable descriptor entries are skipped.
 */
const descriptorMap = {};

Object.defineProperty(descriptorMap, 'hidden', {
  value: {
    value: 'secret',
    enumerable: true,
  },
  enumerable: false,
});

descriptorMap.visible = {
  value: 'shown',
  enumerable: true,
};

const descriptorMapTarget = {};
Object.defineProperties(descriptorMapTarget, descriptorMap);

console.log('15. Enumerable descriptor entry:', descriptorMapTarget.visible);
// Expected output: shown

console.log(
  '16. Non-enumerable descriptor entry skipped:',
  descriptorMapTarget.hidden
);
// Expected output: undefined

/*
 * Symbol keys can be defined too.
 */
const accountId = Symbol('accountId');
const user = {};

Object.defineProperties(user, {
  [accountId]: {
    value: 500,
    enumerable: true,
  },
});

console.log('17. Symbol property:', user[accountId]);
// Expected output: 500

/*
 * null and undefined cannot be used as the target or descriptor map.
 */
try {
  Object.defineProperties(null, {});
} catch (error) {
  console.log('18. Null target error:', error.name);
  // Expected output: TypeError
}

try {
  Object.defineProperties({}, null);
} catch (error) {
  console.log('19. Null descriptor map error:', error.name);
  // Expected output: TypeError
}

/*
 * If defining a later property fails, earlier changes from the same call can
 * remain.
 */
const partialTarget = {};

Object.defineProperty(partialTarget, 'locked', {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: true,
});

try {
  Object.defineProperties(partialTarget, {
    copiedBeforeError: {
      value: true,
      enumerable: true,
    },
    locked: {
      value: 2,
    },
    copiedAfterError: {
      value: true,
      enumerable: true,
    },
  });
} catch (error) {
  console.log('20. Failed definition error:', error.name);
  // Expected output: TypeError
}

console.log(
  '21. Earlier property remains:',
  Object.hasOwn(partialTarget, 'copiedBeforeError')
);
// Expected output: true

console.log('22. Locked property unchanged:', partialTarget.locked);
// Expected output: 1

console.log(
  '23. Later property not defined:',
  Object.hasOwn(partialTarget, 'copiedAfterError')
);
// Expected output: false
