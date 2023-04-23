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
    // this => [2, 3, 4, 5, 6]
    let c = callback(this[i])
    let t = this
    if (callback(this[i], i, this)) {
      temp.push(callback(this[i]))
    }
  }
  return temp
}

const arr = [2, 3, 4, 5, 6]
console.log("arr", arr)

const data = arr.myFilter((num) => {
  return num > 2
})

console.log("result", data)
//
