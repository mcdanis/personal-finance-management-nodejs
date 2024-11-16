const Database = require("../config/config");
const BasicQueryService = require("../services/BasicQueryService");

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

  async test() {
    return super
      .selectParams("transactions", "*")
      .where("account_id", "=", 1)
      .orWhere("sub_category", "=", 2)
      .get();
  }

  async inputUser({ name, email }) {
    let pass = 123;
    const user = await this.create({ name, email, pass });
    return user;
  }

  create({ name, email, pass }) {
    const query = `INSERT INTO ${this.table} (id, name, email, password) VALUES ($1, $2, $3, $4)`;
    const value = [3, name, email, pass];
    return super.put(query, value);
  }
}

module.exports = User;
