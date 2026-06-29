/*
 * Array.prototype.splice()
 *
 * This file teaches splice() as an Array instance method.
 *
 * Main tools:
 * 1. splice()
 * 2. start index
 * 3. delete count
 * 4. inserted items
 * 5. in-place mutation
 * 6. toSpliced()
 * 7. sparse array behavior
 * 8. generic array-like behavior
 *
 * Mental model:
 * "splice() changes the same array by removing, inserting, or replacing items."
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.splice
 */

console.log('--- Basic remove with splice(start, deleteCount) ---')

/*
 * splice(start, deleteCount) removes items from the original array.
 * It returns a new array containing the removed items.
 */
const letters = ['a', 'b', 'c', 'd', 'e']
const removedLetters = letters.splice(1, 2)

console.log('removed letters:', removedLetters)
// expected output: [ 'b', 'c' ]

console.log('letters after splice:', letters)
// expected output: [ 'a', 'd', 'e' ]

console.log('same array reference for removed result:', removedLetters === letters)
// expected output: false

console.log('--- Omitted deleteCount removes to the end ---')

const queue = ['first', 'second', 'third', 'fourth']
const removedTail = queue.splice(2)

console.log('removed tail:', removedTail)
// expected output: [ 'third', 'fourth' ]

console.log('queue after removing tail:', queue)
// expected output: [ 'first', 'second' ]

console.log('--- Insert without deleting ---')

/*
 * deleteCount 0 means insert items before the start index.
 */
const colors = ['red', 'blue']
const removedColors = colors.splice(1, 0, 'green', 'yellow')

console.log('removed colors:', removedColors)
// expected output: []

console.log('colors after insert:', colors)
// expected output: [ 'red', 'green', 'yellow', 'blue' ]

console.log('--- Replace items ---')

const menu = ['Tea', 'Coffee', 'Juice', 'Water']
const replacedItems = menu.splice(1, 2, 'Lemonade', 'Smoothie')

console.log('replaced items:', replacedItems)
// expected output: [ 'Coffee', 'Juice' ]

console.log('menu after replace:', menu)
// expected output: [ 'Tea', 'Lemonade', 'Smoothie', 'Water' ]

console.log('--- Negative start index ---')

/*
 * A negative start index counts from the end of the array.
 */
const tasks = ['wake', 'code', 'review', 'ship']
const removedLastTask = tasks.splice(-1, 1)

console.log('removed last task:', removedLastTask)
// expected output: [ 'ship' ]

console.log('tasks after negative start:', tasks)
// expected output: [ 'wake', 'code', 'review' ]

console.log('--- No arguments vs undefined start ---')

/*
 * splice() with no arguments removes nothing.
 * splice(undefined) treats start as 0 and removes to the end.
 */
const noArguments = ['a', 'b', 'c']
const undefinedStart = ['a', 'b', 'c']

console.log('splice() result:', noArguments.splice())
// expected output: []

console.log('array after splice():', noArguments)
// expected output: [ 'a', 'b', 'c' ]

console.log('splice(undefined) result:', undefinedStart.splice(undefined))
// expected output: [ 'a', 'b', 'c' ]

console.log('array after splice(undefined):', undefinedStart)
// expected output: []

console.log('--- Deleting to the end while inserting ---')

/*
 * If you want to delete through the end and also insert items,
 * pass Infinity as deleteCount.
 */
const pages = ['intro', 'setup', 'old-a', 'old-b']
const removedPages = pages.splice(2, Infinity, 'new-a')

console.log('removed pages:', removedPages)
// expected output: [ 'old-a', 'old-b' ]

console.log('pages after splice:', pages)
// expected output: [ 'intro', 'setup', 'new-a' ]

console.log('--- toSpliced() for a copying splice ---')

/*
 * toSpliced() returns a changed copy and does not mutate the original.
 */
const steps = ['plan', 'draft', 'review']
const updatedSteps = steps.toSpliced(1, 1, 'write')

console.log('updated steps copy:', updatedSteps)
// expected output: [ 'plan', 'write', 'review' ]

console.log('steps after toSpliced:', steps)
// expected output: [ 'plan', 'draft', 'review' ]

console.log('same array reference:', updatedSteps === steps)
// expected output: false

console.log('--- Shallow copy warning ---')

/*
 * toSpliced() creates a new outer array.
 * Objects inside the array are still shared references.
 */
const projectTasks = [
  { title: 'learn splice', done: false },
  { title: 'practice methods', done: false },
]
const updatedProjectTasks = projectTasks.toSpliced(1, 0, {
  title: 'write notes',
  done: false,
})

updatedProjectTasks[0].done = true

console.log('updated task copy:', updatedProjectTasks)
// expected output:
// [
//   { title: 'learn splice', done: true },
//   { title: 'write notes', done: false },
//   { title: 'practice methods', done: false }
// ]

console.log('original tasks after nested mutation:', projectTasks)
// expected output:
// [
//   { title: 'learn splice', done: true },
//   { title: 'practice methods', done: false }
// ]

console.log('--- Sparse array behavior ---')

/*
 * splice() preserves empty slots in the removed array and in the mutated array.
 */
const sparseValues = [1, , 3, 4, , 6]
const removedSparseValues = sparseValues.splice(1, 2)

console.log('removed sparse values:', removedSparseValues)
// expected output: [ <1 empty item>, 3 ]

console.log('index 0 exists in removed sparse values:', Object.hasOwn(removedSparseValues, 0))
// expected output: false

console.log('sparse values after splice:', sparseValues)
// expected output: [ 1, 4, <1 empty item>, 6 ]

console.log('index 2 exists after splice:', Object.hasOwn(sparseValues, 2))
// expected output: false

console.log('--- toSpliced() and sparse arrays ---')

/*
 * toSpliced() returns a dense array, so empty slots become undefined values.
 */
const sparseCopyResult = [1, , 3, 4, , 6].toSpliced(1, 2)

console.log('toSpliced sparse result:', sparseCopyResult)
// expected output: [ 1, 4, undefined, 6 ]

console.log('index 2 exists in toSpliced result:', Object.hasOwn(sparseCopyResult, 2))
// expected output: true

console.log('--- Generic array-like behavior ---')

/*
 * splice() is generic.
 * It can be borrowed for array-like objects with length and integer keys.
 */
const arrayLike = {
  0: 'a',
  2: 'c',
  length: 3,
}

const removedFromArrayLike = Array.prototype.splice.call(arrayLike, 0, 1, 'x', 'y')

console.log('removed from array-like:', removedFromArrayLike)
// expected output: [ 'a' ]

console.log('array-like after splice:', arrayLike)
// expected output: { '0': 'x', '1': 'y', '3': 'c', length: 4 }

console.log('--- splice() vs slice() ---')

const spliceSource = ['a', 'b', 'c', 'd']
const sliceSource = ['a', 'b', 'c', 'd']

const splicedPart = spliceSource.splice(1, 2)
const slicedPart = sliceSource.slice(1, 3)

console.log('spliced part:', splicedPart)
// expected output: [ 'b', 'c' ]

console.log('splice source after splice:', spliceSource)
// expected output: [ 'a', 'd' ]

console.log('sliced part:', slicedPart)
// expected output: [ 'b', 'c' ]

console.log('slice source after slice:', sliceSource)
// expected output: [ 'a', 'b', 'c', 'd' ]
