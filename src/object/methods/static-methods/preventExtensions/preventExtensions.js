/*
 * Object.preventExtensions(object)
 *
 * Makes an object non-extensible.
 *
 * Non-extensible means new own properties cannot be added.
 * Existing writable properties can still change.
 * Existing configurable properties can still be deleted.
 */

const profile = {
  name: 'Asha',
};

console.log('1. Extensible before:', Object.isExtensible(profile));
// Expected output: true

const returnedProfile = Object.preventExtensions(profile);

console.log('2. Returned same object:', returnedProfile === profile);
// Expected output: true

console.log('3. Extensible after:', Object.isExtensible(profile));
// Expected output: false

/*
 * New own properties cannot be added.
 * In non-strict mode, assignment fails silently.
 */
profile.email = 'asha@example.com';

console.log('4. New property was added:', Object.hasOwn(profile, 'email'));
// Expected output: false

/*
 * Existing writable properties can still change.
 */
profile.name = 'Mina';

console.log('5. Existing property changed:', profile.name);
// Expected output: Mina

/*
 * Existing configurable properties can still be deleted.
 * Object literal properties are configurable by default.
 */
delete profile.name;

console.log('6. Existing property deleted:', Object.hasOwn(profile, 'name'));
// Expected output: false

/*
 * After deletion, adding the same property back is still adding a new property.
 */
profile.name = 'Asha';

console.log('7. Deleted property added back:', Object.hasOwn(profile, 'name'));
// Expected output: false

/*
 * Object.defineProperty() also cannot add a new property to a non-extensible
 * object.
 */
const settings = {
  theme: 'dark',
};

Object.preventExtensions(settings);

try {
  Object.defineProperty(settings, 'language', {
    value: 'JavaScript',
  });
} catch (error) {
  console.log('8. defineProperty new property error:', error.name);
  // Expected output: TypeError
}

/*
 * Object.defineProperty() can still update an existing property when normal
 * descriptor rules allow it.
 */
Object.defineProperty(settings, 'theme', {
  value: 'light',
});

console.log('9. Existing property updated with defineProperty:', settings.theme);
// Expected output: light

/*
 * A non-extensible object's prototype cannot be changed to a different object.
 */
const defaults = {
  plan: 'free',
};

const account = Object.create(defaults);
account.name = 'Asha';

Object.preventExtensions(account);

try {
  Object.setPrototypeOf(account, { plan: 'pro' });
} catch (error) {
  console.log('10. Prototype change error:', error.name);
  // Expected output: TypeError
}

console.log('11. Prototype stayed the same:', Object.getPrototypeOf(account) === defaults);
// Expected output: true

/*
 * Object.preventExtensions() blocks new own properties on the target object.
 * It does not block new inherited properties being added to the prototype.
 */
defaults.region = 'global';

console.log('12. New inherited property is visible:', account.region);
// Expected output: global

console.log('13. region is own property:', Object.hasOwn(account, 'region'));
// Expected output: false

/*
 * Non-extensible does not mean sealed.
 * This object is non-extensible, but its configurable property can still be
 * deleted, so it is not sealed.
 */
const nonExtensibleUser = {
  role: 'admin',
};

Object.preventExtensions(nonExtensibleUser);

console.log('14. Is extensible:', Object.isExtensible(nonExtensibleUser));
// Expected output: false

console.log('15. Is sealed before descriptor change:', Object.isSealed(nonExtensibleUser));
// Expected output: false

Object.defineProperty(nonExtensibleUser, 'role', {
  configurable: false,
});

console.log('16. Is sealed after descriptor change:', Object.isSealed(nonExtensibleUser));
// Expected output: true

/*
 * Non-extensible does not mean frozen.
 * Existing writable data-property values can still change.
 */
nonExtensibleUser.role = 'editor';

console.log('17. Writable value changed:', nonExtensibleUser.role);
// Expected output: editor

console.log('18. Is frozen:', Object.isFrozen(nonExtensibleUser));
// Expected output: false

/*
 * Object.preventExtensions() is shallow.
 * Nested objects are separate objects and can still grow unless they are also
 * made non-extensible.
 */
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.preventExtensions(layout);
layout.sidebar.collapsed = true;

console.log('19. Top-level is extensible:', Object.isExtensible(layout));
// Expected output: false

console.log('20. Nested object is extensible:', Object.isExtensible(layout.sidebar));
// Expected output: true

console.log('21. Nested property was added:', layout.sidebar.collapsed);
// Expected output: true

/*
 * Null-prototype objects can also be made non-extensible.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

Object.preventExtensions(dictionary);
dictionary.level = 'beginner';

console.log('22. Null-prototype dictionary keys:', Object.keys(dictionary));
// Expected output: [ 'topic' ]

console.log('23. Null-prototype dictionary extensible:', Object.isExtensible(dictionary));
// Expected output: false

/*
 * Primitive values are returned as-is in modern JavaScript.
 */
console.log('24. Primitive return value:', Object.preventExtensions(42));
// Expected output: 42

console.log('25. Primitive is extensible:', Object.isExtensible(Object.preventExtensions(42)));
// Expected output: false

/*
 * In strict mode, assigning a new property throws instead of failing silently.
 */
const strictProfile = {};
Object.preventExtensions(strictProfile);

function addEmailStrictly() {
  'use strict';
  strictProfile.email = 'asha@example.com';
}

try {
  addEmailStrictly();
} catch (error) {
  console.log('26. Strict mode add error:', error.name);
  // Expected output: TypeError
}
