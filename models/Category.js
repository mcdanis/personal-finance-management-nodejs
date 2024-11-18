const Database = require("../config/config");
const BasicQueryService = require("../services/BasicQueryService");

class Category extends BasicQueryService {
  constructor() {
    super();
    this.db = new Database();
    this.table = "categories";
  }

  getCategories() {
    return super.getDatas(this.table, "*");
  }

  async getCategory(id) {
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

module.exports = Category;
