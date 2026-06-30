/*
 * Object.prototype.valueOf()
 *
 * Returns the object itself for ordinary objects.
 * JavaScript also uses valueOf() during primitive conversion.
 */

const profile = {
  name: 'Asha',
};

console.log('1. valueOf returns same object:', profile.valueOf() === profile);
// Expected output: true

/*
 * Custom valueOf() can control numeric conversion.
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

/*
 * For null-prototype objects, valueOf does not exist unless you add it.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log('4. Null-prototype valueOf:', typeof dictionary.valueOf);
// Expected output: undefined

console.log(
  '5. Borrow Object.prototype.valueOf:',
  Object.prototype.valueOf.call(dictionary) === dictionary
);
// Expected output: true
