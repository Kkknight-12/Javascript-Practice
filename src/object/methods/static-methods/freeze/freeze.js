/*
 * Object.freeze(object)
 *
 * Freezes an object and returns the same object.
 *
 * A frozen object:
 * - cannot receive new properties
 * - cannot delete existing properties
 * - cannot change existing data-property values
 * - cannot reconfigure existing properties
 * - cannot change its prototype
 */

const settings = {
  theme: 'dark',
  notifications: true,
};

const returnedSettings = Object.freeze(settings);

console.log('1. Returned value is same object:', returnedSettings === settings);
// Expected output: true

console.log('2. Object is frozen:', Object.isFrozen(settings));
// Expected output: true

console.log('3. Object is sealed:', Object.isSealed(settings));
// Expected output: true

console.log('4. Object is extensible:', Object.isExtensible(settings));
// Expected output: false

/*
 * In non-strict mode, many changes fail silently.
 */
settings.theme = 'light';
settings.language = 'en';
delete settings.notifications;

console.log('5. Existing value unchanged:', settings.theme);
// Expected output: dark

console.log('6. New property not added:', settings.language);
// Expected output: undefined

console.log('7. Existing property not deleted:', settings.notifications);
// Expected output: true

/*
 * In strict mode, failed writes throw TypeError.
 */
try {
  (function updateFrozenObject() {
    'use strict';
    settings.theme = 'light';
  })();
} catch (error) {
  console.log('8. Strict write error:', error.name);
  // Expected output: TypeError
}

/*
 * Data-property descriptors become non-writable and non-configurable.
 */
const themeDescriptor = Object.getOwnPropertyDescriptor(settings, 'theme');

console.log('9. Frozen data writable:', themeDescriptor.writable);
// Expected output: false

console.log('10. Frozen data configurable:', themeDescriptor.configurable);
// Expected output: false

/*
 * Object.defineProperty() cannot redefine frozen properties.
 */
try {
  Object.defineProperty(settings, 'theme', {
    value: 'system',
  });
} catch (error) {
  console.log('11. Redefine frozen property error:', error.name);
  // Expected output: TypeError
}

/*
 * The prototype cannot be changed after freezing.
 */
try {
  Object.setPrototypeOf(settings, {
    shared: true,
  });
} catch (error) {
  console.log('12. Change prototype error:', error.name);
  // Expected output: TypeError
}

/*
 * Freezing an object does not freeze its prototype object.
 */
const sharedProfile = {
  role: 'learner',
};

const profile = Object.create(sharedProfile);
profile.name = 'Ava';

Object.freeze(profile);
sharedProfile.role = 'mentor';

console.log('13. Prototype object still mutable:', profile.role);
// Expected output: mentor

console.log('14. Prototype object is frozen:', Object.isFrozen(sharedProfile));
// Expected output: false

/*
 * Object.freeze() is shallow.
 * Nested objects are still mutable unless they are frozen too.
 */
const layout = {
  sidebar: {
    collapsed: false,
  },
};

Object.freeze(layout);
layout.sidebar.collapsed = true;

console.log('15. Nested object still changed:', layout.sidebar.collapsed);
// Expected output: true

console.log('16. Nested object is frozen:', Object.isFrozen(layout.sidebar));
// Expected output: false

/*
 * Freezing arrays prevents index changes and length changes.
 */
const scores = [10, 20];

Object.freeze(scores);
scores[0] = 99;

console.log('17. Frozen array value unchanged:', scores[0]);
// Expected output: 10

try {
  scores.push(30);
} catch (error) {
  console.log('18. Frozen array push error:', error.name);
  // Expected output: TypeError
}

/*
 * Accessor properties keep their getter and setter.
 * A setter can still run and update state outside the frozen object.
 */
const hiddenState = {
  value: 1,
};

const counter = {
  get value() {
    return hiddenState.value;
  },
  set value(nextValue) {
    hiddenState.value = nextValue;
  },
};

Object.freeze(counter);
counter.value = 5;

console.log('19. Frozen accessor setter ran:', counter.value);
// Expected output: 5

const accessorDescriptor = Object.getOwnPropertyDescriptor(counter, 'value');

console.log('20. Frozen accessor configurable:', accessorDescriptor.configurable);
// Expected output: false

/*
 * Object.freeze() returns primitive values unchanged.
 */
console.log('21. Freeze number primitive:', Object.freeze(42));
// Expected output: 42

console.log('22. Freeze null:', Object.freeze(null));
// Expected output: null

/*
 * Typed arrays with elements cannot be frozen.
 */
try {
  Object.freeze(new Uint8Array(1));
} catch (error) {
  console.log('23. Typed array with elements error:', error.name);
  // Expected output: TypeError
}

/*
 * A small deepFreeze helper recursively freezes nested objects.
 * The WeakSet prevents infinite loops when objects refer to each other.
 */
function deepFreeze(value, seen = new WeakSet()) {
  if (
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  ) {
    return value;
  }

  if (seen.has(value)) {
    return value;
  }

  seen.add(value);

  for (const key of Reflect.ownKeys(value)) {
    deepFreeze(value[key], seen);
  }

  return Object.freeze(value);
}

const appConfig = {
  theme: {
    mode: 'dark',
  },
};

deepFreeze(appConfig);
appConfig.theme.mode = 'light';

console.log('24. Deep frozen nested value:', appConfig.theme.mode);
// Expected output: dark

console.log(
  '25. Nested object frozen by deepFreeze:',
  Object.isFrozen(appConfig.theme),
);
// Expected output: true
