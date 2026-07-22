/*
 * Proxy setPrototypeOf trap
 *
 * The trap intercepts requests to change the proxy's immediate prototype.
 *
 * setPrototypeOf(target, prototype) {
 *   return trueOrFalse;
 * }
 *
 * target    = the original wrapped object.
 * prototype = the exact requested new prototype object, or null.
 * return    = the trap's declared success or failure status.
 */

function getErrorName(callback) {
  try {
    callback();

    return 'No error';
  } catch (error) {
    return error.name;
  }
}

function getErrorMessage(callback) {
  try {
    callback();

    return 'No error';
  } catch (error) {
    return error.message;
  }
}

/*
 * 1. Normal forwarding
 *
 * Reflect.setPrototypeOf() performs the normal change on the target and
 * returns the boolean status that the trap needs to report.
 */
const sharedBehavior = {
  describe() {
    return `${this.name} can use shared behavior`;
  },
};

const profileTarget = {
  name: 'Asha',
};

const prototypeChangeLog = [];

const profileHandler = {
  label: 'profile handler',

  setPrototypeOf(target, prototype) {
    prototypeChangeLog.push({
      sameTarget: target === profileTarget,
      sameRequestedPrototype: prototype === sharedBehavior,
      handlerLabel: this.label,
    });

    return Reflect.setPrototypeOf(target, prototype);
  },
};

const profile = new Proxy(profileTarget, profileHandler);

console.log('1. Before the change:', profile.describe);
// Expected output: undefined

const returnedProfile = Object.setPrototypeOf(profile, sharedBehavior);

console.log('2. Object method returns the proxy:', returnedProfile === profile);
// Expected output: true

console.log(
  '3. Target received the exact prototype object:',
  Object.getPrototypeOf(profileTarget) === sharedBehavior,
);
// Expected output: true

console.log('4. Inherited method works:', profile.describe());
// Expected output: Asha can use shared behavior

console.log('5. Values received by the trap:', prototypeChangeLog[0]);
// Expected output:
// {
//   sameTarget: true,
//   sameRequestedPrototype: true,
//   handlerLabel: 'profile handler'
// }

/*
 * 2. An omitted trap forwards automatically
 *
 * A Proxy does not require every trap. If setPrototypeOf is absent,
 * JavaScript asks the target to perform its normal [[SetPrototypeOf]] work.
 */
const automaticTarget = {};
const automaticPrototype = {
  source: 'automatic forwarding',
};
const automaticProxy = new Proxy(automaticTarget, {});

console.log(
  '6. Empty handler reports success:',
  Reflect.setPrototypeOf(automaticProxy, automaticPrototype),
);
// Expected output: true

console.log(
  '7. Empty handler changed the target:',
  Object.getPrototypeOf(automaticTarget) === automaticPrototype,
);
// Expected output: true

/*
 * 3. Operations that invoke setPrototypeOf
 *
 * These operations all request [[SetPrototypeOf]] on the proxy. The legacy
 * __proto__ setter is shown for recognition; prefer Object or Reflect.
 */
let triggerTrapRuns = 0;
const triggerTarget = {};

const triggerProxy = new Proxy(triggerTarget, {
  setPrototypeOf(target, prototype) {
    triggerTrapRuns += 1;

    return Reflect.setPrototypeOf(target, prototype);
  },
});

const objectPrototype = {
  setBy: 'Object',
};

const reflectPrototype = {
  setBy: 'Reflect',
};

const legacyPrototype = {
  setBy: '__proto__',
};

Object.setPrototypeOf(triggerProxy, objectPrototype);

console.log('8. Object.setPrototypeOf() ran the trap:', triggerTrapRuns);
// Expected output: 1

Reflect.setPrototypeOf(triggerProxy, reflectPrototype);

console.log('9. Reflect.setPrototypeOf() ran the trap:', triggerTrapRuns);
// Expected output: 2

triggerProxy.__proto__ = legacyPrototype;

console.log('10. Legacy __proto__ setter ran the trap:', triggerTrapRuns);
// Expected output: 3

console.log(
  '11. Last requested prototype was installed:',
  Object.getPrototypeOf(triggerTarget) === legacyPrototype,
);
// Expected output: true

/*
 * 4. Returning true does not perform the change
 *
 * This trap reports success but never asks the target to change. The target is
 * extensible, so this misleading success report does not violate an invariant.
 */
const unperformedTarget = {};
const requestedButUninstalled = {};

const unperformedProxy = new Proxy(unperformedTarget, {
  setPrototypeOf() {
    return true;
  },
});

const unperformedResult = Object.setPrototypeOf(
  unperformedProxy,
  requestedButUninstalled,
);

console.log(
  '12. Truthy report lets Object method return:',
  unperformedResult === unperformedProxy,
);
// Expected output: true

