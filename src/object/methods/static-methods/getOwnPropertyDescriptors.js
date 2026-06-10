/*
 * The Object.getOwnPropertyDescriptors() static method returns 
 * all own property descriptors of a given object.
 * 
 * Object.getOwnPropertyDescriptors(obj)
 */

const object11 = {
  greet: 'hello',
  frameWork: 'react',
};

const descriptors1 = Object.getOwnPropertyDescriptors(object11);

console.log(descriptors1);
/* 
{
  greet: {
    value: 'hello',
    writable: true,
    enumerable: true,
    configurable: true
  },
  frameWork: {
    value: 'react',
    writable: true,
    enumerable: true,
    configurable: true
  }
}
*/

// --------------------------------------------------

// Creating a shallow copy
/* 
Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
); 
*/
