/*
 * Reflect.ownKeys()
 *
 * Reflect.ownKeys(object) returns all own property keys in one array:
 * - own string keys,
 * - own symbol keys,
 * - enumerable keys,
 * - non-enumerable keys.
 *
 * It does not return inherited keys.
 */

const inheritedFields = {
  plan: 'free',
};

const privateToken = Symbol('privateToken');
const auditKey = Symbol('auditKey');

const account = Object.create(inheritedFields);
account.name = 'Asha';
account.topic = 'Reflect';
account[privateToken] = 'secret-token';

Object.defineProperty(account, 'internalId', {
  value: 42,
  enumerable: false,
});

Object.defineProperty(account, auditKey, {
  value: 'created-by-system',
  enumerable: false,
});

console.log('1. Object.keys():', Object.keys(account));
// Expected output: [ 'name', 'topic' ]

console.log('2. Object.getOwnPropertyNames():', Object.getOwnPropertyNames(account));
// Expected output: [ 'name', 'topic', 'internalId' ]

console.log('3. Object.getOwnPropertySymbols():', Object.getOwnPropertySymbols(account));
// Expected output: [ Symbol(privateToken), Symbol(auditKey) ]

console.log('4. Reflect.ownKeys():', Reflect.ownKeys(account));
// Expected output: [ 'name', 'topic', 'internalId', Symbol(privateToken), Symbol(auditKey) ]

/*
 * Inherited properties are skipped.
 */
console.log('5. Inherited key exists with in:', 'plan' in account);
// Expected output: true

console.log('6. Reflect.ownKeys() includes inherited key:', Reflect.ownKeys(account).includes('plan'));
// Expected output: false

/*
 * Reflect.ownKeys() reads keys, not values.
 * Reading keys does not run getters.
 */
let getterRuns = 0;

const report = {
  get total() {
    getterRuns++;
    return 100;
  },
};

console.log('7. Getter not run before:', getterRuns);
// Expected output: 0

console.log('8. Reflect.ownKeys() sees getter key:', Reflect.ownKeys(report));
// Expected output: [ 'total' ]

console.log('9. Getter still not run:', getterRuns);
// Expected output: 0

console.log('10. Reading getter value runs getter:', report.total);
// Expected output: 100

console.log('11. Getter ran after value read:', getterRuns);
// Expected output: 1

/*
 * Key order:
 * - integer-index string keys first, in numeric order,
 * - other string keys next, in creation order,
 * - symbol keys last, in creation order.
 */
const firstSymbol = Symbol('firstSymbol');
const secondSymbol = Symbol('secondSymbol');

const orderExample = {
  100: 'large index',
  2: 'small index',
  name: 'Order Example',
  [firstSymbol]: 'first symbol',
  [secondSymbol]: 'second symbol',
};

Object.defineProperty(orderExample, 'hidden', {
  value: 'non-enumerable string',
  enumerable: false,
});

console.log('12. Key order:', Reflect.ownKeys(orderExample));
// Expected output: [ '2', '100', 'name', 'hidden', Symbol(firstSymbol), Symbol(secondSymbol) ]

/*
 * Arrays are objects too.
 * Array indexes and the non-enumerable length property are own keys.
 */
console.log('13. Array own keys:', Reflect.ownKeys(['a', 'b']));
// Expected output: [ '0', '1', 'length' ]

/*
 * Reflect.ownKeys() requires an object.
 * It does not convert primitives the way some Object.* methods do.
 */
try {
  Reflect.ownKeys('abc');
} catch (error) {
  console.log('14. Primitive target error:', error.name);
  // Expected output: TypeError
}
