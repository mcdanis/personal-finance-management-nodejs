const Database = require("../../config/config");
const Transaction = require("./Transaction");

class Income extends Transaction {
  constructor() {
    this.db = new Database();
  }
}

module.exports = Income;
