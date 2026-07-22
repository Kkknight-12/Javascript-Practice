/*
 * Proxy isExtensible trap
 *
 * The trap intercepts requests that ask whether the proxy can accept new own
 * properties.
 *
 * isExtensible(target) {
 *   return trueOrFalse;
 * }
 *
 * target = the original wrapped object.
 * return = a boolean-like value that must match the target's actual state.
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
 * Reflect.isExtensible(target) reads the target's real extensibility state.
 * Returning that boolean always preserves the isExtensible invariant.
 */
const profileTarget = {
  name: 'Asha',
};

const extensibilityLog = [];

const profileHandler = {
  label: 'profile handler',

  isExtensible(target) {
    extensibilityLog.push({
      sameTarget: target === profileTarget,
      handlerLabel: this.label,
    });

    return Reflect.isExtensible(target);
  },
};

const profile = new Proxy(profileTarget, profileHandler);

console.log('1. Object method result:', Object.isExtensible(profile));
// Expected output: true

console.log('2. Reflect method result:', Reflect.isExtensible(profile));
// Expected output: true

console.log('3. Values received by the trap:', extensibilityLog[0]);
// Expected output:
// { sameTarget: true, handlerLabel: 'profile handler' }

profile.role = 'developer';

console.log('4. New property added while extensible:', profile.role);
// Expected output: developer

/*
 * 2. An omitted trap forwards automatically
 *
 * A Proxy does not require every trap. With no isExtensible trap, JavaScript
 * asks the target for its actual state.
 */
const automaticTarget = {};
const automaticProxy = new Proxy(automaticTarget, {});

console.log(
  '5. Empty handler forwards extensible state:',
  Object.isExtensible(automaticProxy),
);
// Expected output: true

Object.preventExtensions(automaticTarget);

console.log(
  '6. Empty handler forwards non-extensible state:',
  Object.isExtensible(automaticProxy),
);
// Expected output: false

/*
 * 3. Direct callers
 *
 * Object.isExtensible() and Reflect.isExtensible() both request the proxy's
 * [[IsExtensible]] operation.
 */
let directTrapRuns = 0;

const directProxy = new Proxy({}, {
  isExtensible(target) {
    directTrapRuns += 1;

    return Reflect.isExtensible(target);
  },
});

Object.isExtensible(directProxy);
Reflect.isExtensible(directProxy);

console.log('7. Direct caller trap count:', directTrapRuns);
// Expected output: 2

/*
 * 4. Integrity checks are indirect callers
 *
 * Object.isSealed() and Object.isFrozen() first need to know whether the proxy
 * is extensible. On an extensible object, both checks can immediately answer
 * false after the isExtensible trap reports true.
 */
let integrityTrapRuns = 0;

const integrityProxy = new Proxy({}, {
  isExtensible(target) {
    integrityTrapRuns += 1;

    return Reflect.isExtensible(target);
  },
});

console.log('8. Extensible proxy is sealed:', Object.isSealed(integrityProxy));
// Expected output: false

console.log('9. Extensible proxy is frozen:', Object.isFrozen(integrityProxy));
// Expected output: false

console.log('10. Integrity-check trap count:', integrityTrapRuns);
// Expected output: 2

/*
 * 5. Checking and changing are different operations
 *
 * isExtensible only answers a question. Object.preventExtensions() changes
 * the state through [[PreventExtensions]], so it does not run this trap.
 */
let stateCheckRuns = 0;
const stateTarget = {
  name: 'Mina',
};

const stateProxy = new Proxy(stateTarget, {
  isExtensible(target) {
    stateCheckRuns += 1;

    return Reflect.isExtensible(target);
  },
});

console.log('11. State before prevention:', Object.isExtensible(stateProxy));
// Expected output: true

console.log('12. Check count before prevention:', stateCheckRuns);
// Expected output: 1

Object.preventExtensions(stateProxy);

console.log('13. Prevention itself did not run check trap:', stateCheckRuns);
// Expected output: 1

console.log('14. State after prevention:', Object.isExtensible(stateProxy));
// Expected output: false

console.log('15. Later check ran the trap:', stateCheckRuns);
// Expected output: 2

/*
 * 6. What non-extensible means
 *
 * New own properties cannot be added, but an existing writable property can
 * still change. A different prototype also cannot be installed.
 */
console.log(
  '16. New property definition failed:',
  Reflect.defineProperty(stateProxy, 'level', {
    value: 'advanced',
    configurable: true,
  }),
);
// Expected output: false

