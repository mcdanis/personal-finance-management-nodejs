const Database = require("../../config/config");
const Transaction = require("./Transaction");
const BasicQueryService = require("../../services/BasicQueryService");

class Expenditure extends BasicQueryService {
  constructor() {
    super();
    this.db = new Database();
    this.transaction = new Transaction();
    this.type = 'e'
  }

  async inputExpenditure({ userId, name, date, subCategoryId, value, description, accountId }) {
    const columns = ["user_id", "name", "date", "sub_category", "amount", "description", "account_id", "type"];
    const data = [userId, name, date, subCategoryId, value, description, accountId, this.type];

    await super.insert(this.transaction.table, columns, data);
  }
}

module.exports = Expenditure;
