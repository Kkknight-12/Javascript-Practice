console.log(1) // sync code

// async code | Goes to the callback queue
setTimeout(() => console.log(6))

// async code | Goes to the microtask queue
Promise.resolve().then(() => console.log(3))

// async code | Goes to the microtask queue
Promise.resolve().then(() => {
  console.log('4 hii') // 4

  //// async code | Goes to the callback queue
  setTimeout(() => console.log(8))
})

// async code | Goes to the microtask queue
Promise.resolve().then(() => console.log(5))

// async code | Goes to the callback queue
setTimeout(() => console.log('10'), 2000)

// async code | Goes to the callback queue
setTimeout(() => console.log('9'), 200)

// async code | Goes to the callback queue
setTimeout(() => console.log(7))

console.log(2) // sync code

// sync code is executed first
// then async code is executed
// microtask queue is executed first and then callback queue is executed
// checking the callstack if it is empty for executing microtask queue and
// callback queue is job of event loop