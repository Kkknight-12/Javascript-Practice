/*
 * Proxy getOwnPropertyDescriptor trap
 *
 * The trap reports whether a key is an own property of the proxy and, when it
 * is, how that property is configured.
 *
 * getOwnPropertyDescriptor(target, property) {
 *   return descriptorOrUndefined;
 * }
 *
 * target   = the original wrapped object.
 * property = the string or symbol key being inspected.
 */

/*
 * 1. Normal forwarding
 *
 * Reflect.getOwnPropertyDescriptor() returns the target's normal descriptor or
 * undefined when the target does not own the key.
 */
const tokenKey = Symbol('token');
const descriptorLog = [];

const accountTarget = {
  name: 'Asha',
  [tokenKey]: 'secret-token',
};

Object.defineProperty(accountTarget, 'internalId', {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: true,
});

const account = new Proxy(accountTarget, {
  getOwnPropertyDescriptor(target, property) {
    descriptorLog.push(`${String(property)}:${typeof property}`);

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(
  '1. Normal data descriptor:',
  Object.getOwnPropertyDescriptor(account, 'name'),
);
// Expected output:
// { value: 'Asha', writable: true, enumerable: true, configurable: true }

console.log(
  '2. Non-enumerable descriptor:',
  Reflect.getOwnPropertyDescriptor(account, 'internalId'),
);
// Expected output:
// { value: 42, writable: false, enumerable: false, configurable: true }

console.log(
  '3. Symbol descriptor value:',
  Object.getOwnPropertyDescriptor(account, tokenKey).value,
);
// Expected output: secret-token

console.log(
  '4. Missing own descriptor:',
  Reflect.getOwnPropertyDescriptor(account, 'missing'),
);
// Expected output: undefined

console.log('5. Descriptor request log:', descriptorLog);
// Expected output:
// [ 'name:string', 'internalId:string', 'Symbol(token):symbol', 'missing:string' ]

/*
 * 2. Only own properties are reported
 *
 * Normal forwarding does not search the target's prototype chain.
 */
const sharedProfile = {
  role: 'learner',
};

const learnerTarget = Object.create(sharedProfile);
learnerTarget.name = 'Mina';

const learner = new Proxy(learnerTarget, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(
  '6. Inherited descriptor:',
  Object.getOwnPropertyDescriptor(learner, 'role'),
);
// Expected output: undefined

console.log('7. Inherited key still exists:', 'role' in learner);
// Expected output: true

/*
 * 3. Reading an accessor descriptor does not run its getter
 */
let getterRuns = 0;

const reportTarget = {
  get total() {
    getterRuns += 1;

    return 100;
  },
};

const report = new Proxy(reportTarget, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

const totalDescriptor = Object.getOwnPropertyDescriptor(report, 'total');

console.log('8. Accessor descriptor has getter:', typeof totalDescriptor.get);
// Expected output: function

console.log('9. Getter runs after descriptor read:', getterRuns);
// Expected output: 0

console.log('10. Getter value:', report.total);
// Expected output: 100

console.log('11. Getter runs after value read:', getterRuns);
// Expected output: 1

/*
 * 4. Descriptor-sensitive operations
 *
 * Object.hasOwn() and propertyIsEnumerable() request one descriptor.
 * Object.keys() first gets the key list, then requests each descriptor.
 */
const operationLog = [];

const settingsTarget = {
  visible: 'yes',
};

Object.defineProperty(settingsTarget, 'hidden', {
  value: 'no',
  enumerable: false,
  configurable: true,
});

const settings = new Proxy(settingsTarget, {
  ownKeys(target) {
    operationLog.push('ownKeys');

    return Reflect.ownKeys(target);
  },

  getOwnPropertyDescriptor(target, property) {
    operationLog.push(`descriptor:${String(property)}`);

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log('12. Object.hasOwn result:', Object.hasOwn(settings, 'visible'));
// Expected output: true

console.log(
  '13. propertyIsEnumerable result:',
  Object.prototype.propertyIsEnumerable.call(settings, 'hidden'),
);
// Expected output: false

console.log('14. Object.keys result:', Object.keys(settings));
// Expected output: [ 'visible' ]

console.log('15. Descriptor-sensitive operation log:', operationLog);
// Expected output:
// [
//   'descriptor:visible',
//   'descriptor:hidden',
//   'ownKeys',
//   'descriptor:visible',
//   'descriptor:hidden'
// ]

/*
 * 5. Reporting custom metadata for a configurable property
 *
 * The trap changes the reported descriptor. It does not change the target's
 * stored descriptor or the value returned by an ordinary property read.
 */
const customTarget = {
  name: 'Asha',
};

const customDescriptor = new Proxy(customTarget, {
  getOwnPropertyDescriptor(target, property) {
    if (property === 'name') {
      return {
        value: 'reported value',
        writable: false,
        enumerable: false,
        configurable: true,
      };
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(
  '16. Custom reported descriptor:',
  Object.getOwnPropertyDescriptor(customDescriptor, 'name'),
);
// Expected output:
// {
//   value: 'reported value',
//   writable: false,
//   enumerable: false,
//   configurable: true
// }

console.log('17. Ordinary read still uses target value:', customDescriptor.name);
// Expected output: Asha

console.log('18. Custom enumerable flag affects Object.keys:', Object.keys(customDescriptor));
// Expected output: []

console.log(
  '19. Raw target descriptor remains unchanged:',
  Object.getOwnPropertyDescriptor(customTarget, 'name'),
);
// Expected output:
// { value: 'Asha', writable: true, enumerable: true, configurable: true }

/*
 * 6. Hiding a configurable own property
 *
 * Returning undefined reports that the proxy does not own _token. The target
 * property and ordinary value read still exist.
 */
const hiddenTarget = {
  _token: 'secret',
};

const hiddenDescriptor = new Proxy(hiddenTarget, {
  getOwnPropertyDescriptor(target, property) {
    if (property === '_token') {
      return undefined;
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(
  '20. Hidden descriptor:',
  Object.getOwnPropertyDescriptor(hiddenDescriptor, '_token'),
);
// Expected output: undefined

console.log('21. Object.hasOwn follows reported descriptor:', Object.hasOwn(hiddenDescriptor, '_token'));
// Expected output: false

console.log('22. Hidden property still readable:', hiddenDescriptor._token);
// Expected output: secret

console.log('23. Raw target still owns property:', Object.hasOwn(hiddenTarget, '_token'));
// Expected output: true

/*
 * 7. A virtual descriptor does not create storage or read behavior
 */
const virtualDescriptor = new Proxy({}, {
  getOwnPropertyDescriptor(target, property) {
    if (property === 'virtual') {
      return {
        value: 'reported only',
        writable: true,
        enumerable: true,
        configurable: true,
      };
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log('24. Virtual key reported as own:', Object.hasOwn(virtualDescriptor, 'virtual'));
// Expected output: true

console.log(
  '25. Virtual descriptor value:',
  Object.getOwnPropertyDescriptor(virtualDescriptor, 'virtual').value,
);
// Expected output: reported only

console.log('26. Ordinary virtual read has no value:', virtualDescriptor.virtual);
// Expected output: undefined

console.log('27. Virtual key not stored on target:', Reflect.ownKeys(virtualDescriptor));
// Expected output: []

/*
 * 8. Complete virtual enumerable property
 *
 * ownKeys supplies the key, getOwnPropertyDescriptor marks it enumerable, and
 * get supplies its value.
 */
const completeVirtual = new Proxy({}, {
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
      return 'complete virtual value';
    }

    return Reflect.get(target, property, receiver);
  },
});

console.log('28. Complete virtual Object.keys:', Object.keys(completeVirtual));
// Expected output: [ 'virtual' ]

console.log('29. Complete virtual Object.values:', Object.values(completeVirtual));
// Expected output: [ 'complete virtual value' ]

/*
 * 9. Missing descriptor fields are normalized
 *
 * A partial data descriptor receives default value and writable fields.
 */
const partialDescriptor = new Proxy({}, {
  getOwnPropertyDescriptor() {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

console.log(
  '30. Normalized partial descriptor:',
  Object.getOwnPropertyDescriptor(partialDescriptor, 'anything'),
);
// Expected output:
// {
//   value: undefined,
//   writable: false,
//   enumerable: true,
//   configurable: true
// }

/*
 * 10. Numeric and symbol keys
 *
 * Numeric keys arrive as strings. Symbol keys remain symbols.
 */
const secretKey = Symbol('secret');
const keyLog = [];

const keyedTarget = {
  0: 'zero',
  [secretKey]: 'hidden',
};

const keyedObject = new Proxy(keyedTarget, {
  getOwnPropertyDescriptor(target, property) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

Object.getOwnPropertyDescriptor(keyedObject, 0);
Object.getOwnPropertyDescriptor(keyedObject, secretKey);

console.log('31. Numeric and symbol key log:', keyLog);
// Expected output: [ '0:string', 'Symbol(secret):symbol' ]

/*
 * 11. Result type invariant
 *
 * The trap must return an object or undefined.
 */
const invalidResult = new Proxy({}, {
  getOwnPropertyDescriptor() {
    return 42;
  },
});

try {
  Object.getOwnPropertyDescriptor(invalidResult, 'name');
} catch (error) {
  console.log('32. Invalid result type error:', error.name);
  // Expected output: TypeError
}

/*
 * 12. Existing-property invariants
 *
 * The trap cannot hide a non-configurable own property. It also cannot hide
 * any own property when the target is non-extensible.
 */
const lockedTarget = {};

Object.defineProperty(lockedTarget, 'id', {
  value: 42,
  configurable: false,
});

const hiddenLockedDescriptor = new Proxy(lockedTarget, {
  getOwnPropertyDescriptor() {
    return undefined;
  },
});

try {
  Object.getOwnPropertyDescriptor(hiddenLockedDescriptor, 'id');
} catch (error) {
  console.log('33. Hidden non-configurable property error:', error.name);
  // Expected output: TypeError
}

const fixedTarget = {
  name: 'Asha',
};

Object.preventExtensions(fixedTarget);

const hiddenFixedDescriptor = new Proxy(fixedTarget, {
  getOwnPropertyDescriptor() {
    return undefined;
  },
});

try {
  Object.getOwnPropertyDescriptor(hiddenFixedDescriptor, 'name');
} catch (error) {
  console.log('34. Hidden non-extensible property error:', error.name);
  // Expected output: TypeError
}

/*
 * 13. Virtual-property invariants
 *
 * A non-extensible target cannot gain a virtual own descriptor. A missing or
 * configurable target property also cannot be reported as non-configurable.
 */
const fixedEmptyTarget = {};
Object.preventExtensions(fixedEmptyTarget);

const virtualOnFixedTarget = new Proxy(fixedEmptyTarget, {
  getOwnPropertyDescriptor() {
    return {
      value: 'virtual',
      configurable: true,
    };
  },
});

try {
  Object.getOwnPropertyDescriptor(virtualOnFixedTarget, 'virtual');
} catch (error) {
  console.log('35. Virtual non-extensible property error:', error.name);
  // Expected output: TypeError
}

const impossibleNonConfigurable = new Proxy({}, {
  getOwnPropertyDescriptor() {
    return {
      value: 'virtual',
      configurable: false,
    };
  },
});

try {
  Object.getOwnPropertyDescriptor(impossibleNonConfigurable, 'virtual');
} catch (error) {
  console.log('36. Virtual non-configurable property error:', error.name);
  // Expected output: TypeError
}

/*
 * 14. Descriptor compatibility invariant
 *
 * A protected target descriptor cannot be reported with an incompatible value
 * or property kind.
 */
const protectedTarget = {};

Object.defineProperty(protectedTarget, 'score', {
  value: 10,
  writable: false,
  enumerable: true,
  configurable: false,
});

const incompatibleDescriptor = new Proxy(protectedTarget, {
  getOwnPropertyDescriptor() {
    return {
      value: 20,
      writable: false,
      enumerable: true,
      configurable: false,
    };
  },
});

try {
  Object.getOwnPropertyDescriptor(incompatibleDescriptor, 'score');
} catch (error) {
  console.log('37. Incompatible locked descriptor error:', error.name);
  // Expected output: TypeError
}

/*
 * 15. Direct target inspection bypasses the proxy
 */
let interceptedDescriptorCount = 0;

const directTarget = {
  name: 'Mina',
};

const directProxy = new Proxy(directTarget, {
  getOwnPropertyDescriptor(target, property) {
    interceptedDescriptorCount += 1;

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

Object.getOwnPropertyDescriptor(directProxy, 'name');
Object.getOwnPropertyDescriptor(directTarget, 'name');

console.log('38. Intercepted descriptor count:', interceptedDescriptorCount);
// Expected output: 1
