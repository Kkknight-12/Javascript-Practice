/*
 * Question: create a deep copy of a plain object.
 *
 * Recursive learning solution:
 * - primitives and null return directly,
 * - arrays are copied item by item,
 * - plain objects are copied property by property.
 *
 * This helper is intentionally for plain objects and arrays.
 */

function deepClonePlain(value) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClonePlain(item));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => {
      return [key, deepClonePlain(nestedValue)];
    }),
  );
}

const originalProfile = {
  name: 'Asha',
  skills: ['JavaScript', { topic: 'objects', level: 'beginner' }],
  settings: {
    theme: 'dark',
    notifications: {
      email: true,
    },
  },
  score: null,
};

const recursiveCopy = deepClonePlain(originalProfile);

console.log('1. Recursive copy:', recursiveCopy);
// Expected output: a copied object with the same data

console.log('2. Top-level object is new:', recursiveCopy !== originalProfile);
// Expected output: true

console.log(
  '3. Nested settings object is new:',
  recursiveCopy.settings !== originalProfile.settings,
);
// Expected output: true

console.log(
  '4. Nested skill object is new:',
  recursiveCopy.skills[1] !== originalProfile.skills[1],
);
// Expected output: true

recursiveCopy.settings.notifications.email = false;
recursiveCopy.skills[1].level = 'advanced';

console.log(
  '5. Original notification unchanged:',
  originalProfile.settings.notifications.email,
);
// Expected output: true

console.log('6. Original skill level unchanged:', originalProfile.skills[1].level);
// Expected output: beginner

console.log('7. Null stays null:', deepClonePlain(null));
// Expected output: null

console.log('8. Primitive stays same:', deepClonePlain('objects'));
// Expected output: objects

/*
 * This recursive helper uses Object.entries(), so it copies own enumerable
 * string-keyed properties only.
 */
const symbolKey = Symbol('privateId');
const symbolSource = {
  name: 'Mina',
  [symbolKey]: 101,
};

const symbolCopy = deepClonePlain(symbolSource);

console.log(
  '9. Symbol key copied by helper:',
  Object.hasOwn(symbolCopy, symbolKey),
);
// Expected output: false
