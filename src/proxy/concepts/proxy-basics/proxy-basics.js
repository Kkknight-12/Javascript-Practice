/*
 * Proxy basics
 *
 * new Proxy(target, handler) creates a proxy object.
 *
 * target  = the original object.
 * handler = an object that contains trap methods.
 *
 * A trap is a function that intercepts an operation such as:
 * - reading a property,
 * - writing a property,
 * - checking if a property exists,
 * - deleting a property.
 */

const profileTarget = {
  name: 'Asha',
  topic: 'objects',
};

/*
 * An empty handler means there are no custom traps.
 * The proxy forwards normal object behavior to the target.
 */
const openProfile = new Proxy(profileTarget, {});

console.log('1. Empty handler reads target:', openProfile.name);
// Expected output: Asha

openProfile.topic = 'Proxy basics';

console.log('2. Empty handler writes target:', profileTarget.topic);
// Expected output: Proxy basics

console.log('3. Proxy and target are different objects:', openProfile === profileTarget);
// Expected output: false

/*
 * A get trap runs when a property is read through the proxy.
 *
 * In get(target, property, receiver):
 * - target is the original object.
 * - property is the key being read.
 * - receiver is the object that started the read, usually the proxy.
 *
 * Reflect.get(target, property, receiver) keeps the normal property-read
 * behavior after we add our custom logging.
 */
const readLog = [];

const learnerTarget = {
  name: 'Mina',
  topic: 'Proxy',
};

const loggedLearner = new Proxy(learnerTarget, {
  get(target, property, receiver) {
    readLog.push(String(property));

    return Reflect.get(target, property, receiver);
  },
});

console.log('4. get trap result:', loggedLearner.name);
// Expected output: Mina

console.log('5. get trap log:', readLog);
// Expected output: [ 'name' ]

/*
 * A get trap can also provide a default for missing properties.
 */
const settings = new Proxy(
  {
    theme: 'dark',
  },
  {
    get(target, property, receiver) {
      if (Reflect.has(target, property)) {
        return Reflect.get(target, property, receiver);
      }

      return 'not set';
    },
  },
);

console.log('6. Missing property default:', settings.language);
// Expected output: not set

/*
 * A set trap runs when a property is written through the proxy.
 *
 * In set(target, property, value, receiver):
 * - target is the original object.
 * - property is the key being written.
 * - value is the new value being assigned.
 * - receiver is the object that started the write, usually the proxy.
 *
 * The set trap should return true when the write is accepted.
 * Reflect.set(...) performs the normal write and returns a boolean result.
 */
const progressTarget = {
  score: 10,
};

const checkedProgress = new Proxy(progressTarget, {
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

checkedProgress.score = 42;

console.log('7. Valid set updates target:', progressTarget.score);
// Expected output: 42

try {
  checkedProgress.score = -1;
} catch (error) {
  console.log('8. Invalid set error:', error.message);
  // Expected output: score must be a non-negative integer
}

console.log('9. Invalid set did not change target:', progressTarget.score);
// Expected output: 42

/*
 * A has trap runs for the in operator.
 * A deleteProperty trap runs for the delete operator.
 */
const credentialsTarget = {
  username: 'asha',
  password: 'secret',
};

const credentials = new Proxy(credentialsTarget, {
  has(target, property) {
    if (property === 'password') {
      return false;
    }

    return Reflect.has(target, property);
  },

  deleteProperty(target, property) {
    if (property === 'password') {
      return false;
    }

    return Reflect.deleteProperty(target, property);
  },
});

console.log('10. username in proxy:', 'username' in credentials);
// Expected output: true

console.log('11. password in proxy:', 'password' in credentials);
// Expected output: false

console.log('12. Delete username through proxy:', delete credentials.username);
// Expected output: true

console.log('13. username after delete:', 'username' in credentials);
// Expected output: false

console.log('14. Delete password blocked:', delete credentials.password);
// Expected output: false

console.log('15. password still exists on target:', Object.hasOwn(credentialsTarget, 'password'));
// Expected output: true

/*
 * Important:
 * Proxy traps only run when the operation goes through the proxy.
 * Direct access to the original target bypasses the proxy.
 */
const stockTarget = {
  count: 5,
};

const guardedStock = new Proxy(stockTarget, {
  set(target, property, value, receiver) {
    if (property === 'count' && value < 0) {
      throw new RangeError('count cannot be negative');
    }

    return Reflect.set(target, property, value, receiver);
  },
});

try {
  guardedStock.count = -3;
} catch (error) {
  console.log('16. Proxy write was blocked:', error.message);
  // Expected output: count cannot be negative
}

stockTarget.count = -3;

console.log('17. Direct target write bypasses proxy:', guardedStock.count);
// Expected output: -3
