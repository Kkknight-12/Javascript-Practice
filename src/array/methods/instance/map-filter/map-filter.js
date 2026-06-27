/*
 * Array.prototype.filter() + Array.prototype.map()
 *
 * This file teaches the common "filter first, then map" chain.
 *
 * Main tools:
 * 1. filter()
 * 2. map()
 * 3. chaining array methods
 * 4. callback return rules
 * 5. callback arguments in a chain
 * 6. sparse array behavior
 * 7. generic array-like behavior
 *
 * Mental model:
 * "filter() decides which items stay. map() decides what each kept item becomes."
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.filter
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.map
 */

console.log('--- Basic filter().map() chain ---')

/*
 * Use filter().map() when you want to:
 * 1. keep only some items,
 * 2. then transform the kept items.
 */
const products = [
  { name: 'Apples', price: 1.99, quantity: 10 },
  { name: 'Oranges', price: 0.99, quantity: 5 },
  { name: 'Bananas', price: 0.49, quantity: 20 },
  { name: 'Grapes', price: 2.99, quantity: 0 },
  { name: 'Watermelon', price: 5.99, quantity: 3 },
]

const inStockProductCards = products
  .filter((product) => product.quantity > 0)
  .map((product) => ({
    name: product.name,
    price: product.price,
  }))

console.log('in-stock product cards:', inStockProductCards)
// expected output:
// [
//   { name: 'Apples', price: 1.99 },
//   { name: 'Oranges', price: 0.99 },
//   { name: 'Bananas', price: 0.49 },
//   { name: 'Watermelon', price: 5.99 }
// ]

console.log('original products length:', products.length)
// expected output: 5

console.log('--- filter() keeps original elements ---')

/*
 * filter() does not transform each item.
 * It keeps the original element when the callback returns truthy.
 */
const availableProducts = products.filter((product) => product.quantity > 0)

console.log('available products:', availableProducts)
// expected output:
// [
//   { name: 'Apples', price: 1.99, quantity: 10 },
//   { name: 'Oranges', price: 0.99, quantity: 5 },
//   { name: 'Bananas', price: 0.49, quantity: 20 },
//   { name: 'Watermelon', price: 5.99, quantity: 3 }
// ]

console.log('same object reference:', availableProducts[0] === products[0])
// expected output: true

console.log('--- map() transforms values ---')

/*
 * map() does not decide which items stay.
 * It returns one transformed value for each existing element it visits.
 */
const productNames = products.map((product) => product.name)

console.log('product names:', productNames)
// expected output: [ 'Apples', 'Oranges', 'Bananas', 'Grapes', 'Watermelon' ]

console.log('--- Callback return rules ---')

/*
 * filter() uses truthy/falsy callback results to keep or skip original values.
 * map() stores the callback return value in the new array.
 */
const numbers = [1, 2, 3, 4, 5]

const filteredNumbers = numbers.filter((number) => {
  return number % 2 === 0 ? 'keep' : ''
})

console.log('filter keeps original even numbers:', filteredNumbers)
// expected output: [ 2, 4 ]

const mappedNumbers = numbers.map((number) => {
  return number % 2 === 0 ? 'even' : 'odd'
})

console.log('map stores callback results:', mappedNumbers)
// expected output: [ 'odd', 'even', 'odd', 'even', 'odd' ]

console.log('--- Chain order matters ---')

/*
 * filter().map() means keep first, then transform.
 * This is common when you only want output for matching items.
 */
const doubledEvenNumbers = numbers
  .filter((number) => number % 2 === 0)
  .map((number) => number * 2)

console.log('doubled even numbers:', doubledEvenNumbers)
// expected output: [ 4, 8 ]

/*
 * map().filter() means transform first, then remove some transformed values.
 */
const mappedThenFiltered = numbers
  .map((number) => (number % 2 === 0 ? number * 2 : null))
  .filter((number) => number !== null)

console.log('mapped then filtered:', mappedThenFiltered)
// expected output: [ 4, 8 ]

console.log('--- Search, filter, then map ---')

/*
 * A realistic chain:
 * search matching products first, then return only display names.
 */
const searchText = 'app'

const matchingProductNames = products
  .filter((product) => product.name.toLowerCase().includes(searchText))
  .map((product) => product.name)

