const Database = require("../../config/config");

class Transaction {
  table = "transactions";
  constructor() {
    this.db = new Database();

  }
}

module.exports = Transaction;
