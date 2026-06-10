// concat() method is used to merge two or more arrays.
// This method does not change the existing arrays,
// but instead returns a new array.
//

const array1 = ['a', 'b', 'c', [1, 2, 3]];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);

// accept multiple arguments
const array4 = array1.concat(array2, 'G', 'H', 'I');
console.log(array4);
