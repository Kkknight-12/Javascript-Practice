/*
 * Proxy ownKeys trap
 *
 * The ownKeys trap supplies the proxy's list of own property keys.
 *
 * ownKeys(target) {
 *   return keyList;
 * }
 *
 * target = the original wrapped object.
 * keyList must contain unique string or symbol keys.
 */

/*
 * 1. Normal forwarding
 *
 * Reflect.ownKeys() returns every own key from the target: enumerable and
 * non-enumerable strings, plus symbols.
 */
const tokenKey = Symbol('token');
const listingLog = [];

const accountTarget = {
  name: 'Asha',
  [tokenKey]: 'secret-token',
};

Object.defineProperty(accountTarget, 'internalId', {
  value: 42,
  enumerable: false,
});

const account = new Proxy(accountTarget, {
  ownKeys(target) {
    listingLog.push('ownKeys');

    return Reflect.ownKeys(target);
  },
});

console.log('1. Reflect.ownKeys():', Reflect.ownKeys(account));
// Expected output: [ 'name', 'internalId', Symbol(token) ]

console.log('2. Object.keys():', Object.keys(account));
// Expected output: [ 'name' ]

console.log('3. Object.getOwnPropertyNames():', Object.getOwnPropertyNames(account));
// Expected output: [ 'name', 'internalId' ]

console.log('4. Object.getOwnPropertySymbols():', Object.getOwnPropertySymbols(account));
// Expected output: [ Symbol(token) ]

console.log('5. Trap call count:', listingLog.length);
// Expected output: 4

/*
 * 2. Filtering configurable keys
 *
 * The trap removes underscore-prefixed string keys from listing operations.
 * This changes key visibility, not normal property reading or raw-target access.
 */
const filteredTarget = {
  name: 'Mina',
  _token: 'secret',
};

const filteredObject = new Proxy(filteredTarget, {
  ownKeys(target) {
    return Reflect.ownKeys(target).filter((property) => {
      return !(
        typeof property === 'string' &&
        property.startsWith('_')
      );
    });
  },
});

console.log('6. Filtered Object.keys():', Object.keys(filteredObject));
// Expected output: [ 'name' ]

console.log('7. Filtered Reflect.ownKeys():', Reflect.ownKeys(filteredObject));
// Expected output: [ 'name' ]

console.log('8. Filtered property still readable:', filteredObject._token);
// Expected output: secret

console.log('9. Raw target still lists key:', Reflect.ownKeys(filteredTarget));
// Expected output: [ 'name', '_token' ]

/*
 * 3. Custom key order
 *
 * On an extensible target with configurable properties, the trap may return a
 * different order. Listing APIs preserve the candidate order after filtering.
 */
const orderedTarget = {
  first: 1,
  second: 2,
  third: 3,
};

const orderedObject = new Proxy(orderedTarget, {
  ownKeys() {
    return ['third', 'first', 'second'];
  },
});

console.log('10. Custom Reflect order:', Reflect.ownKeys(orderedObject));
// Expected output: [ 'third', 'first', 'second' ]

console.log('11. Custom Object.keys order:', Object.keys(orderedObject));
// Expected output: [ 'third', 'first', 'second' ]

/*
 * 4. A virtual key is only a candidate key
 *
 * Reflect.ownKeys() exposes the key returned by the trap. Object.keys() also
 * asks for a property descriptor and excludes the virtual key when no
 * enumerable descriptor exists.
 */
const candidateOnly = new Proxy({}, {
  ownKeys() {
    return ['virtual'];
  },
});

console.log('12. Reflect sees candidate key:', Reflect.ownKeys(candidateOnly));
// Expected output: [ 'virtual' ]

console.log('13. Object.keys needs descriptor:', Object.keys(candidateOnly));
// Expected output: []

/*
 * 5. Virtual enumerable key with descriptor and value behavior
 *
 * The descriptor marks virtual as enumerable for Object.keys(). The get trap
 * supplies its value when Object.values() reads it.
 */
