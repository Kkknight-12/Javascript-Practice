/*
 * Array.prototype.filter()
 *
 * This file teaches filter() as an Array instance method.
 *
 * Main tools:
 * 1. filter()
 * 2. truthy/falsy callback result
 * 3. new shallow-copy result array
 * 4. callback(value, index, array)
 * 5. sparse array behavior
 * 6. thisArg
 * 7. generic array-like behavior
 *
 * Mental model:
 * "filter() tests each existing item. If the callback returns truthy, keep the
 * original item. If the callback returns falsy, skip it."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */

console.log('--- Basic filter() ---')

/*
 * filter() returns a new array containing only the elements that pass the test.
 */
const numbers = [5, 12, 8, 130, 44]
const largeNumbers = numbers.filter((number) => number > 10)

console.log('numbers greater than 10:', largeNumbers)
// expected output: [12, 130, 44]

console.log('original numbers:', numbers)
// expected output: [5, 12, 8, 130, 44]

console.log('--- filter() returns a new array ---')

/*
 * filter() does not mutate the original array.
 * The result is a different array reference.
 */
const values = [1, 2, 3]
const filteredValues = values.filter((value) => value > 1)

console.log('filtered values:', filteredValues)
// expected output: [2, 3]

console.log('same array reference:', filteredValues === values)
// expected output: false

console.log('--- filter() keeps original elements ---')

/*
 * The callback result decides whether to keep an element.
 * The callback result is not pushed into the final array.
 */
const callbackResultDemo = [1, 2, 3].filter((number) => {
  return number > 1 ? 'keep' : ''
})

console.log('callback result demo:', callbackResultDemo)
// expected output: [2, 3]

console.log('--- When nothing passes ---')

const noMatches = numbers.filter((number) => number > 1000)

console.log('no matches:', noMatches)
// expected output: []

console.log('--- Filtering objects ---')

const products = [
  { name: 'Apples', price: 1.99, quantity: 10 },
  { name: 'Grapes', price: 2.99, quantity: 0 },
  { name: 'Watermelon', price: 5.99, quantity: 3 },
]

const inStockProducts = products.filter((product) => product.quantity > 0)

console.log('in-stock products:', inStockProducts)
// expected output: Apples and Watermelon objects

console.log('original products:', products)
// expected output: original products array is unchanged

console.log('--- Shallow copy behavior ---')

/*
 * The result array is new, but kept objects are the same object references.
 */
const shallowProducts = [
  { name: 'Apples', price: 1.99 },
  { name: 'Grapes', price: 2.99 },
]

const shallowResult = shallowProducts.filter((product) => product.name === 'Apples')

shallowResult[0].price = 2.49

console.log('changed filtered object:', shallowResult[0])
// expected output: { name: 'Apples', price: 2.49 }

console.log('same object in original array:', shallowProducts[0])
// expected output: { name: 'Apples', price: 2.49 }

console.log('same object reference:', shallowResult[0] === shallowProducts[0])
// expected output: true

console.log('--- Callback receives value, index, and array ---')

/*
 * Use index and array when the decision depends on position or nearby values.
 */
const readings = [3, 8, 6, 12, 9]

const peaks = readings.filter((value, index, array) => {
  const previous = array[index - 1] ?? -Infinity
  const next = array[index + 1] ?? -Infinity

  return value > previous && value > next
})

console.log('peak readings:', peaks)
// expected output: [8, 12]

console.log('--- thisArg with filter() ---')

/*
 * Use a normal function when you want filter() to bind thisArg.
 * Arrow functions do not have their own this.
 */
const stockRule = {
  minimumQuantity: 1,
}

const availableProducts = products.filter(function (product) {
  return product.quantity >= this.minimumQuantity
}, stockRule)

console.log('available products with thisArg:', availableProducts)
// expected output: Apples and Watermelon objects

console.log('--- Searching with filter() ---')

/*
 * filter() is useful when more than one item may match a search.
 */
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']
const fruitsWithAn = fruits.filter((fruit) => fruit.includes('an'))

console.log('fruits containing "an":', fruitsWithAn)
// expected output: ['banana', 'mango', 'orange']

console.log('--- filter() skips empty slots ---')

/*
 * filter() only visits assigned indexes.
 * Empty slots in sparse arrays are skipped.
 */
const sparseValues = [1, , undefined, 4]
const sparseVisits = []

const filteredSparseValues = sparseValues.filter((value, index) => {
  sparseVisits.push([index, value])
  return true
})

console.log('filtered sparse values:', filteredSparseValues)
// expected output: [1, undefined, 4]

console.log('sparse visits:', sparseVisits)
// expected output: [[0, 1], [2, undefined], [3, 4]]

console.log('index 1 exists:', Object.hasOwn(sparseValues, 1))
// expected output: false

console.log('--- filter() vs find() ---')

/*
 * filter() returns all matching elements in a new array.
 * find() returns the first matching element itself.
 */
const evenNumbers = [1, 2, 3, 4, 5, 6]

console.log('filter even numbers:', evenNumbers.filter((number) => number % 2 === 0))
// expected output: [2, 4, 6]

console.log('find first even number:', evenNumbers.find((number) => number % 2 === 0))
// expected output: 2

console.log('--- filter() vs map() ---')

/*
 * filter() keeps or skips original values.
 * map() transforms every value.
 */
console.log('filter result:', [1, 2, 3].filter((number) => number > 1))
// expected output: [2, 3]

console.log('map result:', [1, 2, 3].map((number) => number * 10))
// expected output: [10, 20, 30]

console.log('--- filter() is generic ---')

/*
 * filter() can be called on array-like objects.
 * It reads length and existing integer-keyed properties.
 */
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  length: 3,
}

const filteredArrayLike = Array.prototype.filter.call(arrayLike, (value) => value !== 'b')

console.log('filtered array-like:', filteredArrayLike)
// expected output: ['a', 'c']

console.log('--- Async callback gotcha ---')

/*
 * filter() does not wait for promises.
 * An async callback returns a Promise object, and Promise objects are truthy.
 */
const asyncFilterResult = [1, 2, 3].filter(async (number) => {
  return number > 10
})

console.log('async filter result:', asyncFilterResult)
// expected output: [1, 2, 3]
