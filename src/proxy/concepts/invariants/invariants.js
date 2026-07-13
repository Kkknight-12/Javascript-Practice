/*
 * Proxy invariants
 *
 * An invariant is a protected fact about the target that a Proxy trap is not
 * allowed to contradict. JavaScript checks the trap's result against the
 * target and throws a TypeError when an invariant is violated.
 */

/*
 * 1. Custom behavior is allowed
 *
 * Invariants do not prevent all custom behavior. These virtual get and has
 * results are valid because they do not contradict protected target facts.
 */
const profileTarget = {
  firstName: 'Asha',
  lastName: 'Sharma',
};

const profile = new Proxy(profileTarget, {
  get(target, property, receiver) {
    if (property === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }

    return Reflect.get(target, property, receiver);
  },

  has(target, property) {
    if (property === 'connected') {
      return true;
    }

    return Reflect.has(target, property);
  },
});

console.log('1. Valid virtual get result:', profile.fullName);
// Expected output: Asha Sharma

console.log('2. Valid virtual has result:', 'connected' in profile);
// Expected output: true

/*
 * 2. Descriptors and extensibility create protected facts
 *
 * Non-configurable properties cannot be freely redefined or hidden. A
 * non-extensible object cannot receive new own properties.
 */
const factsTarget = {};

Object.defineProperty(factsTarget, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});

Object.preventExtensions(factsTarget);

console.log(
  '3. Locked version descriptor:',
  Object.getOwnPropertyDescriptor(factsTarget, 'version'),
);
// Expected output:
// { value: '1.0', writable: false, enumerable: false, configurable: false }

console.log('4. Target is extensible:', Object.isExtensible(factsTarget));
// Expected output: false

/*
 * 3. get invariant: locked data property
 *
 * A get trap must return the actual value of an own data property that is both
 * non-writable and non-configurable.
 */
const lockedReadTarget = {};

Object.defineProperty(lockedReadTarget, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});

const invalidRead = new Proxy(lockedReadTarget, {
  get(target, property, receiver) {
    if (property === 'version') {
      return '2.0';
    }

    return Reflect.get(target, property, receiver);
  },
});

try {
  console.log(invalidRead.version);
} catch (error) {
  console.log('5. Locked data get invariant error:', error.name);
  // Expected output: TypeError
}

const forwardedRead = new Proxy(lockedReadTarget, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});

console.log('6. Forwarded locked value:', forwardedRead.version);
// Expected output: 1.0

/*
 * 4. get invariant: accessor without a getter
 *
 * A non-configurable own accessor whose getter is undefined must still produce
 * undefined through the proxy.
 */
const writeOnlyTarget = {};

Object.defineProperty(writeOnlyTarget, 'secret', {
  get: undefined,
  set(value) {
    void value;
  },
  configurable: false,
});

const invalidWriteOnlyRead = new Proxy(writeOnlyTarget, {
  get() {
    return 'revealed';
  },
});

try {
  console.log(invalidWriteOnlyRead.secret);
} catch (error) {
  console.log('7. Getter-less accessor invariant error:', error.name);
  // Expected output: TypeError
}

console.log('8. Normal getter-less value:', Reflect.get(writeOnlyTarget, 'secret'));
// Expected output: undefined

/*
 * 5. set invariant: locked data property
 *
 * A set trap cannot declare that a different value was successfully assigned
 * to a non-writable, non-configurable own data property.
 */
const lockedWriteTarget = {};

Object.defineProperty(lockedWriteTarget, 'score', {
  value: 10,
  writable: false,
  configurable: false,
});

const invalidWrite = new Proxy(lockedWriteTarget, {
  set() {
    return true;
  },
});

try {
  Reflect.set(invalidWrite, 'score', 20);
} catch (error) {
  console.log('9. Locked data set invariant error:', error.name);
  // Expected output: TypeError
}

console.log('10. Locked score remains:', lockedWriteTarget.score);
// Expected output: 10

console.log('11. Same-value success is allowed:', Reflect.set(invalidWrite, 'score', 10));
// Expected output: true

const forwardedWrite = new Proxy(lockedWriteTarget, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});

console.log('12. Forwarded different-value result:', Reflect.set(forwardedWrite, 'score', 20));
// Expected output: false

