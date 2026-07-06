/*
 * Object.isExtensible() checks whether new properties can be added
 * to an object.
 *
 * Syntax:
 * Object.isExtensible(object)
 *
 * New ordinary objects are extensible by default.
 */

const profile = {
  name: 'Asha',
};

console.log('1. New object is extensible:', Object.isExtensible(profile));
// Expected output: true

profile.role = 'developer';

console.log('2. Added property while extensible:', profile.role);
// Expected output: developer

/*
 * Object.preventExtensions() makes an object non-extensible.
 */
const returnedProfile = Object.preventExtensions(profile);

console.log('3. Same object returned:', returnedProfile === profile);
// Expected output: true

console.log('4. After preventExtensions:', Object.isExtensible(profile));
// Expected output: false

profile.email = 'asha@example.com';

console.log('5. New assignment did not add property:', Object.hasOwn(profile, 'email'));
// Expected output: false

try {
  Object.defineProperty(profile, 'level', {
    value: 'advanced',
  });
} catch (error) {
  console.log('6. defineProperty add error:', error.name);
}
// Expected output: TypeError

/*
 * Non-extensible does not mean read-only.
 * Existing writable properties can still change.
 */
profile.name = 'Mina';

console.log('7. Existing property changed:', profile.name);
// Expected output: Mina

/*
 * Non-extensible also does not mean sealed.
 * Configurable properties can still be deleted.
 */
const settings = {
  theme: 'dark',
};

Object.preventExtensions(settings);

delete settings.theme;

console.log('8. Deleted existing property:', Object.hasOwn(settings, 'theme'));
// Expected output: false

settings.theme = 'light';

console.log('9. Deleted property was not re-added:', settings.theme);
// Expected output: undefined

console.log('10. Still non-extensible:', Object.isExtensible(settings));
// Expected output: false

/*
 * Object.seal() and Object.freeze() also make objects non-extensible.
 */
const sealedUser = Object.seal({
  name: 'Ira',
});

const frozenConfig = Object.freeze({
  mode: 'strict',
});

console.log('11. Sealed object extensible:', Object.isExtensible(sealedUser));
// Expected output: false

console.log('12. Frozen object extensible:', Object.isExtensible(frozenConfig));
// Expected output: false

console.log('13. Sealed object is sealed:', Object.isSealed(sealedUser));
// Expected output: true

console.log('14. Frozen object is frozen:', Object.isFrozen(frozenConfig));
// Expected output: true

/*
 * A non-extensible object cannot be changed to a different prototype.
 */
const baseProfile = {
  type: 'base',
};

const account = {
  id: 101,
};

Object.setPrototypeOf(account, baseProfile);

console.log('15. Prototype changed while extensible:', account.type);
// Expected output: base

Object.preventExtensions(account);

try {
  Object.setPrototypeOf(account, {
    type: 'admin',
  });
} catch (error) {
  console.log('16. Prototype change after preventExtensions:', error.name);
}
// Expected output: TypeError

/*
 * Null-prototype objects are still extensible by default.
 */
const dictionary = Object.create(null);

console.log('17. Null-prototype object extensible:', Object.isExtensible(dictionary));
// Expected output: true

dictionary.topic = 'objects';

console.log('18. Added to null-prototype object:', dictionary.topic);
// Expected output: objects

/*
 * Primitive values are not objects, so they are not extensible.
 */
console.log('19. Number primitive extensible:', Object.isExtensible(42));
// Expected output: false

console.log('20. String primitive extensible:', Object.isExtensible('hello'));
// Expected output: false

console.log('21. Null extensible:', Object.isExtensible(null));
// Expected output: false

console.log('22. Undefined extensible:', Object.isExtensible(undefined));
// Expected output: false

/*
 * Reflect.isExtensible() is stricter with primitives.
 */
try {
  Reflect.isExtensible(42);
} catch (error) {
  console.log('23. Reflect primitive error:', error.name);
}
// Expected output: TypeError

/*
 * Strict mode turns a failed new-property assignment into a TypeError.
 */
function addPropertyInStrictMode(object) {
  'use strict';
  object.extra = true;
}

try {
  addPropertyInStrictMode(profile);
} catch (error) {
  console.log('24. Strict assignment error:', error.name);
}
// Expected output: TypeError
