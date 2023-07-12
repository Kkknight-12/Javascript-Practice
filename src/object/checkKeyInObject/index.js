// 'in' operator

const obj = { key: "value" }

if ("key" in obj) {
  console.log("checking Key exist in Object using in method")
}

// 2
// hasOwnProperty() method
if (obj.hasOwnProperty("key")) {
  console.log("checking key exist in object with hasOwnProperty method")
}

// 3
// !== undefined comparision

if (obj.key !== undefined) {
  console.log("checking key exist in Object with dot notation")
}

// 4
// Object.keys and includes method
const keys = Object.keys(obj)

if (keys.includes("key")) {
  console.log("checking key exist in Object with Object.keys method")
}

// NOTE
/**
 * The "in" operator and the "hasOwnProperty()" method also check for keys
 * in the object's prototype chain, while the other methods only check for
 * keys in the object itself.
 */

const parentObject = { parentKey: "parent value" }
const child = Object.create(parentObject)
child.childKey = "Child value"
console.log(child) // { childKey: 'Child value' }

//
// in
console.log("parentKey" in child) // true
console.log("childKey" in child) // true

//
// hasOwnProperty
console.log(child.hasOwnProperty("parentKey")) // false
console.log(child.hasOwnProperty("childKey")) // true

//
// !==
for (key in child) {
  if (key !== undefined) {
    console.log(true)
  } else {
    console.log(false)
  }
} // true, true

//
// Object.keys and includes
/**
 * here with object keys we are creating array which have element
 * which are only present child object, the array created using Object.keys
 * will not have keys from parent object.
 */
const childKeys = Object.keys(child)
console.log(childKeys) // [ 'childKey' ]

if (childKeys.includes("childKey")) {
  console.log(true)
} // true

if (childKeys.includes("parentKey")) {
  console.log(true)
} else {
  console.log(false)
} // false
