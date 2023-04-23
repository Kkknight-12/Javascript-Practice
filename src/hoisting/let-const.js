let age = 50

function printAge() {
  console.log(age) // Error Cannot access 'age' before initialization
  let age = 30
}

// printAge()

/*
- console.log statement inside the printAge 
- function doesn’t have access to that outer age variable
*/

//
//
//
/*
the let and const are also hoisted, why is it that they cannot be accessed before their declaration? The answer to this lies within the concept of the Temporal Dead Zone (TDZ).

Variables declared using let and the constants declared using const are hoisted but are in a TDZ. This prevents them from being accessed before their declaration has actually been executed during the step-by-step execution of the code.  
*/
function print() {
  function log() {
    console.log(age)
  }

  const age = 20
  log()
}

print() // 20
/*
age is accessed after the declaration of age variable because the console.log is inside another function that is called after the declaration of the age variable. By the time the age variable is accessed inside the log function, the age variable’s declaration has already been executed.  
*/

// Example 2
x = 8 // declaration
console.log(x) // // call ->
let x // // initialization
