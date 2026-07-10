/*
 * Proxy receiver
 *
 * target   = the original object wrapped by the proxy.
 * receiver = the object through which the operation started.
 *
 * For get, receiver becomes this when a getter runs.
 * For set, receiver becomes this when a setter runs and may receive the
 * written property.
 */

/*
 * 1. Direct proxy read
 *
 * Even in the simplest proxy read, target and receiver are different objects:
 * - target is the wrapped object.
 * - receiver is the proxy used by outside code.
 */
const directTarget = {
  topic: 'Proxy receiver',
};

let directProxy;
let capturedTarget;
let capturedReceiver;

directProxy = new Proxy(directTarget, {
  get(target, property, receiver) {
    capturedTarget = target;
    capturedReceiver = receiver;

    return Reflect.get(target, property, receiver);
  },
});

console.log('1. Direct proxy read:', directProxy.topic);
// Expected output: Proxy receiver

console.log('2. target is wrapped object:', capturedTarget === directTarget);
// Expected output: true

console.log('3. receiver is proxy:', capturedReceiver === directProxy);
// Expected output: true

/*
 * 2. Normal getter inheritance without a proxy
 *
 * Object.create(baseUser) sets baseUser itself as admin's prototype.
 * The inherited getter runs with admin as this, so it reads admin._name.
 */
const baseUser = {
  _name: 'Guest',

  get name() {
    return this._name;
  },
};

const normalAdmin = Object.create(baseUser);

Object.defineProperty(normalAdmin, '_name', {
  value: 'Admin',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log('4. Normal inherited getter:', normalAdmin.name);
// Expected output: Admin

/*
 * 3. Incorrect forwarding with target[property]
 *
 * wrongAdmin inherits from wrongProxy. The get trap receives wrongAdmin as the
 * receiver, but target[property] reads baseUser.name directly. That makes the
 * getter's this equal baseUser, so it returns baseUser._name.
 */
const wrongProxy = new Proxy(baseUser, {
  get(target, property) {
    return target[property];
  },
});

const wrongAdmin = Object.create(wrongProxy);

Object.defineProperty(wrongAdmin, '_name', {
  value: 'Admin',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log('5. target[property] getter result:', wrongAdmin.name);
// Expected output: Guest

/*
 * 4. Correct forwarding with Reflect.get()
 *
 * Reflect.get(target, property, receiver) finds the getter on baseUser but
 * calls it with receiver as this. For admin.name, receiver is admin.
 */
const receiverTrace = [];
let userProxy;

userProxy = new Proxy(baseUser, {
  get(target, property, receiver) {
    const receiverName = receiver === userProxy ? 'proxy' : 'admin';
    receiverTrace.push(`${String(property)}:${receiverName}`);

    return Reflect.get(target, property, receiver);
  },
});

const admin = Object.create(userProxy);

Object.defineProperty(admin, '_name', {
  value: 'Admin',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log('6. Reflect.get getter result:', admin.name);
// Expected output: Admin

console.log('7. Inherited read trace:', receiverTrace);
// Expected output: [ 'name:admin' ]

/*
 * A direct read through userProxy uses the proxy as receiver.
 * The getter then evaluates this._name through the proxy, causing a second get
 * trap call for _name.
 */
receiverTrace.length = 0;

console.log('8. Direct proxy getter result:', userProxy.name);
// Expected output: Guest

console.log('9. Direct proxy read trace:', receiverTrace);
// Expected output: [ 'name:proxy', '_name:proxy' ]

/*
 * 5. Reflect.get() can receive an explicit receiver
 *
 * A receiver affects accessor properties because it becomes the getter's this.
 */
const priceTarget = {
  currency: 'USD',
  amount: 100,

  get label() {
    return `${this.currency} ${this.amount}`;
  },
};

const rupeeView = {
  currency: 'INR',
  amount: 250,
};

console.log('10. Getter with default receiver:', Reflect.get(priceTarget, 'label'));
// Expected output: USD 100

console.log(
  '11. Getter with explicit receiver:',
  Reflect.get(priceTarget, 'label', rupeeView),
);
// Expected output: INR 250

/*
 * A plain data property is read from target. Changing receiver does not replace
 * the stored target value.
 */
console.log(
  '12. Data property ignores receiver value:',
  Reflect.get(priceTarget, 'amount', rupeeView),
);
// Expected output: 100

/*
 * 6. Trap this and getter this are different
 *
 * Inside a trap method, this is the handler object.
 * Inside a getter forwarded by Reflect.get(), this is the receiver.
 */
let trapThisWasHandler = false;

const handler = {
  get(target, property, receiver) {
    trapThisWasHandler = this === handler;

    return Reflect.get(target, property, receiver);
  },
};

const handledValue = new Proxy({ value: 42 }, handler);

console.log('13. Value through handler:', handledValue.value);
// Expected output: 42

console.log('14. Trap this is handler:', trapThisWasHandler);
// Expected output: true

/*
 * 7. Reflect.set() receiver preview
 *
 * When target and receiver differ, Reflect.set() uses the target's property
 * rules but may create the written property on receiver.
 */
const settingsTarget = {
  theme: 'light',
};

const teamSettings = {};

console.log(
  '15. Reflect.set receiver write succeeded:',
  Reflect.set(settingsTarget, 'theme', 'dark', teamSettings),
);
// Expected output: true

console.log('16. Target theme remains:', settingsTarget.theme);
// Expected output: light

console.log('17. Receiver gets own theme:', teamSettings.theme);
// Expected output: dark

console.log('18. Receiver owns theme:', Object.hasOwn(teamSettings, 'theme'));
// Expected output: true

/*
 * For an accessor property, the set receiver becomes the setter's this value.
 */
const scoreTarget = {
  set score(value) {
    this.savedScore = value;
  },
};

const scoreReceiver = {};

console.log(
  '19. Setter receiver write succeeded:',
  Reflect.set(scoreTarget, 'score', 90, scoreReceiver),
);
// Expected output: true

console.log('20. Setter stores on receiver:', scoreReceiver.savedScore);
// Expected output: 90

console.log('21. Target did not receive savedScore:', Object.hasOwn(scoreTarget, 'savedScore'));
// Expected output: false
