const Database = require("../config/config");

class BasicQueryService {
  constructor() {
    this.db = new Database();
    this.query = "";
    this.isWhereAdded = false;
  }

  select(table, select) {
    return "SELECT " + select + " FROM " + table;
  }

  selectParam(table, select, valVar, field = "id") {
    return this.select(table, select) + " WHERE " + field + " = " + valVar;
  }

  selectParams(table, select = "*") {
    this.query = `SELECT ${select} FROM ${table}`;
    return this;
  }

  where(field, operator, value) {
    if (this.isWhereAdded) {
      this.query += ` AND ${field} ${operator} '${value}'`;
      this.isWhereAdded = false;
    } else {
      this.query += ` WHERE ${field} ${operator} '${value}'`;
      this.isWhereAdded = true;
    }
    return this;
  }

  orWhere(field, operator, value) {
    if (this.isWhereAdded) {
      this.query += ` OR ${field} ${operator} '${value}'`;
      this.isWhereAdded = false;
    } else {
      this.query += ` WHERE ${field} ${operator} '${value}'`;
      this.isWhereAdded = true;
    }
    return this;
  }

  async get() {
    const result = await this.db.client.query(this.query);
    console.log(this.query);
    return result.rows;
  }

  async query(query) {
    const result = await this.db.client.query(query);
    return result.rows;
  }

  async put(query, value) {
    const result = await this.db.client.query(query, value);
    return result.rows[0];
  }

  async getDatas(table, field) {
    try {
      const result = await this.db.client.query(this.select(table, field));
      return result.rows;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  }
}

module.exports = BasicQueryService;
