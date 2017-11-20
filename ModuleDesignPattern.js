// JS Design Patterns: Module\

(function() {

    // declare private variables and/or functions

    return {
      // declare public variables and/or functions
    }

})();

/* lib/module.js */

class ShoppingDataType {
  constructor() {
    // private properties.
    this.shoppingList = ['coffee', 'chicken', 'pizza']
  }

  // public methods
  getShoppingList() {
    return this.shoppingList.join(", ")
  }

  addItem(item) {
   this.shoppingList.push(item)
  }
}

export default ShoppingDataType;


/* main.js */
import ShoppingDataType from 'libs/module';

var shopping = new ShoppingDataType;
console.log(shopping.getShoppingList());
