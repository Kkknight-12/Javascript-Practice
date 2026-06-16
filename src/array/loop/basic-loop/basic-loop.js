/*
 * Basic array loops
 *
 * This file compares the common ways to loop over an array.
 *
 * Main tools:
 * 1. for loop
 * 2. for...of loop
 * 3. entries() with for...of
 * 4. forEach()
 *
 * Mental model:
 * "Use the loop that matches the job. Need index/control? use for. Need values?
 * use for...of. Need index + value? use entries(). Need simple side effects?
 * forEach() is fine."
 *
 * MDN references:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
 */

const learners = ['Aman', 'Chaman', 'Baga', 'Dhoni']

console.log('--- classic for loop ---')

/*
 * Use a classic for loop when you need the index or full loop control.
 *
 * Flow:
 * 1. start with index 0
 * 2. run while index is less than array length
 * 3. increase index after each round
 */
for (let index = 0; index < learners.length; index++) {
  console.log(index, learners[index])
}
// expected output:
// 0 Aman
// 1 Chaman
// 2 Baga
// 3 Dhoni

console.log('--- for...of loop ---')

/*
 * Use for...of when you only need each value.
 * It reads cleaner than learners[index] when the index does not matter.
 */
for (const learner of learners) {
  console.log('learner:', learner)
}
// expected output:
// learner: Aman
// learner: Chaman
// learner: Baga
// learner: Dhoni

console.log('--- entries() for index + value ---')

/*
 * entries() gives [index, value] pairs.
 * This is useful when you want for...of readability but still need the index.
 */
for (const [index, learner] of learners.entries()) {
  console.log(`${index + 1}. ${learner}`)
}
// expected output:
// 1. Aman
// 2. Chaman
// 3. Baga
// 4. Dhoni

console.log('--- forEach() for side effects ---')

/*
 * forEach() runs a callback once for each assigned array element.
 * It is fine for side effects like logging or pushing into another array.
 */
const upperCaseLearners = []

learners.forEach((learner) => {
  upperCaseLearners.push(learner.toUpperCase())
})

console.log('upperCaseLearners:', upperCaseLearners)
// expected output: ['AMAN', 'CHAMAN', 'BAGA', 'DHONI']

console.log('--- break and continue need loop statements ---')

/*
 * Use for or for...of when you need break or continue.
 * forEach() does not support normal break/continue.
 */
for (const learner of learners) {
  if (learner === 'Chaman') {
    console.log('skip:', learner)
    continue
  }

  if (learner === 'Dhoni') {
    console.log('stop before:', learner)
    break
  }

  console.log('selected:', learner)
}
// expected output:
// selected: Aman
// skip: Chaman
// selected: Baga
// stop before: Dhoni

console.log('--- avoid for...in for arrays ---')

/*
 * for...in loops over property names, not array values.
 * Arrays are objects, so custom properties can appear too.
 */
const topics = ['array', 'object']
topics.owner = 'javascript'

for (const key in topics) {
  console.log('for...in key:', key)
}
// expected output:
// for...in key: 0
// for...in key: 1
// for...in key: owner

/*
 * for...of loops over array values.
 * This is usually what you want when reading array items.
 */
for (const topic of topics) {
  console.log('for...of value:', topic)
}
// expected output:
// for...of value: array
// for...of value: object
