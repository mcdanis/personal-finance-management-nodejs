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

  async inputCategory({ category, userId }) {
    const columns = ["name", "user_id"];
    const data = [category, userId];

    await super.insert(this.table, columns, data);
  }

  async getCategoryByUser(userId) {
    try {
      const result = await this.db.client.query(
        super.selectParam(this.table, "*", userId, "user_id")
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching :", error);
      throw error;
    }
  }

  async deleteCategory(categoryId) {
    return await super.delete(this.table, "id", categoryId);
  }

  async updateCategory(categoryId, key, { category }) {
    const columns = ["name"];
    const data = [category];

    await super.update(this.table, columns, data, key, categoryId);
  }
}

module.exports = Category;
