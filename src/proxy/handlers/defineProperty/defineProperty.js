/*
 * Proxy defineProperty trap
 *
 * The trap intercepts requests to create or change an own property through
 * the proxy's [[DefineOwnProperty]] internal operation.
 *
 * defineProperty(target, property, descriptor) {
 *   return trueOrFalse;
 * }
 *
 * target     = the original wrapped object.
 * property   = the string or symbol key being defined.
 * descriptor = the requested property descriptor.
 * return     = the trap's declared success or failure status.
 */

function getErrorName(callback) {
  try {
    callback();

    return 'No error';
  } catch (error) {
    return error.name;
  }
}

/*
 * 1. Normal forwarding
 *
 * Reflect.defineProperty() performs the normal definition on the target and
 * returns the same boolean status that the trap needs to report.
 */
const definitionLog = [];
const profileTarget = {};

const profileHandler = {
  label: 'profile handler',

  defineProperty(target, property, descriptor) {
    definitionLog.push({
      sameTarget: target === profileTarget,
      property,
      requestedValue: descriptor.value,
      handlerLabel: this.label,
    });

    return Reflect.defineProperty(target, property, descriptor);
  },
};

const profile = new Proxy(profileTarget, profileHandler);

const returnedProfile = Object.defineProperty(profile, 'name', {
  value: 'Asha',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log('1. Defined value:', profile.name);
// Expected output: Asha

console.log('2. Object method returned the proxy:', returnedProfile === profile);
// Expected output: true

console.log(
  '3. Target descriptor:',
  Object.getOwnPropertyDescriptor(profileTarget, 'name'),
);
// Expected output:
// { value: 'Asha', writable: true, enumerable: true, configurable: true }

console.log('4. Values received by the trap:', definitionLog[0]);
// Expected output:
// {
//   sameTarget: true,
//   property: 'name',
//   requestedValue: 'Asha',
//   handlerLabel: 'profile handler'
// }

/*
 * 2. Object.defineProperty() versus Reflect.defineProperty()
 *
 * Both operations run the trap. Reflect exposes a false status directly,
 * while Object.defineProperty() turns that false status into a TypeError.
 */
const rejectedTarget = {};

const rejected = new Proxy(rejectedTarget, {
  defineProperty() {
    return false;
  },
});

console.log(
  '5. Reflect exposes rejected status:',
  Reflect.defineProperty(rejected, 'role', {
    value: 'admin',
    configurable: true,
  }),
);
// Expected output: false

console.log('6. Rejected property was not created:', Object.hasOwn(rejectedTarget, 'role'));
// Expected output: false

console.log(
  '7. Object method converts false to:',
  getErrorName(() => {
    Object.defineProperty(rejected, 'role', {
      value: 'admin',
      configurable: true,
    });
  }),
);
// Expected output: TypeError

/*
 * 3. Performing and reporting are separate jobs
 *
 * Returning true reports success, but it does not define the property.
 */
const unperformedTarget = {};

const unperformed = new Proxy(unperformedTarget, {
  defineProperty() {
    return true;
  },
});

const unperformedResult = Object.defineProperty(unperformed, 'topic', {
  value: 'Proxy',
  configurable: true,
});

console.log('8. Truthy report lets Object method return:', unperformedResult === unperformed);
// Expected output: true

console.log(
  '9. Truthy report did not define the property:',
  Object.hasOwn(unperformedTarget, 'topic'),
);
// Expected output: false

/*
 * Returning false also does not undo work that happened before the return.
 * This deliberately inconsistent trap is for learning, not a pattern to use.
 */
const performedTarget = {};

const performedButRejected = new Proxy(performedTarget, {
  defineProperty(target, property, descriptor) {
    Reflect.defineProperty(target, property, descriptor);

    return false;
  },
});

console.log(
  '10. Trap reported failure after defining:',
  Reflect.defineProperty(performedButRejected, 'level', {
    value: 2,
    configurable: true,
  }),
);
// Expected output: false

console.log('11. Earlier definition still happened:', performedTarget.level);
// Expected output: 2

/*
 * 4. The trap receives a descriptor request
 *
 * Only standard descriptor fields reach the trap. Omitted fields are still
 * absent at this point; normal definition later gives a new property its
 * default false flags.
 */
let receivedDescriptorKeys;
const descriptorTarget = {};

const descriptorProxy = new Proxy(descriptorTarget, {
  defineProperty(target, property, descriptor) {
    receivedDescriptorKeys = Object.keys(descriptor);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(descriptorProxy, 'score', {
  value: 42,
  note: 'custom fields do not reach the trap',
});

console.log('12. Fields received by the trap:', receivedDescriptorKeys);
// Expected output: [ 'value' ]

console.log(
  '13. Completed target descriptor:',
  Object.getOwnPropertyDescriptor(descriptorTarget, 'score'),
);
// Expected output:
// { value: 42, writable: false, enumerable: false, configurable: false }

/*
 * Defining an accessor stores its getter. The definition itself does not run
 * the getter; reading the property does.
 */
let getterRuns = 0;
const accessorTarget = {};

const accessorProxy = new Proxy(accessorTarget, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(accessorProxy, 'total', {
  get() {
    getterRuns += 1;

    return 100;
  },
  enumerable: true,
  configurable: true,
});

console.log('14. Getter runs during definition:', getterRuns);
// Expected output: 0

console.log('15. Accessor value:', accessorProxy.total);
// Expected output: 100

console.log('16. Getter runs after value read:', getterRuns);
// Expected output: 1

/*
 * 5. Object.defineProperties() runs the trap once for each property
 */
const batchLog = [];
const courseTarget = {};

const course = new Proxy(courseTarget, {
  defineProperty(target, property, descriptor) {
    batchLog.push(property);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperties(course, {
  title: {
    value: 'JavaScript',
    enumerable: true,
    configurable: true,
  },
  level: {
    value: 'beginner',
    enumerable: true,
    configurable: true,
  },
});

console.log('17. Batch definition trap calls:', batchLog);
// Expected output: [ 'title', 'level' ]

console.log('18. Batch-defined values:', courseTarget);
// Expected output: { title: 'JavaScript', level: 'beginner' }

/*
 * 6. Assignment can run both set and defineProperty
 *
 * Assignment first requests [[Set]]. Reflect.set() preserves the proxy as the
 * receiver. When normal set behavior creates an own property on that receiver,
 * the receiver's [[DefineOwnProperty]] operation runs the defineProperty trap.
 */
const assignmentLog = [];
const settingsTarget = {};

const settings = new Proxy(settingsTarget, {
  set(target, property, value, receiver) {
    assignmentLog.push(`set:${String(property)}`);

    return Reflect.set(target, property, value, receiver);
  },

  defineProperty(target, property, descriptor) {
    assignmentLog.push(`defineProperty:${String(property)}`);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(settings, 'mode', {
  value: 'study',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log('19. Direct descriptor definition:', assignmentLog);
// Expected output: [ 'defineProperty:mode' ]

assignmentLog.length = 0;
settings.level = 2;

console.log('20. Assignment operation path:', assignmentLog);
// Expected output: [ 'set:level', 'defineProperty:level' ]

console.log('21. Assignment stored on target:', settingsTarget.level);
// Expected output: 2

/*
 * 7. Validation and descriptor transformation
 *
 * Reflect forwarding is not mandatory. A trap may reject a key or create a
 * modified descriptor, provided the result follows Proxy invariants.
 */
const controlledTarget = {};

const controlled = new Proxy(controlledTarget, {
  defineProperty(target, property, descriptor) {
    if (typeof property === 'string' && property.startsWith('_')) {
      return false;
    }

    const publicDescriptor = {
      ...descriptor,
      enumerable: true,
      configurable: true,
    };

    return Reflect.defineProperty(target, property, publicDescriptor);
  },
});

console.log(
  '22. Protected key rejected:',
  Reflect.defineProperty(controlled, '_token', {
    value: 'abc',
    configurable: true,
  }),
);
// Expected output: false

console.log(
  '23. Public key accepted:',
  Reflect.defineProperty(controlled, 'topic', {
    value: 'Proxy',
    writable: true,
  }),
);
// Expected output: true

console.log(
  '24. Transformed descriptor:',
  Object.getOwnPropertyDescriptor(controlledTarget, 'topic'),
);
// Expected output:
// { value: 'Proxy', writable: true, enumerable: true, configurable: true }

/*
 * 8. Property keys are strings or symbols
 *
 * Numeric keys become strings before reaching the trap. Symbols remain
 * symbols.
 */
const secretKey = Symbol('secret');
const keyLog = [];
const keyTarget = {};

const keyProxy = new Proxy(keyTarget, {
  defineProperty(target, property, descriptor) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Reflect.defineProperty(keyProxy, 0, {
  value: 'first',
  configurable: true,
});

Reflect.defineProperty(keyProxy, secretKey, {
  value: 'hidden',
  configurable: true,
});

console.log('25. Numeric and symbol trap keys:', keyLog);
// Expected output: [ '0:string', 'Symbol(secret):symbol' ]

console.log('26. Symbol-defined value:', keyTarget[secretKey]);
// Expected output: hidden

/*
 * 9. Direct target operations bypass the proxy
 */
const bypassLog = [];
const bypassTarget = {};

const bypassProxy = new Proxy(bypassTarget, {
  defineProperty(target, property, descriptor) {
    bypassLog.push(property);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(bypassTarget, 'direct', {
  value: true,
  configurable: true,
});

console.log('27. Log after direct target definition:', bypassLog);
// Expected output: []

Reflect.defineProperty(bypassProxy, 'throughProxy', {
  value: true,
  configurable: true,
});

console.log('28. Log after proxy definition:', bypassLog);
// Expected output: [ 'throughProxy' ]

/*
 * 10. Non-extensible target invariant
 *
 * A truthy trap result cannot claim that a missing property was added while
 * the target remains non-extensible.
 */
const fixedShapeTarget = {};
Object.preventExtensions(fixedShapeTarget);

const impossibleAddition = new Proxy(fixedShapeTarget, {
  defineProperty() {
    return true;
  },
});

console.log(
  '29. Impossible addition error:',
  getErrorName(() => {
    Object.defineProperty(impossibleAddition, 'newKey', {
      value: 1,
      configurable: true,
    });
  }),
);
// Expected output: TypeError

/*
 * 11. Non-configurable property invariant
 *
 * A trap cannot claim that a new property is non-configurable while the target
 * still has no matching non-configurable own property.
 */
const inventedLockTarget = {};

const inventedLock = new Proxy(inventedLockTarget, {
  defineProperty() {
    return true;
  },
});

console.log(
  '30. Invented non-configurable property error:',
  getErrorName(() => {
    Object.defineProperty(inventedLock, 'id', {
      value: 42,
      configurable: false,
    });
  }),
);
// Expected output: TypeError

/*
 * Correct forwarding may create the non-configurable target property before
 * the trap reports true, so this operation is valid.
 */
const realLockTarget = {};

const realLock = new Proxy(realLockTarget, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(realLock, 'id', {
  value: 42,
  configurable: false,
});

console.log('31. Forwarded non-configurable value:', realLockTarget.id);
// Expected output: 42

console.log(
  '32. Forwarded property is really non-configurable:',
  Object.getOwnPropertyDescriptor(realLockTarget, 'id').configurable,
);
// Expected output: false

/*
 * A configurable target property also cannot be reported as non-configurable
 * unless the trap actually performs that transition on the target.
 */
const configurableTarget = {};

Object.defineProperty(configurableTarget, 'status', {
  value: 'ready',
  configurable: true,
});

const pretendedLock = new Proxy(configurableTarget, {
  defineProperty() {
    return true;
  },
});

console.log(
  '33. Pretended configurable-to-locked error:',
  getErrorName(() => {
    Object.defineProperty(pretendedLock, 'status', {
      configurable: false,
    });
  }),
);
// Expected output: TypeError

/*
 * 12. Non-configurable writable transition invariant
 *
 * For a non-configurable target property, a trap cannot merely report that
 * writable changed from true to false. The target must really be non-writable
 * by the time the trap reports success.
 */
const writableTarget = {};

Object.defineProperty(writableTarget, 'score', {
  value: 10,
  writable: true,
  configurable: false,
});

const pretendedReadOnly = new Proxy(writableTarget, {
  defineProperty() {
    return true;
  },
});

console.log(
  '34. Pretended writable-to-read-only error:',
  getErrorName(() => {
    Object.defineProperty(pretendedReadOnly, 'score', {
      writable: false,
    });
  }),
);
// Expected output: TypeError

const realReadOnly = new Proxy(writableTarget, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(realReadOnly, 'score', {
  writable: false,
});

console.log(
  '35. Forwarded writable-to-read-only change:',
  Object.getOwnPropertyDescriptor(writableTarget, 'score').writable,
);
// Expected output: false

/*
 * 13. Existing descriptor compatibility invariant
 *
 * A non-configurable, non-writable value cannot be reported as changed.
 */
const constantTarget = {};

Object.defineProperty(constantTarget, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});

const incompatibleChange = new Proxy(constantTarget, {
  defineProperty() {
    return true;
  },
});

console.log(
  '36. Incompatible descriptor error:',
  getErrorName(() => {
    Object.defineProperty(incompatibleChange, 'version', {
      value: '2.0',
    });
  }),
);
// Expected output: TypeError
