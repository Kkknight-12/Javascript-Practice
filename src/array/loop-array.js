const arr = ["aman", "chaman", "baga", "dhoni"]

// Traditional way
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// using for of loop
for (let index of arr) {
  console.log("->", index)
}

const obj = {
  a: "name",
  b: "occupation",
}

function recurLoopObj(obj) {
  if (Object.keys(obj).length < 0) return
  console.log(obj)
}
