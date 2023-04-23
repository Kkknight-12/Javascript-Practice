/*
https://www.notion.so/Var-let-Const-b021b742368f42058c16508373a9d087

https://www.programiz.com/javascript/hoisting
*/

///////////////
// Hoisting //
//////////////
// Hoisting means that you can define a variable
// before its initializing.

// using test before declaring
// Example 1
console.log(test) // undefined
var test

// varaible hoisting example
// Example 2
x = 8 // initializing
console.log("x", x) // variable call -> x 8
var x // declaring

/*
// program to display value
var x;
x = 8;
console.log(x); // 8  
*/

/*
- Variables are DECLARED with the var keyword as follows
    - var money;
    - var name;
- Storing a value in a variable is called variable INITIALIZATION
    - var name = "Ali";
    - var money;
    - money = 2000.50;
*/

// However in JavaScript, initializations are not hoisted. For example,
// if we declare a variable while initializing
// then also we get undefined
// Example 1
console.log("xy", xy) // variable call -> xy undefined
var xy = 9 // initializing

// Example 2
console.log("initializeA", initializeA) // undefined
var initializeA = 5 // initializing

/*
The above program behaves as:
var initializeA; // declaring
console.log(initializeA);
initializeA = 5;  // initializing
*/

/*
Only the declaration is moved to the memory in the compile phase. 
Hence, the value of variable initializeA is undefined because initializeA 
is printed without initializing it.  
*/

// Example 2
function checkVar() {
  console.log(a) // undefined
  //   console.log(b) // Cannot access 'b' before initialization
  //   console.log(c) // Cannot access 'c' before initialization
  var a = "ms"
  let b = "sm"
  const c = "cc"
}
checkVar() // undefined , error, error

// program to display value
var a = 4

/*
when the variable is used inside the function, 
the variable is hoisted only to the top of the function.  
*/
// Example 1
function greet() {
  b = "hello"
  console.log("greet", b) // hello
  var b
}

greet() // hello
// console.log(b) // b is not defined

// ////////////////////
// Function Hoisting //
// ////////////////////

greet2() // Hi, there.

function greet2() {
  console.log("Hi, there.")
}

/*
 function greet is called before declaring it and the 
 program shows the output. This is due to hoisting.  
*/

/*
However, when a function is used as an expression, an error 
occurs because only declarations are hoisted. For example;  
*/
// program to print the text
// greetgreetexp() // greetgreetexp is not defined

// let greetexp = function () {
//   console.log("Hi, there.")
// }
