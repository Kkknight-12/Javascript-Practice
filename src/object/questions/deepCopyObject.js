const obj = { user: { role: "admin" } }

// Method 1;
const result = JSON.parse(JSON.stringify(obj))
// console.log(result)
// result.user.role = "ccook"
// console.log(result)
// console.log(obj)

// Method 2; -- Recursion
function deepClone(value) {
  // check if the value is not an object or
  // if it's a null value
  // console.log(typeof [1, 2, 3]) -> object
  if (typeof value !== "object" || value === null) {
    return value
  }

  // if value is array map over it and
  // send each item from array to deepClone function
  if (Array.isArray(value)) {
    return value.map((arr) => deepClone(arr))
  }

  // convert the object to new object
  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [key, deepClone(value)])
  )
}

const originalObject = { a: 1, b: [{ a: 1, b: 2, c: 3 }], c: 3, d: null }
const deepc = deepClone(originalObject)
console.log("deepc ", deepc)

const object1 = { a: 1, b: 2, c: 3 }

//  Object.entries --> returns an array of a given object
const object2 = Object.entries(object1)
// console.log(object2) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]

//
const newObjectArr = Object.entries(object1).map(([key, value]) => [key, value])
// console.log("new Object arr ", newObjectArr) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]

//  Object.fromEntries --> transforms a list of key-value pairs into an object
const newObject = Object.fromEntries(
  Object.entries(object1).map(([key, value]) => [key, value])
)
// { a: 1, b: 2, c: 3 }

// changing something inside new object will not change
// anything inside original object.
console.log("newObject ", (newObject.a = "000"))
console.log("newObject ", newObject)
console.log(object1)

// API
//  https://www.builder.io/blog/structured-clone
const newObjt = structuredClone(originalObject)
console.log("newObjt ", newObjt)
