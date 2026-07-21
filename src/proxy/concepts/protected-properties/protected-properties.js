/*
 * Proxy protected properties
 *
 * An underscore prefix is only a naming convention:
 *
 *   _password
 *   _token
 *
 * It does not create native privacy. A Proxy can build an access-controlled
 * facade, but several traps must cooperate because reads, writes, existence
 * checks, deletions, listings, descriptors, and definitions are different
 * object operations.
 */

function getResult(callback) {
  try {
    return callback();
  } catch (error) {
    return `${error.name}: ${error.message}`;
  }
}

function getErrorName(callback) {
  try {
    callback();

    return 'No error';
  } catch (error) {
    return error.name;
  }
}

/*
 * 1. An underscore does not create privacy
 */
const ordinaryUser = {
  name: 'Asha',
  _password: 'secret',
};

console.log('1. Ordinary underscore property:', ordinaryUser._password);
// Expected output: secret

/*
 * 2. One trap is not a complete policy
 *
 * Filtering ownKeys() hides _password from key listings, but it does not
 * block a direct read, the in operator, or Object.hasOwn().
 */
const listingOnly = new Proxy(
  {
    name: 'Asha',
    _password: 'secret',
  },
  {
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((property) => {
        return !(
          typeof property === 'string' && property.startsWith('_')
        );
      });
    },
  },
);

console.log('2. Listing-only Object.keys:', Object.keys(listingOnly));
// Expected output: [ 'name' ]

console.log('3. Listing-only direct read:', listingOnly._password);
// Expected output: secret

console.log('4. Listing-only in check:', '_password' in listingOnly);
// Expected output: true

console.log('5. Listing-only Object.hasOwn:', Object.hasOwn(listingOnly, '_password'));
// Expected output: true

/*
 * 3. Shared policy helpers
 *
 * The type check matters because property keys can also be symbols.
 */
function isProtectedProperty(property) {
  return typeof property === 'string' && property.startsWith('_');
}

function denyProtectedOperation(action, property) {
  throw new Error(
    `Cannot ${action} protected property "${String(property)}"`,
  );
}

/*
 * 4. A coordinated handler
 *
 * Each trap controls one part of the public facade. Public keys use their
 * matching Reflect methods so ordinary object behavior is preserved.
 */
function createProtectedHandler() {
  return {
    get(target, property, receiver) {
      if (isProtectedProperty(property)) {
        denyProtectedOperation('read', property);
      }

      return Reflect.get(target, property, receiver);
    },

    set(target, property, value, receiver) {
      if (isProtectedProperty(property)) {
        denyProtectedOperation('write', property);
      }

      return Reflect.set(target, property, value, receiver);
    },

    has(target, property) {
      if (isProtectedProperty(property)) {
        return false;
      }

      return Reflect.has(target, property);
    },

    deleteProperty(target, property) {
      if (isProtectedProperty(property)) {
        denyProtectedOperation('delete', property);
      }

      return Reflect.deleteProperty(target, property);
    },

    ownKeys(target) {
      return Reflect.ownKeys(target).filter((property) => {
        return !isProtectedProperty(property);
      });
    },

    getOwnPropertyDescriptor(target, property) {
      if (isProtectedProperty(property)) {
        return undefined;
      }

      return Reflect.getOwnPropertyDescriptor(target, property);
    },

    defineProperty(target, property, descriptor) {
      if (isProtectedProperty(property)) {
        return false;
      }

      return Reflect.defineProperty(target, property, descriptor);
    },
  };
}

/*
 * Copying the initial state creates a fresh target that is not returned to the
 * caller. Ordinary properties created by object spread are configurable, and
 * the fresh object begins extensible. Both facts matter when keys are hidden.
 */
function createProtectedRecord(initialState) {
  const target = {
    ...initialState,
  };

  return new Proxy(target, createProtectedHandler());
}

const account = createProtectedRecord({
  name: 'Asha',
  role: 'learner',
  _password: 'secret',
});

/*
 * 5. Public operations preserve normal behavior
 */
console.log('6. Public read:', account.name);
// Expected output: Asha

account.role = 'admin';

console.log('7. Public write:', account.role);
// Expected output: admin

console.log('8. Public delete:', delete account.role);
// Expected output: true

console.log('9. Deleted public key exists:', 'role' in account);
// Expected output: false

console.log(
  '10. Public descriptor definition:',
  Reflect.defineProperty(account, 'topic', {
    value: 'Proxy',
    writable: true,
    enumerable: true,
    configurable: true,
  }),
);
// Expected output: true

console.log('11. Public defined value:', account.topic);
// Expected output: Proxy

