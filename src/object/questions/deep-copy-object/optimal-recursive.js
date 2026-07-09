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
  // Base case: primitives, functions, undefined, symbols, bigints, and null
  // do not have nested object structure for this helper to walk through.
  // `value === null` is needed because typeof null is 'object'.
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    // Array branch: keep the result as an array.
    // map() creates a new array, and every item goes through the same clone logic
    // because an item can also be an object or another array.
    return value.map((item) => deepClonePlain(item));
  }

  // Object branch: Object.entries() gives own enumerable string-keyed pairs.
  // We clone each nested value, then Object.fromEntries() builds a new object
  // from the cloned pairs.
  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => {
      // Keep the same key, but replace the old nested value with its cloned value.
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
