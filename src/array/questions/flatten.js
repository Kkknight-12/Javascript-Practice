function flatten(object) {
  let arr = []
  for (const iterator of object) {
    if (Array.isArray(iterator)) {
      arr = [...arr, ...flatten(iterator)]
    } else {
      arr.push(iterator)
    }
  }
  return arr
}

let iterator = [1, [2, [3, 4, 5], 9, [10, [11]]]]
// console.log(flatten(iterator))

const copy = iterator.slice()

function iterativeSolution(iterator) {
  while (iterator.some(Array.isArray)) {
    // when empty array is concated with iterator
    // a new array is created
    // in which we will have
    // values of iterator and nothing from empty array
    iterator = [].concat(...iterator)
  }
  return iterator
}
console.log("iterator )) ", iterativeSolution(iterator))

// console.log([1, 2, 3].concat([4, 5], 44))

// const originalArr = [1, 2, 3]
// const result = [0].concat(1, 2, 3)
// console.log("result ", result)
