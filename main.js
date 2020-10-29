// BankAccount class - This class represents a bank account.

class BankAccount {

    constructor(accountNumber, owner) {
        //
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = []; // initially set to empty array. this should hold transactions objects
    }

    /**
     * deposit an amount to the account
     * @param {*} amount
     */
    deposit(amt){
        // prevent negative number deposits 
        if (amt < 0) {
            return;
        } else {
            let newDeposit = new Transaction(amt);
            this.transactions.push(newDeposit);
        }

    }

    charge(amt, payee) {    
        if (this.balance() < amt * -1) {
            return "Insufficent funds, purchase invalidated";
        } else {
            let charge = new Transaction(amt, payee);
            this.transactions.push(charge);
        }
    }

    /**
     * 
     * @param {string} payee the person you are paying
     * @param {number} amount the amount you are paying
     */

     /**
      * Returns the current balance on the account
      */
     balance(){
         // initial balance should always be zero
         let balance = 0;

         // run through all tranasactions and adding/subtracting the totals of each transaction
         this.transactions.forEach((transaction) => {
             balance = balance + transaction.amount;
         })

         return balance;
     }
}

class Transaction {
    constructor(amount, payee){
        this.date = new Date(); // The date of the transaction
        this.amount = amount; // The amount of the transaction. Positive amounts are money going into the account (deposit, refund). Negative amounts are money coming out of the account (a charge or debit).
        this.payee = payee; // The description or payee on the transaction
    }
}

let account = new BankAccount("1234", "John Smith");

console.log(account)

// balance on new accounts
account.balance() // 0
account.deposit(100) // 

console.log("My balance after first deposit", account.balance()) // 100

account.deposit(-100) // 100
console.log("Cannot do a negative deposit", account.balance());

// can charge to a vendor
account.charge(-50, "Target");
console.log("My balance after groceries at Target", account.balance()) // 50

// cannot overcharge
account.charge(-1000, "Diamond Shop")
console.log("Cannont overcharge", account.balance()) // 50

// can do refunds
account.charge(20, "Target");
console.log("I got a $20 refund for part of my groceries", account.balance()) // 70

console.log("My number of transactions is", account.transactions.length) // 3 
