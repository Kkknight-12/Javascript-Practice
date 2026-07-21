/*
 * Proxy getPrototypeOf trap
 *
 * The trap controls which immediate prototype is reported for the proxy.
 *
 * getPrototypeOf(target) {
 *   return prototypeObjectOrNull;
 * }
 *
 * target = the original wrapped object.
 * return = an object or null.
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
 * Reflect.getPrototypeOf(target) reads the target's actual immediate
 * prototype. Returning it preserves normal prototype-inspection behavior.
 */
const sharedProfile = {
  describe() {
    return `${this.name} is learning Proxy`;
  },
};

const profileTarget = Object.create(sharedProfile);
profileTarget.name = 'Asha';

const prototypeLog = [];

const profileHandler = {
  label: 'profile handler',

  getPrototypeOf(target) {
    prototypeLog.push({
      sameTarget: target === profileTarget,
      handlerLabel: this.label,
    });

    return Reflect.getPrototypeOf(target);
  },
};

const profile = new Proxy(profileTarget, profileHandler);

console.log(
  '1. Object method gets the immediate prototype:',
  Object.getPrototypeOf(profile) === sharedProfile,
);
// Expected output: true

console.log(
  '2. Reflect method gets the immediate prototype:',
  Reflect.getPrototypeOf(profile) === sharedProfile,
);
// Expected output: true

console.log('3. Values received by the trap:', prototypeLog[0]);
// Expected output:
// { sameTarget: true, handlerLabel: 'profile handler' }

console.log(
  '4. The next prototype is Object.prototype:',
  Object.getPrototypeOf(Object.getPrototypeOf(profile)) === Object.prototype,
);
// Expected output: true

console.log('5. Inherited behavior still works:', profile.describe());
// Expected output: Asha is learning Proxy

/*
 * 2. An omitted trap forwards automatically
 *
 * A Proxy does not require every trap. With no getPrototypeOf trap,
 * JavaScript asks the target for its actual prototype.
 */
const automaticTarget = Object.create(sharedProfile);
const automaticProxy = new Proxy(automaticTarget, {});

console.log(
  '6. Empty handler forwards automatically:',
  Object.getPrototypeOf(automaticProxy) === sharedProfile,
);
// Expected output: true

/*
 * 3. Operations that invoke getPrototypeOf
 *
 * These five operations all need prototype information. Each one reaches the
 * proxy's [[GetPrototypeOf]] internal operation and runs this trap.
 */
function VirtualRecord() {}

// instanceof looks for this object in the value's reported prototype chain.
const reportedPrototype = VirtualRecord.prototype;
reportedPrototype.kind = 'virtual record';

let triggerTrapRuns = 0;

const triggerProxy = new Proxy({}, {
  getPrototypeOf() {
    triggerTrapRuns += 1;

    return reportedPrototype;
  },
});

console.log(
  '7. Object.getPrototypeOf() invokes the trap:',
  Object.getPrototypeOf(triggerProxy) === reportedPrototype,
);
// Expected output: true

console.log(
  '8. Reflect.getPrototypeOf() invokes the trap:',
  Reflect.getPrototypeOf(triggerProxy) === reportedPrototype,
);
// Expected output: true

/*
 * __proto__ is a legacy accessor inherited from Object.prototype. Its getter
 * asks its receiver, triggerProxy, for [[GetPrototypeOf]], so the trap runs.
 */
console.log(
  '9. Legacy __proto__ getter invokes the trap:',
  triggerProxy.__proto__ === reportedPrototype,
);
// Expected output: true

console.log(
  '10. isPrototypeOf() invokes the trap:',
  reportedPrototype.isPrototypeOf(triggerProxy),
);
// Expected output: true

console.log(
  '11. Standard instanceof invokes the trap:',
  triggerProxy instanceof VirtualRecord,
);
// Expected output: true

console.log('12. Trap ran once for each operation:', triggerTrapRuns);
// Expected output: 5

/*
 * 4. A virtual prototype is a report, not a mutation
 *
 * An extensible target allows the trap to report a different prototype.
 * The target's actual prototype remains unchanged.
 */
const actualPrototype = {
  source: 'actual prototype',
};

const virtualPrototype = {
  source: 'reported prototype',

  describe() {
    return `${this.name} uses virtual behavior`;
  },
};

const virtualTarget = Object.create(actualPrototype);
virtualTarget.name = 'Mina';

const virtualProxy = new Proxy(virtualTarget, {
  getPrototypeOf() {
    return virtualPrototype;
  },
});

console.log(
  '13. Proxy reports the virtual prototype:',
  Object.getPrototypeOf(virtualProxy) === virtualPrototype,
);
// Expected output: true

console.log(
  '14. Target keeps its actual prototype:',
  Object.getPrototypeOf(virtualTarget) === actualPrototype,
);
// Expected output: true

/*
 * Ordinary property reads still follow the target's actual lookup behavior.
 * Merely reporting virtualPrototype does not insert it into that lookup chain.
 */
console.log('15. Property lookup uses the actual chain:', virtualProxy.source);
// Expected output: actual prototype

console.log('16. Virtual method is not found automatically:', virtualProxy.describe);
// Expected output: undefined

/*
 * 5. Coordinating getPrototypeOf with get
 *
 * If virtualPrototype should also supply behavior, a get trap must implement
 * that policy explicitly. Existing target properties take priority here.
 */
const coordinatedTarget = {
  name: 'Ravi',
};

