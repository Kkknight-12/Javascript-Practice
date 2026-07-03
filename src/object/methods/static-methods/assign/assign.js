/*
 * Object.assign(target, ...sources)
 *
 * Copies enumerable own properties from one or more source objects into a
 * target object.
 *
 * It returns the same target object after modifying it.
 */

const target = {
  theme: 'light',
};

const source = {
  language: 'en',
};

const returnedTarget = Object.assign(target, source);

console.log('1. Modified target:', target);
// Expected output: { theme: 'light', language: 'en' }

console.log('2. Returned value is target:', returnedTarget === target);
// Expected output: true

/*
 * Later sources overwrite earlier sources when they use the same property key.
 */
const defaults = {
  theme: 'light',
  notifications: true,
  layout: 'comfortable',
};

const userSettings = {
  theme: 'dark',
};

const runtimeSettings = {
  layout: 'compact',
};

const mergedSettings = Object.assign(
  {},
  defaults,
  userSettings,
  runtimeSettings
);

console.log('3. Later source wins:', mergedSettings);
// Expected output: { theme: 'dark', notifications: true, layout: 'compact' }

/*
 * Object.assign() makes a shallow copy.
 * Nested objects are still shared by reference.
 */
const originalProfile = {
  name: 'Asha',
  progress: {
    lessonsCompleted: 3,
  },
};

const copiedProfile = Object.assign({}, originalProfile);
copiedProfile.progress.lessonsCompleted = 4;

console.log(
  '4. Shallow copy shares nested object:',
  originalProfile.progress.lessonsCompleted
);
// Expected output: 4

/*
 * Object.assign() copies only own enumerable properties.
 * Inherited properties and non-enumerable properties are skipped.
 */
const sharedFields = {
  inheritedRole: 'member',
};

const learner = Object.create(sharedFields);
learner.name = 'Mina';

Object.defineProperty(learner, 'internalId', {
  value: 101,
  enumerable: false,
});

const learnerCopy = Object.assign({}, learner);

console.log('5. Own enumerable copy:', learnerCopy);
// Expected output: { name: 'Mina' }

console.log('6. Inherited property skipped:', learnerCopy.inheritedRole);
// Expected output: undefined

console.log('7. Non-enumerable property skipped:', learnerCopy.internalId);
// Expected output: undefined

/*
 * Enumerable symbol keys are copied too.
 */
const accountId = Symbol('accountId');
const account = {
  username: 'learner',
  [accountId]: 42,
};

const accountCopy = Object.assign({}, account);

console.log('8. Symbol key copied:', accountCopy[accountId]);
// Expected output: 42

/*
 * Object.assign() uses [[Get]] on the source and [[Set]] on the target.
 * That means getters run, and the copied property becomes the getter's value.
 */
const sourceWithGetter = {
  get score() {
    return 95;
  },
};

const getterCopy = Object.assign({}, sourceWithGetter);
const getterCopyDescriptor = Object.getOwnPropertyDescriptor(
  getterCopy,
  'score'
);

console.log('9. Getter value copied:', getterCopy.score);
// Expected output: 95

console.log('10. Getter itself not copied:', getterCopyDescriptor.get);
// Expected output: undefined

/*
 * null and undefined sources are ignored.
 */
const safeCopy = Object.assign({ ready: false }, null, undefined, {
  ready: true,
});

console.log('11. Null and undefined sources ignored:', safeCopy);
// Expected output: { ready: true }

/*
 * null and undefined targets throw because they cannot be converted to objects.
 */
try {
  Object.assign(null, { name: 'Asha' });
} catch (error) {
  console.log('12. Null target error:', error.name);
  // Expected output: TypeError
}

/*
 * If assigning a property fails, copying stops.
 * Properties copied before the error remain on the target.
 */
const lockedTarget = {};

Object.defineProperty(lockedTarget, 'blocked', {
  value: 1,
  writable: false,
  enumerable: true,
});

try {
  Object.assign(lockedTarget, {
    copiedBeforeError: true,
    blocked: 2,
    copiedAfterError: true,
  });
} catch (error) {
  console.log('13. Failed assignment error:', error.name);
  // Expected output: TypeError
}

console.log(
  '14. Earlier property remains:',
  Object.hasOwn(lockedTarget, 'copiedBeforeError')
);
// Expected output: true

console.log(
  '15. Later property not copied:',
  Object.hasOwn(lockedTarget, 'copiedAfterError')
);
// Expected output: false