stateProxy.name = 'Ira';

console.log('17. Existing writable property changed:', stateProxy.name);
// Expected output: Ira

console.log(
  '18. Different prototype change failed:',
  Reflect.setPrototypeOf(stateProxy, {}),
);
// Expected output: false

/*
 * 7. Invariant: an extensible target cannot be reported as non-extensible
 */
const extensibleTarget = {};

const falseReportProxy = new Proxy(extensibleTarget, {
  isExtensible() {
    return false;
  },
});

console.log(
  '19. False report for extensible target:',
  getErrorName(() => Object.isExtensible(falseReportProxy)),
);
// Expected output: TypeError

console.log('20. Target is actually extensible:', Reflect.isExtensible(extensibleTarget));
// Expected output: true

/*
 * 8. Invariant: a non-extensible target cannot be reported as extensible
 */
const nonExtensibleTarget = Object.preventExtensions({});

const trueReportProxy = new Proxy(nonExtensibleTarget, {
  isExtensible() {
    return true;
  },
});

console.log(
  '21. True report for non-extensible target:',
  getErrorName(() => Reflect.isExtensible(trueReportProxy)),
);
// Expected output: TypeError

console.log(
  '22. Target is actually non-extensible:',
  Reflect.isExtensible(nonExtensibleTarget),
);
// Expected output: false

/*
 * 9. Boolean coercion still has to match
 *
 * The trap result is converted to a boolean before JavaScript compares it with
 * the target's actual boolean state.
 */
const truthyProxy = new Proxy({}, {
  isExtensible() {
    return 'yes';
  },
});

console.log('23. Matching truthy result:', Object.isExtensible(truthyProxy));
// Expected output: true

const falsyTarget = Object.preventExtensions({});

const falsyProxy = new Proxy(falsyTarget, {
  isExtensible() {
    return 0;
  },
});

console.log('24. Matching falsy result:', Object.isExtensible(falsyProxy));
// Expected output: false

/*
 * 10. A hardcoded answer becomes stale
 *
 * Returning true matches this target at first. After the target becomes
 * non-extensible, the same hardcoded answer violates the invariant.
 */
const changingTarget = {};

const hardcodedProxy = new Proxy(changingTarget, {
  isExtensible() {
    return true;
  },
});

console.log('25. Hardcoded true initially matches:', Object.isExtensible(hardcodedProxy));
// Expected output: true

Object.preventExtensions(changingTarget);

console.log(
  '26. Hardcoded true after state change:',
  getErrorName(() => Object.isExtensible(hardcodedProxy)),
);
// Expected output: TypeError

/*
 * 11. Forgetting return produces undefined
 *
 * undefined is converted to false. It mismatches an extensible target, but it
 * can accidentally match a non-extensible target. Both versions are broken
 * forwarding because the result was discarded.
 */
const missingReturnExtensible = new Proxy({}, {
  isExtensible(target) {
    Reflect.isExtensible(target);
  },
});

console.log(
  '27. Missing return on extensible target:',
  getErrorName(() => Object.isExtensible(missingReturnExtensible)),
);
// Expected output: TypeError

const missingReturnTarget = Object.preventExtensions({});

const missingReturnNonExtensible = new Proxy(missingReturnTarget, {
  isExtensible(target) {
    Reflect.isExtensible(target);
  },
});

console.log(
  '28. Missing return accidentally matches false:',
  Object.isExtensible(missingReturnNonExtensible),
);
// Expected output: false

/*
 * 12. Object and Reflect differ for primitive inputs
 *
 * A Proxy is always an object, so both methods run the trap for a proxy. Their
 * difference appears when the argument itself is a primitive, not a proxy.
 */
console.log('29. Object primitive result:', Object.isExtensible(42));
// Expected output: false

console.log(
  '30. Reflect primitive result:',
  getErrorName(() => Reflect.isExtensible(42)),
);
// Expected output: TypeError

/*
 * 13. Direct target checks bypass the proxy
 */
let bypassTrapRuns = 0;
const bypassTarget = {};

const bypassProxy = new Proxy(bypassTarget, {
  isExtensible(target) {
    bypassTrapRuns += 1;

    return Reflect.isExtensible(target);
  },
});

Object.isExtensible(bypassTarget);

console.log('31. Direct target check bypassed the trap:', bypassTrapRuns);
// Expected output: 0

Object.isExtensible(bypassProxy);

console.log('32. Proxy check ran the trap:', bypassTrapRuns);
// Expected output: 1
