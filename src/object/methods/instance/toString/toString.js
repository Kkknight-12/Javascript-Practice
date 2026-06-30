/*
 * Object.prototype.toString()
 *
 * Returns a string tag for the value.
 * It is often used with .call(value) to inspect built-in types.
 */

console.log('1. Plain object:', Object.prototype.toString.call({}));
// Expected output: [object Object]

console.log('2. Array:', Object.prototype.toString.call([]));
// Expected output: [object Array]

console.log('3. Date:', Object.prototype.toString.call(new Date('2026-06-30')));
// Expected output: [object Date]

console.log('4. Null:', Object.prototype.toString.call(null));
// Expected output: [object Null]

console.log('5. Undefined:', Object.prototype.toString.call(undefined));
// Expected output: [object Undefined]

/*
 * Symbol.toStringTag can customize the tag.
 */
const lesson = {
  [Symbol.toStringTag]: 'ObjectLesson',
};

console.log('6. Custom tag:', Object.prototype.toString.call(lesson));
// Expected output: [object ObjectLesson]

/*
 * Most of the time, JavaScript calls toString() implicitly during conversion.
 */
const profile = {
  name: 'Asha',
  toString() {
    return `Profile: ${this.name}`;
  },
};

console.log('7. Explicit toString:', profile.toString());
// Expected output: Profile: Asha

console.log('8. Template conversion:', `${profile}`);
// Expected output: Profile: Asha
