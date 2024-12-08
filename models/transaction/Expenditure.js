const Database = require("../../config/config");
const Transaction = require("./Transaction");
const BasicQueryService = require("../../services/BasicQueryService");
const QueryBuilder = require("../../services/utilities/QueryBuilder");

class Expenditure extends BasicQueryService {
  constructor() {
    super();
    this.db = new Database();
    this.transaction = new Transaction();

    this.type = "e";
    this.table = this.transaction.table;
  }

  async inputExpenditure({
    userId,
    name,
    date,
    subCategoryId,
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
      subCategoryId,
      value,
      description,
      accountId,
      this.type,
    ];
    return await super.insert(this.table, columns, data);
  }

  async getExpenditure(userId, timeFrame) {
    try {
      //   const result = await this.db.client.query(
      //     super.selectParam(this.table, "*", timeFrame, "date")
      //   );
      //   const result = super
      //     .selectParams(this.table, "*")
      //     .where("user_id", "=", userId)
      //     .where("date", "=", timeFrame)
      //     .get();
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

module.exports = Expenditure;
