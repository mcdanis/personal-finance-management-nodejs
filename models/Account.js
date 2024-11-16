const Database = require("../config/config");
const BasicQueryService = require("../services/BasicQueryService");

class Account extends BasicQueryService {
  constructor() {
    super();
    this.db = new Database();
    this.table = "accounts";
  }

  async getAccounts() {
    try {
      const result = await this.db.client.query(super.select(this.table, "*"));
      return result.rows;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  }

  async getAccount(id) {
    try {
      const result = await this.db.client.query(
        super.selectParam(this.table, "*", id)
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching :", error);
      throw error;
    }
  }
}

module.exports = Account;