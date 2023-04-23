// https://javascript.info/class
class User {
  constructor(name) {
    // invokes the setter
    this.namee = name;
  }

  get name() {
    return this._namee;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._namee = value;
  }
}

let user = new User("John");
console.log(user.name); // John

for (const userKey in user) {
  console.log("userKey ", userKey); // _name
}

user = new User("llllllll"); // Name is too short.
console.log(user);