/*
 * Proxy set trap
 *
 * The set trap runs whenever a property is written through a proxy.
 *
 * set(target, property, value, receiver) {
 *   return trueOrFalse;
 * }
 *
 * target   = the original wrapped object.
 * property = the string or symbol key being written.
 * value    = the new value.
 * receiver = the object through which the write started, usually the proxy.
 */

/*
 * 1. Normal forwarding
 *
 * The trap records each write, then Reflect.set() performs the normal
 * assignment and reports whether it succeeded.
 */
const writeLog = [];

const profileTarget = {
  name: 'Asha',
};

let profile;

profile = new Proxy(profileTarget, {
  set(target, property, value, receiver) {
    const receiverName = receiver === profile ? 'proxy' : 'another object';
    writeLog.push(`${String(property)}=${String(value)}:${receiverName}`);

    return Reflect.set(target, property, value, receiver);
  },
});

profile.name = 'Mina';
profile['topic'] = 'Proxy';

console.log('1. Target name after dot assignment:', profileTarget.name);
// Expected output: Mina

console.log('2. Target topic after bracket assignment:', profileTarget.topic);
// Expected output: Proxy

console.log('3. Write log:', writeLog);
// Expected output: [ 'name=Mina:proxy', 'topic=Proxy:proxy' ]

console.log('4. Reflect.set on proxy succeeded:', Reflect.set(profile, 'level', 'beginner'));
// Expected output: true

console.log('5. Forwarded level on target:', profileTarget.level);
// Expected output: beginner

/*
 * 2. Validation
 *
 * Validate the proposed value before forwarding. Invalid writes throw before
 * Reflect.set() runs, so the target keeps its previous value.
 */
const progressTarget = {
  score: 10,
};

const progress = new Proxy(progressTarget, {
  set(target, property, value, receiver) {
    if (property === 'score') {
      const validScore = Number.isInteger(value) && value >= 0;

      if (!validScore) {
        throw new TypeError('score must be a non-negative integer');
      }
    }

    return Reflect.set(target, property, value, receiver);
  },
});

progress.score = 42;

console.log('6. Valid score:', progressTarget.score);
// Expected output: 42

try {
  progress.score = -1;
} catch (error) {
  console.log('7. Invalid score error:', error.message);
  // Expected output: score must be a non-negative integer
}

console.log('8. Invalid write did not change score:', progressTarget.score);
// Expected output: 42

/*
 * 3. Returning true does not perform the write
 *
 * The trap reports success but never calls Reflect.set() or assigns the value.
 */
const pretendTarget = {
  count: 1,
};

const pretendWrite = new Proxy(pretendTarget, {
  set() {
    return true;
  },
});

console.log('9. Pretend write reports success:', Reflect.set(pretendWrite, 'count', 2));
// Expected output: true

console.log('10. Target count after pretend write:', pretendTarget.count);
// Expected output: 1

/*
 * 4. Returning false reports failure
 *
 * Reflect.set() returns false directly. A normal assignment in strict mode
 * turns the same failed result into a TypeError.
 */
const rejectedTarget = {
  count: 1,
};

const rejectedWrite = new Proxy(rejectedTarget, {
  set() {
    return false;
  },
});

console.log('11. Reflect.set rejected result:', Reflect.set(rejectedWrite, 'count', 2));
// Expected output: false

console.log('12. Rejected write kept target value:', rejectedTarget.count);
// Expected output: 1

try {
  (function strictAssignment() {
    'use strict';

    rejectedWrite.count = 2;
  })();
} catch (error) {
  console.log('13. Strict assignment failure:', error.name);
  // Expected output: TypeError
}

/*
 * 5. Numeric and symbol keys
 *
 * Numeric indexes arrive as string keys. Symbols remain symbols.
 */
const secretKey = Symbol('secret');
const keyLog = [];
const keyedTarget = {};

const keyedObject = new Proxy(keyedTarget, {
  set(target, property, value, receiver) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.set(target, property, value, receiver);
  },
});

keyedObject[0] = 'zero';
keyedObject[secretKey] = 'hidden';

