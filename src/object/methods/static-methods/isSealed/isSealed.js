/*
 * Object.isSealed() checks whether an object is sealed.
 *
 * Syntax:
 * Object.isSealed(object)
 *
 * Sealed means:
 * 1. new properties cannot be added,
 * 2. existing own properties cannot be deleted,
 * 3. existing own properties cannot be reconfigured.
 *
 * Existing writable data-property values can still change.
 */

const profile = {
  name: 'Asha',
};

console.log('1. Regular object is sealed:', Object.isSealed(profile));
// Expected output: false

/*
 * Object.seal() seals the object and returns the same object.
 */
const returnedProfile = Object.seal(profile);

console.log('2. Same object returned:', returnedProfile === profile);
// Expected output: true

console.log('3. After Object.seal():', Object.isSealed(profile));
// Expected output: true

console.log('4. Sealed object is extensible:', Object.isExtensible(profile));
// Expected output: false

/*
 * Sealed properties can still be changed if they are writable.
 */
profile.name = 'Mina';

console.log('5. Existing writable property changed:', profile.name);
// Expected output: Mina

/*
 * A sealed object's own properties cannot be deleted.
 */
const deletedName = Reflect.deleteProperty(profile, 'name');

console.log('6. Delete sealed property:', deletedName);
// Expected output: false

console.log('7. Property still exists:', Object.hasOwn(profile, 'name'));
// Expected output: true

/*
 * A sealed object's own property descriptors cannot be reconfigured.
 */
const nameDescriptor = Object.getOwnPropertyDescriptor(profile, 'name');

console.log('8. Sealed property configurable:', nameDescriptor.configurable);
// Expected output: false

console.log('9. Sealed property writable:', nameDescriptor.writable);
// Expected output: true

try {
  Object.defineProperty(profile, 'name', {
    enumerable: false,
  });
} catch (error) {
  console.log('10. Reconfigure sealed property:', error.name);
}
// Expected output: TypeError

/*
 * Adding new properties fails because sealed objects are non-extensible.
 */
profile.email = 'mina@example.com';

console.log('11. New property was not added:', Object.hasOwn(profile, 'email'));
// Expected output: false

/*
 * A sealed object is not always frozen.
 */
console.log('12. Sealed object is frozen:', Object.isFrozen(profile));
// Expected output: false

Object.freeze(profile);

console.log('13. Frozen object is sealed:', Object.isSealed(profile));
// Expected output: true

console.log('14. Frozen object is frozen:', Object.isFrozen(profile));
// Expected output: true

/*
 * An empty non-extensible object is sealed because there are no own
 * properties left that could be configurable.
 */
const emptyRecord = {};

Object.preventExtensions(emptyRecord);

console.log('15. Empty non-extensible object sealed:', Object.isSealed(emptyRecord));
// Expected output: true

console.log('16. Empty non-extensible object frozen:', Object.isFrozen(emptyRecord));
// Expected output: true

/*
 * A non-empty non-extensible object is not sealed while its own properties are
 * still configurable.
 */
const account = {
  role: 'admin',
};

Object.preventExtensions(account);

console.log('17. Non-extensible with configurable property:', Object.isSealed(account));
// Expected output: false

Object.defineProperty(account, 'role', {
  configurable: false,
});

console.log('18. Non-extensible and non-configurable:', Object.isSealed(account));
// Expected output: true

console.log('19. Still not frozen because writable:', Object.isFrozen(account));
// Expected output: false

account.role = 'owner';

console.log('20. Sealed writable value changed:', account.role);
// Expected output: owner

/*
 * Accessor properties only need to be non-configurable for the sealed check.
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

console.log('21. Accessor object sealed:', Object.isSealed(scoreboard));
// Expected output: true

scoreboard.score = 20;

console.log('22. Accessor setter still ran:', scoreboard.score);
// Expected output: 20

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

console.log('23. Parent object sealed:', Object.isSealed(layout));
// Expected output: true

console.log('24. Nested object sealed:', Object.isSealed(layout.sidebar));
// Expected output: false

console.log('25. Nested property added:', layout.sidebar.collapsed);
// Expected output: true

/*
 * Primitive values are considered sealed in modern JavaScript because they
 * are not objects and cannot be changed by adding or deleting properties.
 */
console.log('26. Number primitive sealed:', Object.isSealed(42));
// Expected output: true

console.log('27. String primitive sealed:', Object.isSealed('hello'));
// Expected output: true

console.log('28. Null sealed:', Object.isSealed(null));
// Expected output: true

console.log('29. Undefined sealed:', Object.isSealed(undefined));
// Expected output: true

/*
 * Strict mode turns failed sealed-object changes into TypeError.
 */
function addPropertyInStrictMode(object) {
  'use strict';
  object.extra = true;
}

try {
  addPropertyInStrictMode(profile);
} catch (error) {
  console.log('30. Strict add error:', error.name);
}
// Expected output: TypeError

function deletePropertyInStrictMode(object) {
  'use strict';
  delete object.name;
}

try {
  deletePropertyInStrictMode(profile);
} catch (error) {
  console.log('31. Strict delete error:', error.name);
}
// Expected output: TypeError
