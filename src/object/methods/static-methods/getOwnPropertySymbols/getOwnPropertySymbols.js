/*
 * Object.getOwnPropertySymbols(object)
 *
 * Returns an array of symbol keys that exist directly on the object.
 * String keys are not included.
 */

const publicName = 'name';
const userId = Symbol('userId');
const internalToken = Symbol('internalToken');

const user = {
  [publicName]: 'Asha',
  [userId]: 101,
};

Object.defineProperty(user, internalToken, {
  value: 'secret-token',
  enumerable: false,
});

const symbolKeys = Object.getOwnPropertySymbols(user);

console.log('1. Symbol key count:', symbolKeys.length);
// Expected output: 2

console.log('2. Includes userId symbol:', symbolKeys.includes(userId));
// Expected output: true

console.log('3. Includes internalToken symbol:', symbolKeys.includes(internalToken));
// Expected output: true

console.log('4. Object.keys(user):', Object.keys(user));
// Expected output: [ 'name' ]

console.log('5. Symbol value:', user[userId]);
// Expected output: 101

/*
 * Object.getOwnPropertySymbols() returns own symbol keys only.
 * It does not include inherited symbols.
 */
const inheritedSymbol = Symbol('inheritedSymbol');
const parent = {
  [inheritedSymbol]: 'from parent',
};

const child = Object.create(parent);
child[userId] = 202;

console.log(
  '6. Child own symbols:',
  Object.getOwnPropertySymbols(child).includes(userId)
);
// Expected output: true

console.log(
  '7. Child inherited symbol included:',
  Object.getOwnPropertySymbols(child).includes(inheritedSymbol)
);
// Expected output: false
