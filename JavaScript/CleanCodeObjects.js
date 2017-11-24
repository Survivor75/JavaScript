// Clean Code: Objects and Data Structures

// Use getters and setters
function makeBankAccount() {
  let balance = 0;

  function getBalance() {
    return balance;
  }

  function setBalance(amount) {
    balance = amount;
  }

  return {
    getBalance,
    setBalance
  };
}
const account = makeBankAccount();
account.setBalance(100);
console.log(account.getBalance());



// Make objects have private members
const Employee = function(name) {
  return {
    getName() {
      return name;
    },
  };
};


const employee = new Employee('John Doe');
console.log(`Employee name: ${employee.getName()}`);
delete employee.name;
console.log(`Employee name: ${employee.getName()}`);
