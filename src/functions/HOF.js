// function expression
const funcExp = () => {
  console.log("RUnning Exp")
}

const FuncTwo = (athing) => {
  return athing() // function have paranthesis -> invoking
}

// the function fires off  after giving the params
// even before we execute it
const checkOne = FuncTwo(funcExp) // RUnning Dec
// 'return' statement can only be used within a function
// return checkOne

console.log("------------------------------------")
// ------------------------------------------------------------
// function declaration

function nested() {
  console.log("RUnning nested Dec")
  let a = "nested result"
  return a
}

function funcDec() {
  return nested()
}

function tempFunc(athing) {
  return athing() // function have paranthesis -> invoking
}

// the function fires off  after giving the params
// even before we execute it
const checkTwo = tempFunc(funcDec) // RUnning Dec
console.log(checkTwo) // nested result

console.log("------------------------------------")
// ------------------------------------------------------------

// refencing a function
// const funOne = () => {
//   console.log("I will run")
// }

// // HOF
// const hfunc = (func) => {
//   return func // not invoking
// }

// const tempObjRet = hfunc(funOne)
// tempObjRet()

const funOne = () => {
  console.log("key value works")
  let result = "funcing nested"
  return result
}

// HOF
const hfunc = (func) => {
  console.log("hfunc is running")
  return func // not invoking
  //   return () => func() // not invoking-> declaring annonymous
}

// invoking hfunc
const tempObjRet = someOuterFun({ heyaaa: hfunc(funOne) }) // 1. hfunc is running

// will run funcOne return
console.log(tempObjRet) // 2. key value works

function someOuterFun({ heyaaa }) {
  // equivalent to funOne()
  // invoking funOne which is returned by hfunc function
  return heyaaa() // 3. key value works
}

console.log("----------someOuterFun ends-------------")

// -------------------------------------------------------

/*
1. someOuterFun() runs which will trigger hfunc()
2. hfunc() return runs and func is registered
3. call stack return to someOuterFun()
4. someOuterFun return runs heyaaa() which invoke funOne()
  - which is argument of hfunc()
  - and also returned by it
5. funOne() console.log is logged
  - return value goes to tempObjRet
6. console log of tempObjRet run which have return from 
  - funOne()
*/

/*
- if we save function in variable and then invoke it,
- it will still run

const tempObjRet = someOuterFun((heyaaa = hfunc(funOne))) // invoking hfunc

function someOuterFun(heyaaa) {
  return heyaaa() // invoking funOne
}
*/

console.log("-------------someOuterFun(heyaaa)---------------")
// -------------------------------------------------------

function nestedInvoke() {
  console.log("RUnning nested nestedInvoke")
  let a = "nestedInvoke result"
  return a
}

function funcDecInvoke(word) {
  console.log("word --> ", word) // magic
  return nestedInvoke()
}

function tempFuncInvoke(athing) {
  /*
    return is declaring an annonyous function
    and that annonymous function's return is   
    invoking athing function
    */
  return (shabd) => athing(shabd) // magic
}

// we are invoking tempFuncInvoke
// tempFuncInvoke return annonymous function
// and in return we are declaring annonymous function
// not invoking it
const checkInvoke = tempFuncInvoke(funcDecInvoke) // invoking tempFuncInvoke
console.log(checkInvoke) // [Function (anonymous)]
// invoking annonymous function
checkInvoke("magic")

/*
- console logging checkInvoke
- will console log the nestedInvoke return, which is a
*/
console.log(checkInvoke("wallah fir se magic"))