console.log(
  '13. Truthy report did not change the target:',
  Object.getPrototypeOf(unperformedTarget) === Object.prototype,
);
// Expected output: true

console.log(
  '14. Requested prototype was not installed:',
  Object.getPrototypeOf(unperformedTarget) !== requestedButUninstalled,
);
// Expected output: true

/*
 * 5. Returning false does not undo earlier work
 *
 * This deliberately inconsistent trap changes the target first, then reports
 * failure. The false status does not restore the old prototype.
 */
const performedTarget = {};
const installedButRejected = {};

const performedButRejectedProxy = new Proxy(performedTarget, {
  setPrototypeOf(target, prototype) {
    Reflect.setPrototypeOf(target, prototype);

    return false;
  },
});

console.log(
  '15. Reflect receives the false report:',
  Reflect.setPrototypeOf(performedButRejectedProxy, installedButRejected),
);
// Expected output: false

console.log(
  '16. Earlier prototype change still happened:',
  Object.getPrototypeOf(performedTarget) === installedButRejected,
);
// Expected output: true

/*
 * 6. Rejecting a request with false
 *
 * Reflect exposes false directly. Object converts the same false status into
 * a TypeError. Neither caller changes the target because the trap does no work.
 */
const rejectedTarget = {};
const rejectedPrototype = {};

const rejectedProxy = new Proxy(rejectedTarget, {
  setPrototypeOf() {
    return false;
  },
});

console.log(
  '17. Reflect exposes rejection:',
  Reflect.setPrototypeOf(rejectedProxy, rejectedPrototype),
);
// Expected output: false

console.log(
  '18. Object converts rejection to:',
  getErrorName(() => Object.setPrototypeOf(rejectedProxy, rejectedPrototype)),
);
// Expected output: TypeError

console.log(
  '19. Rejected target stayed unchanged:',
  Object.getPrototypeOf(rejectedTarget) === Object.prototype,
);
// Expected output: true

/*
 * 7. Rejecting by throwing
 *
 * A thrown error is propagated by both callers. Use this when a prototype
 * change should always fail with a specific explanation.
 */
const throwingProxy = new Proxy({}, {
  setPrototypeOf() {
    throw new Error('Prototype changes are disabled');
  },
});

console.log(
  '20. Reflect receives the custom error:',
  getErrorMessage(() => Reflect.setPrototypeOf(throwingProxy, {})),
);
// Expected output: Prototype changes are disabled

console.log(
  '21. Object receives the custom error:',
  getErrorMessage(() => Object.setPrototypeOf(throwingProxy, {})),
);
// Expected output: Prototype changes are disabled

/*
 * 8. Truthy and falsy coercion
 *
 * JavaScript converts the trap result to a boolean. Returning actual booleans
 * is clearer, especially when the status comes from Reflect.setPrototypeOf().
 */
const truthyStatusProxy = new Proxy({}, {
  setPrototypeOf() {
    return 'accepted';
  },
});

console.log(
  '22. Truthy result becomes true:',
  Reflect.setPrototypeOf(truthyStatusProxy, {}),
);
// Expected output: true

const falsyStatusProxy = new Proxy({}, {
  setPrototypeOf() {
    return 0;
  },
});

console.log(
  '23. Falsy result becomes false:',
  Reflect.setPrototypeOf(falsyStatusProxy, {}),
);
// Expected output: false

/*
 * 9. Setting the prototype to null
 *
 * null is a valid request. Normal forwarding removes the target's prototype
 * link, so inherited Object.prototype methods are no longer found.
 */
const dictionaryTarget = {
  topic: 'Proxy',
};

const dictionary = new Proxy(dictionaryTarget, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});

console.log(
  '24. Null prototype request succeeded:',
  Reflect.setPrototypeOf(dictionary, null),
);
// Expected output: true

console.log('25. Target prototype is null:', Object.getPrototypeOf(dictionaryTarget));
// Expected output: null

console.log('26. Inherited toString is gone:', typeof dictionary.toString);
// Expected output: undefined

/*
 * 10. Invalid prototype values are rejected before the trap
 *
 * Object.setPrototypeOf() and Reflect.setPrototypeOf() accept only an object
 * or null as the requested prototype. A primitive never reaches this trap.
 */
let validationTrapRuns = 0;

const validationProxy = new Proxy({}, {
  setPrototypeOf(target, prototype) {
    validationTrapRuns += 1;

    return Reflect.setPrototypeOf(target, prototype);
  },
});

console.log(
  '27. Object rejects primitive prototype:',
  getErrorName(() => Object.setPrototypeOf(validationProxy, 'invalid')),
);
// Expected output: TypeError

