/*
 * Proxy has trap
 *
 * The has trap runs when JavaScript checks whether a property exists through
 * a proxy.
 *
 * has(target, property) {
 *   return trueOrFalse;
 * }
 *
 * target   = the original wrapped object.
 * property = the string or symbol key being checked.
 */

/*
 * 1. Normal forwarding
 *
 * Reflect.has() performs the normal `in` operation. It checks the target's own
 * properties and continues through the target's prototype chain.
 */
const sharedProfile = {
  role: 'learner',
};

const profileTarget = Object.create(sharedProfile);
profileTarget.name = 'Asha';

const existenceLog = [];

const profile = new Proxy(profileTarget, {
  has(target, property) {
    existenceLog.push(String(property));

    return Reflect.has(target, property);
  },
});

console.log('1. Own property exists:', 'name' in profile);
// Expected output: true

console.log('2. Inherited property exists:', 'role' in profile);
// Expected output: true

console.log('3. Missing property exists:', 'missing' in profile);
// Expected output: false

console.log('4. Checked keys:', existenceLog);
// Expected output: [ 'name', 'role', 'missing' ]

/*
 * 2. `in`, Reflect.has(), and Object.hasOwn()
 *
 * `in` and Reflect.has() use the proxy's has trap and include inherited
 * properties. Object.hasOwn() asks a different question, so it does not use
 * the has trap and excludes inherited properties.
 */
const checksBeforeHasOwn = existenceLog.length;

console.log('5. Reflect.has inherited property:', Reflect.has(profile, 'role'));
// Expected output: true

console.log('6. Object.hasOwn own property:', Object.hasOwn(profile, 'name'));
// Expected output: true

console.log('7. Object.hasOwn inherited property:', Object.hasOwn(profile, 'role'));
// Expected output: false

console.log(
  '8. Object.hasOwn did not run has trap:',
  existenceLog.length === checksBeforeHasOwn + 1,
);
// Expected output: true

/*
 * 3. Filtering an existence check
 *
 * The trap hides configurable string keys that begin with an underscore.
 * This changes only the answer to the existence check. It does not block a
 * normal property read, and access through the original target bypasses the
 * proxy completely.
 */
const accountTarget = {
  name: 'Mina',
  _token: 'secret',
};

const account = new Proxy(accountTarget, {
  has(target, property) {
    if (typeof property === 'string' && property.startsWith('_')) {
      return false;
    }

    return Reflect.has(target, property);
  },
});

console.log('9. Public key exists through proxy:', 'name' in account);
// Expected output: true

console.log('10. Filtered key exists through proxy:', '_token' in account);
// Expected output: false

console.log('11. Filtered key can still be read:', account._token);
// Expected output: secret

console.log('12. Original target bypasses proxy:', '_token' in accountTarget);
// Expected output: true

/*
 * 4. Reporting virtual existence
 *
 * A trap may report that a configurable or missing key exists. Returning true
 * changes the existence answer; it does not create a property or supply a
 * value for a later read.
 */
const connectionTarget = {};

const connection = new Proxy(connectionTarget, {
  has(target, property) {
    if (property === 'connected') {
      return true;
    }

    return Reflect.has(target, property);
  },
});

console.log('13. Virtual key exists through proxy:', 'connected' in connection);
// Expected output: true

console.log(
  '14. Virtual key is not an own target property:',
  Object.hasOwn(connectionTarget, 'connected'),
);
// Expected output: false

console.log('15. Virtual key has no automatic value:', connection.connected);
// Expected output: undefined

/*
 * 5. Numeric and symbol keys
 *
 * Numeric keys arrive as strings. Symbol keys remain symbols, so convert keys
 * with String() for logging and guard before using string methods.
 */
const secretKey = Symbol('secret');
const keyTarget = {
  0: 'zero',
  [secretKey]: 'hidden',
};
const keyLog = [];

const keyedObject = new Proxy(keyTarget, {
  has(target, property) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.has(target, property);
  },
});

console.log('16. Numeric key exists:', 0 in keyedObject);
// Expected output: true

console.log('17. Symbol key exists:', secretKey in keyedObject);
// Expected output: true

console.log('18. Numeric and symbol key log:', keyLog);
// Expected output: [ '0:string', 'Symbol(secret):symbol' ]

/*
 * 6. A range with virtual numeric keys
 *
 * The left side of `in` becomes a property key before the trap runs. Because
 * 5 arrives as the string '5', convert it to a number before comparing it with
 * the range boundaries.
 */
const rangeTarget = {
  start: 1,
  end: 10,
};

const range = new Proxy(rangeTarget, {
  has(target, property) {
    if (typeof property !== 'string') {
      return false;
    }

    const candidate = Number(property);

    return (
      Number.isFinite(candidate) &&
      candidate >= target.start &&
      candidate <= target.end
    );
  },
});

console.log('19. Number inside virtual range:', 5 in range);
// Expected output: true

console.log('20. Number outside virtual range:', 50 in range);
// Expected output: false

console.log('21. Target key hidden by custom rule:', 'start' in range);
// Expected output: false

console.log('22. Target still owns start:', Object.hasOwn(rangeTarget, 'start'));
// Expected output: true

/*
 * 7. Non-configurable own-property invariant
 *
 * A has trap cannot report false for a non-configurable own property. Doing so
 * contradicts a fact about the target that the Proxy rules protect.
 */
const lockedTarget = {};

Object.defineProperty(lockedTarget, 'id', {
  value: 42,
  configurable: false,
});

const invalidLockedCheck = new Proxy(lockedTarget, {
  has() {
    return false;
  },
});

try {
  console.log('id' in invalidLockedCheck);
} catch (error) {
  console.log('23. Non-configurable invariant error:', error.name);
  // Expected output: TypeError
}

/*
 * 8. Non-extensible target invariant
 *
 * Once a target is non-extensible, the trap cannot hide any existing own
 * property, even when that property is configurable.
 */
const fixedTarget = {
  name: 'Asha',
};

Object.preventExtensions(fixedTarget);

const invalidFixedCheck = new Proxy(fixedTarget, {
  has() {
    return false;
  },
});

try {
  console.log('name' in invalidFixedCheck);
} catch (error) {
  console.log('24. Non-extensible invariant error:', error.name);
  // Expected output: TypeError
}
