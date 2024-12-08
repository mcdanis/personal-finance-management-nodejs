class QueryBuilder {
  constructor(tableName) {
    this.tableName = tableName;
    this.joins = [];
    this.conditions = [];
    this.columns = ["*"];
  }

  static table(tableName) {
    return new QueryBuilder(tableName);
  }

  join(table, first, operator, second) {
    this.joins.push(`JOIN ${table} ON ${first} ${operator} ${second}`);
    return this;
  }

  where(column, operator, value) {
    this.conditions.push(`${column} ${operator} '${value}'`);
    return this;
  }

  select(...columns) {
    this.columns = columns.length > 0 ? columns : ["*"];
    return this;
  }

  get() {
    const baseQuery = `SELECT ${this.columns.join(", ")} FROM ${
      this.tableName
    }`;
    const joinQuery = this.joins.join(" ");
    const whereQuery =
      this.conditions.length > 0
        ? `WHERE ${this.conditions.join(" AND ")}`
        : "";
    return `${baseQuery} ${joinQuery} ${whereQuery};`;
  }
}

module.exports = QueryBuilder;
