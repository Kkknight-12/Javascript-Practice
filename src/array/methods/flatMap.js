const arr1 = [1, 2, 3, 4];

const a = arr1.map((x) => [x * 2]);
console.log(a);
// [[2], [4], [6], [8]]

const b = arr1.flatMap((x) => [x * 2]);
console.log(b);
// [2, 4, 6, 8]

// only one level is flattened
arr1.flatMap((x) => [[x * 2]]);
// [[2], [4], [6], [8]]

const arr2 = [1, [2, 3, [33]], 4];
const x = arr2.flatMap((x) => x);
console.log(x); // [1, 2, 3, [33], 4]
