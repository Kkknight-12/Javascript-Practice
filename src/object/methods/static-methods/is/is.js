/*
 * Object.is() compares two values using SameValue comparison.
 *
 * Syntax:
 * Object.is(value1, value2)
 *
 * It is mostly like ===, but it treats NaN as equal to NaN
 * and it treats +0 and -0 as different values.
 */

console.log('1. Same strings:', Object.is('objects', 'objects'));
// Expected output: true

console.log('2. Different strings:', Object.is('objects', 'arrays'));
// Expected output: false

console.log('3. No type coercion:', Object.is('1', 1));
// Expected output: false

console.log('4. Loose equality would coerce:', '1' == 1);
// Expected output: true

console.log('5. Strict equality also avoids coercion:', '1' === 1);
// Expected output: false

/*
 * NaN is the most common place where Object.is() differs from ===.
 */
console.log('6. NaN with strict equality:', NaN === NaN);
// Expected output: false

console.log('7. NaN with Object.is:', Object.is(NaN, NaN));
// Expected output: true

console.log('8. Computed NaN:', Object.is(NaN, 0 / 0));
// Expected output: true

/*
 * Signed zero is the other important difference from ===.
 */
console.log('9. Strict equality treats zeros as equal:', 0 === -0);
// Expected output: true

console.log('10. Object.is separates 0 and -0:', Object.is(0, -0));
// Expected output: false

console.log('11. Same signed zero:', Object.is(-0, -0));
// Expected output: true

console.log('12. Positive zero:', Object.is(+0, 0));
// Expected output: true

/*
 * Objects are compared by reference, not by shape or contents.
 */
const profile = {
  name: 'Asha',
};

const sameProfile = profile;

const matchingProfile = {
  name: 'Asha',
};

console.log('13. Same object reference:', Object.is(profile, sameProfile));
// Expected output: true

console.log(
  '14. Same-looking object is different:',
  Object.is(profile, matchingProfile),
);
// Expected output: false

profile.name = 'Mina';

console.log('15. Same reference after mutation:', Object.is(profile, sameProfile));
// Expected output: true

console.log('16. Updated object value:', sameProfile.name);
// Expected output: Mina

/*
 * Arrays are objects, so arrays also compare by reference.
 */
const numbers = [1, 2, 3];

console.log('17. Same array reference:', Object.is(numbers, numbers));
// Expected output: true

console.log('18. New array with same items:', Object.is(numbers, [1, 2, 3]));
// Expected output: false

/*
 * Symbols compare by symbol identity.
 */
const localId = Symbol('id');
const sameLocalId = localId;

console.log('19. Same symbol reference:', Object.is(localId, sameLocalId));
// Expected output: true

console.log('20. Two local symbols:', Object.is(Symbol('id'), Symbol('id')));
// Expected output: false

console.log(
  '21. Shared registry symbols:',
  Object.is(Symbol.for('userId'), Symbol.for('userId')),
);
// Expected output: true

/*
 * Object.is() is not the same as SameValueZero.
 * Array.prototype.includes() uses SameValueZero.
 */
const values = [NaN, -0];

console.log('22. includes() finds NaN:', values.includes(NaN));
// Expected output: true

console.log('23. includes() treats 0 and -0 as same:', values.includes(0));
// Expected output: true

console.log('24. Object.is treats 0 and -0 differently:', Object.is(0, -0));
// Expected output: false

/*
 * Object.is() can be useful inside small equality helpers when these edge
 * cases matter.
 */
function didValueChange(previousValue, nextValue) {
  return !Object.is(previousValue, nextValue);
}

console.log('25. NaN did not change:', didValueChange(NaN, NaN));
// Expected output: false

console.log('26. 0 changed to -0:', didValueChange(0, -0));
// Expected output: true

console.log('27. Object reference changed:', didValueChange({}, {}));
// Expected output: true
