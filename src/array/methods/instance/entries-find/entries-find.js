/*
 * Array.prototype.entries() with Array.prototype.find()
 *
 * This file teaches a common pattern:
 * - use entries() when you need index + value while looping
 * - use find() when you need the first matching value
 *
 * Main tools:
 * 1. entries()
 * 2. iterator.next()
 * 3. for...of with destructuring
 * 4. find()
 * 5. Object.entries() comparison
 *
 * Mental model:
 * "entries() gives [index, value] pairs. find() returns the first element whose
 * callback returns truthy. Together, they help us loop with indexes and search
 * inside each value."
 *
 * MDN references:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 */

console.log('--- Part 1: entries() returns an iterator ---')

/*
 * entries() does not return a normal array.
 * It returns an iterator. Calling next() pulls one pair at a time.
 */
const letters = ['a', 'b', 'c']
const letterEntries = letters.entries()

console.log('iterator object:', letterEntries)
// expected output: Object [Array Iterator] {}

console.log('first next value:', letterEntries.next().value)
// expected output: [0, 'a']

console.log('second next value:', letterEntries.next().value)
// expected output: [1, 'b']

console.log('third next value:', letterEntries.next().value)
// expected output: [2, 'c']

console.log('after iterator is done:', letterEntries.next())
// expected output: { value: undefined, done: true }

console.log('--- Convert entries() to an array when needed ---')

/*
 * Spread syntax can collect all entry pairs into a real array.
 */
console.log('all entries:', [...letters.entries()])
// expected output: [[0, 'a'], [1, 'b'], [2, 'c']]

console.log('--- for...of with entries() ---')

/*
 * This is the most common way to use entries().
 * Destructuring gives index and value directly.
 */
for (const [index, letter] of letters.entries()) {
  console.log(`index ${index} has ${letter}`)
}
// expected output:
// index 0 has a
// index 1 has b
// index 2 has c

console.log('--- entries() visits empty slots as undefined ---')

/*
 * entries() visits every index from 0 to length - 1.
 * Empty slots appear as undefined.
 */
const sparseLetters = ['a', , 'c']

console.log('sparse entries:', [...sparseLetters.entries()])
// expected output: [[0, 'a'], [1, undefined], [2, 'c']]

console.log('index 1 exists:', Object.hasOwn(sparseLetters, 1))
// expected output: false

console.log('--- Part 2: find() returns the matching element ---')

/*
 * find() calls the callback until the callback returns truthy.
 * Then it returns the matching element itself and stops.
 *
 * Important:
 * - it does not return true/false
 * - it does not return the index
 * - it does not return the callback result
 */
const numbers = [5, 12, 8, 130, 44]
const firstLargeNumber = numbers.find((number) => number > 10)

console.log('first number greater than 10:', firstLargeNumber)
// expected output: 12

const missingNumber = numbers.find((number) => number > 200)

console.log('missing number:', missingNumber)
// expected output: undefined

const users = [
  { id: 1, name: 'Asha' },
  { id: 2, name: 'Mayank' },
  { id: 3, name: 'Nina' },
]

const foundUser = users.find((user) => user.id === 2)

console.log('found user:', foundUser)
// expected output: { id: 2, name: 'Mayank' }

console.log('same object reference:', foundUser === users[1])
// expected output: true

const callbackResultExample = [5, 12].find((number) => {
  return number > 10 ? 'yes' : false
})

console.log('callback result example:', callbackResultExample)
// expected output: 12

console.log('--- find() receives value, index, and array ---')

const firstLargeWithIndex = numbers.find((value, index, array) => {
  console.log(`checking index ${index} of ${array.length}:`, value)
  return value > 10
})

console.log('first large with index result:', firstLargeWithIndex)
// expected output: 12

console.log('--- find() stops after the first match ---')

const visited = []
const firstEven = [1, 3, 4, 6, 8].find((number) => {
  visited.push(number)
  return number % 2 === 0
})

console.log('first even:', firstEven)
// expected output: 4

console.log('visited values:', visited)
// expected output: [1, 3, 4]

console.log('--- Part 3: entries() and find() together ---')

/*
 * Example: tic-tac-toe winning combinations.
 *
 * entries() gives us the combo index and combo value.
 * find() checks whether the player has any cell inside that combo.
 */
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const playerMoves = new Set([0, 2, 3, 4, 5])
const combosWithPlayerMove = []

for (const [comboIndex, combo] of winCombos.entries()) {
  const firstMatchingCell = combo.find((cell) => playerMoves.has(cell))

  if (firstMatchingCell !== undefined) {
    combosWithPlayerMove.push({
      comboIndex,
      combo,
      firstMatchingCell,
    })
  }
}

console.log('combos with at least one player move:', combosWithPlayerMove)
// expected output: objects for combo indexes 0, 1, 3, 4, 5, 6, and 7

console.log(
  'combo indexes only:',
  combosWithPlayerMove.map((result) => result.comboIndex)
)
// expected output: [0, 1, 3, 4, 5, 6, 7]

console.log('--- Careful: found value can be 0 ---')

/*
 * Do not check find() results with only truthy/falsy logic when 0, '', or false
 * could be valid found values.
 */
const cells = [0, 1, 2]
const foundZero = cells.find((cell) => cell === 0)

console.log('found zero:', foundZero)
// expected output: 0

console.log('wrong truthy check:', foundZero ? 'found' : 'not found')
// expected output: not found

console.log('better undefined check:', foundZero !== undefined ? 'found' : 'not found')
// expected output: found

/*
 * Array entries:
 * - use array.entries()
 *
 * Object entries:
 * - use Object.entries(object)
 */
console.log('--- Object.entries() is for plain objects ---')

const userProfile = {
  name: 'Mayank',
  role: 'learner',
}

console.log('Object.entries(userProfile):', Object.entries(userProfile))
// expected output: [['name', 'Mayank'], ['role', 'learner']]