/*
 * 6. Direct protected operations are rejected
 *
 * Reads, writes, and deletions throw an explicit policy error.
 */
console.log(
  '12. Protected read:',
  getResult(() => account._password),
);
// Expected output:
// Error: Cannot read protected property "_password"

console.log(
  '13. Protected write:',
  getResult(() => {
    account._password = 'changed';

    return 'write accepted';
  }),
);
// Expected output:
// Error: Cannot write protected property "_password"

console.log(
  '14. Protected delete:',
  getResult(() => delete account._password),
);
// Expected output:
// Error: Cannot delete protected property "_password"

/*
 * 7. Existence and descriptor views report protected keys as absent
 */
console.log('15. Protected in check:', '_password' in account);
// Expected output: false

console.log('16. Protected Object.hasOwn:', Object.hasOwn(account, '_password'));
// Expected output: false

console.log(
  '17. Protected descriptor:',
  Object.getOwnPropertyDescriptor(account, '_password'),
);
// Expected output: undefined

/*
 * 8. Listings and copy operations omit protected keys
 *
 * Object spread first lists keys, checks descriptors, and then reads included
 * values. The coordinated traps keep _password out of that pipeline.
 */
console.log('18. Object.keys:', Object.keys(account));
// Expected output: [ 'name', 'topic' ]

console.log(
  '19. Object.getOwnPropertyNames:',
  Object.getOwnPropertyNames(account),
);
// Expected output: [ 'name', 'topic' ]

console.log('20. Reflect.ownKeys:', Reflect.ownKeys(account));
// Expected output: [ 'name', 'topic' ]

console.log('21. Object spread copy:', { ...account });
// Expected output: { name: 'Asha', topic: 'Proxy' }

/*
 * 9. Descriptor definitions for protected keys are rejected
 *
 * Reflect.defineProperty() exposes false. Object.defineProperty() turns the
 * same false status into a TypeError.
 */
console.log(
  '22. Protected Reflect.defineProperty:',
  Reflect.defineProperty(account, '_token', {
    value: 'abc',
    configurable: true,
  }),
);
// Expected output: false

console.log(
  '23. Protected Object.defineProperty:',
  getErrorName(() => {
    Object.defineProperty(account, '_token', {
      value: 'abc',
      configurable: true,
    });
  }),
);
// Expected output: TypeError

console.log('24. Rejected protected key exists:', Object.hasOwn(account, '_token'));
// Expected output: false

/*
 * 10. Symbols are not protected by an underscore-string policy
 *
 * Object.keys() omits symbols by its own rules, but Reflect.ownKeys() reveals
 * them and direct symbol access still works. A symbol is not native privacy.
 */
const internalSymbol = Symbol('internal');

const symbolRecord = createProtectedRecord({
  name: 'Mina',
  [internalSymbol]: 'symbol value',
});

console.log('25. Direct symbol read:', symbolRecord[internalSymbol]);
// Expected output: symbol value

console.log('26. Object.keys omits symbol:', Object.keys(symbolRecord));
// Expected output: [ 'name' ]

console.log('27. Reflect.ownKeys reveals symbol:', Reflect.ownKeys(symbolRecord));
// Expected output: [ 'name', Symbol(internal) ]

/*
 * 11. Methods normally receive the proxy as this
 *
 * checkPassword is a public read, so it is returned. Calling it as a method
 * makes this equal the proxy. Its internal this._password read then runs the
 * get trap and is rejected.
 */
const methodUser = createProtectedRecord({
  _password: 'secret',

  checkPassword(candidate) {
    return candidate === this._password;
  },
});

console.log(
  '28. Method internal protected read:',
  getResult(() => methodUser.checkPassword('secret')),
);
// Expected output:
// Error: Cannot read protected property "_password"

/*
 * 12. Binding methods to the target is one possible workaround
 *
 * A WeakMap caches each bound function so repeated property reads return the
 * same function object. The method's this becomes the target, allowing its
 * internal protected read to bypass the proxy.
 */
const methodTarget = {
  name: 'Asha',
  _password: 'secret',

  checkPassword(candidate) {
    return candidate === this._password;
  },

  rename(nextName) {
    this.name = nextName;
  },
};

const methodSetLog = [];
const boundMethodCache = new WeakMap();
const methodHandler = createProtectedHandler();

methodHandler.get = function getBoundMethod(target, property, receiver) {
  if (isProtectedProperty(property)) {
    denyProtectedOperation('read', property);
  }

  const value = Reflect.get(target, property, receiver);

  if (typeof value !== 'function') {
    return value;
  }

  if (!boundMethodCache.has(value)) {
    boundMethodCache.set(value, value.bind(target));
  }

  return boundMethodCache.get(value);
};

