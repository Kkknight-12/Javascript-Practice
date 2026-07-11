/*
 * Proxy deleteProperty trap
 *
 * The deleteProperty trap runs when a property is deleted through a proxy.
 *
 * deleteProperty(target, property) {
 *   return trueOrFalse;
 * }
 *
 * target   = the original wrapped object.
 * property = the string or symbol key requested for deletion.
 */

/*
 * 1. Normal forwarding
 *
 * The trap logs the request, then Reflect.deleteProperty() performs the normal
 * deletion and returns its boolean result.
 */
const deletionLog = [];

const profileTarget = {
  name: 'Asha',
  topic: 'Proxy',
};

const profile = new Proxy(profileTarget, {
  deleteProperty(target, property) {
    deletionLog.push(String(property));

    return Reflect.deleteProperty(target, property);
  },
});

console.log('1. delete result:', delete profile.topic);
// Expected output: true

console.log('2. topic remains on target:', Object.hasOwn(profileTarget, 'topic'));
// Expected output: false

console.log(
  '3. Reflect.deleteProperty result:',
  Reflect.deleteProperty(profile, 'name'),
);
// Expected output: true

console.log('4. Deleted keys:', deletionLog);
// Expected output: [ 'topic', 'name' ]

console.log('5. Missing-property deletion:', Reflect.deleteProperty(profile, 'missing'));
// Expected output: true

/*
 * 2. Performing and reporting are separate jobs
 *
 * Returning true does not perform a deletion. Returning false does not undo a
 * deletion that the trap already performed.
 */
const pretendTarget = {
  temporary: 'keep me',
};

const pretendDeletion = new Proxy(pretendTarget, {
  deleteProperty() {
    // Declare success without deleting anything.
    return true;
  },
});

console.log(
  '6. Pretend deletion reports success:',
  Reflect.deleteProperty(pretendDeletion, 'temporary'),
);
// Expected output: true

console.log('7. Pretend deletion kept property:', pretendTarget.temporary);
// Expected output: keep me

const contradictoryTarget = {
  temporary: 'remove me',
};

const contradictoryDeletion = new Proxy(contradictoryTarget, {
  deleteProperty(target, property) {
    // Perform the deletion, but deliberately declare failure.
    Reflect.deleteProperty(target, property);

    return false;
  },
});

console.log(
  '8. Contradictory deletion reports failure:',
  Reflect.deleteProperty(contradictoryDeletion, 'temporary'),
);
// Expected output: false

console.log(
  '9. Property was still deleted:',
  Object.hasOwn(contradictoryTarget, 'temporary'),
);
// Expected output: false

/*
 * 3. Protecting a property
 *
 * Returning false rejects deletion of id. Reflect.deleteProperty() exposes the
 * false result directly. Strict-mode delete turns that false into a TypeError.
 */
const accountTarget = {
  id: 101,
  nickname: 'coder',
};

const account = new Proxy(accountTarget, {
  deleteProperty(target, property) {
    if (property === 'id') {
      return false;
    }

    return Reflect.deleteProperty(target, property);
  },
});

console.log('10. Protected deletion result:', Reflect.deleteProperty(account, 'id'));
// Expected output: false

console.log('11. Protected property remains:', account.id);
// Expected output: 101

console.log(
  '12. Allowed deletion result:',
  Reflect.deleteProperty(account, 'nickname'),
);
// Expected output: true

try {
  (function strictDeletion() {
    'use strict';

    delete account.id;
  })();
} catch (error) {
  console.log('13. Strict deletion failure:', error.name);
  // Expected output: TypeError
}

/*
 * 4. Deletion affects own properties only
 *
 * role is inherited from sharedProfile. Deleting role from the target succeeds
 * because there is no own role to remove, but the inherited value remains.
 */
const sharedProfile = {
  role: 'learner',
};

const learnerTarget = Object.create(sharedProfile);
learnerTarget.name = 'Mina';

