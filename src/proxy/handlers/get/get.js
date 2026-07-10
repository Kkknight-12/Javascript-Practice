/*
 * Proxy get trap
 *
 * The get trap runs whenever a property is read through a proxy.
 *
 * get(target, property, receiver) {
 *   return valueForThisRead;
 * }
 *
 * target   = the original wrapped object.
 * property = the string or symbol key being read.
 * receiver = the object through which the read started, usually the proxy.
 */

/*
 * 1. Normal forwarding
 *
 * This trap records each property read and then uses Reflect.get() to perform
 * the normal read. Dot notation, bracket notation, and Reflect.get(proxy, key)
 * all reach the same trap.
 */
const readLog = [];

const profileTarget = {
  name: 'Asha',
  topic: 'Proxy',

  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const profile = new Proxy(profileTarget, {
  get(target, property, receiver) {
    // String() safely turns both string keys and symbol keys into log text.
    readLog.push(String(property));

    // Forward the real property read after adding the custom logging.
    return Reflect.get(target, property, receiver);
  },
});

console.log('1. Dot notation:', profile.name);
// Expected output: Asha

console.log('2. Bracket notation:', profile['topic']);
// Expected output: Proxy

console.log('3. Reflect.get on proxy:', Reflect.get(profile, 'name'));
// Expected output: Asha

console.log('4. Read log:', readLog);
// Expected output: [ 'name', 'topic', 'name' ]

/*
 * Reading a method also triggers get because JavaScript must first retrieve
 * the function stored in the property. Inside describe(), this is the proxy,
 * so this.name and this.topic are also reads through the proxy.
 */
readLog.length = 0;

console.log('5. Method result:', profile.describe());
// Expected output: Asha is learning Proxy

console.log('6. Method-related reads:', readLog);
// Expected output: [ 'describe', 'name', 'topic' ]

/*
 * 2. Numeric indexes arrive as string keys
 *
 * Even though the source code uses positions[0], the trap receives '0'.
 */
let observedArrayKey;

const positions = new Proxy(['first', 'second'], {
  get(target, property, receiver) {
    observedArrayKey = property;

    return Reflect.get(target, property, receiver);
  },
});

console.log('7. Array index value:', positions[0]);
// Expected output: first

console.log('8. Array index key:', observedArrayKey);
// Expected output: 0

console.log('9. Array index key type:', typeof observedArrayKey);
// Expected output: string

/*
 * 3. Symbol keys
 *
 * A property key can also be a symbol. String(property) is safe for logging a
 * symbol key, while assuming every property is a normal string is not safe.
 */
const privateLabel = Symbol('privateLabel');
const symbolReadLog = [];

const record = new Proxy(
  {
    [privateLabel]: 'internal',
  },
  {
    get(target, property, receiver) {
      symbolReadLog.push(String(property));

      return Reflect.get(target, property, receiver);
    },
  },
);

console.log('10. Symbol property value:', record[privateLabel]);
// Expected output: internal

console.log('11. Symbol read log:', symbolReadLog);
// Expected output: [ 'Symbol(privateLabel)' ]

/*
 * 4. Missing-property fallback
 *
 * Existing translations are read normally. A missing string key is returned
 * as the fallback instead of undefined.
 */
const translations = new Proxy(
  {
    Hello: 'Hola',
    Bye: 'Adios',
  },
  {
    get(target, phrase, receiver) {
      if (Reflect.has(target, phrase)) {
        return Reflect.get(target, phrase, receiver);
      }

      return typeof phrase === 'string' ? phrase : undefined;
    },
  },
);

console.log('12. Existing translation:', translations.Hello);
// Expected output: Hola

console.log('13. Missing translation fallback:', translations.Welcome);
// Expected output: Welcome

/*
 * 5. Virtual property
 *
 * fullName is not stored on the target. The trap computes and returns it only
 * when that property is requested.
 */
const learnerTarget = {
  firstName: 'Mina',
  lastName: 'Shah',
};

const learner = new Proxy(learnerTarget, {
  get(target, property, receiver) {
    if (property === 'fullName') {
      const firstName = Reflect.get(target, 'firstName', receiver);
      const lastName = Reflect.get(target, 'lastName', receiver);

      return `${firstName} ${lastName}`;
    }

    return Reflect.get(target, property, receiver);
  },
});

console.log('14. Virtual fullName:', learner.fullName);
// Expected output: Mina Shah

console.log('15. fullName stored on target:', Object.hasOwn(learnerTarget, 'fullName'));
// Expected output: false

/*
 * 6. Why receiver matters
 *
 * greeting is found through the proxy, but the read starts from student.
 * Reflect.get(..., receiver) calls the getter with student as this, so the
 * getter reads student.name and produces the expected greeting.
 */
const greetingTarget = {
  name: 'target',

  get greeting() {
    return `Hello, ${this.name}`;
  },
};

let greetingProxy;
const receiverLog = [];

greetingProxy = new Proxy(greetingTarget, {
  get(target, property, receiver) {
    receiverLog.push(receiver === greetingProxy ? 'proxy' : 'inheriting object');

    return Reflect.get(target, property, receiver);
  },
});

const student = Object.create(greetingProxy);

// Define an own property directly so this example stays focused on get.
Object.defineProperty(student, 'name', {
  value: 'Ravi',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log('16. Getter with inherited receiver:', student.greeting);
// Expected output: Hello, Ravi

console.log('17. Receiver for greeting read:', receiverLog);
// Expected output: [ 'inheriting object' ]

/*
 * 7. Locked-property invariant
 *
 * JavaScript does not allow a get trap to report a different value for an own
 * data property that is both non-writable and non-configurable.
 */
const lockedTarget = {};

Object.defineProperty(lockedTarget, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});

const dishonestVersion = new Proxy(lockedTarget, {
  get(target, property, receiver) {
    if (property === 'version') {
      return '2.0';
    }

    return Reflect.get(target, property, receiver);
  },
});

try {
  console.log(dishonestVersion.version);
} catch (error) {
  console.log('18. Locked property invariant error:', error.name);
  // Expected output: TypeError
}

console.log('19. Actual locked target value:', lockedTarget.version);
// Expected output: 1.0

/*
 * 8. Direct target reads bypass the proxy
 *
 * Only the read through monitoredStatus reaches the trap.
 */
let interceptedReadCount = 0;

const statusTarget = {
  state: 'ready',
};

const monitoredStatus = new Proxy(statusTarget, {
  get(target, property, receiver) {
    interceptedReadCount += 1;

    return Reflect.get(target, property, receiver);
  },
});

const proxyState = monitoredStatus.state;
const targetState = statusTarget.state;

console.log('20. Proxy and target read same value:', proxyState === targetState);
// Expected output: true

console.log('21. Intercepted read count:', interceptedReadCount);
// Expected output: 1
