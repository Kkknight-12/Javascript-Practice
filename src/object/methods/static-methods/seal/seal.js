/*
 * Object.seal(object)
 *
 * Seals an object and returns the same object.
 *
 * Sealed means:
 * 1. new own properties cannot be added,
 * 2. existing own properties cannot be deleted,
 * 3. existing own properties cannot be reconfigured.
 *
 * Existing writable data-property values can still change.
 */

const profile = {
  name: 'Asha',
};

console.log('1. Sealed before:', Object.isSealed(profile));
// Expected output: false

const returnedProfile = Object.seal(profile);

console.log('2. Returned same object:', returnedProfile === profile);
// Expected output: true

console.log('3. Sealed after:', Object.isSealed(profile));
// Expected output: true

console.log('4. Extensible after seal:', Object.isExtensible(profile));
// Expected output: false

/*
 * New own properties cannot be added.
 */
profile.email = 'asha@example.com';

console.log('5. New property was added:', Object.hasOwn(profile, 'email'));
// Expected output: false

/*
 * Existing writable properties can still change.
 */
profile.name = 'Mina';

console.log('6. Existing writable value changed:', profile.name);
// Expected output: Mina

/*
 * Existing own properties cannot be deleted.
 * Reflect.deleteProperty() returns false instead of throwing here.
 */
const deletedName = Reflect.deleteProperty(profile, 'name');

console.log('7. Delete sealed property:', deletedName);
// Expected output: false

console.log('8. Property still exists:', Object.hasOwn(profile, 'name'));
// Expected output: true

/*
 * Object.seal() makes existing own properties non-configurable.
 */
const nameDescriptor = Object.getOwnPropertyDescriptor(profile, 'name');

console.log('9. Sealed property configurable:', nameDescriptor.configurable);
// Expected output: false

console.log('10. Sealed property writable:', nameDescriptor.writable);
// Expected output: true

/*
 * Non-configurable means descriptor reconfiguration fails.
 */
try {
  Object.defineProperty(profile, 'name', {
    enumerable: false,
  });
} catch (error) {
  console.log('11. Reconfigure sealed property error:', error.name);
  // Expected output: TypeError
}

/*
 * Updating an existing writable data property's value is still allowed.
 */
Object.defineProperty(profile, 'name', {
  value: 'Knight',
});

console.log('12. defineProperty changed writable value:', profile.name);
// Expected output: Knight

/*
 * A writable sealed data property can be made non-writable.
 * After that, it cannot be made writable again.
 */
Object.defineProperty(profile, 'name', {
  writable: false,
});

console.log(
  '13. Writable after locking value:',
  Object.getOwnPropertyDescriptor(profile, 'name').writable
);
// Expected output: false

try {
  Object.defineProperty(profile, 'name', {
    writable: true,
  });
} catch (error) {
  console.log('14. Make non-writable property writable again:', error.name);
  // Expected output: TypeError
}

/*
 * A sealed object's prototype cannot be changed to a different object.
 */
const defaults = {
  role: 'member',
};

const account = Object.create(defaults);
account.name = 'Asha';

Object.seal(account);

try {
  Object.setPrototypeOf(account, { role: 'admin' });
} catch (error) {
  console.log('15. Prototype change error:', error.name);
  // Expected output: TypeError
}

console.log('16. Prototype stayed the same:', Object.getPrototypeOf(account) === defaults);
// Expected output: true

/*
 * Sealing an object does not seal its prototype object.
 */
defaults.plan = 'free';

console.log('17. New inherited property is visible:', account.plan);
// Expected output: free

console.log('18. plan is own property:', Object.hasOwn(account, 'plan'));
// Expected output: false

/*
 * Accessor properties become non-configurable, but their setters can still run.
 */
let score = 10;
const scoreboard = {};

Object.defineProperty(scoreboard, 'score', {
  get() {
    return score;
  },
  set(nextScore) {
    score = nextScore;
  },
  enumerable: true,
  configurable: true,
});

Object.seal(scoreboard);
scoreboard.score = 20;

console.log('19. Accessor setter still ran:', scoreboard.score);
// Expected output: 20

console.log(
  '20. Accessor configurable after seal:',
  Object.getOwnPropertyDescriptor(scoreboard, 'score').configurable
);
// Expected output: false

/*
 * A sealed object is not always frozen.
 */
const settings = {
  theme: 'dark',
};

Object.seal(settings);

console.log('21. Sealed object frozen:', Object.isFrozen(settings));
// Expected output: false

settings.theme = 'light';

console.log('22. Sealed writable value changed:', settings.theme);
// Expected output: light

Object.freeze(settings);

console.log('23. Frozen object sealed:', Object.isSealed(settings));
// Expected output: true

console.log('24. Frozen object frozen:', Object.isFrozen(settings));
// Expected output: true

/*
 * Object.seal() is shallow.
 * Nested objects are not automatically sealed.
 */
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.seal(layout);
layout.sidebar.collapsed = true;

console.log('25. Parent object sealed:', Object.isSealed(layout));
// Expected output: true

console.log('26. Nested object sealed:', Object.isSealed(layout.sidebar));
// Expected output: false

console.log('27. Nested property added:', layout.sidebar.collapsed);
// Expected output: true

/*
 * Arrays can be sealed too.
 * Existing elements can change, but new elements cannot be added and existing
 * elements cannot be deleted.
 */
const scores = [10, 20];

Object.seal(scores);
scores[0] = 99;
scores[2] = 30;

console.log('28. Sealed array after assignment:', scores);
// Expected output: [ 99, 20 ]

console.log('29. Sealed array has index 2:', Object.hasOwn(scores, 2));
// Expected output: false

console.log('30. Delete sealed array element:', Reflect.deleteProperty(scores, 1));
// Expected output: false

/*
 * Null-prototype objects can be sealed.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

Object.seal(dictionary);
dictionary.level = 'beginner';

console.log('31. Null-prototype dictionary keys:', Object.keys(dictionary));
// Expected output: [ 'topic' ]

console.log('32. Null-prototype dictionary sealed:', Object.isSealed(dictionary));
// Expected output: true

/*
 * Primitive values are returned as-is in modern JavaScript.
 */
console.log('33. Primitive return value:', Object.seal(42));
// Expected output: 42

console.log('34. Null return value:', Object.seal(null));
// Expected output: null

/*
 * In strict mode, adding or deleting properties on a sealed object throws.
 */
const strictProfile = Object.seal({
  name: 'Asha',
});

function addEmailStrictly() {
  'use strict';
  strictProfile.email = 'asha@example.com';
}

try {
  addEmailStrictly();
} catch (error) {
  console.log('35. Strict add error:', error.name);
  // Expected output: TypeError
}

function deleteNameStrictly() {
  'use strict';
  delete strictProfile.name;
}

try {
  deleteNameStrictly();
} catch (error) {
  console.log('36. Strict delete error:', error.name);
  // Expected output: TypeError
}
