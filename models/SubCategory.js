const Database = require("../config/config");
const BasicQueryService = require("../services/BasicQueryService");

class Category extends BasicQueryService {
  constructor() {
    super();
    this.db = new Database();
    this.table = "sub_categories";
  }

  //   getCategories() {
  //     return super.getDatas(this.table, "*");
  //   }

  async getSubCategory(id) {
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

  async inputSubCategory({ categoryId, name, userId }) {
    const columns = ["name", "user_id", "category_id"];
    const data = [name, userId, categoryId];

    await super.insert(this.table, columns, data);
  }

  async getSubCategoryByUser(userId) {
    try {
      const result = await this.db.client.query(
        `
          SELECT ${this.table}.id, ${this.table}.name,${this.table}.category_id, categories.name as category_name FROM 
          ${this.table} join categories on ${this.table}.category_id = categories.id
        `
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching :", error);
      throw error;
    }
  }

  async deleteSubCategory(categoryId) {
    return await super.delete(this.table, "id", categoryId);
  }

  async updateSubCategory(subCategoryId, key, { categoryId, name }) {
    const columns = ["name", "category_id"];
    const data = [name, categoryId];

    await super.update(this.table, columns, data, key, subCategoryId);
  }

}

module.exports = Category;
