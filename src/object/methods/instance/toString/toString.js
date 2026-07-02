/*
 * Object.prototype.toString()
 *
 * The base Object version returns a tag-like string:
 *
 * [object Type]
 *
 * Many objects override toString() for their own string conversion behavior.
 * Use Object.prototype.toString.call(value) when you specifically want the
 * base tag behavior.
 */

const user = {
  name: 'Asha',
};

console.log('1. Plain object direct call:', user.toString());
// Expected output: [object Object]

console.log('2. Plain object base tag:', Object.prototype.toString.call(user));
// Expected output: [object Object]

/*
 * Some built-in objects override toString().
 * Array.prototype.toString() joins array elements.
 */
const numbers = [1, 2, 3];

console.log('3. Array direct call:', numbers.toString());
// Expected output: 1,2,3

console.log('4. Array base tag:', Object.prototype.toString.call(numbers));
// Expected output: [object Array]

/*
 * Object.prototype.toString.call(value) is useful for seeing the built-in tag.
 */
console.log(
  '5. Date base tag:',
  Object.prototype.toString.call(new Date('2026-06-30T00:00:00Z'))
);
// Expected output: [object Date]

console.log('6. Null base tag:', Object.prototype.toString.call(null));
// Expected output: [object Null]

console.log(
  '7. Undefined base tag:',
  Object.prototype.toString.call(undefined)
);
// Expected output: [object Undefined]

/*
 * Primitive values are boxed for this check, except null and undefined which
 * have their own special tags.
 */
console.log('8. Number primitive base tag:', Object.prototype.toString.call(42));
// Expected output: [object Number]

console.log(
  '9. String primitive base tag:',
  Object.prototype.toString.call('hello')
);
// Expected output: [object String]

/*
 * Symbol.toStringTag can customize the tag used by Object.prototype.toString().
 */
const taggedLesson = {
  [Symbol.toStringTag]: 'ObjectLesson',
};

console.log(
  '10. Custom Symbol.toStringTag:',
  Object.prototype.toString.call(taggedLesson)
);
// Expected output: [object ObjectLesson]

/*
 * Most of the time, JavaScript calls toString() implicitly when it needs a
 * string representation.
 */
const profile = {
  name: 'Asha',
  toString() {
    return `Profile: ${this.name}`;
  },
};

console.log('11. Explicit custom toString:', profile.toString());
// Expected output: Profile: Asha

console.log('12. String() conversion:', String(profile));
// Expected output: Profile: Asha

console.log('13. Template conversion:', `${profile}`);
// Expected output: Profile: Asha

/*
 * Symbol.toPrimitive has priority over toString() during string conversion.
 */
const priorityExample = {
  [Symbol.toPrimitive](hint) {
    return `primitive via ${hint}`;
  },
  toString() {
    return 'toString result';
  },
};

console.log('14. Symbol.toPrimitive priority:', String(priorityExample));
// Expected output: primitive via string

/*
 * Null-prototype objects do not inherit toString(), but the base method can
 * still be borrowed.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('15. null-prototype direct method:', typeof dictionary.toString);
// Expected output: undefined

console.log(
  '16. borrowed base tag on null-prototype object:',
  Object.prototype.toString.call(dictionary)
);
// Expected output: [object Object]
