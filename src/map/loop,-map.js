let recipeMap = new Map([
  ["cucumber", 500],
  ["tomatoes", 350],
  ["onion", 50],
])

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable) // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  console.log(amount) // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) {
  // the same as of recipeMap.entries()
  console.log(entry) // cucumber,500 (and so on)
}

// Besides that, Map has a built-in forEach method, similar to Array:
// runs the function for each (key, value) pair
recipeMap.forEach((value, key, map) => {
  alert(`${key}: ${value}`) // cucumber: 500 etc
})
