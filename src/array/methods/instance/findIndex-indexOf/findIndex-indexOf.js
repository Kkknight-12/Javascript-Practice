/*
 * Array.prototype.indexOf() Vs Array.prototype.findIndex()
 *
 * This file compares two Array instance methods that return indexes.
 *
 * Main tools:
 * 1. indexOf()
 * 2. findIndex()
 * 3. fromIndex
 * 4. callback(value, index, array)
 * 5. strict equality
 * 6. sparse array behavior
 * 7. thisArg
 * 8. generic array-like behavior
 *
 * Mental model:
 * "indexOf() asks: where is this exact value?"
 * "findIndex() asks: where is the first value that passes this test?"
 *
 * MDN references:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 */

console.log('--- indexOf() finds the first exact value index ---')

/*
 * indexOf() searches from left to right.
 * It returns the first index where the exact value is found.
 */
const animals = ['ant', 'bison', 'camel', 'duck', 'bison']

console.log('first bison index:', animals.indexOf('bison'))
// expected output: 1

console.log('missing giraffe index:', animals.indexOf('giraffe'))
// expected output: -1

console.log('--- indexOf() can start searching from a position ---')

/*
 * The second argument is fromIndex.
 * It tells indexOf() where to start searching.
 */
console.log('bison from index 2:', animals.indexOf('bison', 2))
// expected output: 4

console.log('bison from index 5:', animals.indexOf('bison', 5))
// expected output: -1

/*
 * A negative fromIndex counts back from the end first.
 * For length 5, fromIndex -2 becomes index 3.
 * The search still moves left to right after that.
 */
console.log('bison from index -2:', animals.indexOf('bison', -2))
// expected output: 4

console.log('ant from index -2:', animals.indexOf('ant', -2))
// expected output: -1

console.log('--- findIndex() finds the first matching condition index ---')

/*
 * findIndex() uses a callback.
 * It returns the index of the first element where the callback returns truthy.
 */
const numbers = [5, 12, 8, 130, 44]

const firstLargeNumberIndex = numbers.findIndex((number) => number > 13)

console.log('first number greater than 13 index:', firstLargeNumberIndex)
// expected output: 3

console.log('missing large number index:', numbers.findIndex((number) => number > 200))
// expected output: -1

console.log('--- Same goal, different kind of search ---')

/*
 * Use indexOf() when you already know the exact value.
 * Use findIndex() when you need a rule or condition.
 */
const scores = [72, 81, 64, 90, 81]

console.log('first exact score 81:', scores.indexOf(81))
// expected output: 1

console.log(
  'first excellent score index:',
  scores.findIndex((score) => score >= 90)
)
// expected output: 3

console.log('--- Both return -1 when nothing is found ---')

/*
 * This is the shared "not found" signal.
 * Be careful: index 0 is a valid found result.
 */
const names = ['Asha', 'Mayank', 'Nina']

const ashaIndex = names.indexOf('Asha')
const adminIndex = names.findIndex((name) => name === 'Admin')

console.log('Asha index:', ashaIndex)
// expected output: 0

console.log('Admin index:', adminIndex)
// expected output: -1

console.log('wrong truthy check:', ashaIndex ? 'found' : 'not found')
// expected output: not found

console.log('better -1 check:', ashaIndex !== -1 ? 'found' : 'not found')
// expected output: found

console.log('--- indexOf() uses strict equality ---')

/*
 * indexOf() compares values like ===.
 * It is good for primitives, but object values must be the same reference.
 */
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Keyboard' },
]

const sameKeyboardReference = products[1]
const newKeyboardObject = { id: 2, name: 'Keyboard' }

console.log('same object reference index:', products.indexOf(sameKeyboardReference))
// expected output: 1

console.log('new object with same data index:', products.indexOf(newKeyboardObject))
// expected output: -1

console.log('NaN with indexOf:', [NaN].indexOf(NaN))
// expected output: -1

console.log('--- findIndex() is better for object conditions ---')

/*
 * findIndex() can inspect object properties.
 * This is usually the right tool when searching arrays of objects by id.
 */
const keyboardIndex = products.findIndex((product) => product.id === 2)

console.log('keyboard index by id:', keyboardIndex)
// expected output: 1

console.log('missing product index:', products.findIndex((product) => product.id === 99))
// expected output: -1

console.log('--- findIndex() stops early ---')

/*
 * findIndex() stops as soon as the callback returns truthy.
 */
const visitedByFindIndex = []

const firstEvenIndex = [1, 3, 4, 6, 8].findIndex((number, index) => {
  visitedByFindIndex.push({ number, index })
  return number % 2 === 0
})

console.log('first even index:', firstEvenIndex)
// expected output: 2

console.log('visited by findIndex:', visitedByFindIndex)
// expected output: [{ number: 1, index: 0 }, { number: 3, index: 1 }, { number: 4, index: 2 }]

console.log('--- Callback result is not the final return value ---')

/*
 * The callback result only decides match or no match.
 * findIndex() returns the matching index, not the callback result.
 */
const callbackResultDemo = [5, 12].findIndex((number) => {
  return number > 10 ? 'yes' : false
})

console.log('callback result demo:', callbackResultDemo)
// expected output: 1

console.log('--- Callback receives value, index, and array ---')

/*
 * Use index and array when the condition depends on position or nearby values.
 */
const readings = [3, 8, 6, 12, 9]

const firstPeakIndex = readings.findIndex((value, index, array) => {
  const previous = array[index - 1] ?? -Infinity
  const next = array[index + 1] ?? -Infinity

  return value > previous && value > next
})

console.log('first peak index:', firstPeakIndex)
// expected output: 1

console.log('first peak value:', readings[firstPeakIndex])
// expected output: 8

console.log('--- thisArg with findIndex() ---')

/*
 * findIndex() can receive thisArg as its second argument.
 * Use a normal function when you want thisArg to become this.
 */
const stock = [
  { name: 'apples', quantity: 0 },
  { name: 'bananas', quantity: 3 },
  { name: 'oranges', quantity: 1 },
]

const inventoryRule = {
  minimumQuantity: 2,
}

const firstAvailableIndex = stock.findIndex(function (item) {
  return item.quantity >= this.minimumQuantity
}, inventoryRule)

console.log('first available stock index:', firstAvailableIndex)
// expected output: 1

console.log('first available stock item:', stock[firstAvailableIndex])
// expected output: { name: 'bananas', quantity: 3 }

console.log('--- Sparse array difference ---')

/*
 * findIndex() visits empty slots and treats them as undefined.
 * indexOf() skips empty slots.
 */
const sparseValues = [1, , 3]

console.log(
  'findIndex undefined in sparse array:',
  sparseValues.findIndex((value) => value === undefined)
)
// expected output: 1

console.log('indexOf undefined in sparse array:', sparseValues.indexOf(undefined))
// expected output: -1

const explicitUndefinedValues = [1, undefined, 3]

console.log('indexOf explicit undefined:', explicitUndefinedValues.indexOf(undefined))
// expected output: 1

console.log('--- Generic array-like behavior ---')

/*
 * Both methods are generic.
 * They only need a length and integer-keyed properties.
 */
const arrayLike = {
  length: 3,
  0: 'small',
  1: 'medium',
  2: 'large',
}

console.log('indexOf on array-like:', Array.prototype.indexOf.call(arrayLike, 'medium'))
// expected output: 1

console.log(
  'findIndex on array-like:',
  Array.prototype.findIndex.call(arrayLike, (value) => value.length > 5)
)
// expected output: 1
