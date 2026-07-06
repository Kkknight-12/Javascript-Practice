/*
 * Object.isFrozen() checks whether an object is frozen.
 *
 * Syntax:
 * Object.isFrozen(object)
 *
 * Frozen means:
 * 1. new properties cannot be added,
 * 2. existing own properties cannot be deleted or reconfigured,
 * 3. existing own data-property values cannot be changed.
 */

const settings = {
  theme: 'dark',
};

console.log('1. Regular object is frozen:', Object.isFrozen(settings));
// Expected output: false

/*
 * Object.freeze() freezes the object and returns the same object.
 */
const returnedSettings = Object.freeze(settings);

console.log('2. Same object returned:', returnedSettings === settings);
// Expected output: true

console.log('3. After Object.freeze():', Object.isFrozen(settings));
// Expected output: true

console.log('4. Frozen object is extensible:', Object.isExtensible(settings));
// Expected output: false

console.log('5. Frozen object is sealed:', Object.isSealed(settings));
// Expected output: true

settings.theme = 'light';

console.log('6. Frozen data property unchanged:', settings.theme);
// Expected output: dark

settings.language = 'en';

console.log('7. New property was not added:', Object.hasOwn(settings, 'language'));
// Expected output: false

const deletedTheme = Reflect.deleteProperty(settings, 'theme');

console.log('8. Delete frozen property:', deletedTheme);
// Expected output: false

try {
  Object.defineProperty(settings, 'theme', {
    value: 'light',
  });
} catch (error) {
  console.log('9. Redefine frozen property:', error.name);
}
// Expected output: TypeError

/*
 * preventExtensions() alone is not enough when existing properties are still
 * writable or configurable.
 */
const profile = {
  name: 'Asha',
};

Object.preventExtensions(profile);

console.log('10. Non-extensible with writable property:', Object.isFrozen(profile));
// Expected output: false

Object.defineProperty(profile, 'name', {
  writable: false,
  configurable: false,
});

console.log('11. Non-extensible and locked property:', Object.isFrozen(profile));
// Expected output: true

/*
 * An empty non-extensible object is frozen because there are no properties
 * left that could be writable or configurable.
 */
const emptyRecord = {};

Object.preventExtensions(emptyRecord);

console.log('12. Empty non-extensible object:', Object.isFrozen(emptyRecord));
// Expected output: true

/*
 * Sealed objects are not always frozen.
 * A sealed writable data property can still change.
 */
const sealedUser = {
  name: 'Mina',
};

Object.seal(sealedUser);

console.log('13. Sealed object is frozen:', Object.isFrozen(sealedUser));
// Expected output: false

sealedUser.name = 'Ira';

console.log('14. Sealed writable value changed:', sealedUser.name);
// Expected output: Ira

Object.freeze(sealedUser);

console.log('15. Frozen after freeze:', Object.isFrozen(sealedUser));
// Expected output: true

/*
 * Object.freeze() is shallow.
 * Nested objects are not automatically frozen.
 */
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.freeze(layout);

layout.sidebar.width = 320;

console.log('16. Parent object frozen:', Object.isFrozen(layout));
// Expected output: true

console.log('17. Nested object frozen:', Object.isFrozen(layout.sidebar));
// Expected output: false

console.log('18. Nested value changed:', layout.sidebar.width);
// Expected output: 320

/*
 * Arrays can be frozen too.
 */
const numbers = [1, 2, 3];

Object.freeze(numbers);

try {
  numbers.push(4);
} catch (error) {
  console.log('19. Push frozen array error:', error.name);
}
// Expected output: TypeError

console.log('20. Frozen array:', Object.isFrozen(numbers));
// Expected output: true

console.log('21. Frozen array length:', numbers.length);
// Expected output: 3

/*
 * Accessor properties are checked differently from data properties.
 * A non-configurable accessor property can be part of a frozen object.
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
  configurable: false,
});

Object.preventExtensions(scoreboard);

console.log('22. Accessor object frozen:', Object.isFrozen(scoreboard));
// Expected output: true

scoreboard.score = 20;

console.log('23. Accessor setter still ran:', scoreboard.score);
// Expected output: 20

/*
 * Primitive values are considered frozen in modern JavaScript because they
 * are not objects and cannot be changed by adding properties.
 */
console.log('24. Number primitive frozen:', Object.isFrozen(42));
// Expected output: true

console.log('25. String primitive frozen:', Object.isFrozen('hello'));
// Expected output: true

console.log('26. Null frozen:', Object.isFrozen(null));
// Expected output: true

console.log('27. Undefined frozen:', Object.isFrozen(undefined));
// Expected output: true

/*
 * Strict mode turns failed writes to frozen data properties into TypeError.
 */
function updateFrozenObject(object) {
  'use strict';
  object.theme = 'light';
}

try {
  updateFrozenObject(settings);
} catch (error) {
  console.log('28. Strict frozen write error:', error.name);
}
// Expected output: TypeError
