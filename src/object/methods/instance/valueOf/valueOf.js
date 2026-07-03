/*
 * Object.prototype.valueOf()
 *
 * The base Object version returns the object itself.
 *
 * That is not very useful by itself, but valueOf() becomes useful when an
 * object overrides it to return a primitive value.
 */

const profile = {
  name: 'Asha',
};

console.log('1. valueOf returns same object:', profile.valueOf() === profile);
// Expected output: true

/*
 * Custom valueOf() can control numeric/default primitive conversion.
 * The method should return a primitive value such as a number, string, boolean,
 * bigint, symbol, null, or undefined.
 */
const score = {
  points: 42,
  valueOf() {
    return this.points;
  },
};

console.log('2. Explicit custom valueOf:', score.valueOf());
// Expected output: 42

console.log('3. Numeric conversion:', score + 8);
// Expected output: 50

console.log('4. Unary plus conversion:', +score);
// Expected output: 42

/*
 * If the base valueOf() returns an object during numeric conversion,
 * JavaScript cannot use that object as the primitive result. It then tries
 * toString().
 */
const label = {
  toString() {
    return '7';
  },
};

console.log('5. fallback to toString:', +label);
// Expected output: 7

/*
 * Built-in objects can override valueOf().
 * Date.prototype.valueOf() returns the timestamp in milliseconds.
 */
const startDate = new Date('2026-06-30T00:00:00Z');

console.log('6. Date valueOf timestamp:', startDate.valueOf());
// Expected output: 1782777600000

console.log('7. Date unary plus uses timestamp:', +startDate);
// Expected output: 1782777600000

/*
 * Symbol.toPrimitive has priority over valueOf() and toString().
 */
const priorityExample = {
  [Symbol.toPrimitive](hint) {
    return hint === 'string' ? 'score object' : 100;
  },
  valueOf() {
    return 42;
  },
  toString() {
    return 'profile';
  },
};

console.log(
  '8. Symbol.toPrimitive numeric/default priority:',
  priorityExample + 1
);
// Expected output: 101

console.log('9. Symbol.toPrimitive string priority:', String(priorityExample));
// Expected output: score object

/*
 * If valueOf() and toString() both fail to return a primitive value,
 * conversion throws a TypeError.
 */
const brokenConversion = {
  valueOf() {
    return {};
  },
  toString() {
    return {};
  },
};

try {
  Number(brokenConversion);
} catch (error) {
  console.log('10. no primitive conversion error:', error.name);
  // Expected output: TypeError
}

/*
 * For null-prototype objects, valueOf() does not exist unless you add it.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('11. Null-prototype valueOf:', typeof dictionary.valueOf);
// Expected output: undefined

console.log(
  '12. Borrow Object.prototype.valueOf:',
  Object.prototype.valueOf.call(dictionary) === dictionary
);
// Expected output: true

/*
 * Calling the base Object method with null or undefined as `this` throws.
 */
try {
  Object.prototype.valueOf.call(null);
} catch (error) {
  console.log('13. null this error:', error.name);
  // Expected output: TypeError
}
