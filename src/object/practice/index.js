const jsonData = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque",
  },
]

// Manipulating the title by adding a prefix
const modifiedData = jsonData.map((item) => {
  item.title = `Prefix: ${item.title}`
  return item
})

// Convert the modified JSON array to a string
const jsonString = JSON.stringify(modifiedData)

// console.log("jsonstring ", jsonString)
// console.log("jsonstring ", jsonString.substring(0, 10))

const string = "Welcome to the Jungle"

const reverseString = reverseBySeprator(string, "")
console.log("reverseString ", reverseString)

const reverseEachWord = reverseBySeprator(reverseString, " ")
console.log("reverseEachWord ", reverseEachWord)

function reverseBySeprator(string, seprator) {
  return string.split(seprator).reverse().join(seprator)
}
// console.log(string.split(" ").reverse().join(" "))
// console.log(string.indexOf("to"))
// console.log(string.lastIndexOf("e"))
// console.log(string.length)
// console.log(string.split(" ", 2))

//-----------------

const obj = { user: { role: "admin" } }

const result = JSON.parse(JSON.stringify(obj))
console.log(result)
result.user.role = "ccook"
console.log(result)
console.log(obj)

function deepClone(value) {
  if (typeof value !== "object" || value === null) {
    return value
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [key, deepClone(value)])
  )
}

const deepc = deepClone(obj)
console.log("deepc ", deepc)

const object1 = { a: 1, b: 2, c: 3 }

//  Object.entries --> returns an array of a given object
const object2 = Object.entries(object1)
console.log(object2) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]

//

const newObjectArr = Object.entries(object1).map(([key, value]) => [key, value])
// console.log("new Object arr ", newObjectArr) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]

//  Object.fromEntries --> transforms a list of key-value pairs into an object
const newObject = Object.fromEntries(
  Object.entries(object1).map(([key, value]) => [key, value])
)
console.log("newObject ", (newObject.a = "000"))
console.log("newObject ", newObject)
console.log(object1)
