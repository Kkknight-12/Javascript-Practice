// initialize Empty map
let mapVar = new Map()

mapVar.set("stringg", "str1") // a string key
mapVar.set(1, "num1") // a numeric key
mapVar.set(true, "bool1") // a boolean key

// lets check how does a map look like
console.log("map 1st look", mapVar)
// { 'stringg' => 'str1', 1 => 'num1', true => 'bool1' }

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
console.log(mapVar.get(1)) // 'num1'
console.log(mapVar.get("stringg")) // 'str1'

console.log(mapVar.size) // 3

console.log(mapVar["stringg"]) // undefined
console.log(mapVar[1]) // undefined

//
// map[key] also works,
// but we are treating map as a plain JavaScript object, so it implies all corresponding
// limitations (only string/symbol keys and so on).
mapVar["stringg2"] = "str2"
console.log(mapVar["stringg2"])

// ////////////////////////////////////////////////////////////
// Note -> So we should use map methods: set, get and so on. //
// ////////////////////////////////////////////////////////////

// Map can also use objects as keys.
let john = { name: "John" }

// for every user, let's store their visits count
let visitsCountMap = new Map()

// john is the key for the map
visitsCountMap.set(john, 123)

console.log(visitsCountMap.get(john)) // 123

// ////////////////
// Object vs Map //
// ////////////////
/* Using objects as keys is one of the most notable and important Map features. The same does not count for Object. String as a key in Object is fine, but we can’t use another Object as a key in Object.
 */
let john2 = { name: "John" }
let ben2 = { name: "Ben" }

let visitsCountObj = {} // try to use an object

visitsCountObj[ben2] = 234 // try to use ben object as the key
visitsCountObj[john2] = 123 //

console.log(visitsCountObj) // { '[object Object]': 123 }
/* 
As visitsCountObj is an object, it converts all Object keys, such as john and ben above, to same string "[object Object]". Definitely not what we want. 
*/

// ///////////
// Chaining //
// ///////////
/* Every map.set call returns the map itself, so we can “chain” the calls:
 */
mapVar.set("4", "str1").set(5, "num1").set(true, "bool1")

console.log("mapVar", mapVar)
/* 
mapVar Map(5) {
  'stringg' => 'str1',
  1 => 'num1',
  true => 'bool1',
  '4' => 'str1',
  5 => 'num1',
  stringg2: 'str2'
} */

// --------------------------------------------------------------------------------

// /////////////////////////////////
// Initialzing map with some data //
////////////////////////////////////

// When we have an array to start with
// Object.entries: Map from Object

// array
// array of [key, value] pairs
let map2 = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
])

console.log("map2--> map data", map2) // Map(3) { '1' => 'str1', 1 => 'num1', true => 'bool1' }
console.log(map2.get("1")) // str1

// Object
// when we have an object to start with
//Object.entries returns the array of key/value pairs:
let obj = {
  name: "John",
  age: 30,
}

let map3 = new Map(Object.entries(obj))
console.log(map3.get("name")) // John

console.log("map3 entries ->", Object.entries(obj)) // [ [ 'name', 'John' ], [ 'age', 30 ] ]
/* Object.entries returns the array of key/value pairs: [ ["name","John"], ["age", 30] ]. That’s what Map needs. */

// /////////////////////////////////////////////
// Object.from Entries to get object from map //
// /////////////////////////////////////////////
console.log("map data -> ", map3) // Map(2) { 'name' => 'John', 'age' => 30 }
console.log("fromEntries", Object.fromEntries(map3)) // { name: 'John', age: 30 }

/* 
We’ve just seen how to create Map from a plain object with Object.entries(obj).

There’s Object.fromEntries method that does the reverse: given an array of [key, value] pairs, it creates an object from them: */

let prices = Object.fromEntries([
  ["banana", 1],
  ["orange", 2],
  ["meat", 4],
])

console.log("price => fromEntries", prices)
//  { banana: 1, orange: 2, meat: 4 }

//
let map4 = new Map()
map4.set("banana", 1)
map4.set("orange", 2)
map4.set("meat", 4)

console.log("map4.entries()", map4.entries())
let obj4 = Object.fromEntries(map4.entries()) // make a plain object (*)
// [Map Entries] { [ 'banana', 1 ], [ 'orange', 2 ], [ 'meat', 4 ] }
console.log("obj4", obj4)
// { banana: 1, orange: 2, meat: 4 }
console.log("obj", Object.fromEntries(map4))
// { banana: 1, orange: 2, meat: 4 }

//Example
/* 
We can use Object.fromEntries to get a plain object from Map.

E.g. we store the data in a Map, but we need to pass it to a 3rd-party code that expects a plain object.
*/

let map5 = new Map()
map5.set("banana", 1)
map5.set("orange", 2)
map5.set("meat", 4)

// map data set
console.log("map5", map5)
//  Map(3) { 'banana' => 1, 'orange' => 2, 'meat' => 4 }

// using entries to convert plain object into an array of key/value pairs
console.log("map5.entries()", map5.entries())
// [Map Entries] { [ 'banana', 1 ], [ 'orange', 2 ], [ 'meat', 4 ] }

// converting to plain js object
let obj5 = Object.fromEntries(map5.entries())
console.log("obj5 ", obj5) // { banana: 1, orange: 2, meat: 4 }

// shortcut
/* That’s the same, because Object.fromEntries expects an iterable object as the argument. Not necessarily an array. And the standard iteration for map returns same key/value pairs as map.entries(). So we get a plain object with same key/values as the map.
 */
Object.fromEntries(map5) // { banana: 1, orange: 2, meat: 4 }