const learner = new Proxy(learnerTarget, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});

console.log('14. Delete inherited key result:', delete learner.role);
// Expected output: true

console.log('15. Inherited value remains readable:', learner.role);
// Expected output: learner

console.log('16. Target owns role:', Object.hasOwn(learnerTarget, 'role'));
// Expected output: false

/*
 * 5. Numeric and symbol keys
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
  deleteProperty(target, property) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.deleteProperty(target, property);
  },
});

delete keyedObject[0];
delete keyedObject[secretKey];

console.log('17. Numeric and symbol key log:', keyLog);
// Expected output: [ '0:string', 'Symbol(secret):symbol' ]

console.log('18. Remaining own keys:', Reflect.ownKeys(keyedTarget));
// Expected output: []

/*
 * 6. Deleting an array index
 *
 * Deleting an index removes that property. It does not shift later elements or
 * reduce the array's length, so an empty slot remains.
 */
const itemDeletionLog = [];

const items = new Proxy(['first', 'second', 'third'], {
  deleteProperty(target, property) {
    itemDeletionLog.push(String(property));

    return Reflect.deleteProperty(target, property);
  },
});

console.log('19. Array index deletion result:', delete items[1]);
// Expected output: true

console.log('20. Array length stays the same:', items.length);
// Expected output: 3

console.log('21. Deleted index still exists:', 1 in items);
// Expected output: false

console.log('22. Array deletion log:', itemDeletionLog);
// Expected output: [ '1' ]

/*
 * 7. Non-configurable own-property invariant
 *
 * A trap cannot return true while a non-configurable own property still exists
 * on the target.
 */
const lockedTarget = {};

Object.defineProperty(lockedTarget, 'id', {
  value: 42,
  configurable: false,
});

const invalidLockedDeletion = new Proxy(lockedTarget, {
  deleteProperty() {
    return true;
  },
});

try {
  Reflect.deleteProperty(invalidLockedDeletion, 'id');
} catch (error) {
  console.log('23. Non-configurable invariant error:', error.name);
  // Expected output: TypeError
}

console.log('24. Locked property remains:', lockedTarget.id);
// Expected output: 42

/*
 * 8. Non-extensible target invariant
 *
 * A trap cannot merely report success while an own property remains on a
 * non-extensible target. A forwarding trap may still delete a configurable
 * property because it performs the deletion before returning true.
 */
const fixedTarget = {
  name: 'Asha',
};

Object.preventExtensions(fixedTarget);

const invalidFixedDeletion = new Proxy(fixedTarget, {
  deleteProperty() {
    return true;
  },
});

try {
  Reflect.deleteProperty(invalidFixedDeletion, 'name');
} catch (error) {
  console.log('25. Non-extensible invariant error:', error.name);
  // Expected output: TypeError
}

const forwardingFixedTarget = {
  name: 'Mina',
};

Object.preventExtensions(forwardingFixedTarget);

const forwardingFixedDeletion = new Proxy(forwardingFixedTarget, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});

console.log(
  '26. Configurable property actually deleted:',
  Reflect.deleteProperty(forwardingFixedDeletion, 'name'),
);
// Expected output: true

console.log(
  '27. Forwarded deletion removed property:',
  Object.hasOwn(forwardingFixedTarget, 'name'),
);
// Expected output: false

/*
 * 9. Direct target deletion bypasses the proxy
 *
 * Only operations requested through the proxy reach its trap.
 */
let interceptedDeletionCount = 0;

const sessionTarget = {
  token: 'abc',
  theme: 'dark',
};

const session = new Proxy(sessionTarget, {
  deleteProperty(target, property) {
    interceptedDeletionCount += 1;

    return Reflect.deleteProperty(target, property);
  },
});

delete session.token;
delete sessionTarget.theme;

console.log('28. Intercepted deletion count:', interceptedDeletionCount);
// Expected output: 1

console.log('29. Final session target:', sessionTarget);
// Expected output: {}