methodHandler.set = function logPublicSet(
  target,
  property,
  value,
  receiver,
) {
  if (isProtectedProperty(property)) {
    denyProtectedOperation('write', property);
  }

  methodSetLog.push(property);

  return Reflect.set(target, property, value, receiver);
};

const trustedMethodsUser = new Proxy(methodTarget, methodHandler);

console.log(
  '29. Bound method can check password:',
  trustedMethodsUser.checkPassword('secret'),
);
// Expected output: true

console.log(
  '30. Cached bound method identity:',
  trustedMethodsUser.checkPassword === trustedMethodsUser.checkPassword,
);
// Expected output: true

trustedMethodsUser.name = 'Mina';
trustedMethodsUser.rename('Ravi');

console.log('31. Public proxy set log:', methodSetLog);
// Expected output: [ 'name' ]

console.log('32. Bound method changed target directly:', trustedMethodsUser.name);
// Expected output: Ravi

/*
 * The direct assignment through the proxy was logged. rename() ran with
 * this === methodTarget, so its internal this.name assignment bypassed the set
 * trap and added no second log entry.
 */

/*
 * 13. Leaking the target bypasses the entire policy
 */
const leakedTarget = {
  name: 'Asha',
  _token: 'original',
};

const guardedLeakedTarget = new Proxy(
  leakedTarget,
  createProtectedHandler(),
);

leakedTarget._token = 'changed directly';

console.log('33. Direct target bypass:', leakedTarget._token);
// Expected output: changed directly

console.log(
  '34. Proxy still rejects protected read:',
  getResult(() => guardedLeakedTarget._token),
);
// Expected output:
// Error: Cannot read protected property "_token"

/*
 * 14. Hiding requires compatible target facts
 *
 * An ordinary property created by an object literal is configurable, and the
 * object is extensible. The policy may legally hide that key.
 */
const compatibleTarget = {
  name: 'Asha',
  _token: 'secret',
};

const compatibleProxy = new Proxy(
  compatibleTarget,
  createProtectedHandler(),
);

console.log(
  '35. Protected property is configurable:',
  Object.getOwnPropertyDescriptor(compatibleTarget, '_token').configurable,
);
// Expected output: true

console.log('36. Target is extensible:', Object.isExtensible(compatibleTarget));
// Expected output: true

console.log('37. Compatible hidden key list:', Reflect.ownKeys(compatibleProxy));
// Expected output: [ 'name' ]

/*
 * 15. A non-configurable protected key cannot be hidden
 */
const lockedTarget = {};

Object.defineProperty(lockedTarget, '_token', {
  value: 'locked',
  configurable: false,
});

const lockedProxy = new Proxy(lockedTarget, createProtectedHandler());

console.log(
  '38. Locked ownKeys hiding error:',
  getErrorName(() => Reflect.ownKeys(lockedProxy)),
);
// Expected output: TypeError

console.log(
  '39. Locked has hiding error:',
  getErrorName(() => '_token' in lockedProxy),
);
// Expected output: TypeError

console.log(
  '40. Locked descriptor hiding error:',
  getErrorName(() => Object.getOwnPropertyDescriptor(lockedProxy, '_token')),
);
// Expected output: TypeError

/*
 * 16. A non-extensible target cannot hide any existing own key
 */
const fixedTarget = {
  name: 'Asha',
  _token: 'secret',
};

Object.preventExtensions(fixedTarget);

const fixedProxy = new Proxy(fixedTarget, createProtectedHandler());

console.log(
  '41. Non-extensible ownKeys hiding error:',
  getErrorName(() => Reflect.ownKeys(fixedProxy)),
);
// Expected output: TypeError

console.log(
  '42. Non-extensible has hiding error:',
  getErrorName(() => '_token' in fixedProxy),
);
// Expected output: TypeError

console.log(
  '43. Non-extensible descriptor hiding error:',
  getErrorName(() => Object.getOwnPropertyDescriptor(fixedProxy, '_token')),
);
// Expected output: TypeError

/*
 * 17. Native private elements are a different language feature
 *
 * #password is enforced by JavaScript. It is not an ordinary property key, so
 * Object and Reflect key-listing methods do not reveal it.
 */
class SecureAccount {
  #password = 'secret';

  checkPassword(candidate) {
    return candidate === this.#password;
  }
}

const secureAccount = new SecureAccount();

console.log('44. Native private method access:', secureAccount.checkPassword('secret'));
// Expected output: true

console.log('45. Native private key listing:', Reflect.ownKeys(secureAccount));
// Expected output: []
