/*
 * Array.isArray()
 *
 * Array.isArray() is a static method, so we call it on Array itself.
 *
 * It checks whether a value is a real Array.
 *
 * Mental model:
 * "Ask JavaScript if this value has the real Array brand."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
 */

console.log('--- Array.isArray with real arrays ---')

/*
 * Array literal creates a real array.
 */
console.log('array literal:', Array.isArray([1, 2, 3]))
// expected output: true

/*
 * An empty array is still a real array.
 */
console.log('empty array:', Array.isArray([]))
// expected output: true

/*
 * new Array(5) creates a real array with length 5.
 * It has empty slots, but the value itself is still an array.
 */
console.log('new Array(5):', Array.isArray(new Array(5)))
// expected output: true

console.log('--- Array.isArray with non-arrays ---')

/*
 * A string that looks like array text is still a string.
 */
console.log('string "[]":', Array.isArray('[]'))
// expected output: false

/*
 * A plain object is not an array.
 */
console.log('plain object:', Array.isArray({}))
// expected output: false

/*
 * null and undefined are not arrays.
 */
console.log('null:', Array.isArray(null))
// expected output: false

console.log('undefined:', Array.isArray(undefined))
// expected output: false

/*
 * Primitive values are not arrays.
 */
console.log('number:', Array.isArray(17))
// expected output: false

console.log('boolean:', Array.isArray(true))
// expected output: false

console.log('--- Array-like values are not always arrays ---')

/*
 * This object is array-like because it has numeric keys and length.
 * But it is not a real array.
 */
const arrayLike = {
  0: 'first',
  1: 'second',
  length: 2,
}

console.log('array-like object:', Array.isArray(arrayLike))
// expected output: false

/*
 * Array.from() can convert the array-like object into a real array.
 */
console.log('converted array-like:', Array.from(arrayLike))
// expected output: ['first', 'second']

console.log('converted value is array:', Array.isArray(Array.from(arrayLike)))
// expected output: true

/*
 * A typed array has indexed values and length,
 * but it is not a normal Array.
 */
const typedArray = new Int16Array([15, 33])
console.log('typed array:', Array.isArray(typedArray))
// expected output: false

console.log('--- Array.isArray vs instanceof Array ---')

/*
 * For a normal local array, both checks return true.
 */
const localArray = [1, 2, 3]
console.log('local Array.isArray:', Array.isArray(localArray))
// expected output: true

console.log('local instanceof Array:', localArray instanceof Array)
// expected output: true

/*
 * Arrays can be created in a different JavaScript realm.
 *
 * In a browser, an iframe is a different realm.
 * In Node.js, the built-in vm module can create a different context.
 *
 * Array.isArray() still returns true.
 * instanceof Array returns false because the other realm has a different
 * Array constructor.
 */
const vm = require('node:vm')
const crossRealmArray = vm.runInNewContext('[1, 2, 3]')

console.log('cross realm Array.isArray:', Array.isArray(crossRealmArray))
// expected output: true

console.log('cross realm instanceof Array:', crossRealmArray instanceof Array)
// expected output: false

console.log('--- Array.isArray edge case ---')

/*
 * Array.prototype itself is an array object.
 * This is uncommon in daily code, but MDN documents it as a useful edge case.
 */
console.log('Array.prototype:', Array.isArray(Array.prototype))
// expected output: true

console.log('--- Practical guard example ---')

/*
 * Use Array.isArray() when a function should handle arrays differently.
 */
function firstItem(value) {
  if (!Array.isArray(value)) {
    return undefined
  }

  return value[0]
}

console.log('first item from array:', firstItem(['admin', 'editor']))
// expected output: 'admin'

console.log('first item from string:', firstItem('admin'))
// expected output: undefined