const virtualObject = new Proxy({}, {
  ownKeys() {
    return ['virtual'];
  },

  getOwnPropertyDescriptor(target, property) {
    if (property === 'virtual') {
      return {
        configurable: true,
        enumerable: true,
      };
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },

  get(target, property, receiver) {
    if (property === 'virtual') {
      return 'created by proxy';
    }

    return Reflect.get(target, property, receiver);
  },
});

console.log('14. Enumerable virtual key:', Object.keys(virtualObject));
// Expected output: [ 'virtual' ]

console.log('15. Virtual value:', Object.values(virtualObject));
// Expected output: [ 'created by proxy' ]

/*
 * 6. Listing keys does not itself read values
 *
 * Reflect.ownKeys() and Object.keys() obtain keys without running the getter.
 * Object.values() continues by reading each included value, so the getter runs.
 */
let getterRuns = 0;

const reportTarget = {
  get total() {
    getterRuns += 1;

    return 100;
  },

  label: 'weekly',
};

const report = new Proxy(reportTarget, {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});

console.log('16. Listed report keys:', Reflect.ownKeys(report));
// Expected output: [ 'total', 'label' ]

console.log('17. Getter runs after Reflect.ownKeys():', getterRuns);
// Expected output: 0

console.log('18. Object.keys report:', Object.keys(report));
// Expected output: [ 'total', 'label' ]

console.log('19. Getter runs after Object.keys():', getterRuns);
// Expected output: 0

console.log('20. Object.values report:', Object.values(report));
// Expected output: [ 100, 'weekly' ]

console.log('21. Getter runs after Object.values():', getterRuns);
// Expected output: 1

/*
 * 7. Arrays
 *
 * Array indexes and the non-enumerable length property are own keys.
 * Object.keys() later filters out length because it is non-enumerable.
 */
const arrayListingLog = [];

const items = new Proxy(['first', 'second'], {
  ownKeys(target) {
    arrayListingLog.push('ownKeys');

    return Reflect.ownKeys(target);
  },
});

console.log('22. Array Reflect.ownKeys():', Reflect.ownKeys(items));
// Expected output: [ '0', '1', 'length' ]

console.log('23. Array Object.keys():', Object.keys(items));
// Expected output: [ '0', '1' ]

console.log('24. Array listing trap count:', arrayListingLog.length);
// Expected output: 2

/*
 * 8. The result may be array-like
 *
 * An array is clearest, but the specification accepts an object with length and
 * indexed string or symbol entries.
 */
const arrayLikeResult = new Proxy(
  {
    name: 'Asha',
  },
  {
    ownKeys() {
      return {
        0: 'name',
        length: 1,
      };
    },
  },
);

console.log('25. Array-like ownKeys result:', Reflect.ownKeys(arrayLikeResult));
// Expected output: [ 'name' ]

/*
 * 9. Result-shape invariants
 *
 * The result must be an object containing unique string or symbol values.
 */
const primitiveResult = new Proxy({}, {
  ownKeys() {
    return 'name';
  },
});

try {
  Reflect.ownKeys(primitiveResult);
} catch (error) {
  console.log('26. Primitive result error:', error.name);
  // Expected output: TypeError
}

const invalidKeyType = new Proxy({}, {
  ownKeys() {
    return ['name', 1];
  },
});

try {
  Reflect.ownKeys(invalidKeyType);
} catch (error) {
  console.log('27. Invalid key type error:', error.name);
  // Expected output: TypeError
}

const duplicateKeys = new Proxy({}, {
  ownKeys() {
    return ['name', 'name'];
  },
});

try {
  Reflect.ownKeys(duplicateKeys);
} catch (error) {
  console.log('28. Duplicate key error:', error.name);
  // Expected output: TypeError
}

/*
 * 10. Non-configurable key invariant
 *
 * Every non-configurable own key of the target must appear in the result.
 */
const lockedTarget = {};

Object.defineProperty(lockedTarget, 'id', {
  value: 42,
  configurable: false,
});

const missingLockedKey = new Proxy(lockedTarget, {
  ownKeys() {
    return [];
  },
});

try {
  Reflect.ownKeys(missingLockedKey);
} catch (error) {
  console.log('29. Missing non-configurable key error:', error.name);
  // Expected output: TypeError
}

/*
 * 11. Non-extensible target invariant
 *
 * A non-extensible target requires exactly the same own-key set: no missing
 * keys and no extra virtual keys. The order may still be changed.
 */
const fixedTarget = {
  first: 1,
  second: 2,
};

Object.preventExtensions(fixedTarget);

const extraFixedKey = new Proxy(fixedTarget, {
  ownKeys(target) {
    return [...Reflect.ownKeys(target), 'virtual'];
  },
});

try {
  Reflect.ownKeys(extraFixedKey);
} catch (error) {
  console.log('30. Extra non-extensible key error:', error.name);
  // Expected output: TypeError
}

const reorderedFixedKeys = new Proxy(fixedTarget, {
  ownKeys() {
    return ['second', 'first'];
  },
});

console.log('31. Reordered exact key set:', Reflect.ownKeys(reorderedFixedKeys));
// Expected output: [ 'second', 'first' ]

/*
 * 12. Direct target listing bypasses the proxy
 *
 * Only listing operations requested through the proxy run its ownKeys trap.
 */
let interceptedListingCount = 0;

const directTarget = {
  name: 'Asha',
};

const directProxy = new Proxy(directTarget, {
  ownKeys(target) {
    interceptedListingCount += 1;

    return Reflect.ownKeys(target);
  },
});

Reflect.ownKeys(directProxy);
Reflect.ownKeys(directTarget);

console.log('32. Intercepted listing count:', interceptedListingCount);
// Expected output: 1
