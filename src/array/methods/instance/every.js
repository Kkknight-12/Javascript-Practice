const array1 = [1, 30, 39, 29, 10, 13];

// every() method tests whether all elements
// in the array pass the test implemented by the
// provided function. It returns a Boolean value.

// all elements in the array are less than 40
console.log(array1.every((currentValue) => currentValue < 40));
// Expected output: true

// all elements in the array are not less than 40
console.log(array1.every((currentValue) => currentValue > 40));
// Expected output: false
