// https://flexiple.com/loop-through-object-javascript/

const obj = {
  a: "name",
  b: "occupation",
}

// Old way
for (let i = 0; i < Object.keys(obj).length; i++) {
  let result = obj[Object.keys(obj)[i]]
  console.log("value -> ", result)
}

console.log("----------------")

// for in loop
for (let key in obj) {
  console.log(obj[key]) // name , occupation
}
