// filtering and mapping
const products = [
  { name: "Apples", price: 1.99, quantity: 10 },
  { name: "Oranges", price: 0.99, quantity: 5 },
  { name: "Bananas", price: 0.49, quantity: 20 },
  { name: "Grapes", price: 2.99, quantity: 0 },
  { name: "Watermelon", price: 5.99, quantity: 3 },
]

const filteredProducts = products
  .filter((product) => product.quantity > 0) // Filter out products with quantity 0 or less
  .map((product) => ({ name: product.name, price: product.price })) // Map the filtered products to a new array of objects with only name and price properties

console.log(filteredProducts)
// Output: [{ name: 'Apples', price: 1.99 }, { name: 'Oranges', price: 0.99 }, { name: 'Bananas', price: 0.49 }, { name: 'Watermelon', price: 5.99 }]

//
console.log(
  "map ",
  products.map((data) => data.name)
)
//
console.log(
  "filter ",
  products.filter((data) => {
    if (data.name.toLowerCase().includes("app")) {
      return data.name
    }
  })
)

const numbers = [1, 2, 3, 4, 5]

const filteredNumbers = numbers.filter((num) => num % 2 === 0) // filter even numbers

const doubledNumbers = filteredNumbers.map((num) => num * 2)

const filterNum = numbers.filter((num) => num % 2 === 0).map((num) => num + 10)
console.log(filterNum)

console.log(numbers.find((num) => num % 2 === 0))

console.log(Array.from([1, 2, 3], (x) => (x > 2 ? x + 10 : 0)))

console.log([...new Array(2).keys()].map((num) => num + 10))