console.log('matching product names:', matchingProductNames)
// expected output: [ 'Apples' ]

console.log('--- Callback arguments inside a chain ---')

/*
 * The third argument passed to map() is the array map() is reading.
 * In a chain, that means the filtered array, not the original products array.
 */
const callbackArgumentDemo = products
  .filter((product) => product.quantity > 0)
  .map((product, index, filteredArray) => {
    return `${index + 1}/${filteredArray.length}: ${product.name}`
  })

console.log('callback argument demo:', callbackArgumentDemo)
// expected output:
// [
//   '1/4: Apples',
//   '2/4: Oranges',
//   '3/4: Bananas',
//   '4/4: Watermelon'
// ]

console.log('--- Non-mutation and shallow references ---')

/*
 * The chain returns new arrays.
 * Objects inside those arrays are still the same references unless you create
 * new objects inside map().
 */
const expensiveProducts = products.filter((product) => product.price > 2)

console.log('expensive products:', expensiveProducts)
// expected output:
// [
//   { name: 'Grapes', price: 2.99, quantity: 0 },
//   { name: 'Watermelon', price: 5.99, quantity: 3 }
// ]

console.log('same expensive object reference:', expensiveProducts[0] === products[3])
// expected output: true

const expensiveProductLabels = expensiveProducts.map((product) => ({
  label: `${product.name} - $${product.price}`,
}))

console.log('new label objects:', expensiveProductLabels)
// expected output:
// [
//   { label: 'Grapes - $2.99' },
//   { label: 'Watermelon - $5.99' }
// ]

console.log('label object is original product:', expensiveProductLabels[0] === products[3])
// expected output: false

console.log('--- Sparse array behavior ---')

/*
 * Both methods skip empty slots.
 * filter() returns a compact array of kept values.
 */
const sparseValues = [1, , 3, 4]
const sparseVisits = []

const sparseResult = sparseValues
  .filter((value, index) => {
    sparseVisits.push(['filter', index, value])
    return value > 1
  })
  .map((value, index) => {
    sparseVisits.push(['map', index, value])
    return value * 10
  })

console.log('sparse chain result:', sparseResult)
// expected output: [ 30, 40 ]

console.log('sparse visits:', sparseVisits)
// expected output:
// [
//   [ 'filter', 0, 1 ],
//   [ 'filter', 2, 3 ],
//   [ 'filter', 3, 4 ],
//   [ 'map', 0, 3 ],
//   [ 'map', 1, 4 ]
// ]

console.log('--- Generic array-like behavior ---')

/*
 * Both filter() and map() are generic.
 * They can be borrowed for array-like objects.
 */
const arrayLikeScores = {
  0: 72,
  1: 91,
  2: 64,
  length: 3,
}

const passingScoreLabels = Array.prototype.filter
  .call(arrayLikeScores, (score) => score >= 70)
  .map((score) => `score: ${score}`)

console.log('passing score labels:', passingScoreLabels)
// expected output: [ 'score: 72', 'score: 91' ]

console.log('--- Boundary with flatMap() ---')

/*
 * If one input item may become zero, one, or many output items, flatMap() can
 * be clearer than map().filter() or filter().map().
 */
const sentences = ['learn arrays', '', 'practice daily']

const words = sentences
  .filter((sentence) => sentence.length > 0)
  .flatMap((sentence) => sentence.split(' '))

console.log('words from non-empty sentences:', words)
// expected output: [ 'learn', 'arrays', 'practice', 'daily' ]

console.log('--- Async callback gotchas ---')

/*
 * filter() does not wait for promises.
 * An async callback returns a Promise object, and Promise objects are truthy.
 */
const wrongAsyncFilter = [1, 2, 3].filter(async (number) => number > 10)

console.log('wrong async filter result:', wrongAsyncFilter)
// expected output: [ 1, 2, 3 ]

/*
 * map() with an async callback returns promises.
 * Use Promise.all() when you intentionally map to async work.
 */
const asyncMapResult = [1, 2].map(async (number) => number * 2)

console.log(
  'async map returns promises:',
  asyncMapResult.map((value) => value instanceof Promise)
)
// expected output: [ true, true ]
