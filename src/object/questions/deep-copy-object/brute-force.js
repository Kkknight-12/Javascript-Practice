/*
 * Question: create a deep copy of an object.
 *
 * Brute force / first idea:
 * Use object spread to copy the object.
 *
 * Problem:
 * Spread creates a shallow copy. Nested objects stay shared.
 */

const original = {
  user: {
    role: 'admin',
  },
};

const copy = { ...original };

console.log('1. Top-level object is new:', copy !== original);
// Expected output: true

console.log('2. Nested object is shared:', copy.user === original.user);
// Expected output: true

copy.user.role = 'editor';

console.log('3. Original nested value changed:', original.user.role);
// Expected output: editor

/*
 * This proves spread is not a deep copy.
 * It copies the outer object, but it reuses the same nested user object.
 */
