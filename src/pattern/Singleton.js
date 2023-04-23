/*
 * https://www.digitalocean.com/community/tutorials/js-js-singletons
 * Singletons are used to create an instance of a class if it does not exist
 * or else return the reference of the existing one. This means that
 * singletons are created exactly once during the runtime of the application
 * in the global scope.
 *  */

// https://www.educative.io/courses/javascript-design-patterns-for-coding-interviews/myAOGkRL0n0
let instance = null;
class Printer {
  constructor(pages) {
    this.display = function () {
      console.log(
        `You are connected to the printer. You want to print ${pages} pages.`
      );
    };
  }

  static getInstance(numOfpages) {
    if (!instance) {
      instance = new Printer(numOfpages);
    }
    return instance;
  }
}

var obj1 = Printer.getInstance(2);
console.log("obj1 -- ", obj1);
obj1.display();
var obj2 = Printer.getInstance(3);
console.log("obj2 -- ", obj2);
obj2.display();
console.log(obj2 == obj1);