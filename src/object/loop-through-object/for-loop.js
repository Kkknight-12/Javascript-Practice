/*
 * Loop through an object with Object.keys() and a normal for loop.
 *
 * Objects do not have a numeric length like arrays. First collect the object's
 * keys into an array, then use the index from the for loop to read each key.
 */

const profile = {
  name: 'Asha',
  role: 'developer',
  active: true,
};

const profileKeys = Object.keys(profile);

console.log('1. Object.keys(profile):', profileKeys);
// Expected output: [ 'name', 'role', 'active' ]

for (let index = 0; index < profileKeys.length; index++) {
  const key = profileKeys[index];
  const value = profile[key];

  console.log(`2.${index + 1}. ${key}:`, value);
}
// Expected output:
// 2.1. name: Asha
// 2.2. role: developer
// 2.3. active: true

/*
 * Use bracket notation when the key comes from a variable.
 * profile[key] reads the property named by the variable.
 * profile.key would look for a real property literally named "key".
 */
const dynamicKey = 'role';

console.log('3. profile[dynamicKey]:', profile[dynamicKey]);
// Expected output: developer

console.log('4. profile.dynamicKey:', profile.dynamicKey);
// Expected output: undefined

/*
 * Object.keys() returns own enumerable string keys only.
 * It does not include inherited properties, non-enumerable properties, or
 * symbol keys.
 */
const sharedSettings = {
  plan: 'pro',
};

const settings = Object.create(sharedSettings);
settings.theme = 'dark';
settings.notifications = false;

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

const secretKey = Symbol('secretKey');
settings[secretKey] = 'hidden';

console.log('5. Object.keys(settings):', Object.keys(settings));
// Expected output: [ 'theme', 'notifications' ]

console.log('6. "plan" in settings:', 'plan' in settings);
// Expected output: true

console.log(
  '7. Object.hasOwn(settings, "internalId"):',
  Object.hasOwn(settings, 'internalId')
);
// Expected output: true

/*
 * A normal for loop is useful when you need index-based control,
 * continue, or break.
 */
const taskStatus = {
  setup: 'done',
  notes: 'pending',
  review: 'pending',
};

const taskKeys = Object.keys(taskStatus);
let firstPendingTask = null;

for (let index = 0; index < taskKeys.length; index++) {
  const task = taskKeys[index];

  if (taskStatus[task] !== 'pending') {
    continue;
  }

  firstPendingTask = task;
  break;
}

console.log('8. First pending task:', firstPendingTask);
// Expected output: notes

/*
 * Store Object.keys(object) before the loop.
 * That avoids rebuilding the key array on every iteration and gives the loop
 * a clear list to walk through.
 */
const course = {
  title: 'Objects',
  level: 'beginner',
};

const courseKeys = Object.keys(course);
course.status = 'draft';

console.log('9. Stored keys:', courseKeys);
// Expected output: [ 'title', 'level' ]

console.log('10. Fresh keys after adding status:', Object.keys(course));
// Expected output: [ 'title', 'level', 'status' ]

/*
 * Integer-like keys are ordered before other string keys.
 * Do not use a plain object as a sorted list unless that is really what you
 * mean.
 */
const mixedKeys = {
  100: 'large id',
  2: 'small id',
  name: 'Objects',
};

console.log('11. Numeric-like key order:', Object.keys(mixedKeys));
// Expected output: [ '2', '100', 'name' ]

/*
 * Different tools see different groups of properties.
 * This object has:
 * - one own enumerable string key
 * - one inherited enumerable string key
 * - one own non-enumerable string key
 * - one own symbol key
 */
const inheritedDetails = {
  inheritedPlan: 'pro',
};

const detailedSettings = Object.create(inheritedDetails);
detailedSettings.visibleTheme = 'dark';

Object.defineProperty(detailedSettings, 'internalId', {
  value: 42,
  enumerable: false,
});

const settingsId = Symbol('settingsId');
detailedSettings[settingsId] = 101;

const forInKeys = [];

for (const key in detailedSettings) {
  forInKeys.push(key);
}

console.log('12. for...in keys:', forInKeys);
// Expected output: [ 'visibleTheme', 'inheritedPlan' ]

console.log(
  '13. Object.getOwnPropertyNames(detailedSettings):',
  Object.getOwnPropertyNames(detailedSettings)
);
// Expected output: [ 'visibleTheme', 'internalId' ]

console.log(
  '14. Object.getOwnPropertySymbols(detailedSettings):',
  Object.getOwnPropertySymbols(detailedSettings)
);
// Expected output: [ Symbol(settingsId) ]

console.log(
  '15. Reflect.ownKeys(detailedSettings):',
  Reflect.ownKeys(detailedSettings)
);
// Expected output: [ 'visibleTheme', 'internalId', Symbol(settingsId) ]
