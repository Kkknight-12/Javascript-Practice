// Instance methods are called on a specific value/object.
// Static methods are called on the constructor/class itself.

console.log('--- Instance methods ---')

const numbers = [1, 2, 3]

console.log('numbers.map:', numbers.map((number) => number * 2)) // [2, 4, 6]
console.log('numbers.includes:', numbers.includes(2)) // true
console.log('string.toUpperCase:', 'hello'.toUpperCase()) // HELLO

const userRoles = new Map([
  ['mayank', 'admin'],
  ['alex', 'learner'],
])

console.log('userRoles.get:', userRoles.get('mayank')) // admin

console.log('--- Static methods ---')

console.log('Array.isArray:', Array.isArray(numbers)) // true
console.log('Array.from:', Array.from('hello')) // ['h', 'e', 'l', 'l', 'o']
console.log(
  'Object.keys:',
  Object.keys({ name: 'Mayank', role: 'admin' })
) // ['name', 'role']

// These are wrong because static methods are not called on instances.
// numbers.isArray()
// 'hello'.from()

console.log('--- Class example ---')

class User {
  constructor(name) {
    this.name = name
  }

  // Instance method: every user object can call this.
  sayHi() {
    return `Hi, I am ${this.name}`
  }

  // Static method: called on User itself.
  static createGuest() {
    return new User('Guest')
  }

  static isUser(value) {
    return value instanceof User
  }
}

const user = new User('Mayank')
const guest = User.createGuest()

console.log('user.sayHi:', user.sayHi()) // Hi, I am Mayank
console.log('guest.sayHi:', guest.sayHi()) // Hi, I am Guest
console.log('User.isUser:', User.isUser(user)) // true

// This is wrong because sayHi is an instance method, not a static method.
// User.sayHi()