console.log(
  '28. Reflect rejects primitive prototype:',
  getErrorName(() => Reflect.setPrototypeOf(validationProxy, 42)),
);
// Expected output: TypeError

console.log('29. Validation failures did not run the trap:', validationTrapRuns);
// Expected output: 0

/*
 * 11. Prototype cycles are normal failures
 *
 * Making target inherit from one of its own descendants would create a cycle.
 * Reflect.setPrototypeOf(target, prototype) rejects that change with false.
 */
const cycleTarget = {};
const descendant = Object.create(cycleTarget);

const cycleProxy = new Proxy(cycleTarget, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});

console.log(
  '30. Reflect reports cycle rejection:',
  Reflect.setPrototypeOf(cycleProxy, descendant),
);
// Expected output: false

console.log(
  '31. Object turns cycle rejection into:',
  getErrorName(() => Object.setPrototypeOf(cycleProxy, descendant)),
);
// Expected output: TypeError

console.log(
  '32. Failed cycle did not change target:',
  Object.getPrototypeOf(cycleTarget) === Object.prototype,
);
// Expected output: true

/*
 * 12. Non-extensible target invariant
 *
 * A non-extensible target cannot change to a different prototype. Honest
 * Reflect forwarding returns false, which is a valid rejection report.
 */
const lockedPrototype = {
  plan: 'free',
};

const lockedTarget = Object.create(lockedPrototype);
Object.preventExtensions(lockedTarget);

const lockedProxy = new Proxy(lockedTarget, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});

const differentLockedPrototype = {
  plan: 'pro',
};

console.log(
  '33. Reflect forwards locked-target failure:',
  Reflect.setPrototypeOf(lockedProxy, differentLockedPrototype),
);
// Expected output: false

console.log(
  '34. Object turns locked-target failure into:',
  getErrorName(() => {
    Object.setPrototypeOf(lockedProxy, differentLockedPrototype);
  }),
);
// Expected output: TypeError

console.log(
  '35. Locked target kept its prototype:',
  Object.getPrototypeOf(lockedTarget) === lockedPrototype,
);
// Expected output: true

/*
 * A trap cannot report success for that impossible different-prototype change.
 * JavaScript checks the target and throws even though Reflect was the caller.
 */
const lyingLockedProxy = new Proxy(lockedTarget, {
  setPrototypeOf() {
    return true;
  },
});

console.log(
  '36. Impossible success report:',
  getErrorName(() => {
    Reflect.setPrototypeOf(lyingLockedProxy, differentLockedPrototype);
  }),
);
// Expected output: TypeError

/*
 * Requesting the exact prototype that a non-extensible target already has is
 * allowed. No change is needed, so reporting true is consistent with reality.
 */
console.log(
  '37. Same-prototype success report is valid:',
  Reflect.setPrototypeOf(lyingLockedProxy, lockedPrototype),
);
// Expected output: true

/*
 * 13. Using a proxy as another object's prototype
 *
 * Object.create(parentProxy) and Object.setPrototypeOf(child, parentProxy)
 * modify the child relationship. They do not change parentProxy itself, so
 * parentProxy's setPrototypeOf trap does not run.
 */
let parentTrapRuns = 0;

const parentTarget = {
  greet() {
    return 'hello from the proxy parent';
  },
};

const parentProxy = new Proxy(parentTarget, {
  setPrototypeOf(target, prototype) {
    parentTrapRuns += 1;

    return Reflect.setPrototypeOf(target, prototype);
  },
});

const childCreatedWithProxy = Object.create(parentProxy);
const childChangedToProxy = {};

Object.setPrototypeOf(childChangedToProxy, parentProxy);

console.log('38. Using proxy as parent did not run its trap:', parentTrapRuns);
// Expected output: 0

console.log('39. Created child inherits through proxy:', childCreatedWithProxy.greet());
// Expected output: hello from the proxy parent

console.log('40. Changed child inherits through proxy:', childChangedToProxy.greet());
// Expected output: hello from the proxy parent

Object.setPrototypeOf(parentProxy, {});

console.log('41. Changing parent proxy itself ran the trap:', parentTrapRuns);
// Expected output: 1

/*
 * 14. Direct target mutation bypasses the proxy
 */
let bypassTrapRuns = 0;
const bypassTarget = {};

const bypassProxy = new Proxy(bypassTarget, {
  setPrototypeOf(target, prototype) {
    bypassTrapRuns += 1;

    return Reflect.setPrototypeOf(target, prototype);
  },
});

Object.setPrototypeOf(bypassTarget, {});

console.log('42. Direct target change bypassed the trap:', bypassTrapRuns);
// Expected output: 0

Object.setPrototypeOf(bypassProxy, {});

console.log('43. Proxy change ran the trap:', bypassTrapRuns);
// Expected output: 1
