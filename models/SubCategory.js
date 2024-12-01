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

  //   async getCategory(id) {
  //     try {
  //       const result = await this.db.client.query(
  //         super.selectParam(this.table, "*", id)
  //       );
  //       return result.rows;
  //     } catch (error) {
  //       console.error("Error fetching :", error);
  //       throw error;
  //     }
  //   }

  async inputSubCategory({ categoryId, name, userId }) {
    const columns = ["name", "user_id", "category_id"];
    const data = [name, userId, categoryId];

    await super.insert(this.table, columns, data);
  }

  async getSubCategoryByUser(userId) {
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
}

module.exports = Category;