const coordinatedPrototype = {
  describe() {
    return `${this.name} uses coordinated virtual behavior`;
  },
};

const coordinatedProxy = new Proxy(coordinatedTarget, {
  getPrototypeOf() {
    return coordinatedPrototype;
  },

  get(target, property, receiver) {
    // Preserve the target and its actual prototype chain when they contain the
    // requested property.
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property, receiver);
    }

    // Otherwise, deliberately ask the reported prototype for the value.
    return Reflect.get(coordinatedPrototype, property, receiver);
  },
});

console.log(
  '17. Coordinated prototype report:',
  Object.getPrototypeOf(coordinatedProxy) === coordinatedPrototype,
);
// Expected output: true

console.log('18. Coordinated virtual method:', coordinatedProxy.describe());
// Expected output: Ravi uses coordinated virtual behavior

/*
 * 6. Returning null
 *
 * null is a valid result because it means there is no next prototype in the
 * reported chain.
 */
const dictionaryTarget = Object.create(null);
const dictionary = new Proxy(dictionaryTarget, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});

console.log('19. Forwarded null prototype:', Object.getPrototypeOf(dictionary));
// Expected output: null

/*
 * An extensible ordinary target may also be reported as having a null
 * prototype, even though its actual prototype is still Object.prototype.
 */
const virtualNullTarget = {};
const virtualNullProxy = new Proxy(virtualNullTarget, {
  getPrototypeOf() {
    return null;
  },
});

console.log('20. Virtual null report:', Object.getPrototypeOf(virtualNullProxy));
// Expected output: null

console.log(
  '21. Object.prototype is absent from the reported chain:',
  Object.prototype.isPrototypeOf(virtualNullProxy),
);
// Expected output: false

console.log(
  '22. Property lookup still reaches actual Object.prototype:',
  typeof virtualNullProxy.toString,
);
// Expected output: function

/*
 * 7. Object.create(proxy) does not inspect the proxy's prototype
 *
 * Object.create(parentProxy) uses parentProxy itself as the new object's
 * immediate prototype. It does not first run parentProxy's getPrototypeOf trap.
 */
let parentTrapRuns = 0;

const parentTarget = {
  greet() {
    return 'hello from the proxy parent';
  },
};

const parentProxy = new Proxy(parentTarget, {
  getPrototypeOf(target) {
    parentTrapRuns += 1;

    return Reflect.getPrototypeOf(target);
  },
});

const child = Object.create(parentProxy);

console.log(
  '23. The proxy itself became the child prototype:',
  Object.getPrototypeOf(child) === parentProxy,
);
// Expected output: true

console.log('24. Parent trap has not run:', parentTrapRuns);
// Expected output: 0

console.log('25. Child inherits through the proxy:', child.greet());
// Expected output: hello from the proxy parent

console.log('26. Property inheritance did not inspect parent prototype:', parentTrapRuns);
// Expected output: 0

Object.getPrototypeOf(parentProxy);

console.log('27. Inspecting the parent proxy runs its trap:', parentTrapRuns);
// Expected output: 1

/*
 * 8. The return value must be an object or null
 *
 * A primitive result cannot represent a prototype, so JavaScript rejects it.
 */
const invalidProxy = new Proxy({}, {
  getPrototypeOf() {
    return 'not a prototype object';
  },
});

console.log(
  '28. Primitive prototype result:',
  getErrorName(() => Object.getPrototypeOf(invalidProxy)),
);
// Expected output: TypeError

/*
 * 9. Non-extensible target invariant
 *
 * Once the target is non-extensible, the trap must report the target's actual
 * prototype exactly. Reporting a different object contradicts that fixed fact.
 */
const lockedTarget = Object.preventExtensions({});
const differentPrototype = {};

const incompatibleLockedProxy = new Proxy(lockedTarget, {
  getPrototypeOf() {
    return differentPrototype;
  },
});

console.log(
  '29. Different prototype for locked target:',
  getErrorName(() => Reflect.getPrototypeOf(incompatibleLockedProxy)),
);
// Expected output: TypeError

const compatibleLockedProxy = new Proxy(lockedTarget, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});

console.log(
  '30. Actual prototype for locked target is valid:',
  Object.getPrototypeOf(compatibleLockedProxy) === Object.prototype,
);
// Expected output: true

/*
 * A report can be valid while a target is extensible and become invalid after
 * the target is made non-extensible.
 */
const changingTarget = {};
const changingPrototype = {};

const changingProxy = new Proxy(changingTarget, {
  getPrototypeOf() {
    return changingPrototype;
  },
});

console.log(
  '31. Virtual report while target is extensible:',
  Object.getPrototypeOf(changingProxy) === changingPrototype,
);
// Expected output: true

Object.preventExtensions(changingTarget);

console.log(
  '32. Same report after target is locked:',
  getErrorName(() => Object.getPrototypeOf(changingProxy)),
);
// Expected output: TypeError

/*
 * 10. Direct target access bypasses the proxy
 */
let bypassTrapRuns = 0;
const bypassTarget = {};

const bypassProxy = new Proxy(bypassTarget, {
  getPrototypeOf(target) {
    bypassTrapRuns += 1;

    return Reflect.getPrototypeOf(target);
  },
});

Object.getPrototypeOf(bypassTarget);

console.log('33. Direct target inspection bypassed the trap:', bypassTrapRuns);
// Expected output: 0

Object.getPrototypeOf(bypassProxy);

console.log('34. Proxy inspection ran the trap:', bypassTrapRuns);
// Expected output: 1
