/*
 * Object.getOwnPropertySymbols(object)
 *
 * Returns an array of own symbol property keys.
 *
 * Included:
 * - own enumerable symbol properties
 * - own non-enumerable symbol properties
 *
 * Skipped:
 * - string-keyed properties
 * - inherited symbol properties
 */

const userId = Symbol('userId');
const internalToken = Symbol('internalToken');

const user = {
  name: 'Asha',
  [userId]: 101,
};

Object.defineProperty(user, internalToken, {
  value: 'secret-token',
  enumerable: false,
});

const symbolKeys = Object.getOwnPropertySymbols(user);

console.log('1. Symbol key count:', symbolKeys.length);
// Expected output: 2

console.log('2. Symbol descriptions:', symbolKeys.map(String));
// Expected output: [ 'Symbol(userId)', 'Symbol(internalToken)' ]

console.log('3. Includes userId symbol:', symbolKeys.includes(userId));
// Expected output: true

console.log('4. Includes non-enumerable symbol:', symbolKeys.includes(internalToken));
// Expected output: true

/*
 * String-keyed properties are skipped.
 */
console.log('5. Object.keys sees strings:', Object.keys(user));
// Expected output: [ 'name' ]

console.log('6. getOwnPropertyNames sees strings:', Object.getOwnPropertyNames(user));
// Expected output: [ 'name' ]

console.log('7. Symbol value:', user[userId]);
// Expected output: 101

/*
 * Symbols are compared by identity.
 * Another Symbol with the same description is a different key.
 */
const sameDescription = Symbol('userId');

console.log('8. Same description is same symbol:', sameDescription === userId);
// Expected output: false

console.log('9. Same description value:', user[sameDescription]);
// Expected output: undefined

/*
 * Inherited symbol properties are skipped.
 */
const inheritedSymbol = Symbol('inheritedSymbol');

const parent = {
  [inheritedSymbol]: 'from parent',
};

const child = Object.create(parent);
child[userId] = 202;

console.log(
  '10. Child own symbols include userId:',
  Object.getOwnPropertySymbols(child).includes(userId),
);
// Expected output: true

console.log(
  '11. Child inherited symbol included:',
  Object.getOwnPropertySymbols(child).includes(inheritedSymbol),
);
// Expected output: false

/*
 * Reflect.ownKeys() returns own string keys and own symbol keys together.
 */
console.log('12. Reflect.ownKeys:', Reflect.ownKeys(user));
// Expected output: [ 'name', Symbol(userId), Symbol(internalToken) ]

/*
 * Object.getOwnPropertySymbols() returns keys only.
 * Use Object.getOwnPropertyDescriptor() when descriptor details matter.
 */
const tokenDescriptor = Object.getOwnPropertyDescriptor(user, internalToken);

console.log('13. Symbol descriptor enumerable:', tokenDescriptor.enumerable);
// Expected output: false

/*
 * Symbol-keyed properties are skipped by JSON.stringify().
 */
console.log('14. JSON string skips symbols:', JSON.stringify(user));
// Expected output: {"name":"Asha"}

/*
 * Symbol.for() returns shared symbols from the global symbol registry.
 */
const sharedSymbol = Symbol.for('sharedId');
const sameSharedSymbol = Symbol.for('sharedId');

const registryExample = {
  [sharedSymbol]: 500,
};

console.log('15. Symbol.for returns same symbol:', sharedSymbol === sameSharedSymbol);
// Expected output: true

console.log('16. Shared symbol value:', registryExample[sameSharedSymbol]);
// Expected output: 500

console.log(
  '17. Shared symbol discovered:',
  Object.getOwnPropertySymbols(registryExample).includes(sharedSymbol),
);
// Expected output: true

/*
 * Primitive values are converted to objects, except null and undefined.
 */
console.log('18. String primitive symbols:', Object.getOwnPropertySymbols('abc'));
// Expected output: []

console.log('19. Number primitive symbols:', Object.getOwnPropertySymbols(42));
// Expected output: []

try {
  Object.getOwnPropertySymbols(null);
} catch (error) {
  console.log('20. Null error:', error.name);
  // Expected output: TypeError
}
