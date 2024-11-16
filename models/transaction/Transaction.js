const Database = require("../../config/config");

class Transaction {
  constructor() {
    this.db = new Database();
  }
}

module.exports = Transaction;
