const Database = require("../../config/config");
const Transaction = require("./Transaction");

class Expenditure extends Transaction {
  constructor() {
    this.db = new Database();
  }
}

module.exports = Expenditure;
