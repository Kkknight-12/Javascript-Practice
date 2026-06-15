const myFilterArr = function (args, callback) {
  const arr = []
  console.log("this", this) // global
  for (i = 0; i < args.length; i++) {
    // if this expression is true
    if (callback(args[i])) {
      arr.push(args[i]) // push element to array
    }
  }
  return arr
}

const result = myFilterArr([1, 2, 3, 4], (num) => num > 2)
console.log(result)

// ----------------------------------------------------------------------

// Selection Sort Algorithm
// iterate over the array
// find smallest value
// put it at index
// index = i
