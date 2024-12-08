const Database = require("../../config/config");
const Transaction = require("./Transaction");
const BasicQueryService = require("../../services/BasicQueryService");

class Income extends BasicQueryService {
  constructor() {
    super();
    this.db = new Database();
    this.transaction = new Transaction();

    this.type = "i";
    this.table = this.transaction.table;
  }

  async inputIncome({
    userId,
    name,
    date,
    sourceOfIncome,
    value,
    description,
    accountId,
  }) {
    const columns = [
      "user_id",
      "name",
      "date",
      "sub_category",
      "amount",
      "description",
      "account_id",
      "type",
    ];
    const data = [
      userId,
      name,
      date,
      sourceOfIncome,
      value,
      description,
      accountId,
      this.type,
    ];

    return await super.insert(this.table, columns, data);
  }

  async getIncome(userId, timeFrame) {
    try {
      const result = await this.db.client.query(
        super.transactionQuery(this.table, userId, timeFrame, this.type)
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching :", error);
      throw error;
    }
  }
}

module.exports = Income;
