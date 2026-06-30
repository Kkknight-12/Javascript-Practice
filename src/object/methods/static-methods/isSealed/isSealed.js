/*
 * Object.isSealed(object)
 *
 * Returns true when an object is non-extensible and all own properties are
 * non-configurable.
 */

const profile = {
  name: 'Asha',
};

console.log('1. Regular object is sealed:', Object.isSealed(profile));
// Expected output: false

Object.seal(profile);

console.log('2. After Object.seal():', Object.isSealed(profile));
// Expected output: true

console.log('3. Sealed object is extensible:', Object.isExtensible(profile));
// Expected output: false

/*
 * Sealed properties can still be changed if they are writable.
 */
profile.name = 'Ira';

console.log('4. Existing writable property changed:', profile.name);
// Expected output: Ira

const deletedName = Reflect.deleteProperty(profile, 'name');

console.log('5. Delete sealed property:', deletedName);
// Expected output: false

console.log('6. Property still exists:', Object.hasOwn(profile, 'name'));
// Expected output: true

/*
 * Frozen objects are also sealed, but sealed objects are not always frozen.
 */
console.log('7. Sealed object is frozen:', Object.isFrozen(profile));
// Expected output: false

Object.freeze(profile);

console.log('8. Frozen object is sealed:', Object.isSealed(profile));
// Expected output: true
