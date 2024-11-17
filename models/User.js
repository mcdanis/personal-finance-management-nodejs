const Database = require("../config/config");
const BasicQueryService = require("../services/BasicQueryService");
const bcrypt = require("bcrypt");

class User extends BasicQueryService {
  constructor() {
    super();
    this.db = new Database();
    this.table = "users";
  }

  async getUsers() {
    try {
      const result = await this.db.client.query(super.select(this.table, "*"));
      return result.rows;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const result = await this.db.client.query(
        super.selectParam(this.table, "*", userId)
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const result = await this.db.client.query(
        super.selectParam(this.table, "*", email, "email")
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  }

  async test() {
    return super
      .selectParams("transactions", "*")
      .where("account_id", "=", 1)
      .orWhere("sub_category", "=", 2)
      .get();
  }

  async inputUser({ name, email, pass }) {
    let password = await bcrypt.hash(pass, 10);
    const data = [name, email, password];
    const columns = ["name", "email", "password"];

    await super.insert(this.table, columns, data);
  }
}

module.exports = User;
