// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
// https://javascript.info/private-protected-properties-methods#private-waterlimit
class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
}

let coffeeMachine = new CoffeeMachine();

// can't access privates from outside of the class
// coffeeMachine.#fixWaterAmount(123); // Error