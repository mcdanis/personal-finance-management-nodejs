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
    return (
      this.select(table, select) + " WHERE " + field + " = '" + valVar + "'"
    );
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
    return result.rows;
  }

  async query(query) {
    const result = await this.db.client.query(query);
    return result.rows;
  }

  async post(query, value = null) {
    const result = await this.db.client.query(query, value);
    return result.rows[0];
  }

  async getDatas(table, field) {
    try {
      const result = await this.db.client.query(this.select(table, field));
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async insert(table, columns, data) {
    try {
      const columnNames = columns.join(", ");
      const placeholders = this.placeholders(columns);

      const query = `INSERT INTO ${table} (${columnNames}) VALUES (${placeholders})`;
      const result = await this.post(query, data);
      return result;
    } catch (err) {
      throw {
        statusCode: 500,
        message: `Error inserting data: ${err.message}`,
      };
    }
  }

  async delete(table, column, id) {
    try {
      const query = `DELETE FROM ${table} WHERE ${column} = '${id}'`;
      const result = await this.post(query);
      return result;
    } catch (err) {
      throw {
        statusCode: 500,
        message: `Error deleting data: ${err.message}`,
      };
    }
  }

  async update(table, columns, data, key, accountId) {
    try {
      const placeholders = this.placeholders(columns);

      const columnAssignments =
        columns.length === 1
          ? `${columns[0]} = ${placeholders}`
          : `(${columns.join(", ")}) = (${placeholders})`;

      const query = `UPDATE ${table} SET ${columnAssignments} WHERE ${key} = '${accountId}'`;
      const result = await this.post(query, data);

      return result;
    } catch (err) {
      throw {
        statusCode: 500,
        message: `Error updating data: ${err.message}`,
      };
    }
  }

  placeholders(columns) {
    return columns.map((_, index) => `$${index + 1}`).join(", ");
  }
}

module.exports = BasicQueryService;
