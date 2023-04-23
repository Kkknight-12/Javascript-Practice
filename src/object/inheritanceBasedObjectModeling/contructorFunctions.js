// Constructor functions
/*
 * The constructor functions (aka object constructors pattern) have been the
 * modus operandi for building objects in JavaScript for many years. Although
 * object literals offer a terse way to define a single object, this method
 * doesn’t scale when you need to create hundreds of objects of the same
 * shape. In this case, the constructor function acts as a template to
 * initialize objects populated with different data. You’re probably familiar
 * with this pattern, but this section discusses some advanced techniques
 * that you may not have encountered before.
 *  */

// Functions as templates
/*
 * Using functions instead of straight object literals to build objects
 * allows your model to better evolve because you have much more control of
 * how the objects are built.
 *
 * Functions allow you to export a facade to the caller under which changes
 * don’t necessarily need to propagate to the calling code. The details of
 * how an object gets initialized, such as enforcing any preconditions, are
 * properly tucked away inside the constructor.
 *
 * The following code snippet, for example, never reveals unnecessary details
 * about the shape of HashTransaction or any operations that might take place
 * during instantiation. Encapsulation is always a good choice:
 *
 * const tx = new HashTransaction('luis@tjoj.com', 'luke@tjoj.com');
 * */

function Transaction(sender, recipient) {
  this.sender = sender;
  this.recipient = recipient;
}

function HashTransaction(sender, recipient) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target
  /*
   * Detects whether the instantiation of the child object omits the new
   * keyword and fixes the call.  */
  if (!new.target) {
    return new HashTransaction(sender, recipient);
  }

  /*
   * Calls the parent’s constructor to initialize any parent member
   * properties into this object’s context
   * */
  Transaction.call(this, sender, recipient);

  this.calculateHash = function calculateHash() {
    const data = [this.sender, this.recipient].join("");
    let hash = 0,
      i = 0;
    while (i < data.length) {
      hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
    }
    return hash ** 2;
  };
}

const tx = new HashTransaction("luis@tjoj.com", "luke@tjoj.com");
console.log(tx.calculateHash()); // 237572532174000400
console.log(tx.sender); // 'luis@tjoj.com'

/*
 * By using functions, you can easily instantiate as many HashTransaction
 * objects as you like, all of them containing the properties defined in
 * Transaction as well. One caveat is that you need to call the function with
 * the new keyword to ensure the context (this) is initialized properly.
 *
 * These objects do not share references to any properties, however. You
 * defined calculateHash directly on HashTransaction’s context (this
 * variable), for example, adding a new calculateHash property to each
 * instance of HashTransaction. In other words, if you create two instances,
 * you’ll see two copies of the same method:
 *  */
const tx1 = new HashTransaction("luis@tjoj.com", "luke@tjoj.com");
const tx2 = new HashTransaction("luis@tjoj.com", "luke@tjoj.com");
console.log(tx1.calculateHash === tx2.calculateHash); // false

/*
 * To fix this problem, you need to configure how prototypes links are set up
 * as new objects are created.
 */

// ------------------------------------------------------------------------

// Sharing properties by using constructors and prototypes

/*
 * One interesting aspect of using constructors is that for every constructor
 * F, JavaScript automatically creates the object F.prototype:
 * HashTransaction.prototype; // HashTransaction {}
 * */

/*
 * This object is added to facilitate code sharing and reuse, especially
 * with methods, where it’s unnecessary to define more than one copy. Hence,
 * a more optimal approach is to add calculateHash to HashTransaction’s
 * prototype so that it’s shared among all HashTransaction instances, for
 * example:
 * */

HashTransaction.prototype.calculateHash2 = function calculateHash() {
  // ...
};

/*
 * With this slight twist, these two properties refer to the same memory
 * location: */
console.log("prototype ", tx1.calculateHash2 === tx2.calculateHash2); // true

// ------------------------------------------------------------------------