//
/*
https://medium.com/@kevinlai76/the-spread-operator-deep-and-shallow-copies-d193ac9b58bf

https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy

https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy

-------------------------------------------------

- deepcopy -> create a copy but with different memory location
- shallow copy -> create a copy with but share same memory location  

*/

// -------------------------------------------------

/*
spread operator create a shallow copy, so if the data is nested and you try to manipulate it the data also changes in the original copy
*/

const originalObj = {
  name: "raju",
  languages: { backend: "Java", frontend: "Javascript" },
}

let copyObj = { ...originalObj }

/*
{ 
    name: " ", 
    languages: { ......... } 
}  
*/

copyObj.name = "shaym"
console.log(copyObj)
/* 
{ name: 'shaym',
  languages: { backend: 'Java', frontend: 'Javascript' }
}
*/

console.log(originalObj)
/*
{
  name: 'raju',
  languages: { backend: 'Java', frontend: 'Javascript' }
}  
*/

/*
- seems to be working fine  
*/

// changing nested data
copyObj.languages.backend = "Python"
console.log("copyObj", copyObj)
/*
copyObj {
  name: 'shaym',
  languages: { backend: 'Python', frontend: 'Javascript' }
}  
*/

console.log("originalObj", originalObj)
/*  
originalObj {
  name: 'raju',
  languages: { backend: 'Python', frontend: 'Javascript' }
}
*/

// ---------------------------------------------------------------------
// overcome problem
/*
reach the nested data and create a deep copy   
*/
copyObj = {
  ...copyObj,
  languages: { ...copyObj.languages, backend: "PHP" },
}

console.log("copy", copyObj)
/*
copy {
  name: 'shaym',
  languages: { backend: 'PHP', frontend: 'Javascript' }
}  
*/
console.log("original", originalObj)
/*
original {
  name: 'raju',
  languages: { backend: 'Python', frontend: 'Javascript' }
}  
*/
console.log("=================")

const originalArray = [1, 2, [3, 4, [5]]]

/*
[ 1, 2, [...........] ]  
- everything after the second square bracket is nested

- if the data inside second array or more nested
- is changed in copy, changes can also be seen inside
- original copy
*/

let copyArray = [...originalArray]

copyArray[2][0] = 0
console.log(copyArray) // [ 1, 2, [ 0, 4, [ 5 ] ] ]
console.log(originalArray) // [ 1, 2, [ 0, 4, [ 5 ] ] ]

// below code is not working as expected
// at position 0 , deleting 1 elements , add 9
// const newCopy = [...copyArray, ...copyArray[2].splice(0, 1, 9)]
// console.log(newCopy) // [ 1, 2, [ 0, 4, [ 5 ] ] ]
// console.log(originalArray) // [ 1, 2, [ 0, 4, [ 5 ] ] ]