/*
 * 6. set invariant: accessor without a setter
 *
 * A set trap cannot declare success for a non-configurable own accessor that
 * has no setter.
 */
const readOnlyTarget = {};

Object.defineProperty(readOnlyTarget, 'id', {
  get() {
    return 42;
  },
  set: undefined,
  configurable: false,
});

const invalidReadOnlyWrite = new Proxy(readOnlyTarget, {
  set() {
    return true;
  },
});

try {
  Reflect.set(invalidReadOnlyWrite, 'id', 100);
} catch (error) {
  console.log('13. Setter-less accessor invariant error:', error.name);
  // Expected output: TypeError
}

console.log('14. Read-only accessor value remains:', readOnlyTarget.id);
// Expected output: 42

/*
 * 7. has invariants
 *
 * A has trap cannot hide a non-configurable own property. It also cannot hide
 * any existing own property when the target is non-extensible.
 */
const lockedHasTarget = {};

Object.defineProperty(lockedHasTarget, 'id', {
  value: 42,
  configurable: false,
});

const invalidLockedHas = new Proxy(lockedHasTarget, {
  has() {
    return false;
  },
});

try {
  console.log('id' in invalidLockedHas);
} catch (error) {
  console.log('15. Non-configurable has invariant error:', error.name);
  // Expected output: TypeError
}

const fixedHasTarget = {
  name: 'Asha',
};

Object.preventExtensions(fixedHasTarget);

const invalidFixedHas = new Proxy(fixedHasTarget, {
  has() {
    return false;
  },
});

try {
  console.log('name' in invalidFixedHas);
} catch (error) {
  console.log('16. Non-extensible has invariant error:', error.name);
  // Expected output: TypeError
}

/*
 * 8. deleteProperty invariants
 *
 * A deleteProperty trap cannot claim successful deletion while a protected own
 * property still exists on the target.
 */
const lockedDeleteTarget = {};

Object.defineProperty(lockedDeleteTarget, 'id', {
  value: 42,
  configurable: false,
});

const invalidLockedDelete = new Proxy(lockedDeleteTarget, {
  deleteProperty() {
    return true;
  },
});

try {
  Reflect.deleteProperty(invalidLockedDelete, 'id');
} catch (error) {
  console.log('17. Non-configurable delete invariant error:', error.name);
  // Expected output: TypeError
}

const fixedDeleteTarget = {
  name: 'Mina',
};

Object.preventExtensions(fixedDeleteTarget);

const invalidFixedDelete = new Proxy(fixedDeleteTarget, {
  deleteProperty() {
    return true;
  },
});

try {
  Reflect.deleteProperty(invalidFixedDelete, 'name');
} catch (error) {
  console.log('18. Non-extensible delete invariant error:', error.name);
  // Expected output: TypeError
}

/*
 * 9. Actually deleting a configurable property is valid
 *
 * Non-extensible means "cannot add properties," not "cannot delete them."
 * Reflect.deleteProperty() removes the configurable property before returning
 * true, so no contradictory own property remains.
 */
const validFixedDeleteTarget = {
  name: 'Ravi',
};

Object.preventExtensions(validFixedDeleteTarget);

const validFixedDelete = new Proxy(validFixedDeleteTarget, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});

console.log(
  '19. Real deletion from non-extensible target:',
  Reflect.deleteProperty(validFixedDelete, 'name'),
);
// Expected output: true

console.log(
  '20. Configurable property is gone:',
  Object.hasOwn(validFixedDeleteTarget, 'name'),
);
// Expected output: false

/*
 * 10. The trap runs before JavaScript rejects its result
 *
 * Trap code can run and cause side effects before the engine discovers that
 * the returned result violates an invariant.
 */
let trapRan = false;

const observedTarget = {};

Object.defineProperty(observedTarget, 'token', {
  value: 'abc',
  configurable: false,
});

const observedProxy = new Proxy(observedTarget, {
  has() {
    trapRan = true;

    return false;
  },
});

try {
  console.log('token' in observedProxy);
} catch (error) {
  console.log('21. Post-trap invariant error:', error.name);
  // Expected output: TypeError
}

console.log('22. Trap ran before the error:', trapRan);
// Expected output: true