console.log('14. Numeric and symbol key log:', keyLog);
// Expected output: [ '0:string', 'Symbol(secret):symbol' ]

console.log('15. Numeric key value:', keyedTarget[0]);
// Expected output: zero

console.log('16. Symbol key value:', keyedTarget[secretKey]);
// Expected output: hidden

/*
 * 6. Array methods can trigger set
 *
 * push() writes a numeric index and updates length. The trap validates index
 * values while allowing the array's numeric length update.
 */
const arrayWriteLog = [];

const numbers = new Proxy([], {
  set(target, property, value, receiver) {
    arrayWriteLog.push(`${String(property)}=${String(value)}`);

    if (property !== 'length' && typeof value !== 'number') {
      throw new TypeError('Only numbers are allowed');
    }

    return Reflect.set(target, property, value, receiver);
  },
});

numbers.push(10);
numbers.push(20);

console.log('17. Number-only array:', numbers);
// Expected output: [ 10, 20 ]

console.log('18. push() write log:', arrayWriteLog);
// Expected output: [ '0=10', 'length=1', '1=20', 'length=2' ]

try {
  numbers.push('invalid');
} catch (error) {
  console.log('19. Invalid array value error:', error.message);
  // Expected output: Only numbers are allowed
}

console.log('20. Invalid push did not change array:', numbers);
// Expected output: [ 10, 20 ]

/*
 * 7. Inheriting object as receiver
 *
 * teamSettings inherits from settingsProxy. The set trap uses settingsTarget
 * for the property rules, while Reflect.set() places the new own value on the
 * receiver, teamSettings.
 */
const settingsTarget = {
  theme: 'light',
};

const receiverWriteLog = [];
let settingsProxy;

settingsProxy = new Proxy(settingsTarget, {
  set(target, property, value, receiver) {
    const receiverName = receiver === settingsProxy ? 'proxy' : 'teamSettings';
    receiverWriteLog.push(`${String(property)}:${receiverName}`);

    return Reflect.set(target, property, value, receiver);
  },
});

const teamSettings = Object.create(settingsProxy);
teamSettings.theme = 'dark';

console.log('21. Target theme remains:', settingsTarget.theme);
// Expected output: light

console.log('22. Receiver theme:', teamSettings.theme);
// Expected output: dark

console.log('23. Receiver owns theme:', Object.hasOwn(teamSettings, 'theme'));
// Expected output: true

console.log('24. Receiver write log:', receiverWriteLog);
// Expected output: [ 'theme:teamSettings' ]

/*
 * 8. Locked-property invariant
 *
 * A set trap cannot claim that an incompatible write succeeded for an own
 * property that is both non-writable and non-configurable.
 */
const lockedTarget = {};

Object.defineProperty(lockedTarget, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});

const dishonestWrite = new Proxy(lockedTarget, {
  set() {
    return true;
  },
});

try {
  Reflect.set(dishonestWrite, 'version', '2.0');
} catch (error) {
  console.log('25. Locked property invariant error:', error.name);
  // Expected output: TypeError
}

console.log('26. Locked target value:', lockedTarget.version);
// Expected output: 1.0

/*
 * 9. Direct target writes bypass the proxy
 *
 * The guarded write is rejected through the proxy. Writing the target directly
 * skips the trap, so outside code must use the proxy to receive its behavior.
 */
let interceptedWriteCount = 0;

const stockTarget = {
  count: 5,
};

const guardedStock = new Proxy(stockTarget, {
  set(target, property, value, receiver) {
    interceptedWriteCount += 1;

    if (property === 'count' && value < 0) {
      throw new RangeError('count cannot be negative');
    }

    return Reflect.set(target, property, value, receiver);
  },
});

try {
  guardedStock.count = -1;
} catch (error) {
  console.log('27. Proxy write rejected:', error.message);
  // Expected output: count cannot be negative
}

stockTarget.count = -1;

console.log('28. Direct target write value:', guardedStock.count);
// Expected output: -1

console.log('29. Intercepted write count:', interceptedWriteCount);
// Expected output: 1
