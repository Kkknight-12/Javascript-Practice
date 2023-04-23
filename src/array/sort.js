// ------------------------------------------------------------------------

/*
people.sort((p1, p2) => p1.getAge() - p2.getAge());
The comparator function takes two parameters, p1 and p2, with the following contract:
■ If comparator return less than 0, p1 comes before p2.
■ If comparator returns 0, leave p1 and p2 unchanged.
■ If comparator returns greater than 0, p1 comes after p2.
In addition to being assignable, JavaScript functions like sort() accept other func- tions as arguments and belong to a category called higher-order functions.
*/

// ------------------------------------------------------------------------

Array.prototype.somePrototypeFunc = function (callback) {
  let num = [...this]
  return callback(num)
}

const arr1 = [2, 3, 4, 5, 6]

const data1 = arr1.somePrototypeFunc((num) => num)

console.log("somePrototypeFunc result", data1)

//----------------------------------------

function someFunc(callback) {
  return (num) => callback(num)
}

const arr = [2, 3, 4, 5, 6]

const data = someFunc((num) => num)

console.log("someFunc result", data(arr))

// ------------------------------------------------------------------------

function comparator(pred) {
  console.log("pred", pred)
  return (x, y) => {
    if (pred(x, y)) return -1
    if (pred(y, x)) return 1
    return 0
  }
}

const result1 = [5, 1, 2, 8].sort(comparator((a, b) => a > b))
console.log("result 1", result1) // [ 8, 5, 2, 1 ]

console.log(" ")

const result2 = [5, 1, 2, 8].sort(comparator((a, b) => a < b))
console.log("result 2", result2) // [ 1, 2, 5, 8 ]

// ------------------------------------------------------------------------

/*  
- the above code have callback function 
- find the explanation in callback Function
- file from line 5 to 29
*/

// ------------------------------------------------------------------------

// sort array of object

const items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
]

// string
console.log(items.sort((a, b) => (a.name < b.name ? 1 : -1)))

// value
console.log(items.sort((l1, l2) => l2.value - l1.value))

const result3 = items.sort(comparator((a, b) => a.name < b.name))
console.log("result 3", result3) // [ 1, 2, 5, 8 ]

//
const parent = (callable) => {
  return (arg1, arg2) => callable(arg1, arg2)
}

const hero = parent((a, b) => a + b)

console.log(hero(1, 2))

// function someHOF(callable) {
//   return (a, b) => callable(a, b)
// }
// const tricky = someHOF((a, b) => a + b)
// console.log(tricky(1, 2))

function anotherHOF(callback) {
  return callback()
}
