/*
https://dev.to/dhilipkmr/implementing-our-own-array-map-method-in-javascript-553m
}
*/

// // //////////////////////////////
// // - Creating Own map function //
// // //////////////////////////////

// Array.prototype.mymap

Array.prototype.mymap = function (callback) {
  const resultArray = []
  console.log("this", this) // [ 1, 2, 3 ]
  for (let index = 0; index < this.length; index++) {
    resultArray.push(callback(this[index], index, this))
  }
  return resultArray
}

const sample = [1, 2, 3]

console.log(sample.mymap((a, index, arr) => a * 2))

//
// Array.prototype.myFilter = function (callback) {
//   const filterArr = []
//   for (let index = 0; index < this.length; index++) {
//     if (!!callback(this[index], index, this)) {
//       filterArr.push(this[index])
//     }
//   }
//   return filterArr
// }

Array.prototype.myFilter = function (callback) {
  let temp = []
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      temp.push(callback(this[i]))
    }
  }
  return temp
}

const arr = [2, 3, 4, 5, 6]

const data = arr.myFilter((num) => {
  return num > 2
})

console.log("result", data)

// --------------------------------------------------------

/*
  https://www.digitalocean.com/community/tutorials/how-to-implement-javascript-array-methods-from-scratch

*/

// STEP - 1
// to see result
// click run code after right click
// or click play button
const myCustomMapFunction1 = function (callback) {
  console.log("My Custom First Map Function!") // My Custom Map Function!
  console.log("here THIS is", this) //  [ 1, 2, 3 ]
}

Array.prototype.mapFromScratch1 = myCustomMapFunction1

const arr2 = [1, 2, 3]

arr2.mapFromScratch1()

// STEP - 2
console.log("STEP ----- ", 2)

const myCustomMapFunction2 = function (callback) {
  console.log("My Custom Second Map Function!")

  // 'this' refers to the array
  for (let i = 0; i < this.length; i++) {
    console.log(this[i])
  }
}
Array.prototype.mapFromScratch2 = myCustomMapFunction2

const arr3 = [1, 2, 3]

arr3.mapFromScratch2()

// --------------------------------------------------------

// STEP - 3
// call callback function
console.log("STEP ----- ", 3)

// perform any required transformation by calling the callback function.
// add the transformed elements to a new array and return that array.
const myCustomMapFunction3 = function (callback) {
  console.log("My Custom Third Map Function!")

  const newArray = []
  // 'this' refers to the array
  for (let i = 0; i < this.length; i++) {
    newArray[i] = callback(this[i])
  }

  return newArray
}

Array.prototype.mapFromScratch3 = myCustomMapFunction3

const arr4 = [1, 2, 3]
console.log(arr4.mapFromScratch3((element) => ++element))

// --------------------------------------------------------

// STEP - 3
// apply condition
console.log("STEP ----- ", 4)

const myCustomFilterFunction1 = function (callback) {
  console.log("My Custom Fourth Map Function!")

  const newArray = []
  // 'this' refers to the array
  for (let i = 0; i < this.length; i++) {
    // callback function is invoked
    // if condition is satisfied
    // then push it into newArray
    if (callback(this[i])) {
      newArray.push(this[i])
    }
  }

  return newArray
}

Array.prototype.mapFromScratch1 = myCustomFilterFunction1

const arr5 = [1, 2, 3, 4]
console.log(arr5.mapFromScratch1((element) => element > 2))

// --------------------------------------------------------

// STEP - 4
// implement sort
console.log("------sort------")
/*  
const myCustomSortFunction = function (list) {
    console.log("My Custom Sort Function!")
    let count = 0
    let outerLoopCount = 0
    
    const newArray = [...list]
    
    for (let i = 0; i < newArray.length; i++) {
        outerLoopCount++
        for (let j = 0; j < newArray.length - 1; j++) {
            count++
            if (newArray[j] - newArray[j + 1] > 0) {
                const temp = newArray[j + 1]
                newArray[j + 1] = newArray[j]
                newArray[j] = temp
            }
        }
    }
    
    console.log("COUNT", count)
    console.log("outerLoopCount", outerLoopCount)
    // array is sorted
    return newArray
}

console.log(myCustomSortFunction([3, 2, 5, 1]))

*/

const myCustomSortFunction = function (callback) {
  console.log("MY custom sort function")

  const newArray = [...this]
  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray.length - 1; j++) {
      if (callback(newArray[j], newArray[j + 1]) > 0) {
        const temp = newArray[j + 1] // small
        newArray[j + 1] = newArray[j] // big
        newArray[j] = temp
      }
    }
  }
  // array is sorted
  return newArray
}

Array.prototype.sortFromScratch = myCustomSortFunction

const arr6 = [3, 2, 5, 1]
// [3, 2, 5, 1] // i = 0, j = 0
// [2, 3, 5, 1] // i = 0, j = 1
// [2, 3, 1, 5] // i = 0, j = 2
// --------------------------------
// [2, 3, 1, 5] // i = 1, j = 0
// [2, 1, 3, 5] // i = 1, j = 1
// [2, 1, 3, 5] // i = 1, j = 2
// --------------------------------
// [[1, 2, 3, 5] // i = 2, j = 0
// [[1, 2, 3, 5] // i = 2, j = 1
// [[1, 2, 3, 5] // i = 2, j = 2
// --------------------------------
// [[1, 2, 3, 5] // i = 3, j = 0
// [[1, 2, 3, 5] // i = 3, j = 1
// [[1, 2, 3, 5] // i = 3, j = 2

const sortResult = arr6.sortFromScratch((current, next) => current - next)
console.log("sortResult", sortResult)
// --------------------------------------------------------

// STEP - 5
// implement Reduce
console.log("------Reduce------")

const myCustomReduceFunction = function (callback, accumulator) {
  console.log("My Custom Reduce Function!")
  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i])
  }
  return accumulator
}
Array.prototype.reduceFromScratch = myCustomReduceFunction

const arr7 = [1, 2, 3]

/*

- callback body explanation
- (accumulator, element) => accumulator + element, 0
- before comma is argument one -> 
  (accumulator, element) => accumulator + element,
- and after comma is argument two -> 0
- function (callback, accumulator)
- callback(accumulator, this[i])
*/
console.log(
  arr7.reduceFromScratch((accumulator, element) => accumulator + element, 0)
)
