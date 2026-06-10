/////////
// let //
/////////
// let is blocked scope
for (let j = 6; j < 10; j++) {
  console.log(`Inside the loop: ${j}`)
}
// console.log(`Outside the loop: ${j}`) // ReferenceError: j is not defined

// ------------------------------------------------------------------------

// scope types
// - globle, local

// ------------------------------------------------------------------------

//  global variable can be changed inside a function.
let a = "hello"

function greet1() {
  a = 3
}

// before the function call
console.log("a", a) // hello

//after the function call
greet1()
// value of a changed to 3
console.log("a", a) // 3

console.log("---------------")

// ------------------------------------------------------------------------
///
// program showing local scope of a variable
let h = "helloooo"

function greet2() {
  let b = "World"
  console.log(h + " " + b) // helloooo World
}

greet2()
// accessing b outside greet2()
// console.log(b) // ReferenceError: b is not defined

// ------------------------------------------------------------------------
