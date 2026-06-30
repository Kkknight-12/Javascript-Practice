/*
 * Object.isExtensible(object)
 *
 * Returns true when new properties can still be added to an object.
 */

const profile = {
  name: 'Asha',
};

console.log('1. New object is extensible:', Object.isExtensible(profile));
// Expected output: true

profile.role = 'developer';
console.log('2. Added role:', profile.role);
// Expected output: developer

Object.preventExtensions(profile);

console.log('3. After preventExtensions:', Object.isExtensible(profile));
// Expected output: false

try {
  Object.defineProperty(profile, 'email', {
    value: 'asha@example.com',
  });
} catch (error) {
  console.log('4. Add property after preventExtensions:', error.name);
  // Expected output: TypeError
}

/*
 * Existing properties can still be updated if their descriptors allow it.
 * preventExtensions() only blocks new properties.
 */
profile.name = 'Ira';

console.log('5. Existing property changed:', profile.name);
// Expected output: Ira
