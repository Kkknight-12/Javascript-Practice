/*
 * isPrototypeOf() method of Object instances checks
 * if this object exists in another object's prototype chain.
 *
 * isPrototypeOf(object)
 *
 * return boolean
 */
function Foo() {}
function Bar() {}

Bar.prototype = Object.create(Foo.prototype);

const bar = new Bar();

console.log(Foo.prototype.isPrototypeOf(bar));
// Expected output: true
console.log(Bar.prototype.isPrototypeOf(bar));
// Expected output: true
